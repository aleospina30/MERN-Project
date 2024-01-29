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
    
    projectId:{
        type: String,
        required: true
    },
    comments: {
        type: Array,
        default: []
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