import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import BtnCoorViewApprovedProposal from "../Buttons/Coordinator/BtnCoorViewApprovedProposal";
import "../table.css";
import ProposalPB from "../ProposalPB";
import { API_ENDPOINTS } from "../../config";

const CoorApprovedPro = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch approved proposals for the current user
    useEffect(() => {
        const fetchApprovedProposals = async () => {
            const token = localStorage.getItem("access_token"); // Get the token from localStorage
            if (!token) {
                console.error("No token found.");
                setLoading(false); // Stop loading if there's no token
                return;
            }

            try {
                // Fetch only approved proposals for the current user
                const response = await fetch(`${API_ENDPOINTS.PROPOSAL_LIST_CREATE}?status=Approved by Barangay`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,  // Add the Authorization header
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProposals(data); // Update the proposals state with the fetched data
                    setLoading(false); // Stop loading once data is fetched
                } else if (response.status === 401) {
                    console.error("Unauthorized: Check if the token is valid.");
                    setLoading(false);
                } else {
                    console.error("Error fetching proposals:", response.statusText);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching proposals:", error);
                setLoading(false);
            }
        };

        fetchApprovedProposals();
    }, []);

    return (
        <Container className="container-fluid">
            <div className="container">
                <h1>APPROVED PROPOSALS</h1>
            </div>
           
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table responsive bordered striped hover className="tableStyle">
                    <thead>
                        <tr>
                            <th>Proposal Title</th>
                            <th>Location</th>
                            <th>Target Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {proposals.length > 0 ? (
                            proposals.map((proposal) => (
                                <tr key={proposal.proposal_id}>
                                    <td>{proposal.title}</td>
                                    <td>{proposal.location}</td>
                                    <td>{new Date(proposal.target_date).toLocaleDateString()}</td>
                                    <td><BtnCoorViewApprovedProposal proposal={proposal} /></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No approved proposals found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default CoorApprovedPro;
