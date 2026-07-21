const { rateLimit } = require("express-rate-limit");

const rateLimitResponse = {
  message: "Too many requests. try again later!",
  status: false,
  statusCode: 429,
};

const authLimiter = rateLimit({
  limit: 5,
  windowMs: 15 * 60 * 1000,
  message: rateLimitResponse,
});

const protectedLimiter = rateLimit({
  limit: 300,
  windowMs: 15 * 60 * 1000,
  message: rateLimitResponse,
});

module.exports = { authLimiter, protectedLimiter };
