import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../../config";

const AdminDeptApprovedPro = () => {
    const { departmentId } = useParams();
    const [departmentProposals, setDepartmentProposals] = useState([]);
    const [departmentName, setDepartmentName] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchDepartmentProposals = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) throw new Error("No token found.");

                const response = await fetch(
                    `${API_ENDPOINTS.PROPOSAL_LIST_CREATE}?status=Approved by Barangay&department=${departmentId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setDepartmentProposals(data);
                } else {
                    console.error("Error fetching department proposals:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching department proposals:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchDepartmentName = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.DEPARTMENT_DETAIL);
                if (response.ok) {
                    const data = await response.json();
                    setDepartmentName(data.dept_name);
                }
            } catch (error) {
                console.error("Error fetching department name:", error);
            }
        };

        if (location.state?.departmentProposals && location.state?.departmentName) {
            setDepartmentProposals(location.state.departmentProposals);
            setDepartmentName(location.state.departmentName);
            setLoading(false);
        } else {
            fetchDepartmentProposals();
            fetchDepartmentName();
        }
    }, [departmentId, location.state]);

    const handleProposalClick = async (proposal) => {
        try {
            const response = await fetch(
                API_ENDPOINTS.ACTIVITY_SCHEDULE_BY_PROPOSAL(proposal.proposal_id)
            );
            if (response.ok) {
                const eventData = await response.json();
                navigate("/admin/event-page", {
                    state: {
                        proposalEvents: eventData,
                        proposalName: proposal.title,
                    },
                });
            } else {
                console.error("Error fetching proposal events:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching proposal events:", error);
        }
    };

    return (
        <Container fluid>
            <Row>
                <Button
                    variant="link"
                    onClick={() => navigate("/admin/approved-proposal")}
                    className="backBtn d-flex align-items-center text-success"
                >
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>
                <h2 className="mb-4">{departmentName} Proposals</h2>
            </Row>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <Row className="mb-4">
                    {departmentProposals.map((proposal) => (
                        <Col key={proposal.proposal_id} md={6} className="mb-3">
                            <Card
                                className="department-card1"
                                onClick={() => handleProposalClick(proposal)}
                                style={{ cursor: "pointer" }}
                            >
                                <Card.Body>
                                    <Card.Title className="text-success">{proposal.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default AdminDeptApprovedPro;
