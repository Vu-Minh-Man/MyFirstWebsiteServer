const db = "mongodb+srv://man:EhOpohrI0hAGcnR5@cluster0.kjz7v.mongodb.net";

export default {
  port: process.env.PORT || 8080,
  dbDiscussion: db + "/myFirstWebsite",
  dbLogger: db + "/errors",
  secretKey: process.env.SECRETKEY || "jwtkey",
};
