let barTop = document.querySelector(".bar-top")
let barBottom = document.querySelector(".bar-bottom");
let button = document.querySelector(".button");
let imgWrapper = document.querySelector(".img-wrapper");

const downloadLink = document.querySelector('.download-link');
const loadingImage = document.querySelector(".loader");

function barsOpenToggle() {
  barTop.classList.add("up");
  barBottom.classList.add("down");
}

function barsClosedToggle() {
  barTop.classList.remove("up");
  barBottom.classList.remove("down");
  downloadLink.classList.remove('show-link');
}


button.addEventListener("click", function () {
  fetchRandomImage();
});

// async function fetchRandomImage() {
//   const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=TDRKWxcci6VXt53Z5NocxnQTtTg6N2fsiSZOR8dQ`;

//   const img = document.createElement("img");

//   if (
//     !barTop.classList.contains("up") &&
//     !barBottom.classList.contains("down")
//   ) {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const blob = await response.blob();
//       const imageUrl = URL.createObjectURL(blob);

//       // Create an img element and set its source to the imageUrl

//       img.src = imageUrl;
//       img.alt = "Random Image";
//       img.style.width = "100%";
//       img.className = "image";
//       imgWrapper.appendChild(img);
//       img.onload = barsOpenToggle();
//     } catch (error) {
//       console.error("Error fetching the image:", error);
//     }
//   } else {
//     barsClosedToggle();
//     fetchRandomImage();
//   }

//   // Append the image to the body or any other container
//   // document.body.appendChild(img);

//   if (imgWrapper.childElementCount >= 2) {
//     imgWrapper.firstChild.remove();
//   }
// }

const fetchRandomImage = async () => {
  
  function showLoader () {
  loadingImage.classList.add("show-loader");
  }

  setTimeout(showLoader,300)

  if (
    !barTop.classList.contains("up") &&
    !barBottom.classList.contains("down")
  ) {
  try {
  const config = { headers: { Accept: "application/json" } };
  const response = await axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=TDRKWxcci6VXt53Z5NocxnQTtTg6N2fsiSZOR8dQ", config);
  const data = response.data;
  console.log(response.data);
  // console.dir(data.photos);

  const img = document.createElement('img');
  imgWrapper.append(img);

  // function showImageOnLoad() {
  //   if (img.loadingImage = '100%') {
  //     barsOpenToggle();
  //   }
  // }

  img.onload = setTimeout(barsOpenToggle, 300);

  // showImageOnLoad()
    img.src = data.photos[Math.floor(Math.random() * data.photos.length)].img_src;
    img.onload = 
    setTimeout (function () {
      loadingImage.classList.remove('show-loader');
    },450);

    downloadLink.href = img.src;
    function showLink () {
      downloadLink.classList.add('show-link');
    }

    setTimeout(showLink,0);

   console.log(img)
  } catch (error) {
    console.error("ERROR", error);
  }
} else {
  barsClosedToggle();
  fetchRandomImage();
}
if (imgWrapper.childElementCount >= 2) {
  imgWrapper.firstChild.remove();
}
}


