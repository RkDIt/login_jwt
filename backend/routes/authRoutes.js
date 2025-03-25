import express from "express";
import { registerUsers, loginUsers } from "../controllers/authController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";
import {
  getUser,
  getAllUsers,
  deleteUserControl,
  editUserControl,
} from "../controllers/userController.js";
import { API } from "../utils/allApis.js";


const router = express.Router();

router.post(API.AUTH_REGISTER, registerUsers);
router.post(API.AUTH_LOGIN, loginUsers);

router.get(API.AUTH_USER, verifyToken, getUser);

router.get(
  API.AUTH_ADMIN,
  verifyToken,
  authorizeRole(["admin", "subadmin"]),
  getAllUsers
); // 🔒 Protected route
router.delete(
  API.AUTH_ADMIN_INDI_USER,
  verifyToken,
  authorizeRole(["admin", "subadmin"]),
  deleteUserControl
);
router.patch(
  API.AUTH_ADMIN_INDI_USER,
  verifyToken,
  authorizeRole(["admin", "subadmin"]),
  editUserControl
);

export default router;
