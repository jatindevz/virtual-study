import mongoose, { Schema, model } from "mongoose";

const FlashcardSetSchema = new Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "StudyGroup", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const FlashcardSet = model("FlashcardSet", FlashcardSetSchema);
