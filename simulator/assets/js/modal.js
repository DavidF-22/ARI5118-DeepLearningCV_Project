// HELP CARD
function initHelpModal() {
  const helpBtn = document.querySelector('[title="Help"]'); // your button
  const modal = document.getElementById("helpModal");
  const closeBtn = document.getElementById("closeHelp");

  if (!helpBtn || !modal || !closeBtn) return;

  // Open modal card
  helpBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Close via X
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}
