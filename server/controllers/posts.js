import mongoose from "mongoose";
import post from "../models/post.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await post.find();
    res.json(posts);
  } catch (error) {
    res.sendStatus(404).json({ message: error.message });
  }
  next();
};

export const createPost = async (req, res, next) => {
  const body = req.body;
  const newPost = new post(body);
  try {
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.sendStatus(409).json({ message: error.message });
  }
  next();
};

export const updatePost = async (req, res, next) => {
  const { id: _id } = req.params;
  const reqBody = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.sendStatus(404).send("No post with that id");
  }

  const updatedPost = await post.findByIdAndUpdate(
    _id,
    { ...reqBody, _id },
    { new: true }
  );
  res.json(updatedPost);
  next();
};

export const deletePost = async (req, res, next) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.sendStatus(404).send("No post with that id");
  }

  await post.findByIdAndDelete(_id);
  res.send("Post deleted successfully");
  next();
};

export const likePost = async (req, res, next) => {
  const { id: _id } = req.params;

  // if (!req.userId) {
  //   return res.json({ message: "Unauthenticated" });
  // }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.sendStatus(404).send("No post with that id");
  }

  const postData = await post.findById(_id);

  // const index = postData.likes.findIndex((id) => id === String(req.userId));

  // if (index === -1) {
  //   postData.likes.push(userId);
  // } else {
  //   postData.likes = postData.likes.filter((id) => id !== String(req.userId));
  // }

  const updatedPost = await post.findByIdAndUpdate(
    _id,
    { likeCount: postData.likeCount + 1 },
    {
      new: true,
    }
  );

  res.json(updatedPost);

  next();
};
