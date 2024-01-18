import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'

const ProjectSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String 
    }
}, {
    timestamps: true,
    _id: false
});

export default mongoose.model('Project', ProjectSchema)