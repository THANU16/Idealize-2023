// const googleMapsUtils = require("../utils/googleMapUtils");

// const mapLink = "https://goo.gl/maps/k3kRzJR9AGWpcc1q8";

// async function processMapLink(link) {
//   try {
//     const geoData = await googleMapsUtils.getGeoDataFromLink(link);
//     if (geoData) {
//       console.log(geoData);
//     } else {
//       console.log("No data found for the given link.");
//     }
//   } catch (error) {
//     console.error("Error processing map link:", error);
//   }
// }

// processMapLink(mapLink);

const axios = require("axios");
const { URL } = require("url");

async function getLatLngFromGoogleMapsLink(link) {
  try {
    // Parse the URL to get the query parameter containing the place_id
    const urlObj = new URL(link);
    console.log(urlObj.href);
    const placeId = urlObj.searchParams.get("q");
    console.log(placeId);
    // Make a request to the Google Maps Geocoding API
    const apiKey = "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs"; // Replace with your API key
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKey}`;
    const response = await axios.get(apiUrl);

    // Extract latitude and longitude from the response
    const { lat, lng } = response.data.results[0].geometry.location;
    console.log(link);
    console.log(lat);
    console.log(lng);
    return { latitude: lat, longitude: lng };
  } catch (error) {
    // console.log(error)
    console.error("Error:", error.message);
    return null;
  }
}

getLatLngFromGoogleMapsLink("https://goo.gl/maps/k3kRzJR9AGWpcc1q8");
