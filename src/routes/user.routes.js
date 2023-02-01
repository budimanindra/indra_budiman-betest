import express from "express";
import {
  createUser,
  getUsers,
  getUserByAccountNumber,
  getUserByIdentityNumber,
  updateUserByIdentityNumber,
  deleteUserByIdentityNumber
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post('/', createUser)
router.get('/', verifyToken, getUsers)
router.get('/account-number/:accountNumber', verifyToken, getUserByAccountNumber)
router.get('/identity-number/:identityNumber', verifyToken, getUserByIdentityNumber)
router.patch('/identity-number/:identityNumber', verifyToken, updateUserByIdentityNumber)
router.delete('/identity-number/:identityNumber', verifyToken, deleteUserByIdentityNumber)

export default router;