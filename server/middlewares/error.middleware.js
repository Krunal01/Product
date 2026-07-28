const getErrorName = (statusCode) => {
  switch (statusCode) {
    case 400:
      return "BadRequestError";
    case 401:
      return "UnauthorizedError";
    case 403:
      return "ForbiddenError";
    case 404:
      return "NotFoundError";
    case 405:
      return "MethodNotAllowedError";
    case 409:
      return "ConflictError";
    case 413:
      return "PayloadTooLargeError";
    case 415:
      return "UnsupportedMediaTypeError";
    case 422:
      return "UnprocessableEntityError";
    case 429:
      return "TooManyRequestsError";
    case 500:
      return "InternalServerError";
    case 501:
      return "NotImplementedError";
    case 503:
      return "ServiceUnavailableError";
    default:
      return "UnknownError";
  }
};

const errorHandler = (error, req, res, next) => {
  console.log("error coccured: ", error);

  let errorCode;
  let errorMsg;

  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((err) => err.message);
    errorCode = 400;
    errorMsg = errors.join(", ") || error?.message;
  } else if (error.name === "CastError") {
    errorCode = 400;
    errorMsg = `Invalid ${error.path}: ${error.value}` || error?.message;
  } else if (error.name === "JsonWebTokenError") {
    errorCode = 401;
    errorMsg = error?.message;
  } else if (error.name === "TokenExpiredError") {
    errorCode = 401;
    errorMsg = error?.message;
  } else if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    errorCode = 409;
    errorMsg = `${field} already exists`;
  } else {
    errorCode = error?.statusCode || 500;
    errorMsg = error?.message || "something went wrong!";
  }

  return res.status(errorCode).json({
    success: false,
    statusCode: errorCode,
    error: getErrorName(errorCode),
    message: errorMsg,
  });
};

module.exports = { errorHandler };
