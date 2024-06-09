const about = document.querySelector('a[href="#qui"]');
const menuTel = document.querySelector(".menu-tel");

about.addEventListener("click", () => {
  menuTel.checked = false;
  console.log(menuTel);
  console.log(menuTel.checked);
});

const threshold = 0.1;
const options = {
  root: null,
  rootMargin: "0px",
  threshold,
};

const handleIntersect = function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > threshold) {
      entry.target.classList.remove("reveal");
      observer.unobserve(entry.target);
    }
  });
};

document.documentElement.classList.add("reveal-loaded");

window.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(handleIntersect, options);
  const targets = document.querySelectorAll(".reveal");
  targets.forEach(function (target) {
    observer.observe(target);
  });
});
