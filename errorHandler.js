const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const response = {
    error: err.message || 'Internal server error'
  };

  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.status(status).json(response);
};

export default errorHandler;
