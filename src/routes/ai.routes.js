import express from "express";
import { generateContent, getHistory } from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
console.log("MY GEMINI KEY IS:", process.env.GEMINI_API_KEY);
router.post("/generate", protect, generateContent);
router.get("/history", protect, getHistory);

export default router;