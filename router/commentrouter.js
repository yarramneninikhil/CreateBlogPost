const express = require("express");

const commentRouter = express.Router();
const obj = require("../controller/postcontroller");

commentRouter.post("/comments/:id", obj.storeComment);

commentRouter.get("/comments/:id", obj.getComments);

commentRouter.delete("/comments/:postId/:id", obj.deleteComment);
module.exports = commentRouter;
