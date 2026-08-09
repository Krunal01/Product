const express = require("express");
const Groq = require("groq-sdk");
const { successResponse } = require("../utils/response");
const AppError = require("../utils/AppError");
const Product = require("../models/Product");
const { generateEmbeddings } = require("../utils/embedding");
const aiRouter = express.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

aiRouter.post("/chat", async (req, res, next) => {
  const { userMessage } = req.body;

  if (!userMessage) {
    throw new AppError(400, "userMessage field is required.");
  }
  const userQueryVector = await generateEmbeddings(userMessage);

  const matchingProducts = await Product.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embeddings",
        queryVector: userQueryVector,
        numCandidates: 10,
        limit: 3,
      },
    },
    {
      $project: {
        name: 1,
        price: 1,
        discountPrice: 1,
        currency: 1,
        description: 1,
        features: 1,
        tags: 1,
        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
  ]);
  const inventoryContext = JSON.stringify(matchingProducts);
  const groqResponse = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `You are an expert customer support assistant for our electronics retail store.
                    Answer customer queries using ONLY the product data provided in the context below.
                    If the context is empty, politely state we don't carry those items.
                    
                    Available Store Inventory Data Context:
                    ${inventoryContext}`,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });
  const reply = groqResponse?.choices[0]?.message?.content;
  return successResponse(res, 200, "AI response", reply);
});

module.exports = aiRouter;
