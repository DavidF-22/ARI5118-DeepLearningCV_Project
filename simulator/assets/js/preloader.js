function initPreloader() {
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.3s ease";

    setTimeout(() => {
      preloader.style.display = "none";
    }, 300);
  });
}
