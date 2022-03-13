import express from "express";
import joi from "joi";
import { joiPassword } from "joi-password";
import bcrypt from "bcrypt";

import errorHandler from "../middleware/errorHandlerAsync.js";
import User from "../models/user.js";

const router = express.Router();

router.post(
  "/",
  errorHandler(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let validUser;

    if (req.body.username) {
      validUser = await User.findOne({
        username: req.body.username,
      });
    } else {
      validUser = await User.findOne({
        email: req.body.email,
      });
    }

    if (!validUser)
      return res.status(400).send("Invalid username/email or password.");

    const validPassword = await bcrypt.compare(
      req.body.password,
      validUser.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid username/email or password.");

    const accessToken = validUser.generateAccessToken();
    res
      .header("x-auth-token", accessToken)
      .header("access-control-expose-headers", "x-auth-token")
      .send();
  })
);

function validate(user) {
  const schema = joi
    .object({
      username: joi.string().min(5).max(50),
      email: joi
        .string()
        .min(5)
        .max(256)
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: joiPassword.string().min(5).max(12).noWhiteSpaces().required(),
    })
    .or("username", "email");

  return schema.validate(user);
}

export default router;
