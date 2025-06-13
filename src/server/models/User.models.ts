import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String },
    institution: { type: String },
    joinedGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudyGroup" }],
    createdAt: { type: Date, default: Date.now }
});

export const User = model("User", UserSchema);
