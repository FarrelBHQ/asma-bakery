// toggle class active
const navbarNav = document.querySelector(".navbar-nav");

// onClick menu
document.querySelector("#menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// disappear when clicking outside
const menu = document.querySelector("#menu");

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});
