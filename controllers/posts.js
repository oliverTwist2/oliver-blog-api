const PostMessage = require("../models/postMessage")

exports.getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json({blogs: postMessage, count: postMessage.length})
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

exports.createPost = async (req, res) => {
    
    try {
    
    console.log(req.user._id)

      const newPost = await PostMessage.create({
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,
        tag: req.body.tag,
        author: req.user._id,
        readTime: calculatedReadTime(req.body.body),
      });

      await (await newPost.save()).populate("author");
      res.status(201).json(newPost);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
}


exports.getPost = async (req, res) => {
    const id = req.params.id;

    await PostMessage.findById(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: "Post with " + id + " not found" });
            } else {
                res.send(data);
        }
        })
        .catch((err) => {
            res.status(500).send({ messsage: "Error retrieving post with id " + id });
    })
}

exports.updatePost = async (req, res) => {
    const id = req.params.id;

    // get the post id
    const postExist = await PostMessage.findById(id)
      if (!postExist)
        return res
          .status(404)
          .json({ message: "post with such id does not exist" });

      if (postExist.author != req.user._id)
        return res.status(400).json({
          messae:
            "You can't perfom such operation because your not the owner of the post",
        });
    
    await PostMessage.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: `cannot update user with ${id}. Maybe user not found!` });
            } else {
                res.send(data);
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send({ message: "Error Updating Post information" })
        });
};


exports.deletePost = async (req, res) => {
    const id = req.params.id;

    // get the post id
    const postExist = await PostMessage.findById(id);
    if (!postExist)
      return res
        .status(404)
        .json({ message: "post with such id does not exist" });

    if (postExist.author != req.user._id)
      return res.status(400).json({
        messae:
          "You can't perfom such operation because your not the owner of the post",
      });

    await PostMessage.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: `cannot delete with id &{id}. maybe the id is wrong` });
            } else {
                res.send({
                    messae: "Post was deleted successfully."
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Post with id " + id
            });
        });
};

function calculatedReadTime(body) {
    const readtime = Math.round(body.split(" ").length / 200);
    const readingtime = readtime < 1 ? `${readtime + 1} mins read` : `${readtime} mins read`;
    return readingtime;
}