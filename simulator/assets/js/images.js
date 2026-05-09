// CLICKABLE INPUT IMAGES
function initImageSelection() {
  const images = document.querySelectorAll(".input-img");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      // Remove active from all
      images.forEach((i) => i.classList.remove("active"));

      // Add active to clicked
      img.classList.add("active");

      // Update feature maps for selected image
      loadFeatureMaps();
    });
  });
}

function loadFeatureMaps() {
  const grid = document.getElementById("featureMapGrid");

  if (!grid) return;
  grid.innerHTML = ""; // clear grid

  const activeImage = document.querySelector(".input-img.active");

  if (!activeImage) return;

  const imageName = activeImage.src.split("/").pop().split(".")[0];
  const layer = document.getElementById("layerSelect").value; // current layer

  // GENERATE 10 FILTERS
  for (let i = 1; i <= 10; i++) {
    const card = document.createElement("div");
    card.className = "feature-map-card";

    // IMAGE
    const img = document.createElement("img");
    console.log(imageName, layer, i);
    img.src = `../simulator/assets/imgs/output_imgs/feature_maps/${imageName}/${layer}/filter${i}.png`;
    img.alt = `Filter ${i}`;

    // LABEL
    const label = document.createElement("div");
    label.className = "feature-map-label";
    label.textContent = `Filter ${i}`;

    // CLICKABLE
    card.addEventListener("click", () => {
      // remove active
      document
        .querySelectorAll(".feature-map-card")
        .forEach((c) => c.classList.remove("active"));

      // activate clicked
      card.classList.add("active");

      // update dropdown
      const filterSelect = document.getElementById("filterSelect");

      if (filterSelect) {
        filterSelect.value = `filter${i}`;
      }

      updateFilter(`filter${i}`);
    });

    card.appendChild(img);
    card.appendChild(label);
    grid.appendChild(card);
  } // for looP

  // Auto-select Filter 1
  const firstCard = document.querySelector(".feature-map-card");

  if (firstCard) {
    firstCard.classList.add("active");

    const filterSelect = document.getElementById("filterSelect");

    if (filterSelect) {
      filterSelect.value = "filter1";
    }

    updateFilter("filter1");
  }
}
