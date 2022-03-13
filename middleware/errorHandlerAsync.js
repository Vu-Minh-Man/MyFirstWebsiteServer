export default function (trackingRoute) {
  return async (req, res, next) => {
    try {
      await trackingRoute(req, res);
    } catch (error) {
      next(error);
    }
  };
}
