const axios = require("axios");

// https://stackoverflow.com/questions/48980380/returning-data-from-axios-api

const ttnData = async () => {
  const response = await axios.get(
    "https://esp32-1channel-gateway-test.data.thethingsnetwork.org/api/v2/query?last=7d",
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


module.exports = ttnData;
