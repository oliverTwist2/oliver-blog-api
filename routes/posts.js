const express = require("express");
const { getPosts, createPost, getPost, updatePost, deletePost } = require("../controllers/posts")
const veryAuth = require("../utils/verifyauth")

const router = express.Router();

router.get("/", getPosts);
router.post("/", veryAuth, createPost);
router.get("/:id", getPost);
router.put("/:id/", veryAuth, updatePost);
router.delete("/:id", veryAuth, deletePost);


module.exports = router;