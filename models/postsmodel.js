const sequelize = require("../util/database");
const Sequelize = require("sequelize");
const Post = sequelize.define("posts", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    notNull: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    notNull: true,
  },
  author: {
    type: Sequelize.STRING,
    notNull: true,
  },
  description: {
    type: Sequelize.STRING,
    notNull: true,
  },
});

const Comments = sequelize.define("comments", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    notNull: true,
    primaryKey: true,
  },
  content: {
    type: Sequelize.STRING,
    notNull: true,
  },
  postId: {
    type: Sequelize.INTEGER,
    references: {
      model: Post,
      key: "id",
    },
  },
});

module.exports = {
  Post,
  Comments,
};
