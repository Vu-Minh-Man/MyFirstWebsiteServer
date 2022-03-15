const dbCluster =
  process.env.MONGODB_URL ||
  "mongodb+srv://man:EhOpohrI0hAGcnR5@cluster0.kjz7v.mongodb.net";

const dbParams = "?retryWrites=true&w=majority";

export default {
  port: process.env.PORT || 8080,
  db: dbCluster + "/myFirstWebsite" + dbParams,
  dbLogger: dbCluster + "/errors" + dbParams,
  secretKey: process.env.SECRETKEY || "jwtkey",
};
