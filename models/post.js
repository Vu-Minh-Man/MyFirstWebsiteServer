import joi from "joi";
//import joiObjectId from "joi-objectid";
import mongoose from "mongoose";

//joi.objectId = joiObjectId(joi);

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  content: {
    required: true,
    type: String,
    maxLength: 1024,
  },
  createdDate: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

function validate(post) {
  const schema = joi.object({
    content: joi.string().required(),
  });

  return schema.validate(post);
}

export default Post;
export { validate };
