import mongoose, { Schema, model } from "mongoose";

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      require: false,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Video", videoSchema);
