import express from "express";
import { registerUsers, loginUsers } from "../controllers/authController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";
import {
  getUser,
  getAllUsers,
  deleteUserControl,
  editUserControl,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUsers);
router.post("/login", loginUsers);

router.get("/user", verifyToken, getUser);

router.get(
  "/admin",
  verifyToken,
  authorizeRole(["admin", "subadmin"]),
  getAllUsers
); // 🔒 Protected route
router.delete(
  "/admin/user/:id",
  verifyToken,
  authorizeRole(["admin", "subadmin"]),
  deleteUserControl
);
router.patch(
  "/admin/user/:id",
  verifyToken,
  authorizeRole(["admin", "subadmin"]),
  editUserControl
);

export default router;
