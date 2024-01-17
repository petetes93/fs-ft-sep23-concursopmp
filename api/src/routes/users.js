const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const userController = require("../controllers/users");
const { Router } = require("express");

const router = Router();

router.post("/login", userController.login);

router.post("/register", userController.register);

// Añadir auth, admin
router.get("/", userController.getAllUsers);

// Añadir auth, admin
router.get("/:userID", userController.getOneUser);

// Añadir auth, admin
router.put("/delete/:userID", userController.isDeleted);

// Añadir auth, admin
router.put("/:userID", auth, admin, userController.updateUser);

// Añadir auth, admin
router.delete("/:userID", userController.deleteUser);

module.exports = router;
