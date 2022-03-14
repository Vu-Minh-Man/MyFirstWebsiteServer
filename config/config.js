export default {
  port: process.env.PORT || 3000,
  dbDiscussion: process.env.DB + "/discussion",
  dbLogger: process.env.DBLOGGER,
  secretKey: process.env.SECRETKEY || "jwtkey",
};
