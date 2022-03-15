const dbCluster =
  "mongodb+srv://man:EhOpohrI0hAGcnR5@cluster0.kjz7v.mongodb.net";
// process.env.MONGODB_URI
export default {
  port: process.env.PORT || 8080,
  db: dbCluster + "/myFirstWebsite?retryWrites=true&w=majority",
  dbLogger: dbCluster + "/errors?retryWrites=true&w=majority",
  secretKey: process.env.SECRETKEY || "jwtkey",
};
