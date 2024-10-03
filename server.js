// config awal node js menggunakan express.js
const fs = require("fs");
const express = require("express");
const app = express();

// routing
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "message succesfully",
  });
});

//middleware untuk membaca json dari request body(dari klient) ke kita
app.use(express.json());

// deafult URl = healtcheck
app.get("/wahyu", (req, res) => {
  res.status(200).json({
    message: "Ping Succesfully!",
  });
});

//ditaruh diluar
const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/data/cars.json`, "utf-8") // membaca file json harus ada utf-8
);

// /api/v1/(collectionnya cars) => collectionnya ini  harus jamak (s)
app.get("/api/v1/cars", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "succes get data brok",
    isSuccess: true,
    totalData: cars.length, // untuk mengetahui jumlah data
    data: {
      cars,
    },
  });
});

// respon.data.cars

app.post("/api/v1/cars", (req, res) => {
  // insert into menggunakan ORM

  //proses 1
  const newCar = req.body; // ini adalah sebuah object

  cars.push(newCar);

  // proses write ke  d alam datbasenya
  //strungify untuk mengubah object menjadi string
  fs.writeFileSync(
    `${__dirname}/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      // menulis data ke dalam file json langsung saja taruh data cars nya menggunakan callback
      res.status(201).json({
        status: "success",
        message: "succes get data brok!!!",
        isSuccess: true,
        totalData: cars.length,
        data: {
          car: newCar,
        },
      });
    }
  );

  // const cars = JSON.parse(
  //   fs.readFileSync(`${__dirname}/data/cars.json`, "utf-8")
  // );

  res.status(200).json({
    status: "success",
    message: "succes get data brok",
    isSuccess: true,
    data: cars,
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
