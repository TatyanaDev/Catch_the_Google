const toggleButton = document.querySelector(".toggle");

function toggleSound() {
  toggleButton.classList.toggle("on");
}

document.addEventListener("DOMContentLoaded", () => {
  toggleButton.addEventListener("click", toggleSound);
});
