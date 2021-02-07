const express = require("express");
const ttnData = require("./ttnData");

const router = express.Router();

// Get data von TTN Storage Integration
router.get("/", async (req, res) => {
  const data = await loadDataCollection();
  res.send(await data);
});

// Daten für API von ttnData.js laden
async function loadDataCollection() {
  const data = await ttnData();
  //console.log(data);
  return data;
}

module.exports = router;
