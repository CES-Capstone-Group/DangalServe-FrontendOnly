import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import "../table.css";
import { API_ENDPOINTS } from "../../config";

const BrgyApprovedPro = () => {
    const [proposals, setProposals] = useState([]); // State to hold approved proposals
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        const fetchApprovedProposals = async () => {
            try {
                const token = localStorage.getItem('access_token'); // Get the auth token if necessary
                const response = await fetch(API_ENDPOINTS.BARANGAY_APPROVED_PROPOSALS, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProposals(data); // Update state with the fetched proposals
                } else {
                    console.error("Failed to fetch approved proposals");
                }
            } catch (error) {
                console.error("Error fetching proposals:", error);
            } finally {
                setLoading(false); // Set loading to false when fetch completes
            }
        };

        fetchApprovedProposals();
    }, []); // Empty dependency array means this useEffect runs once when the component mounts

    if (loading) {
        return <div>Loading...</div>; // Show loading spinner while fetching data
    }

    return (
        <Container fluid>
            <div className="container">
                <h1>APPROVED PROPOSALS</h1>
            </div>

            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                    <tr>
                        <th>Proposal Title</th>
                        <th>Location</th>
                        <th>Target Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {proposals.length > 0 ? (
                        proposals.map((proposal) => (
                            <tr key={proposal.proposal_id}>
                                <td>{proposal.title}</td>
                                <td>{proposal.location}</td>
                                <td>{new Date(proposal.target_date).toLocaleDateString()}</td>
                                <td>{proposal.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No approved proposals found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default BrgyApprovedPro;
