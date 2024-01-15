const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const userController = require("../controllers/users");
const { Router } = require("express");

const router = Router();

router.post("/login", userController.login);

router.post("/register", userController.register);

router.get("/", auth, admin, userController.getAllUsers);

router.get("/:userID", auth, admin, userController.getOneUser);

router.put("/delete/:userID", auth, admin, userController.isDeleted);

router.put("/:userID", auth, admin, userController.updateUser);

router.delete("/:userID", auth, admin, userController.deleteUser);

module.exports = router;
