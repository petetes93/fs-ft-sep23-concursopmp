const mongoose = require("mongoose");
const { body } = require("express-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  isAdmin: { type: Boolean },
  registrationInfo: { type: String },
  createDate: { type: Date },
  updateDate: { type: Date },
  isDeleted: { type: Date },
});

const User = mongoose.model("User", userSchema);

const userValidationSchema = [
  body("username")
    .isString()
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacío"),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("La password no puede estar vacía"),
  body("email")
    .isEmail()
    .notEmpty()
    .withMessage("El email no puede estar vacío"),
];

module.exports = User;
exports.userValidationSchema = userValidationSchema;
