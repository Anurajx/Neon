const express = require("express");
const https = require("https");
const http = require("http");

const app = express();

http.globalAgent.family = 4;
https.globalAgent.family = 4;

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

app.get("/load-images", (req, res) => {
  const imagesrc = req.query.url;
  if (imagesrc.startsWith("https")) {
    https
      .get(imagesrc, (response) => {
        res.set("Access-Control-Allow-Origin", "*");
        res.set(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.set("Content-Type", response.headers["content-type"]);
        response.pipe(res);
      })
      .on("error", (err) => {
        console.error("Error loading image:", err);
        res.status(500).send("Error loading image");
      });
  } else {
    http
      .get(imagesrc, (response) => {
        res.set("Access-Control-Allow-Origin", "*");
        res.set(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.set("Content-Type", response.headers["content-type"]);
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
