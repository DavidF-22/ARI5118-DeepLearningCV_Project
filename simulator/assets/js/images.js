// CLICKABLE INPUT IMAGES
function initImageSelection() {
  const images = document.querySelectorAll(".input-img");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      // if already active, deselect and return
      if (img.classList.contains("active")) {
        img.classList.remove("active");
        return;
      }

      // Remove active from all
      images.forEach((i) => i.classList.remove("active"));

      // Add active to clicked
      img.classList.add("active");
    });
  });
}