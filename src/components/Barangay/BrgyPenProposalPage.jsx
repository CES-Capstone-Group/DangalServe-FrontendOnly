import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import {jwtDecode} from "jwt-decode"; // To decode JWT and get user info
import "../table.css";
import BtnViewApproveProposal from "../Buttons/BtnViewApproveProposal";
import { API_ENDPOINTS } from "../../config";

const BrgyPenProposalPage = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true); // Start with loading = true
    const [department, setDepartment] = useState("");

    const fetchProposals = async (status) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error("No token found.");
            setLoading(false);
            return;
        }
        
        try {
            const response = await fetch(`${API_ENDPOINTS.PROPOSAL_LIST_CREATE}?${filter}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProposals(data);
            } else if (response.status === 401) {
                console.error('Unauthorized: Check if the token is valid.');
            } else {
                console.error('Error fetching proposals:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching proposals:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchProposals();
    }, []);

    const handleProposalApproved = () => {
        setLoading(true);
        fetchProposals();
    };
    // Fetch the current user's department from JWT token (or from API)
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const departmentFromToken = decodedToken.barangay; // Check if department is present in the token
                if (departmentFromToken) {
                    setDepartment(departmentFromToken);
                } else {
                    console.error("Department not found in token.");
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                setLoading(false);
            }
        } else {
            console.error("No token found.");
            setLoading(false); // If no token, stop loading
        }
    }, []);

    // Fetch all proposals where the status is 'Approved by President' and partner community matches department
    useEffect(() => {
        const fetchProposals = async () => {
            if (!department) {
                setLoading(false);
                return;
            }
        
            const token = localStorage.getItem("access_token");
            if (!token) {
                console.error("No token found.");
                setLoading(false);
                return;
            }
        
            try {
                const queryParams = new URLSearchParams({
                    status__in: ["Approved by Director", "Partly Approved by Barangay"].join(','),
                    partner_community: department,
                });
        
                const response = await fetch(`${API_ENDPOINTS.PROPOSAL_LIST_CREATE}?${queryParams.toString()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
        
                if (response.ok) {
                    const data = await response.json();
                    // Add an additional safeguard to filter exactly by "Approved by Barangay"
                    const filteredProposals = data.filter(proposal => proposal.status === "Approved by Director" || proposal.status === "Partly Approved by Barangay");
                    setProposals(filteredProposals); // Set the proposals after filtering
                } else if (response.status === 401) {
                    console.error("Unauthorized: Check if the token is valid.");
                } else {
                    console.error("Error fetching proposals:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching proposals:", error);
            } finally {
                setLoading(false);
            }
        };
        

        if (department) {
            fetchProposals();
        }
    }, [department]); // Re-fetch when department is set

    return (
        <Container fluid>
            <div className="container">
                <h1> PENDING PROPOSALS </h1>
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
                            <th>Status</th>
                            <th>Actions</th>
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
                                    <td><BtnViewApproveProposal 
                                        proposal={proposal} 
                                        onApprove={handleProposalApproved} 
                                     /></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No pending proposals found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default BrgyPenProposalPage;
