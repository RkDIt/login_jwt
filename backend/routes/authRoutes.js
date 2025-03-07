const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const { verifyToken } = require("../middleware/authMiddleware");
const { getUsers } = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/users", verifyToken, getUsers); // 🔒 Protected route

module.exports = router;
