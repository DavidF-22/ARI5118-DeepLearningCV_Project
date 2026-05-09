function initPreloader() {
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    // Fade out first, then remove the preloader from the layout
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.3s ease";

    setTimeout(() => {
      preloader.style.display = "none";
    }, 300);
  });
}
