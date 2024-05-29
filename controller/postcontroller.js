const obj = require("../models/postsmodel");
let id;
function postBlogData(req, res) {
  const data = req.body;
  obj.Post.create({
    title: data.title,
    author: data.author,
    description: data.description,
  })
    .then((createdPost) => {
      res.json(createdPost.dataValues);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

async function storeComment(req, res) {
  const postId = req.params.id;
  const data = req.body;
  try {
    const commentResult = await obj.Comments.create({
      content: data.comment,
      postId: postId,
    });
    res.json(commentResult.dataValues);
  } catch (err) {
    console.log(err);
  }
}

function getBlogData(req, res) {
  obj.Post.findAll()
    .then((posts) => {
      const postArray = posts.map((post) => post.dataValues);
      res.json(postArray);
    })
    .catch((err) => res.json("error"));
}

async function getComments(req, res) {
  const id = req.params.id;
  try {
    const comments = await obj.Comments.findAll({
      where: {
        postId: id,
      },
    });
    const finalComments = comments.map((element) => element.dataValues);
    res.json(finalComments);
  } catch (err) {
    res.json("error");
  }
}

async function deleteComment(req, res) {
  const postId = req.params.postId;
  const id = req.params.id;
  try {
    const deletedComment = await obj.Comments.destroy({
      where: {
        postId: postId,
        id: id,
      },
    });
    res.json("comment successfully deleted");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  postBlogData,
  storeComment,
  getBlogData,
  getComments,
  deleteComment,
};
