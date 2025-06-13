import mongoose, { Schema, model } from "mongoose";

const GroupMemberSchema = new Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "StudyGroup", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, default: "member" },
    joinedAt: { type: Date, default: Date.now }
});

export const GroupMember = model("GroupMember", GroupMemberSchema);
