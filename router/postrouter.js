const express = require("express");
const obj = require("../controller/postcontroller");
const postRouter = express.Router();

postRouter.post("/blogs", obj.postBlogData);

postRouter.get("/blogs", obj.getBlogData);
module.exports = postRouter;
