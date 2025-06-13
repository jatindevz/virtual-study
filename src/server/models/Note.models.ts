import mongoose, { Schema, model } from "mongoose";

const NoteSchema = new Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "StudyGroup", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Note = model("Note", NoteSchema);
