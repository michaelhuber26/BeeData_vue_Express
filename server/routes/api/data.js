const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get data
router.get("/", async (req, res) => {
  const data = await loadDataCollection();
  res.send(await data.find({}).toArray());
});

// Add data
router.post("/", async (req, res) => {
  const data = await loadDataCollection();
  await data.insertOne({
    ASCII: req.body.ASCII,
    device_id: req.body.device_id,
    raw: req.body.raw,
    time: req.body.time,
  });
  res.status(201).send();
});

// Delete data
router.delete("/:id", async (req, res) => {
  const data = await loadDataCollection();
  await data.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadDataCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://beedataRW:mihuanga1@cluster0.xbjbc.mongodb.net/beedata?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  return client.db("beedata").collection("data");
}

module.exports = router;
