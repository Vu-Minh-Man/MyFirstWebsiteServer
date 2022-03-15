const dbCluster =
  "mongodb+srv://man:EhOpohrI0hAGcnR5@cluster0.kjz7v.mongodb.net";

export default {
  port: process.env.PORT || 8080,
  db: dbCluster + "/myFirstWebsite?retryWrites=true&w=majority",
  dbLogger: dbCluster + "/errors",
  secretKey: process.env.SECRETKEY || "jwtkey",
};
