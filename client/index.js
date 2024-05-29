const form = document.querySelector("#myform");
const posts = document.querySelector(".posts");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let obj = {
    title: document.querySelector("#title").value,
    author: document.querySelector("#author").value,
    description: document.querySelector("#description").value,
  };
  try {
    const result = await axios.post("http://localhost:3000/blogs", obj);
    creatPost(result.data);
    form.reset();
  } catch (err) {
    console.log(err);
  }
});

function creatPost(obj) {
  const postTitle = document.createElement("div");
  postTitle.textContent = obj.title;
  const showbtn = document.createElement("button");
  showbtn.textContent = "+";
  postTitle.append(showbtn);
  showbtn.addEventListener("click", () => {
    showDetails(obj);
    postTitle.classList.add("hidden");
  });
  posts.append(postTitle);
}

function showDetails(obj) {
  const postData = document.createElement("div");
  const postTitle = document.createElement("div");
  postTitle.textContent = obj.title;
  const hidebtn = document.createElement("button");
  hidebtn.textContent = "-";
  postTitle.append(hidebtn);
  postData.append(postTitle);
  const postAuthor = document.createElement("div");
  postAuthor.textContent = "Author: " + obj.author;
  postData.append(postAuthor);
  const postContent = document.createElement("div");
  postContent.textContent = obj.description;
  postData.append(postContent);
  const comment = document.createElement("div");
  comment.textContent = "Comments:";
  postData.append(comment);
  createComments(obj, postData);
  hidebtn.addEventListener("click", () => {
    postData.classList.add("hidden");
    creatPost(obj);
  });
  posts.append(postData);
}

function createComments(obj, postData) {
  const sendComment = document.createElement("div");
  sendComment.innerHTML = `
  <form action="" method="POST" class="cform">
    <input type="text" name="comment" class="comment">
    <button class="commentButton" type="submit">Send</button>
  </form>
  <div class="comments-container"></div>
`;
  postData.append(sendComment);
  const commentForm = sendComment.querySelector(".cform");
  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const comment = commentForm.querySelector(".comment").value;
    try {
      const commentResult = await axios.post(
        `http://localhost:3000/comments/${obj.id}`,
        {
          comment,
        }
      );
      const createdComment = commentResult.data;
      createCommentUi(
        createdComment,
        sendComment.querySelector(".comments-container")
      );
      commentForm.reset();
    } catch (err) {
      console.log(err);
    }
  });
  fetchComments(sendComment.querySelector(".comments-container"), obj);
}

function createCommentUi(createdComment, commentsContainer) {
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  li.textContent = createdComment.content;
  const delbtn = document.createElement("button");
  delbtn.textContent = "Delete";
  li.append(delbtn);
  delbtn.addEventListener("click", async () => {
    try {
      const deletedComment = await axios.delete(
        `http://localhost:3000/comments/${createdComment.postId}/${createdComment.id}`
      );
      console.log(deletedComment.data);
    } catch (err) {
      console.log(err);
    }
    delbtn.parentElement.remove();
  });
  ul.append(li);
  commentsContainer.append(ul);
}

async function fetchComments(commentsContainer, obj) {
  try {
    const comments = await axios.get(
      `http://localhost:3000/comments/${obj.id}`
    );
    comments.data.forEach((result) => {
      createCommentUi(result, commentsContainer);
    });
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("load", () => {
  axios
    .get("http://localhost:3000/blogs")
    .then((res) => {
      const obj = res.data;
      obj.forEach((element) => {
        creatPost(element);
      });
    })
    .catch((err) => console.log(err));
});
