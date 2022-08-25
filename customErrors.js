export const createError = (status, errorMsg) => {
  const error = new Error();
  error.status = status;
  error.message = errorMsg;
  return error;
};
