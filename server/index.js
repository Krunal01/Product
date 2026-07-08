require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 8000;
    await connectDB();
    app.listen(PORT, () => {
      console.log(` Server is running on PORT : ${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
};

startServer();
