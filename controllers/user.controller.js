const { body, validationResult } = require("express-validator");
const express = require("express");
const User = require("../models/user.model");

const router = express.Router();

router.post(
  "",
  body("id")
    .isNumeric()
    .withMessage("Id is not a number")
    .bail()
    .custom(async (value) => {
      const user = await User.findOne({ id: value });
      if (user) {
        throw new Error("Id already exists");
      }
      return true;
    }),
  body("name")
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name should be 1 to 5 characters long"),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already exists");
      }
      return true;
    }),
  body("bio")
    .isString()
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 200 }),
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
      const user = await User.create(req.body);
      return res.send(user);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
);

module.exports = router;
