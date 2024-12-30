async function loadImages(imagesrc) {
  try {
    const response = await fetch(
      `https://neon-1fg8.onrender.com/load-images?url=${imagesrc}` //http://localhost:3000
    );
    const imageData = await response.blob();
    const imageURL = URL.createObjectURL(imageData);
    return imageURL;
  } catch (error) {
    console.error("Error loading image:", error);
    return null;
  }
}

// Function to read text file seprately
async function readTextFile(offset, limit) {
  const response = await fetch("excuseapi.txt"); // Fetch the text file
  const text = await response.text(); // Read the file content as text
  const imageLinks = text.split("\n").filter((link) => link.trim() !== "");
  const paginatedLinks = imageLinks.slice(offset, offset + limit);
  return paginatedLinks;
}

// Function to load image boxes
async function loadImageLinks(offset = 0, limit = 10) {
  try {
    const imageLinks = await readTextFile(offset, limit);
    const gallery = document.getElementById("gallery"); // Get the gallery div
    // Iterate over each image link and create an img element
    imageLinks.forEach((link) => {
      const div = document.createElement("div"); //main div used as holder of each image
      div.id = link.trim();
      div.classList.add("relative", "group", "overflow-hidden");
      //download icon img
      const img1 = document.createElement("img");
      img1.classList.add("relative", "group", "overflow-hidden", "w-10");
      img1.src = "../Media/downloadicon.png";
      //download icon img
      //download link
      const downloadlink = document.createElement("a");
      downloadlink.id = "downloadlink";
      // Add click event listener to load image URL only when clicked
      downloadlink.addEventListener("click", async (e) => {
        e.preventDefault(); // Prevent default click behavior

        try {
          // Only fetch image URL if not already loaded
          if (!downloadlink.href) {
            const imageURL = await loadImages(link.trim());
            if (imageURL) {
              const tempLink = document.createElement("a");
              tempLink.href = imageURL;
              tempLink.download = ""; // Forces download
              document.body.appendChild(tempLink);
              tempLink.click(); // Programmatically trigger the download
              document.body.removeChild(tempLink); // Cleanup
            } else {
              console.error("No imageURL generated");
            }
          }
        } catch (err) {
          console.error("Error in download process:", err);
        }
      });
      //download link
      //link tag reddit
      const redditlink = document.createElement("a");
      redditlink.href = link.trim();
      //link tag reddit
      //link img
      const img2 = document.createElement("img");
      img2.classList.add("relative", "group", "overflow-hidden", "w-10");
      img2.src = "../Media/linkicon.png";
      //link img

      const img = document.createElement("img"); // Create an img tag
      img.id = "imageid"; //using image src as image id
      img.src = link.trim(); // Set the src to the image link
      img.alt = "yourwallpaper";
      img.classList.add(
        "brightness-100",
        "transition", // Smooth transition for hover effect
        "duration-500", // Duration of the transition
        "z-1",
        "hover:shadow-lg", // Large shadow size on hover
        "hover:filter", // Enables filter on hover
        "hover:brightness-50", // Darken the image on hover
        "rounded-md"
      );
      //copypasted--------------------------------------------------------------
      const overlay = document.createElement("div");
      overlay.classList.add(
        "absolute",
        "top-5",
        "left-5",
        "items-center",
        "justify-center",
        "bg-opacity-50",
        "opacity-0",
        "group-hover:opacity-100",
        "text-white",
        "flex",
        "flex-row"
      );
      //to write text to overlay add below in quote
      overlay.innerText = "";

      //APPENDING
      gallery.appendChild(div); // Add the img tag to the gallery
      div.appendChild(img);
      div.appendChild(overlay);
      overlay.appendChild(redditlink);
      redditlink.appendChild(img2);
      overlay.appendChild(downloadlink);
      downloadlink.appendChild(img1);
    });
  } catch (error) {
    console.error("Error loading image links:", error);
  }
}

// Call the function to load the images on page load
loadImageLinks();

let offset = 0;
let limit = 10;
async function loadMoreImages() {
  offset += limit;
  await loadImageLinks(offset, limit);
}
setInterval(loadMoreImages, 10000);
