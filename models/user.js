import config from "../config/config.js";

import joi from "joi";
import { joiPassword } from "joi-password";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 256,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  registrationDate: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.secretKey
  );
};

const User = mongoose.model("User", userSchema);

const usernameJoiSchema = { username: joi.string().min(5).max(50) };
const emailJoiSchema = {
  email: joi
    .string()
    .min(5)
    .max(256)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
};
const passwordJoiSchema = {
  password: joiPassword.string().min(5).max(12).noWhiteSpaces(),
};

function validate(user) {
  const schema = joi
    .object({
      ...usernameJoiSchema,
      ...emailJoiSchema,
      ...passwordJoiSchema,
    })
    .options({ presence: "required" });

  return schema.validate(user);
}

function validateUsername(user) {
  const schema = joi.object({
    ...usernameJoiSchema,
  });

  return schema.validate(user);
}

function validateEmail(user) {
  const schema = joi.object({
    ...emailJoiSchema,
  });

  return schema.validate(user);
}

export default User;
export { validate, validateUsername, validateEmail };
