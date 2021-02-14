const mongodb = require("mongodb");
const ttnData = require("./routes/ttn/ttnData");

// zugriff auf MongoDB Atlas DB
async function loadDataCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://beedataRW:mihuanga1@cluster0.xbjbc.mongodb.net/beedata?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  return client.db("beedata").collection("dataV3");
}

// schreibt TTN Daten in MongoDB Atlas DB
const syncToDb = async () => {
  try {
    console.log("SYNC TO DB");
    const data = await loadDataCollection();
    const toInsert = await ttnData();
    if (toInsert == []) {
      console.log("No new Data to insert to MongoDB DB");
      return;
    }
    await data.insertMany(toInsert);
  } catch (error) {
    console.error("CATCH MONGODBINSERT: " + error);
  }
};

module.exports = syncToDb;
