import React from "react";

// Define a CSS style object to control font size and add decorative elements
const textStyle = {
  fontSize: "25px", // Default font size for larger screens
  color: "#333", // Text color
};

// Define a smaller font size for mobile screens using a media query
const mobileTextStyle = {
  fontSize: "10px", // Adjust the font size for mobile screens
};

// Define a CSS style for custom bullet points
const customBulletStyle = {
  listStyle: "none",
  paddingLeft: "20px",
};

const bulletIconStyle = {
  position: "relative",
  marginLeft: "-20px", // Adjust the spacing between bullet and text
};

const bulletIcon = {
  width: "16px",
  height: "16px",
  backgroundColor: "#F00", // Red color for ambulance and hospital context
  borderRadius: "50%",
  display: "inline-block",
  marginRight: "8px", // Adjust the spacing between bullet and text
};

// Define background and heading colors
const backgroundColor = "#f9f9f9"; // Light gray background
const headingColor = "#007BFF"; // Blue color for headings

// Define CSS styles for animations
const fadeInAnimation = {
  animationName: "fadeIn",
  animationDuration: "1s",
  animationTimingFunction: "ease-in-out",
  animationFillMode: "forwards",
};

// User Safety Component
function UserSafety() {
  return (
    <div
      style={{
        background: backgroundColor,
        padding: "20px",
        ...fadeInAnimation,
      }}
    >
      <h2 style={{ ...textStyle, color: headingColor }}>User Safety</h2>
      <h3 style={{ ...textStyle, color: headingColor }}>
        Safety Tips While Waiting for an Ambulance
      </h3>
      <hr
        style={{ width: "100%", height: "2px", backgroundColor: headingColor }}
      />
      <p style={textStyle}>
        While waiting for an ambulance, please keep the following safety tips in
        mind:
        <ul style={customBulletStyle}>
          <li style={bulletIconStyle}>
            <span style={bulletIcon}></span>
            You can watch first aid instructions from your First Aid page and
            follow the steps.
          </li>
          <li style={bulletIconStyle}>
            <span style={bulletIcon}></span>
            Stay as calm as possible and try to reassure others around you.
          </li>
          <li style={bulletIconStyle}>
            <span style={bulletIcon}></span>
            If you're outside, stay away from traffic and find a safe spot to
            wait.
          </li>
          <li style={bulletIconStyle}>
            <span style={bulletIcon}></span>
            If you're inside, unlock your door and make it easy for paramedics
            to enter.
          </li>
        </ul>
      </p>

      <h3 style={{ ...textStyle, color: headingColor }}>
        Guidelines for Interacting with Ambulance Staff
      </h3>
      <hr
        style={{ width: "100%", height: "2px", backgroundColor: headingColor }}
      />
      <p style={textStyle}>
        When ambulance staff arrives, follow these guidelines:
        <ul style={customBulletStyle}>
          <li style={bulletIconStyle}>
            <span style={bulletIcon}></span>
            Provide clear and accurate information about the situation.
          </li>
          <li style={bulletIconStyle}>
            <span style={bulletIcon}></span>
            Listen to and follow the instructions given by the paramedics.
          </li>
          <li style={bulletIconStyle}>
            <span style={bulletIcon}></span>
            Stay calm and avoid unnecessary distractions.
          </li>
        </ul>
      </p>
    </div>
  );
}

export { UserSafety };
