const { body, validationResult } = require("express-validator");
const express = require("express");
const Post = require("../models/post.model");

const router = express.Router();

router.post(
  "",
  body("id")
    .isNumeric()
    .withMessage("Id is not a number")
    .bail()
    .custom(async (value) => {
      const post = await Post.findOne({ id: value });
      if (post) {
        throw new Error("Id already exists");
      }
      return true;
    }),
  body("content")
    .isString()
    .isLength({ min: 1, max: 300 })
    .withMessage("Content should be 1 to 300 characters long"),
  body("likes")
    .isInt({ min: 0 })
    .withMessage("Likes must be non-negative integer"),
  body("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let newErrors;
        newErrors = errors.array().map((err) => {
          console.log("Error: ", err);
          return { key: err.param, message: err.msg };
        });
        return res.status(400).send({ errors: newErrors });
      }
      const post = await Post.create(req.body);
      return res.status(201).send(user);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
);

module.exports = router;
