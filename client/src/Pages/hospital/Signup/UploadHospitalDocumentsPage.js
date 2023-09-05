import React, { useState } from 'react';
import './UploadHospitalDocumentsPage.css'; // Import your CSS file

function UploadHospitalDocumentsPage({ onPrevious, onNext }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    // Handle file selection here
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle file submission logic here
    if (selectedFile) {
      // You can upload the selected file here
    }
    // Navigate to the next page
    onNext();
  };

  return (
    <div className="upload-hospital-docs-container">
      <h2>Upload Hospital Documents</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fileInput">Select File:</label>
          <input
            type="file"
            id="fileInput"
            name="fileInput"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            required
          />
          <div className="file-preview">
            {selectedFile && <p>Selected File: {selectedFile.name}</p>}
          </div>
        </div>
        <div className="upload-options">
          <p>or</p>
          <p>Drag and drop a file here</p>
        </div>
        <div className="button-group">
          <button type="button" onClick={onPrevious}>
            Previous
          </button>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}

export default UploadHospitalDocumentsPage;
