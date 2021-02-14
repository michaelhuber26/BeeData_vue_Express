const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dbInsert = require("./dbInsert");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// mit /sync Daten von TTN in MongoDB speicher;
app.get("/sync", (req, res) => {
  res.send("Hello on /sync");
  dbInsert();
});

dbInsert();
//calls dbInsert every 1h
setInterval(dbInsert, 1000 * 60 * 60); // ms s min  == 1h

// Zugriff(get, post, put, delete) auf Datenbank über API
const data = require("./routes/api/data");
app.use("/api/data", data);

// Zugriff(get) Daten von TTN StI
const ttnData = require("./routes/ttn/get-data");
app.use("/ttn/get-data", ttnData);

// Handle production
if (process.env.NODE_ENV === "production") {
  //Static folder
  app.use(express.static(__dirname + "/public/"));

  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on PORT ${port}`));
