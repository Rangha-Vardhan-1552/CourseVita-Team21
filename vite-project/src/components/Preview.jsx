import React, { useState } from 'react';
import { generatePDF } from './pdfGenerator';
import axios from 'axios'; // Import axios

// Component
const Preview = ({ data, onEdit }) => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false); // For tracking upload state

  // Function to generate and preview the PDF
  const handlePreview = () => {
    const pdfDataUrl = generatePDF(data);
    setPdfUrl(pdfDataUrl);
  };

  const dataURLtoBlob = (dataUrl) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true); // Start upload state
      const pdfDataUrl = generatePDF(data); // Get the PDF as a Data URL
  
      // Convert Data URL to Blob
      const pdfBlob = dataURLtoBlob(pdfDataUrl);
  
      console.log("data",data)
      // Create FormData and append the PDF Blob and additional data
      const formData = new FormData();
      formData.append('file', pdfBlob, 'resume.pdf');
      formData.append('name', data.name); // Add the user's name
      formData.append('email', data.email); // Add the user's email
  
      // Make the POST request to upload the PDF
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Upload successful', response);
      alert('Resume uploaded successfully');
      setIsUploading(false); // End upload state
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Error uploading resume');
      setIsUploading(false); // End upload state
    }
  };
  

  return (
    <div style={styles.previewContainer}>
      <h2 style={styles.header}>Preview Your Data</h2>
      <button style={styles.generateButton} onClick={handlePreview}>
        Generate Preview
      </button>
      {pdfUrl && (
        <div style={styles.previewSection}>
          <iframe
            title="PDF Preview"
            src={pdfUrl}
            style={styles.pdfIframe}
          />
          <hr style={styles.divider} />
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={onEdit}>Edit</button>
            <button style={styles.button} onClick={handleUpload} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  previewContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f4f8',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  generateButton: {
    padding: '12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
    marginBottom: '20px',
  },
  previewSection: {
    width: '100%',
    maxWidth: '800px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd', // Added border for section
    position: 'relative', // For positioning the divider correctly
  },
  pdfIframe: {
    width: '100%',
    height: '600px',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  divider: {
    margin: '20px 0',
    border: 'none',
    borderTop: '1px solid #ddd', // Divider line
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
    margin: '0 10px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  buttonActive: {
    backgroundColor: '#003d7a',
    transform: 'scale(1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default Preview;
