let barTop = document.querySelector(".bar-top");
let barBottom = document.querySelector(".bar-bottom");
let button = document.querySelector(".button");
let imgWrapper = document.querySelector(".img-wrapper");

// let img = document.createElement('img');
// img.className = 'pic';

function barsOpenToggle() {
  barTop.classList.add("up");
  barBottom.classList.add("down");
  // barTop.classList.remove("top-closed");
  // barBottom.classList.remove("bottom-closed");
}

function barsClosedToggle() {
  barTop.classList.remove("up");
  barBottom.classList.remove("down");
  // barTop.classList.add("top-closed");
  // barBottom.classList.add("bottom-closed");
}

button.addEventListener("click", function () {
  fetchRandomImage();
});

async function fetchRandomImage() {
  const url = `https://picsum.photos/4000/4000?sig=${Math.random()}`;

  const img = document.createElement("img");

  if (
    !barTop.classList.contains("up") &&
    !barBottom.classList.contains("down")
) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      // Create an img element and set its source to the imageUrl

      img.src = imageUrl;
      img.alt = "Random Image";
      img.style.width = "100%";
      img.className = "image";
      imgWrapper.appendChild(img);

      if (barTop.style.transform = "translateY(-100%)") {
        img.onload = barsOpenToggle();
      }
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  } else {
    barsClosedToggle();
    fetchRandomImage();
    // imgWrapper.removeChild(".image");
    // imgWrapper.replaceChild(img);
  }

  // Append the image to the body or any other container
  // document.body.appendChild(img);

  if (imgWrapper.childElementCount >= 2) {
    imgWrapper.firstChild.remove();
  }

  // imgWrapper.firstChild.remove();
}

// Call the function to fetch and display the random image
