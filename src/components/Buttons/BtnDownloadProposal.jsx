import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { API_ENDPOINTS } from "../../config";

const BtnDownloadProposal = ({ proposal }) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        // console.log('clicked')
        setLoading(true); // Start loading
        try {
            const token = localStorage.getItem('access_token'); // Get the token from localStorage
            if (!token) {
                console.error("No token found.");
                setLoading(false); // Stop loading if there's no token
                return;
            }
            const timestamp = new Date().getTime();
            const response = await fetch(`${API_ENDPOINTS.DOWNLOAD_PROPOSAL_DOC(proposal.proposal_id)}/?_=${timestamp}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add this if you are using token-based authentication
                }
            });
            if (response.ok) {
                // Get the filename from Content-Disposition header if present
                const disposition = response.headers.get('Content-Disposition');
                let filename = '';
                
                if (disposition && disposition.includes('attachment')) {
                    const filenameMatch = disposition.match(/filename="(.+)"/);
                    if (filenameMatch && filenameMatch.length === 2) {
                        filename = filenameMatch[1]; // Extract filename from the header
                    }
                }
    
                // If no filename is found in the header, use a default filename
                if (!filename) {
                    filename = `proposal_${proposal.proposal_id}.pdf`; // Default name
                }
    
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename); // Use the extracted or default filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.error('Failed to download document');
            }
        } catch (error) {
            console.error('Error while downloading the file:', error);
        } finally {
            setLoading(false); // Stop loading after download attempt
        }
    };

    return (
        <Button variant="primary" onClick={handleDownload} disabled={loading}>
            {loading ? "Downloading..." : "Download Proposal"}
        </Button>
    );
};

export default BtnDownloadProposal;
