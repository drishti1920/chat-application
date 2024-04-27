import express from "express";
const router = express.Router();
import { getusersForSideBar } from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";

router.get("/", protectRoute, getusersForSideBar);

export default router;
