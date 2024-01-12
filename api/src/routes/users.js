const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const userController = require("../controllers/users");
const { Router } = require("express");

const router = Router();

router.post("/login", userController.login);

router.post("/register", userController.register);

// anadir auth, admin
router.get("/", userController.getAllUsers);

// anadir auth, admin
router.get("/:userID", userController.getOneUser);

// anadir auth, admin
router.put("/delete/:userID", userController.isDeleted);

// anadir auth, admin
router.put("/:userID", userController.updateUser);

// anadir auth, admin
router.delete("/:userID", userController.deleteUser);

module.exports = router;
