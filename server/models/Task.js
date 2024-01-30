import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'


const taskSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    projectId:{
        type: String,
        required: true
    },
    comments: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        enum: ['PENDING', 'IN_PROCESS', 'COMPLETED' ],
        default: 'PENDING',
    },
    isRemove: {
        type: Boolean,
        default: false
    }, 
    deletedAt: {
        type: Number,
        default: ''
    },
}, {
    timestamps: true,
    _id: false,
    versionKey: false,
});

export default mongoose.model('Task', taskSchema);