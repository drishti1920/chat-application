import express from "express";
import {logOut, loginUser, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signup);
router.get('/logout',logOut)

export default router;
