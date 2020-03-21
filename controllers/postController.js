const db = require("../models");

module.exports = {
  // GET api/post/test
  // Test Route
  test: function(req, res) {
    res.send("Post Test Route");
  },
  // POST api/post
  // Create New Post
  create: async function(req, res) {
    const { postTitle, postContent, postTags } = req.body;

    try {
      // Format Tags
      const pattern = /#?\w+[-/]*\w*/gim;
      let matches = postTags.match(pattern);
      let tags = [];
      for (const match of matches) {
        tags.push(match);
      }

      // Create new post
      const post = new Post({
        postTitle,
        postContent,
        postTags: tags
      });

      // Save in DB
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error.");
    }
  },
  // GET api/post
  // Get All Posts
  getAll: async function(req, res) {
    try {
      const posts = await db.Post.find();
      res.json(posts);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error.");
    }
  },
  // DELETE api/post/:id
  // Delete Post by ID
  deleteById: async function(req, res) {
    try {
      const post = await db.Post.findById(req.params.id);

      // Check if post exists
      if (!post) {
        return res.status(404).json({
          msg: "Post Not Found"
        });
      }

      await post.remove();
      res.json({
        msg: "Post Deleted."
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error.");
    }
  },
  // ================================================ REMOVE AFTER DEVELOPMENT ========================================================
  // DELETE api/post
  // Delete All Posts
  deleteAllPosts: async function(req, res) {
    try {
      const posts = await db.Post.find();

      if (!posts.length) {
        return res.status(400).json({ msg: "No Posts Exist" });
      }

      posts.forEach(async post => {
        await post.remove();
      });

      res.json({ msg: "All Posts Deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error.");
    }
  }
};
