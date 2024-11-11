async function loadImages(imagesrc) {
  try {
    console.log("imagesrc--", imagesrc);
    const response = await fetch(
      `https://neon-1fg8.onrender.com/load-images?url=${imagesrc}` //http://localhost:3000
    );
    const imageData = await response.blob();
    console.log("imageData--", imageData);
    const imageURL = URL.createObjectURL(imageData);
    console.log("error never dies", imageURL);
    return imageURL;
    /*
    const image = await fetch(imagesrc); //used get instead of fetch
    if (!image.ok) {
      throw new Error(`image fetch error! status: ${image.status}`);
    }
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    console.log("error never dies", imageURL);
    return imageURL;
    */
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
  const reversedLinks = imageLinks.reverse();
  const paginatedLinks = reversedLinks.slice(offset, offset + limit);
  return paginatedLinks;
}

// function to paginate the images

// Function to load image boxes
async function loadImageLinks(offset = 0, limit = 10) {
  try {
    /*
    const response = await fetch("excuseapi.txt"); // Fetch the text file
    const text = await response.text(); // Read the file content as text
    const imageLinks = text.split("\n").filter((link) => link.trim() !== ""); */ // Split by lines and filter empty links
    const imageLinks = await readTextFile(offset, limit);

    //copy pasted
    //copy pasted
    const gallery = document.getElementById("gallery"); // Get the gallery div
    console.log("imageLinks--", imageLinks);
    // Iterate over each image link and create an img element
    imageLinks.forEach((link) => {
      console.log("imageLinks--", link);
      const div = document.createElement("div"); //main div used as holder of each image
      div.id = link.trim();
      div.classList.add("relative", "group", "overflow-hidden");
      //download icon img
      const img1 = document.createElement("img");
      img1.classList.add("relative", "group", "overflow-hidden", "w-10");
      img1.src = "./Media/downloadicon.png";
      //download icon img
      //download link
      const downloadlink = document.createElement("a");
      downloadlink.id = "downloadlink";
      imageURL = loadImages(link.trim()); // link.trim()
      imageURL.then((imageURL) => {
        // check for imageurl
        downloadlink.href = imageURL; // download link is described after imageurl has been resloved
      });
      console.log("imageurl--", imageURL);
      downloadlink.download = "";
      //download link
      //link tag reddit
      const redditlink = document.createElement("a");
      redditlink.href = link.trim();
      //link tag reddit
      //link img
      const img2 = document.createElement("img");
      img2.classList.add("relative", "group", "overflow-hidden", "w-10");
      img2.src = "./Media/linkicon.png";
      //link img

      const img = document.createElement("img"); // Create an img tag
      img.id = "imageid"; //using image src as image id
      img.src = link.trim(); // Set the src to the image link
      img.classList.add(
        "brightness-100",
        "transition", // Smooth transition for hover effect
        "duration-500", // Duration of the transition
        "z-1",
        "hover:shadow-lg", // Large shadow size on hover
        "hover:filter", // Enables filter on hover
        "hover:brightness-50" // Darken the image on hover
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

      //copypasted--------------------------------------------------------------
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
