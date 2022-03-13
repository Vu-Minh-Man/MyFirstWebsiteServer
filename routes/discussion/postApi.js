import express from "express";
import mongoose from "mongoose";

import errorHandler from "../../middleware/errorHandlerAsync.js";
import auth from "../../middleware/authenticator.js";
import Topic from "../../models/topic.js";
import Post, { validate } from "../../models/post.js";

const router = express.Router();

router.get(
  "/:topicid",
  errorHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.topicid))
      return res
        .status(404)
        .send("The topic doesn't exist. Cannot perform get operation.");

    const topic = await Topic.findById(req.params.topicid);
    if (!topic)
      return res
        .status(404)
        .send("The topic doesn't exist. Cannot perform get operation.");

    if (req.header("x-data-type") === "post") {
      const posts = await Post.find({ topic: topic._id })
        .populate("user", "username")
        .sort("createdDate");
      res.send(posts);
    } else if (req.header("x-data-type") === "topic") {
      res.send(topic);
    }
  })
);

router.get(
  "/:topicid/:postid",
  errorHandler(async (req, res) => {
    if (
      !mongoose.Types.ObjectId.isValid(req.params.topicid) ||
      !mongoose.Types.ObjectId.isValid(req.params.postid)
    )
      return res.status(404).send("invalid URL.");

    const topic = await Topic.findById(req.params.topicid);
    if (!topic) return res.status(404).send("The topic doesn't exist.");

    const post = await Post.findById(req.params.postid).select("content");
    if (!post) return res.status(404).send("The post doesn't exist.");

    res.send(post);
  })
);

router.post(
  "/:topicid",
  auth,
  errorHandler(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (!mongoose.Types.ObjectId.isValid(req.params.topicid))
      return res
        .status(404)
        .send(
          "The topic doesn't exist. If you want to post, please create a topic."
        );

    const topic = await Topic.findById(req.params.topicid);
    if (!topic)
      return res
        .status(404)
        .send(
          "The topic doesn't exist. If you want to post, please create a topic."
        );

    const post = new Post({
      user: req.user._id,
      topic: topic._id,
      content: req.body.content,
    });

    topic.lastPostingDate = post.createdDate;

    await Promise.all([topic.save(), post.save()]);

    res.send(post);
  })
);

router.put(
  "/:topicid/:postid",
  auth,
  errorHandler(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (
      !mongoose.Types.ObjectId.isValid(req.params.topicid) ||
      !mongoose.Types.ObjectId.isValid(req.params.postid)
    )
      return res.status(404).send("Invalid URL.");

    const topic = await Topic.findById(req.params.topicid);
    if (!topic) return res.status(404).send("The topic doesn't exist.");

    const post = await Post.findByIdAndUpdate(
      req.params.postid,
      {
        content: req.body.content,
      },
      { new: true }
    );
    if (!post) return res.status(404).send("The post doesn't exist.");

    res.send(post);
  })
);

export default router;
