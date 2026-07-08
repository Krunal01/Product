const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    message,
    status: false,
    statusCode,
  });
};

module.exports = { errorResponse };
