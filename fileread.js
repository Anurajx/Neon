async function loadImages(imagesrc) {
  try {
    const image = await fetch(imagesrc);
    if (!image.ok) {
      throw new Error(`image fetch error! status: ${image.status}`);
    }
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    console.log("error never dies", imageURL);
    //for external window
    //const filename = "";
    //const mimeType = "image/*";
    //const headers = {
    //"Content-Disposition": `attachment; filename="${filename}"`,
    //"Content-Type": mimeType,
    //};
    //window.open(imageURL, "_blank", "noopener,noreferrer", headers);

    //window end
    return imageURL;
  } catch (error) {
    console.error("Error loading image:", error);
    return null;
  }
}

// Function to load the text file with image links
async function loadImageLinks() {
  try {
    const response = await fetch("excuseapi.txt"); // Fetch the text file
    const text = await response.text(); // Read the file content as text
    const imageLinks = text.split("\n").filter((link) => link.trim() !== ""); // Split by lines and filter empty links
    const gallery = document.getElementById("gallery"); // Get the gallery div
    // Iterate over each image link and create an img element
    imageLinks.forEach((link) => {
      const div = document.createElement("div"); //main div used as holder of each image
      div.classList.add("relative", "group", "overflow-hidden");
      //download img
      const img1 = document.createElement("img");
      img1.classList.add("relative", "group", "overflow-hidden", "w-10");
      img1.src = "./Media/downloadicon.png";
      //download img
      //download link
      const downloadlink = document.createElement("a");
      downloadlink.id = "downloadlink";
      imageURL = loadImages(link.trim());
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
