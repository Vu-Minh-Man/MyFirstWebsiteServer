import express from "express";
import mongoose from "mongoose";

import errorHandler from "../../middleware/errorHandlerAsync.js";
import auth from "../../middleware/authenticator.js";
import Topic, { validate as validateTopic } from "../../models/topic.js";
import Post, { validate as validatePost } from "../../models/post.js";

const router = express.Router();

router.get(
  "/",
  errorHandler(async (req, res) => {
    const topics = await Topic.find()
      .populate("user", "username -_id")
      .sort("-createdDate");
    res.send(topics);
  })
);

router.post(
  "/",
  auth,
  errorHandler(async (req, res) => {
    const topicReq = { title: req.body.title };
    const { error: topicError } = validateTopic(topicReq);
    if (topicError) return res.status(400).send(topicError.details[0].message);

    const postReq = { content: req.body.content };
    const { error: postError } = validatePost(postReq);
    if (postError) return res.status(400).send(postError.details[0].message);

    const topic = new Topic({
      user: req.user._id,
      title: req.body.title,
    });

    const post = new Post({
      user: req.user._id,
      topic: topic._id,
      content: req.body.content,
    });
    topic.createdDate = post.createdDate;
    topic.lastPostingDate = post.createdDate;

    await Promise.all([topic.save(), post.save()]);

    res.send(topic);
  })
);

router.put(
  "/:topicid",
  auth,
  errorHandler(async (req, res) => {
    const { error } = validateTopic(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (!mongoose.Types.ObjectId.isValid(req.params.topicid))
      return res.status(404).send("Invalid URL.");

    const topic = await Topic.findByIdAndUpdate(
      req.params.topicid,
      { title: req.body.title, isArchive: req.body.isArchive },
      { new: true }
    );
    if (!topic) return res.status(404).send("The topic doesn't exist.");

    res.send(topic);
  })
);

export default router;
