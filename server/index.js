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


const data = require("./routes/api/data");
app.use("/api/data", data);

const ttnData = require("./routes/ttn/get-data");
app.use("/ttn/get-data", ttnData);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on PORT ${port}`));
