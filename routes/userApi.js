import express from "express";
import _ from "lodash";
import bcrypt from "bcrypt";

import errorHandler from "../middleware/errorHandlerAsync.js";
import auth from "../middleware/authenticator.js";
import User, {
  validate,
  validateUsername,
  validateEmail,
} from "../models/user.js";

const router = express.Router();

router.get(
  "/profile",
  auth,
  errorHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  })
);

router.post(
  "/",
  errorHandler(async (req, res) => {
    if (_.size(req.body) === 1) {
      return checkForExistingUser(req.body, res);
    }

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const isExistedUsername = await User.findOne({
      username: req.body.username,
    });
    if (isExistedUsername)
      return res.status(400).send("This username has been existed.");

    const isExistedEmail = await User.findOne({ email: req.body.email });
    if (isExistedEmail)
      return res.status(400).send("This email has been registered.");

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const accessToken = user.generateAccessToken();

    res
      .header("x-auth-token", accessToken)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["_id", "username", "email"]));
  })
);

async function checkForExistingUser(user, res) {
  if (user.username) {
    const { error } = validateUsername(user);
    if (error) return res.status(400).send(error.details[0].message);

    const isExistedUsername = await User.findOne({
      username: user.username,
    });
    if (isExistedUsername)
      return res.status(400).send("This username has been existed.");
  } else if (user.email) {
    const { error } = validateEmail(user);
    if (error) return res.status(400).send(error.details[0].message);

    const isExistedEmail = await User.findOne({ email: user.email });
    if (isExistedEmail)
      return res.status(400).send("This email has been registered.");
  }

  return;
}

export default router;
