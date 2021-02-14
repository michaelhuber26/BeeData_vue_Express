const axios = require("axios");

var lastresponse = [];

//http req auf TTN Storage Integration API
const ttnData = async () => {
  const reqTime = "1h";
  const response = await axios.get(
    "https://esp32-1channel-gateway-test.data.thethingsnetwork.org/api/v2/query?last=" +
      reqTime,
    {
      headers: {
        Accept: "application/json",
        Authorization:
          "key ttn-account-v2.LzHLMQlro-qrHb85jxYYDMLdCTdLkBQHKeWMkOc4Bjw",
      },
    }
  );

  if (response.data == [] || response.data == lastresponse) {
    console.log(
      "No new Data in TTN Storage Integration since the last " + reqTime
    );
    return [];
  }
  lastresponse = response.data;
  return formatData(response.data);
};

function formatData(data) {
  let formattedData = [];
  data.forEach((element) => {
    // splits string in ASCII element after ' ' (space) to arr
    let temp = element.ASCII.split(" ");

    formattedData.push({
      device_id: element.device_id,
      temp: parseFloat(temp[1]),
      time: new Date(element.time),
    });
  });

  return formattedData;
}

// Daten von TTN Storage integration neu formatiert
module.exports = ttnData;
