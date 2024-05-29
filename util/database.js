const Sequelize = require("sequelize");

const sequelize = new Sequelize("create-blogs", "root", "Nikhil64@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
