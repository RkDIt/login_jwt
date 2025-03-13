const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const { verifyToken } = require("../middleware/authMiddleware");
const { getUser,getAllUsers,deleteUserControl,editUserControl } = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/user", verifyToken, getUser);
router.get("/admin", verifyToken, getAllUsers); // 🔒 Protected route
router.delete("/admin/user/:id",deleteUserControl)
router.patch("/admin/user/:id",editUserControl)

module.exports = router;
