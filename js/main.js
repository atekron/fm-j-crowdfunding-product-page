const data = {
  goal: 100000,
  info: [
    { param: 89914, description: "of $100,000 backed" },
    { param: 5007, description: "total backers" },
    { param: 56, description: "days left" },
  ],
  pledges: [
    {
      title: "Bamboo Stand",
      price: "25",
      description:
        "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list.",
      quantity: 101,
    },
    {
      title: "Black Edition Stand",
      price: "75",
      description:
        "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
      quantity: 64,
    },
    {
      title: "Mahogany Special Edition",
      price: "200",
      description:
        "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
      quantity: 0,
    },
  ],
};

const content = document.querySelector(".content");
const info = document.querySelector(".info__entries");

const hamburger = document.querySelector(".main-nav__hamburger");
const hamburgerClose = document.querySelector(".main-nav__hamburger-close");
const hamburgerMenu = document.querySelector(".main-nav__hamburger-menu");

//handling mobile menu
hamburger.addEventListener("click", () => {
  if (hamburgerMenu.style.display !== "none") {
    hamburgerClose.style.display = "inline-block";
    hamburgerMenu.style.display = "none";
  } else {
    hamburgerClose.style.display = "none";
    hamburgerMenu.style.display = "inline-block";
  }
});

//rendering page
function templateContent(title, price, description, quantity) {
  let disabledElement = quantity === 0 ? "disabled-element" : "";
  return `
  <h3 class="${disabledElement}">
    ${title}
    <span>Pledge $${price} or more</span>
  </h3>
  <p class="${disabledElement}">${description}</p>
  <div>
    <h4 class="${disabledElement}">${quantity} <span>left</span></h4>
    <button class="${disabledElement}">${
    !disabledElement ? "Select Reward" : "Out of Stock"
  }</button>
  </div>
  `;
}

function templateInfo(param, description) {
  return `
  <h3 class="info__parameter">${param}</h3>
  <p class="info__description">${description}</p>
  `;
}

function templateProgress(max, value) {
  return `
	  <span class="info__progress-value" style="width:${
      (value / max) * 100
    }%"></span>
  `;
}

data.pledges.forEach((entry) => {
  let article = document.createElement("article");
  article.classList.add("content__pledge");
  article.innerHTML = templateContent(
    entry.title,
    entry.price,
    entry.description,
    entry.quantity
  );
  content.appendChild(article);
});

data.info.forEach((entry) => {
  let div = document.createElement("div");
  div.innerHTML = templateInfo(entry.param.toLocaleString(), entry.description);
  info.appendChild(div);
});

let progress = document.createElement("div");
progress.classList.add("info__progress");
progress.innerHTML = templateProgress(data.goal, data.info[0].param);
info.appendChild(progress);
