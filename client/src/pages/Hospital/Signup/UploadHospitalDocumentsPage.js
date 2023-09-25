import React, { useState } from "react";
import "./UploadHospitalDocumentsPage.css";
import uploadSvg from "./upload.svg"; // Import the SVG file
import { NavLink } from "react-router-dom";

function UploadHospitalDocumentsPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };

  const handleUpload = () => {
    // Handle the upload logic here (e.g., send files to the server)
    // You can access the selected files using the `selectedFiles` array
  };

  return (
    <div className="upload">
      <h2>Upload Hospital Documents</h2>
      <div className="upload-container">
        {/* Display the SVG image */}
        <img src={uploadSvg} alt="Upload Icon" className="upload-icon" />
        <div
          className={`drop-zone ${selectedFiles.length > 0 ? "active" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {selectedFiles.length > 0 ? (
            <div className="selected-files">
              {selectedFiles.map((file, index) => (
                <div key={index} className="selected-file">
                  <span>{file.name}</span>
                  <button
                    className="remove-button"
                    onClick={() => removeFile(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Drag & Drop Files</p>
          )}
        </div>
        <p>OR</p>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .gif, .pdf"
          onChange={handleFileSelect}
          style={{ display: "none" }}
          id="file-input"
          multiple
        />
        <label htmlFor="file-input" className="file-input-label">
          Select Files
        </label>
        <div className="navigation-buttons">
        <button className="prev-button">
          <NavLink style={{color:'white'}} to="/OwnerDetails">Prev</NavLink>{" "}
        </button>
        <button className="finish-button" onClick={handleUpload}>
          <NavLink style={{color:'white'}} to="/SignupFinished">Finish</NavLink>
        </button>
      </div>
      </div>
    </div>
  );
}

export default UploadHospitalDocumentsPage;
