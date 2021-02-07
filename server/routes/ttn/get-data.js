const express = require("express");
const ttnData = require("./ttnData");

const router = express.Router();

// Get data
router.get("/", async (req, res) => {
  const data = await loadDataCollection();
  res.send(await data);
});

async function loadDataCollection() {
  const data = await ttnData();
  //console.log(data);
  return data;
}

module.exports = router;
