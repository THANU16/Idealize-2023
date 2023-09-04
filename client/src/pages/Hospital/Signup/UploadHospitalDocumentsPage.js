import React, { useState } from "react";
import "./UploadHospitalDocumentsPage.css";

function FileUpload() {
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
      <div className="file-upload-container">
        <div
          className={`drop-zone ${selectedFiles.length > 0 ? "active" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {selectedFiles.length > 0 ? (
            <div>
              <p>Selected Files:</p>
              <ul className="selected-files">
                {selectedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name}{" "}
                    <button onClick={() => removeFile(index)}>Remove</button>
                  </li>
                ))}
              </ul>
              <button className="upload-button" onClick={handleUpload}>
                Upload
              </button>
            </div>
          ) : (
            <p>Drag & Drop Files or Click to Select</p>
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
      </div>
      <div className="navigation-buttons">
        <button className="prev-button">Prev</button>
        <button className="finish-button">Finish</button>
      </div>
    </div>
  );
}

export default FileUpload;
