import joi from "joi";
import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 256,
  },
  createdDate: Date,
  lastPostingDate: Date,
  isArchive: { type: Boolean, default: false },
});

const Topic = mongoose.model("Topic", topicSchema);

function validate(topic) {
  const schema = joi.object({
    title: joi.string().min(5).max(255).required(),
    isArchive: joi.boolean(),
  });

  return schema.validate(topic);
}

export default Topic;
export { validate };
