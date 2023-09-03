const googleMapsUtils = require("../utils/googleMapUtils");

const mapLink = "https://goo.gl/maps/k3kRzJR9AGWpcc1q8";

async function processMapLink(link) {
  try {
    const geoData = await googleMapsUtils.getGeoDataFromLink(link);
    if (geoData) {
      console.log(geoData);
    } else {
      console.log("No data found for the given link.");
    }
  } catch (error) {
    console.error("Error processing map link:", error);
  }
}

processMapLink(mapLink);
