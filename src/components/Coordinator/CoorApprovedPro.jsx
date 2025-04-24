import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../../config";
import { jwtDecode } from "jwt-decode";

const CoorApprovePro = () => {
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
                const decodedToken = jwtDecode(token);
                const department = decodedToken.department.dept_id;
                const response = await fetch(
                    `${API_ENDPOINTS.PROPOSAL_LIST_CREATE}?status=Approved%20by%20President`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                
                console.log(department)
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
            // console.log(departmentProposals)
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
                console.log(eventData);
                navigate("/coor/event-page", {
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
        <Container fluid className="mt-5">
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <Row className="mb-4">
                    <h1>APPROVED PROPOSALS</h1>
                    {departmentProposals.map((proposal) => (
                        <Col key={proposal.proposal_id} xs={12} className="mb-3"> {/* Use xs={12} to make it full width */}
                            <Card
                                className="border shadow"
                                onClick={() => handleProposalClick(proposal)}
                                style={{
                                    cursor: "pointer",
                                    border: "1px solid #71A872", // Adjust border color
                                    borderRadius: "8px", // Smooth border edges
                                    padding: "1rem", // Add some padding
                                }}
                            >
                                <Card.Body>
                                    <Card.Title
                                        className="text-success"
                                        style={{
                                            fontSize: "20px", // Control text size
                                            fontWeight: "bold", // Emphasize text
                                            wordWrap: "break-word", // Wrap long words
                                            overflow: "hidden", // Prevent overflow
                                            textOverflow: "ellipsis", // Add ellipsis for overflow
                                            display: "-webkit-box", // Enable multi-line ellipsis
                                            WebkitLineClamp: 2, // Limit to 2 lines
                                            WebkitBoxOrient: "vertical",
                                        }}
                                    >
                                        {proposal.title}
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default CoorApprovePro;
