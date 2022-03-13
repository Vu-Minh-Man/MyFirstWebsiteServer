export default function (logger) {
  return (error, req, res, next) => {
    logger.error(error.message);

    res
      .status(500)
      .send("Operation cannot be resolved. Unexpected error was encountered.");
  };
}
