import mongoose, { Schema, model } from "mongoose";

const VideoRoomSchema = new Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "StudyGroup", required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    roomId: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    startedAt: { type: Date, default: Date.now }
});

export const VideoRoom = model("VideoRoom", VideoRoomSchema);
