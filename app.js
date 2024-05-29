const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const postRouter = require("./router/postrouter");
const commentRouter = require("./router/commentrouter");
const sequelize = require("./util/database");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(postRouter);
app.use(commentRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server is listening on port 3000`);
    });
  })
  .catch((err) => console.log(err));
