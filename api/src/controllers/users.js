const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const { Design } = require("../models/design");
const { Vote } = require("../models/vote");

const register = async (req, res) => {
  try {
    const {
      username,
      password: passwordPlainText,
      isAdmin,
      ...rest
    } = req.body;

    const existingEmailUser = await User.findOne({ email: rest.email });
    if (existingEmailUser) {
      throw new Error("Vuelve a intentarlo más tarde");
    }

    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
      return res.status(400).json({ msg: "Vuelve a intentarlo más tarde" });
    }

    const { errors } = validationResult(req);
    if (errors.length) {
      return res.status(400).send({ msg: "Vuelve a intentarlo más tarde" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(passwordPlainText, salt);

    const newUser = await User.create({ username, password, isAdmin, ...rest });

    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin, username: newUser.username },
      process.env.privateKey
    );

    res.setHeader("x-auth-token", token);
    res.setHeader("Access-Control-Expose-Headers", "x-auth-token");

    res.json({ msg: "Usuario registrado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password: passwordPlainText } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "Usuario o contraseña incorrecto" });
    }

    const isValidUser = await bcrypt.compare(passwordPlainText, user.password);

    if (!isValidUser) {
      return res.status(400).json({ msg: "Usuario o contraseña incorrecto" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, username: user.username },
      process.env.privateKey
    );

    res.setHeader("x-auth-token", token);
    res.setHeader("Access-Control-Expose-Headers", "x-auth-token");

    res.json({ msg: "Usuario logueado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userID } = req.params;

    const updateFields = {
      updateDate: new Date(),
      isAdmin: true,
    };

    const updatedUser = await User.updateOne(
      { _id: userID },
      { $set: updateFields }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const isDeleted = async (req, res) => {
  try {
    const { userID } = req.params;

    const updateFields = {
      isDeleted: new Date(),
    };

    const updatedUser = await User.findByIdAndUpdate(userID, updateFields, {
      new: true,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userID } = req.params;

    if (!userID) {
      return res.status(400).json({ error: "No hay parámetros de búsqueda" });
    }

    await Vote.deleteMany({ user: userID });

    const userDesigns = await Design.find({ author: userID });
    const designIDs = userDesigns.map((design) => design._id);

    await Vote.deleteMany({ design: { $in: designIDs } });

    await Design.deleteMany({ author: userID });

    const deletedUser = await User.findByIdAndDelete(userID);

    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ success: true, deletedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getOneUser,
  updateUser,
  isDeleted,
  deleteUser,
};
