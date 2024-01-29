import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
    },
    docIdentity: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isRemove: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Number
    }
  },
  {
    timestamps: true,
    _id: false,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
