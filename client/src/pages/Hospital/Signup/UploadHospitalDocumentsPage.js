import React, { useState } from "react";
import "./UploadHospitalDocumentsPage.css";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="upload">
      <h2>Upload Hospital Documents</h2>
      <div className="file-upload-container">
        <div
          className={`drop-zone ${selectedFile ? "active" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {selectedFile ? (
            <p>File Selected: {selectedFile.name}</p>
          ) : (
            <p>Drag & Drop a File or Click to Select</p>
          )}
        </div>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .gif, .pdf"
          onChange={handleFileSelect}
          style={{ display: "none" }}
          id="file-input"
        />
        <label htmlFor="file-input" className="file-input-label">
          Select File
        </label>
      </div>
      <div className="navigation-buttons">
        <button className="prev-button">Prev</button>
        <button className="next-button">Next</button>
      </div>
    </div>
  );
}

export default FileUpload;
