const dbParams = "?retryWrites=true&w=majority";

export default {
  port: process.env.PORT || 8080,
  db: process.env.MONGODB_URL + "/myFirstWebsite" + dbParams,
  dbLogger: process.env.MONGODB_URL + "/errors" + dbParams,
  secretKey: process.env.SECRETKEY || "jwtkey",
};
