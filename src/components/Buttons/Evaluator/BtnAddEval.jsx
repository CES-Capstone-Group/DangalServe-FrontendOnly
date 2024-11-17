import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../../config";
//retry for pushing
const BtnAddEval = () => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => { setShowModal(true) };
    const handleCloseModal = () => { setShowModal(false) };
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState('');
    const navigate = useNavigate();
    const [proposals, setProposals] = useState([]);
    const [loadingProposals, setLoadingProposals] = useState(true);
    const [proposalTitle, setProposalTitle] = useState(""); 
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.ACTIVITY_SCHEDULE_LIST);                
                setActivities(response.data); // Set the department data in state
            } catch (error) {
                console.error("There was an error fetching the department data!", error);
            }
        };
        fetchActivity();
    }, []);

    useEffect(() => {
        // Fetch proposals from API
        const fetchProposals = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                console.error("No token found.");
                setLoadingProposals(false);
                return;
            }

            try {
                const response = await fetch(`${API_ENDPOINTS.PROPOSAL_LIST_CREATE}?status=Approved%20by%20Barangay`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProposals(data);
                } else {
                    console.error("Error fetching approved proposals:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching approved proposals:", error);
                setError("Failed to load proposals");
            } finally {
                setLoadingProposals(false);
            }
        };

        fetchProposals();
    }, []);
    const handleActivityChange = (e) => {
        setSelectedActivity(e.target.value);  // Capture selected department
    };

    return (
        <>
            <Button onClick={handleShowModal} className='me-3' style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }}>Add Evaluation</Button>

            <Modal size="lg" centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <h2 className="h2">Add Evaluation Form</h2>
                </Modal.Header>
                <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" as={Row} controlId="proposalTitle">
                            <Form.Label column sm={2}>Proposal:</Form.Label>
                            <Col>
                                <Form.Select
                                    value={proposalTitle}
                                    onChange={(e) => setProposalTitle(e.target.value)}
                                >
                                    <option value="" disabled>Select Proposal</option>
                                    {proposals.map((proposal) => (
                                        <option key={proposal.id} value={proposal.title}>
                                            {proposal.title}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Select Title of the Activity:</Form.Label>
                                <Col>
                                    <Form.Select value={selectedActivity} onChange={handleActivityChange}>
                                        <option value="">Select an Activity</option>
                                        {activities.map(activity => (
                                            <option key={activity.id} value={activity.id}>
                                                {activity.activity_title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal} style={{backgroundColor:"#71A872", border: '0px', color: 'white'}} variant='success' type="submit">Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

};

export default BtnAddEval;