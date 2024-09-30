// config awal node js menggunakan express.js
const fs = require("fs");
const express = require("express");
const app = express();

// routing
app.get("/wahyu", (req, res) => {
  res.status(200).json({
    message: "message succesfully",
  });
});

// deafult URl = healtcheck
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Aplikasi ini sudah berjalan dengan baik brookkk",
  });
});

//   middleware / handler untuk url yang tidak dapar diakses, soalnya dia tidak ada di aplikasi
//   ada option utnuk membuat middleware sendiri atau menggunakan middleware bawaan express

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "URL tidak ditemukan",
  });
});

// konfigurasi server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
