import  { Schema, model, models } from 'mongoose'

const groupMemberSchema = new Schema({
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'StudyGroup',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'member', 'moderator'],
        default: 'member',
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
})

// Avoid redefining model during dev hot reload
export const GroupMember = models.GroupMember || model('GroupMember', groupMemberSchema)
