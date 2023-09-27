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
