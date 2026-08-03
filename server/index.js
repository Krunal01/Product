require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const router = require("./routes");
const { errorHandler } = require("./middlewares/error.middleware");

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL];

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: function (origin, cb) {
      if (!origin) return cb(null, true);
      if (allowedOrigins?.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error("Not allowed By CORS"));
    },
    credentials: true,
  }),
);
app.use("/api", router);
app.use(errorHandler);

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
