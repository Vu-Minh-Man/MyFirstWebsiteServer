const db = "mongodb+srv://man:EhOpohrI0hAGcnR5@cluster0.kjz7v.mongodb.net";
const host = "https://sleepy-ocean-50803.herokuapp.com";

export default {
  port: host || 8080,
  dbDiscussion: db + "/myFirstWebsite",
  dbLogger: db + "/errors",
  secretKey: process.env.SECRETKEY || "jwtkey",
};
