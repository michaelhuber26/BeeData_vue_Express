const axios = require("axios");

//http req auf TTN Storage Integration API
const ttnData = async () => {
  const response = await axios.get(
    "https://esp32-1channel-gateway-test.data.thethingsnetwork.org/api/v2/query?last=1d",
    {
      headers: {
        Accept: "application/json",
        Authorization:
          "key ttn-account-v2.LzHLMQlro-qrHb85jxYYDMLdCTdLkBQHKeWMkOc4Bjw",
      },
    }
  );

  return formatData(response.data);
};

function formatData(data) {
  let formattedData = [];
  data.forEach((element) => {
    // splits string in ASCII element after ', ' to arr
    let temps = element.ASCII.split(", ");

    formattedData.push({
      device_id: element.device_id,
      temp: {
        curTemp: parseFloat(temps[0]),
        maxTemp: parseFloat(temps[1]),
        meanTemp: parseFloat(temps[2]),
      },
      time: new Date(element.time),
    });
  });

  return formattedData;
}

// Daten von TTN Storage integration neu formatiert
module.exports = ttnData;
