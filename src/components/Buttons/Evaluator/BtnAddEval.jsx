import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { API_ENDPOINTS } from "../../../config";

const BtnAddEval = () => {
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [evaluationTypes, setEvaluationTypes] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [formData, setFormData] = useState({
        proposal: '',
        activity: '',
        eval_type: ''
    });

    const navigate = useNavigate();

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setFormData({
            proposal: '',
            activity: '',
            eval_type: ''
        });
        setShowModal(false);
    };

    const handleShowConfirmation = () => {
        setShowModal(false); // Close the Add Evaluation Form modal
        setShowConfirmation(true); // Show the confirmation modal
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
        setFormData({
            proposal: '',
            activity: '',
            eval_type: ''
        });
    };

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    console.error("No access token found");
                    return;
                }
                const response = await axios.get(`${API_ENDPOINTS.PROPOSAL_LIST_CREATE}?status=Approved%20by%20Barangay`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProposals(response.data || []);
            } catch (error) {
                console.error("Error fetching proposals:", error);
            }
        };

        const fetchEvaluationTypes = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    console.error("No access token found");
                    return;
                }
                const response = await axios.get(API_ENDPOINTS.EVALUATION_TYPE_LIST, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEvaluationTypes(response.data || []);
            } catch (error) {
                console.error("Error fetching evaluation types:", error);
            }
        };

        fetchProposals();
        fetchEvaluationTypes();
    }, []);

    // Fetch activities based on selected proposal
    useEffect(() => {
        if (formData.proposal) {
            axios.get(API_ENDPOINTS.ACTIVITY_SCHEDULE_BY_PROPOSAL(formData.proposal))
                .then((response) => {
                    setFilteredActivities(response.data || []);
                })
                .catch((error) => {
                    console.error("Error fetching activities:", error);
                });
        } else {
            setFilteredActivities([]);
        }
    }, [formData.proposal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
            ...(name === "proposal" ? { activity: "" } : {}) // Reset activity when proposal changes
        }));
    };

    const handleSubmit = () => {
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                console.error("No access token found");
                alert("You are not logged in or your session has expired.");
                return;
            }
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?.user_id; // Use optional chaining

            if (!userId) {
                throw new Error("User ID not found in token");
            }

            const payload = {
                proposal_id: formData.proposal,
                activity_id: formData.activity,
                evaluation_type_id: formData.eval_type,
                user_id: userId // Pass the logged-in user ID
            };
            setFormData({
                proposal: '',
                activity: '',
                eval_type: ''
            });
            handleCloseConfirmation(); // Close the confirmation modal
            navigate("/manage/eval-create/", { state: payload });
        } catch (error) {
            console.error("Error handling submission:", error);
            alert("An error occurred while processing the request.");
        }
    };

    return (
        <>
            <Button
                onClick={handleShowModal}
                className="me-3"
                style={{ backgroundColor: "#71A872", border: "0px", color: "white" }}
            >
                Add Evaluation
            </Button>

            <Modal size="lg" centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <h2 className="h2">Add Evaluation Form</h2>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" as={Row}>
                            <Form.Label column sm={2}>Proposal:</Form.Label>
                            <Col>
                                <Form.Select
                                    name="proposal"
                                    value={formData.proposal}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select Proposal</option>
                                    {proposals.map((proposal) => (
                                        <option key={proposal.proposal_id} value={proposal.proposal_id}>
                                            {proposal.title}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Select Title of the Activity:</Form.Label>
                            <Col>
                                <Form.Select
                                    name="activity"
                                    value={formData.activity}
                                    onChange={handleChange}
                                    disabled={!formData.proposal}
                                >
                                    <option value="">Select an Activity</option>
                                    {filteredActivities.map((activity) => (
                                        <option key={activity.id} value={activity.id}>
                                            {activity.activity_title}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Select Evaluation Type:</Form.Label>
                            <Col>
                                <Form.Select
                                    name="eval_type"
                                    value={formData.eval_type}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Evaluation Type</option>
                                    {evaluationTypes.map((type) => (
                                        <option key={type.evaluation_type_id} value={type.evaluation_type_id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={handleShowConfirmation}
                        style={{ backgroundColor: "#71A872", border: "0px", color: "white" }}
                        variant="success"
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Confirmation Modal */}
            <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Submission</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to add this evaluation form?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmation}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BtnAddEval;
