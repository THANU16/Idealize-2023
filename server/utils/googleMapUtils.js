// // const axios = require("axios");

// // const GOOGLE_MAPS_API_KEY = "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs";

// // async function getLocationDetails(googleMapsLink) {
// //   try {
// //     const response = await axios.get(
// //       `https://maps.googleapis.com/maps/api/geocode/json?place_id=${encodeURIComponent(
// //         googleMapsLink
// //       )}&key=${GOOGLE_MAPS_API_KEY}`
// //     );

// //     if (response.data.results.length > 0) {
// //       const result = response.data.results[0];
// //       const district = result.formatted_address;
// //       const lat = result.geometry.location.lat;
// //       const lng = result.geometry.location.lng;
// //       return { district, lat, lng };
// //     } else {
// //       return null;
// //     }
// //   } catch (error) {
// //     console.error("Error getting location details:", error);
// //     return null;
// //   }
// // }

// // getLocationDetails("https://goo.gl/maps/k3kRzJR9AGWpcc1q8");

// // module.exports = getLocationDetails;

// app.get('/api/geocode', async (req, res) => {
//   const location = req.query.location;

//   try {
//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//         location
//       )}&key=YOUR_GOOGLE_MAPS_API_KEY`
//     );

//     const data = await response.json();

//     if (data.results.length > 0) {
//       const { lat, lng } = data.results[0].geometry.location;
//       // res.json({ latitude: lat, longitude: lng });
//     } else {
//       // res.status(404).json({ error: 'Location not found' });
//     }
//   } catch (error) {
//     console.error('Error geocoding location:', error);
//     // res.status(500).json({ error: 'Internal server error' });
//   }
// });
async function getTheLatAndLng(location) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs`
    );

    const data = await response.json();

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      // res.json({ latitude: lat, longitude: lng });
      console.log(lat);
      console.log(lng);
    } else {
      // res.status(404).json({ error: 'Location not found' });
      console.log("404");
    }
  } catch (error) {
    console.error("Error geocoding location:", error);
    // res.status(500).json({ error: 'Internal server error' });
  }
}

getTheLatAndLng("https://goo.gl/maps/k3kRzJR9AGWpcc1q8");
