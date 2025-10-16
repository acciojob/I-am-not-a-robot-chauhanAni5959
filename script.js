const imgClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
const container = document.getElementById("image-container");
const hMessage = document.getElementById("h");
const para = document.getElementById("para");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");

// Generates/shuffles images
function setupImages() {
  container.innerHTML = "";
  para.innerText = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  hMessage.innerText =
    "Please click on the identical tiles to verify that you are not a robot.";

  // Duplicate logic
  const duplicateIdx = Math.floor(Math.random() * imgClasses.length);
  const imgArray = [...imgClasses, imgClasses[duplicateIdx]];

  // Shuffle Fisher-Yates
  for (let i = imgArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imgArray[i], imgArray[j]] = [imgArray[j], imgArray[i]];
  }

  imgArray.forEach((cls, i) => {
    const img = document.createElement("img");
    img.className = cls;
    img.dataset.index = i;
    img.style.cursor = "pointer";
    container.appendChild(img);
  });
}

setupImages();

let selectedTiles = [];

container.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const img = e.target;

    // Already selected or max reached
    if (
      selectedTiles.includes(img) ||
      selectedTiles.length === 2
    )
      return;

    img.classList.add("selected");
    selectedTiles.push(img);

    resetBtn.style.display = "inline-block";

    // Show verify button only after 2 distinct tiles
    if (selectedTiles.length === 2) {
      // Prevent double-clicking same tile (same DOM node, not just same image)
      if (selectedTiles[0] === selectedTiles[1]) {
        verifyBtn.style.display = "none";
      } else {
        verifyBtn.style.display = "inline-block";
      }
    } else {
      verifyBtn.style.display = "none";
    }
  }
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";
  if (
    selectedTiles.length === 2 &&
    selectedTiles[0].className === selectedTiles[1].className &&
    selectedTiles[0] !== selectedTiles[1]
  ) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

resetBtn.addEventListener("click", () => {
  selectedTiles.forEach((img) => img.classList.remove("selected"));
  selectedTiles = [];
  setupImages();
});
