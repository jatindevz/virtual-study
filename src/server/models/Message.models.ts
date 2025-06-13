import mongoose, { Schema, model } from "mongoose";

const MessageSchema = new Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "StudyGroup", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ["user", "system"], default: "user" },
    sentAt: { type: Date, default: Date.now }
});

export const Message = model("Message", MessageSchema);
