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
    const gallery = document.getElementById("gallery");

    imageLinks.forEach((link) => {
      const div = document.createElement("div");
      div.id = link.trim();
      div.classList.add(
        "relative",
        "group",
        "overflow-hidden",
        "cursor-pointer"
      );

      const img = document.createElement("img");
      img.id = "imageid";
      img.src = link.trim();
      img.alt = "yourwallpaper";
      img.classList.add(
        "brightness-100",
        "transition",
        "duration-500",
        "z-1",
        "hover:shadow-lg",
        "hover:filter",
        "hover:brightness-50",
        "rounded-md"
      );

      // Add click event listener to open modal
      div.addEventListener("click", () => {
        createImageModal(link.trim());
      });

      gallery.appendChild(div);
      div.appendChild(img);
    });
  } catch (error) {
    console.error("Error loading image links:", error);
  }
}

// New function to create and show modal
function createImageModal(imageUrl) {
  const modal = document.createElement("div");
  modal.classList.add(
    "fixed",
    "inset-0",
    "bg-black",
    "bg-opacity-80",
    "flex",
    "items-center",
    "justify-center",
    "z-50"
  );

  const modalContent = `
    <div class="relative max-w-4xl mx-auto">
      <img src="${imageUrl}" alt="Full size wallpaper" class="max-h-[90vh] w-auto">
      <div class="absolute top-4 right-4 flex gap-4">
        <button onclick="window.open('${imageUrl}', '_blank')" class="bg-white p-2 rounded-full">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </button>
        <button class="download-btn bg-white p-2 rounded-full">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
        </button>
        <button class="close-modal bg-white p-2 rounded-full">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  modal.innerHTML = modalContent;

  // Add event listeners
  modal.querySelector(".close-modal").addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector(".download-btn").addEventListener("click", async () => {
    try {
      const imageURL = await loadImages(imageUrl);
      if (imageURL) {
        const tempLink = document.createElement("a");
        tempLink.href = imageURL;
        tempLink.download = "";
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
      }
    } catch (err) {
      console.error("Error in download process:", err);
    }
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  document.body.appendChild(modal);
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
