const successResponse = (res, statusCode, message, data) => {
  const response = {
    message,
    status: true,
    statusCode,
  };
  if (data) {
    response.data = data;
  }
  return res.status(statusCode).json(response);
};
const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    message,
    status: false,
    statusCode,
  });
};

const error500 = (error) => {
  return error?.error || error?.message || "Internal Server Error";
};

module.exports = { errorResponse, successResponse, error500 };
