const express = require("express");
const https = require("https");
const http = require("http");

const app = express();

app.get("/load-images", (req, res) => {
  console.log("Received request for image:", req.query.url);
  const imagesrc = req.query.url;
  if (imagesrc.startsWith("https")) {
    https
      .get(imagesrc, (response) => {
        console.log("Received response from image URL:");
        console.log("Status code:", response.statusCode);
        console.log("Headers:", response.headers);
        res.set("Access-Control-Allow-Origin", "*");
        res.set(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.set("Content-Type", response.headers["content-type"]);
        console.log("Sending response to client:");
        console.log("Headers:", res.getHeaders());
        response.pipe(res);
      })
      .on("error", (err) => {
        console.error("Error loading image:", err);
        res.status(500).send("Error loading image");
      });
  } else {
    http
      .get(imagesrc, (response) => {
        console.log("Received response from image URL:");
        console.log("Status code:", response.statusCode);
        console.log("Headers:", response.headers);
        res.set("Access-Control-Allow-Origin", "*");
        res.set(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.set("Content-Type", response.headers["content-type"]);
        console.log("Sending response to client:");
        console.log("Headers:", res.getHeaders());
        response.pipe(res);
      })
      .on("error", (err) => {
        console.error("Error loading image:", err);
        res.status(500).send("Error loading image");
      });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
