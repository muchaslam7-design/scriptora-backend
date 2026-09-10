import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDB } from "../config/db.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Ensure content_history table exists
const initHistoryTable = async (db) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS content_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      prompt TEXT NOT NULL,
      generatedContent TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // Initialize Gemini Model
    const model = genAI.getGenerativeModel({ model:"gemini-1.5-flash-001" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedContent = response.text();

    const db = getDB();
    await initHistoryTable(db);

    const userId = req.user?.id || req.user || "guest";

    // Save history to SQLite
    const insertResult = await db.run(
      `INSERT INTO content_history (userId, prompt, generatedContent) VALUES (?, ?, ?)`,
      [userId, prompt, generatedContent]
    );

    const historyId = insertResult.lastID;
    const savedRecord = await db.get(`SELECT * FROM content_history WHERE id = ?`, [historyId]);

    res.status(200).json({
      success: true,
      prompt,
      generatedContent,
      historyId: savedRecord.id,
      createdAt: savedRecord.createdAt,
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ message: "Failed to generate content", error: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const db = getDB();
    await initHistoryTable(db);

    const userId = req.user?.id || req.user || "guest";
    const history = await db.all(
      `SELECT * FROM content_history WHERE userId = ? ORDER BY createdAt DESC`,
      [userId]
    );

    res.status(200).json({ success: true, count: history.length, history });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history", error: error.message });
  }
};