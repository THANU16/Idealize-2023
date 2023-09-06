import React from "react";
import PropTypes from "prop-types";

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

const videoIds = ["Ovsw7tdneqE", "ErxKDbH-iiI", "eBINwvHFTnw", "8pTaqY40-Rs"];

const VideoGallery = () => (
  <div className="video-gallery">
    {videoIds.map((id) => (
      <YoutubeEmbed key={id} embedId={id} />
    ))}
  </div>
);

export default VideoGallery;
