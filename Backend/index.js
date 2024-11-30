const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/blogging-platform", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define the Post schema and model
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", PostSchema);

// Routes
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts", error: err.message });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: "Invalid post ID", error: err.message });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: "Failed to create post", error: err.message });
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensures schema validation during update
    });
    if (!updatedPost) return res.status(404).json({ message: "Post not found" });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: "Failed to update post", error: err.message });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  console.log("DELETE request received for ID:", id);

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      console.log("Post not found for ID:", id);
      return res.status(404).json({ message: "Post not found" });
    }
    console.log("Post deleted:", deletedPost);
    res.json({ message: "Post deleted successfully", post: deletedPost });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(400).json({ message: "Failed to delete post", error: err.message });
  }
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
