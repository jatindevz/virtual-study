import mongoose, { Schema, model } from "mongoose";

const StudyGroupSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    isPrivate: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});

export const StudyGroup = model("StudyGroup", StudyGroupSchema);
