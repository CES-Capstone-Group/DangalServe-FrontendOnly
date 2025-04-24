import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from "../config";  // Import API endpoints from the config file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEye } from '@fortawesome/free-solid-svg-icons';


const DocumentPageCoor = () => {
  const [documents, setDocuments] = useState([]);  // To store documents fetched from API
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch documents from the API when the component mounts
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.DOCUMENT_LIST);  // Use DOCUMENT_LIST from the config
        const data = await response.json();
        setDocuments(data); // Store fetched documents in state
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []); // Empty array means this effect runs once, when the component mounts

  // Handle view button click
  const handleView = (fileUrl) => {
    // Prepend the full URL for local development (localhost:8000)
    const fullUrl = API_ENDPOINTS.BASE`${fileUrl}`;
    window.open(fullUrl, '_blank'); // Open the file URL in a new tab
  };

  // Handle download button click
  const handleDownload = (fileUrl, fileName) => {
    // Prepend the full URL for local development (localhost:8000)
    const fullUrl = API_ENDPOINTS.BASE`${fileUrl}`;
    const link = document.createElement('a');
    link.href = fullUrl; // Use the full URL for downloading
    link.download = fileName || 'document'; // Set the filename to download (or default to 'document')
    link.click(); // Trigger the download
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',  // Center the card horizontally
      alignItems: 'flex-start',  // Align the card to the top of the page (no vertical centering)
      padding: '20px',
      flexDirection: 'column',  // Cards will stack vertically in a column
      gap: '20px',  // Space between cards
      width: '100%',
      maxWidth: '1200px',  // Maximum width of the container
      minWidth: '600px',   // Minimum width of the container
      margin: '0 auto',  // Center the entire container horizontally
    },
    documentList: {
      display: 'flex',
      flexDirection: 'column',  // Stack cards vertically
      gap: '20px',
      width: '100%',
      maxWidth: '1200px',  // Set max width for the card container
      minWidth: '600px',   // Set min width to avoid cards getting too small
    },
    documentCard: {
      backgroundColor: 'white',
      border: '1px solid #ddd',  // Thin gray border around the card
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'flex-start',  // Align content to the top of the card
      alignItems: 'center',
      height: 'auto',  // Allow the card height to grow based on content
      minHeight: '100px',  // Set a minimum height for the card
      width: '100%',  // Card should take 100% of the width available
      maxWidth: '1000px',  // Set a max width for each card
      minWidth: '1000px',   // Set a minimum width for the card
      overflow: 'hidden',
      gap: '20px',  // Add space between elements inside the card
      margin: '0 auto',  // Center the card horizontally
    },
    h2: {
      fontSize: '38px',
      fontWeight: '600',
      color: '#333',
    },

    documentName: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      flex: 1,  // Allow the title to take remaining space
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'flex-start',  // Align buttons on the same line
      alignItems: 'center',  // Center buttons vertically
      gap: '10px',  // Space between buttons
    },
    button: {
      width: '40px',
      height: '40px',
      border: 'none',
      borderRadius: '50%',  // Circular button
      cursor: 'pointer',
      fontSize: '18px',  // Icon size
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background-color 0.3s ease',
    },
    viewButton: {
      backgroundColor: '#D32F2F', // Red color
      color: 'white',
    },
    viewButtonHover: {
      backgroundColor: '#C2185B', // Darker red on hover
    },
    downloadButton: {
      backgroundColor: '#388E3C', // Green color
      color: 'white',
    },
    downloadButtonHover: {
      backgroundColor: '#2C6B2F', // Darker green on hover
    },
    loadingText: {
      fontSize: '18px',
      color: '#888',
    }
  };

  if (loading) {
    return <div style={styles.loadingText}>Loading documents...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>Documents</h2>
      <div style={styles.documentList}>
        {documents.map((doc) => (
          <div key={doc.id} style={styles.documentCard}>
            <span style={styles.documentName}>{doc.title}</span>
            <div style={styles.buttonGroup}>
              <button
                style={{ ...styles.button, ...styles.viewButton }}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.viewButtonHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.viewButton.backgroundColor}
                onClick={() => handleView(doc.file)}
              >
                <FontAwesomeIcon icon={faEye}/>

              </button>
              <button
                style={{ ...styles.button, ...styles.downloadButton }}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.downloadButtonHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.downloadButton.backgroundColor}
                onClick={() => handleDownload(doc.file)}
              >
              <FontAwesomeIcon icon={faDownload}/>

              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentPageCoor;
