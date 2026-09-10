import mongoose from "mongoose";

const contentHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    prompt: { type: String, required: true },
    generatedContent: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ContentHistory", contentHistorySchema);