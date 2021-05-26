const data = {
  bookmarked: false,
  goal: 100000,
  info: [
    { param: 89914, description: "of $100,000 backed" },
    { param: 5007, description: "total backers" },
    { param: 56, description: "days left" },
  ],
  pledges: [
    {
      id: "tier-1",
      title: "Bamboo Stand",
      price: "25",
      description:
        "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list.",
      quantity: 101,
    },
    {
      id: "tier-2",
      title: "Black Edition Stand",
      price: "75",
      description:
        "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
      quantity: 64,
    },
    {
      id: "tier-3",
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
const modalBg = document.querySelector(".container__modal-bg");
const navLinks = document.querySelector(".main-nav__links");
const modalSelection = document.querySelector(".selection-modal");
const modalSuccess = document.querySelector(".success-modal");
const bookmarkBtn = document.querySelector(".header__bookmark");

function bookmark() {
  bookmarkBtn.classList.toggle("bookmarked");
  data.bookmarked = !data.bookmarked;
}

//handling mobile menu
hamburger.addEventListener("click", () => {
  if (hamburgerMenu.style.display !== "none") {
    hamburgerClose.style.display = "inline-block";
    hamburgerMenu.style.display = "none";
    modalBg.style.display = "block";
    navLinks.style.display = "flex";
  } else {
    hamburgerClose.style.display = "none";
    hamburgerMenu.style.display = "inline-block";
    modalBg.style.display = "none";
    navLinks.style.display = "none";
  }
});

//open and close modal
function showModal(id) {
  modalSelection.style.display = "flex";
  modalBg.style.display = "block";
  console.log(id);
  document.getElementById(id).checked = true;
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

function closeModal() {
  modalSelection.style.display = "none";
  modalBg.style.display = "none";
  modalSuccess.style.display = "none";
}

function contribute() {
  modalSelection.style.display = "none";
  modalSuccess.style.display = "flex";
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

//rendering page
function templateContent(title, price, description, quantity, id) {
  let disabledElement = quantity === 0 ? "disabled-element" : "";
  return `
  <h3 class="${disabledElement}">
    ${title}
    <span>Pledge $${price} or more</span>
  </h3>
  <p class="${disabledElement}">${description}</p>
  <div>
    <h4 class="${disabledElement}">${quantity} <span>left</span></h4>
    <button
      onclick="showModal('${id}')"
      class="${disabledElement}-btn"
    >
      ${!disabledElement ? "Select Reward" : "Out of Stock"}
    </button>
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
    entry.quantity,
    entry.id
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

window.addEventListener("resize", () => {
  if (window.innerWidth < 960) {
    hamburgerClose.style.display = "none";
    hamburgerMenu.style.display = "inline-block";
    modalBg.style.display = "none";
    navLinks.style.display = "none";
    modalSelection.style.display = "none";
    modalSuccess.style.display = "none";
  } else {
    hamburgerClose.style.display = "none";
    hamburgerMenu.style.display = "none";
    modalBg.style.display = "none";
    navLinks.style.display = "inline";
    modalSelection.style.display = "none";
    modalSuccess.style.display = "none";
  }
});
