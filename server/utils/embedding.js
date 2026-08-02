const { pipeline } = require("@xenova/transformers");

let extractorPipeline;

const getExtractor = async () => {
  if (!extractorPipeline) {
    extractorPipeline = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2",
    );
  }
  return extractorPipeline;
};

const generateEmbeddings = async (text) => {
  const extractor = await getExtractor();

  const tensor = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });
  return Array.from(tensor.data);
};

module.exports = { generateEmbeddings };
