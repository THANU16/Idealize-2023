import React from "react";
import PropTypes from "prop-types";
import "./Firstaid.css";

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

const videoIds = [
  "Ovsw7tdneqE",
  "ErxKDbH-iiI",
  "eBINwvHFTnw",
  "8pTaqY40-Rs",
  "8YREVVM2n7g",
  "k7iPIQXvKjQ",
  "7CgtIgSyAiU",
  "dSfXcQqLZqs",
  "iQwfvMu9VyE",
  "T44piQneq4g",
  "7Fh3v5c6FY4",
  "_LDtqtpHnS4",
  "lNWI6Rj65nw",
  "XjMvBW9KDLA",
  "DUaxt8OlT3o",
  "DSKm5tbwG6s",
  "0JHNvpQ9JW8",
  "-ni7bW55KbI",
  "jJWfHHqfSbk",
  "2ynlaWUwMsA",
];

const VideoGallery = () => (
  <div className="video-gallery">
    {videoIds.map((id) => (
      <YoutubeEmbed key={id} embedId={id} />
    ))}
  </div>
);

export default VideoGallery;

// import React, { useRef, useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./FirstAidInstruction.css"; // Import your custom CSS for styling

// const VideoGallery = () => {
//   const videoIds = ["Ovsw7tdneqE", "ErxKDbH-iiI", "eBINwvHFTnw", "8pTaqY40-Rs"];

//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const sliderRef = useRef(null);

//   useEffect(() => {
//     // Automatically advance to the next video every N milliseconds (e.g., 5000ms or 5 seconds)
//     const interval = setInterval(() => {
//       sliderRef.current.slickNext();
//     }, 5000);

//     return () => {
//       clearInterval(interval); // Cleanup: clear the interval
//     };
//   }, []);

//   const settings = {
//     dots: false,
//     infinite: false,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     swipeToSlide: true,
//     afterChange: (index) => setCurrentVideoIndex(index),
//   };

//   const goToPrevious = () => {
//     sliderRef.current.slickPrev();
//   };

//   const goToNext = () => {
//     sliderRef.current.slickNext();
//   };

//   return (
//     <div className="video-gallery-container">
//       <div className="top-video">
//         <div className="video-responsive">
//           <iframe
//             title={`Embedded youtube ${videoIds[currentVideoIndex]}`}
//             width="100%"
//             height="315"
//             src={`https://www.youtube.com/embed/${videoIds[currentVideoIndex]}`}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </div>
//       </div>
//       <div className="bottom-videos">
//         <Slider ref={sliderRef} {...settings}>
//           {videoIds.map((id, index) => (
//             <div key={id}>
//               <div className="video-responsive">
//                 <iframe
//                   title={`Embedded youtube ${id}`}
//                   width="100%"
//                   height="315"
//                   src={`https://www.youtube.com/embed/${id}`}
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//       <div className="video-navigation">
//         <button className="nav-button" onClick={goToPrevious}>
//           Previous
//         </button>
//         <button className="nav-button" onClick={goToNext}>
//           Next
//         </button>
//       </div>
//       <div className="current-video-info">
//         Currently Playing: Video {currentVideoIndex + 1}
//       </div>
//     </div>
//   );
// };

// export default VideoGallery;
