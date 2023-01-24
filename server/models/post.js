import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: String,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const post = mongoose.model("PostModel", postSchema);
export default post;
