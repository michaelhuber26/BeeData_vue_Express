const mongodb = require("mongodb");
const ttnData = require("./routes/ttn/ttnData");

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


const syncToDb = async () => {
  try {
    const data = await loadDataCollection();
    const toInsert = await ttnData();
    await data.insertMany(toInsert);
  } catch (error) {
    console.error("CATCH MONGODBINSERT: " + error);
  }
};

module.exports = syncToDb;
