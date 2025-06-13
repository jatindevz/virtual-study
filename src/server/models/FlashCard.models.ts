import mongoose, { Schema, model } from "mongoose";

const FlashcardSchema = new Schema({
    setId: { type: mongoose.Schema.Types.ObjectId, ref: "FlashcardSet", required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

export const Flashcard = model("Flashcard", FlashcardSchema);
