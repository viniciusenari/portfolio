/* Open and close lateral menu when accessing from a mobile device */

const menuMobile = document.querySelector(".menu-mobile");
const body = document.querySelector("body");

menuMobile.addEventListener("click", () => {
  menuMobile.classList.contains("bi-list")
    ? menuMobile.classList.replace("bi-list", "bi-x")
    : menuMobile.classList.replace("bi-x", "bi-list");
  body.classList.toggle("menu-nav-active");
});

/* Open and close lateral menu when clicking on a navigation button */

const navItem = document.querySelectorAll(".nav-item");

navItem.forEach((item) => {
  item.addEventListener("click", () => {
    if (body.classList.contains("menu-nav-active")) {
      body.classList.remove("menu-nav-active");
      menuMobile.classList.replace("bi-x", "bi-list");
    }
  });
});

/* Animate items that have the attribute data-anime */

const item = document.querySelectorAll("[data-anime]");

const animeScroll = () => {
  const windowTop = window.pageYOffset + window.innerHeight * 0.85;

  item.forEach((element) => {
    if (windowTop > element.offsetTop) {
      element.classList.add("animate");
    } else {
      element.classList.remove("animate");
    }
  });
};

window.addEventListener("scroll", () => {
  animeScroll();
});

/* Activate loading button */

const btnSend = document.querySelector("#btn-send");
const btnSendLoader = document.querySelector("#btn-send-loader");

btnSend.addEventListener("click", () => {
  btnSendLoader.style.display = "block";
  btnSend.style.display = "none";
});

/* Remove message after 5 seconds */
setTimeout(() => {
  document.querySelector("#alert").style.display = "none";
}, 5000);
