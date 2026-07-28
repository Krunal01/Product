const successResponse = (res, statusCode, message, data) => {
  const response = {
    message,
    success: true,
    statusCode,
  };
  if (data !== undefined) {
    response.data = data;
  }
  return res.status(statusCode).json(response);
};

module.exports = { successResponse };
