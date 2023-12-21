const form = document.querySelector("#myform");
const blogs = document.querySelector(".posts");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const description = document.querySelector("#description").value;
  createBlog(title, author, description);
  form.reset();
});

function createBlog(title, author, description) {
  const ele = document.createElement("p");
  ele.textContent = title;
  const button = document.createElement("button");
  button.textContent = "+";
  ele.append(button);
  button.addEventListener("click", () => {
    showMessage(title, author, description);
    ele.classList.add("hidden");
  });
  blogs.append(ele);
}

function showMessage(title, author, description) {
  const ele = document.createElement("div");
  ele.classList.add("display");
  ele.innerHTML = `
      <p>${title}</p>
      <button>-</button>
      <p>Author: ${author}</p>
      <p>${description}</p>
  `;
  blogs.append(ele);
  ele.addEventListener("click", (e) => {
    if (e.target.textContent === "-") {
      ele.classList.remove("hidden");
    }
  });
}
