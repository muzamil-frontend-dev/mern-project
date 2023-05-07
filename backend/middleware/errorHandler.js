const errorHandler = (error, req, res, next) => {
  const status = res.statusCode == 200 ? 500 : res.statusCode;
  res.statusCode = status;

  res.json({
    message: genericError(error.message),
    stack: process.env.NODE_MODE === "development" ? error.stack : null,
  });
};

const genericError = (error) => {
  if (error.includes("E11000 duplicate key")) {
    return "Email already exists please choose another email";
  }
  return error;
};

export default errorHandler;
