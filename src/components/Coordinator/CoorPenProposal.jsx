import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import BtnViewApproveProposal from "../Buttons/BtnViewApproveProposal";  
import BtnAddProposal from "../Buttons/Coordinator/BtnAddProposal";
import BtnPendingRejectFilter from "../Buttons/BtnPendingRejectFilter";
import "../table.css";
import { API_ENDPOINTS } from "../../config";

const CoorPenProposal = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("Pending");  // Filter state

    const fetchProposals = async (status) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error("No token found.");
            setLoading(false);
            return;
        }

        let filter = '';
    
        if (filterStatus === 'Rejected') {
            filter = 'status=Rejected';
        } else if (filterStatus === 'Pending') {
            filter = 'status=Pending';
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
        fetchProposals(filterStatus);
    }, [filterStatus]);

    const handleProposalApproved = () => {
        setLoading(true);
        fetchProposals(filterStatus);
    };

    return (
        <Container fluid>
            <div className="container">
                <h1>{filterStatus.toUpperCase()} PROPOSALS</h1>
            </div>

            {/* Filter Buttons */}
            <Row className="mb-3">
                <Col className="d-flex justify-content-start">
                    <BtnPendingRejectFilter setFilterStatus={setFilterStatus} />
                </Col>
            </Row>

            {loading ? (
                <p>Loading...</p>
            ) : proposals.length === 0 ? (
                <p>No {filterStatus.toLowerCase()} proposals found.</p>
            ) : (
                <Table responsive bordered striped hover className="tableStyle">
                    <thead>
                        <tr>
                            <th>Proposal Title</th>
                            <th>Location</th>
                            <th>Target Date</th>
                            <th>Status</th>
                            <th>Version</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proposals.map((proposal) => (
                            <tr key={proposal.proposal_id}>
                                <td>{proposal.title}</td>
                                <td>{proposal.location}</td>
                                <td>{new Date(proposal.target_date).toLocaleDateString()}</td>
                                <td>{proposal.status}</td>
                                <td>{proposal.current_version || 'N/A'}</td>
                                <td>
                                    <BtnViewApproveProposal 
                                        proposal={proposal} 
                                        onApprove={handleProposalApproved} 
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <div className="mb-3 d-flex justify-content-end">
                <BtnAddProposal style={{ backgroundColor: "#71A872", border: "0px" }} />
            </div>
        </Container>
    );
};

export default CoorPenProposal;
