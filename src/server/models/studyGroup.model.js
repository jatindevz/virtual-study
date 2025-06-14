import  { Schema, model, models } from 'mongoose'

const studyGroupSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
    },
    tags: {
        type: [String],
        default: [],
    },
    rules: {
        type: String,
        default: '',
    },
    isPrivate: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// Avoid redefining model during hot reloads in dev
export const StudyGroup = models.StudyGroup || model('StudyGroup', studyGroupSchema)
