import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ProjectSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: ''
    },
    isRemove: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Number,
      default: null
    },
  },
  {
    timestamps: true,
    _id: false,
    versionKey: false,
  }
);

export default mongoose.model("Project", ProjectSchema);
