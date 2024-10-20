// Function to load the text file with image links
async function loadImageLinks() {
  try {
    const response = await fetch("comred.txt"); // Fetch the text file
    const text = await response.text(); // Read the file content as text
    const imageLinks = text.split("\n").filter((link) => link.trim() !== ""); // Split by lines and filter empty links

    const gallery = document.getElementById("gallery"); // Get the gallery div

    // Iterate over each image link and create an img element
    imageLinks.forEach((link) => {
      const div = document.createElement("div");
      div.classList.add("relative", "group", "overflow-hidden");
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
        "text-white"
      );
      overlay.innerText = "Download";

      //copypasted--------------------------------------------------------------
      gallery.appendChild(div); // Add the img tag to the gallery
      div.appendChild(img);
      div.appendChild(overlay);
    });
  } catch (error) {
    console.error("Error loading image links:", error);
  }
}

// Call the function to load the images on page load
loadImageLinks();
