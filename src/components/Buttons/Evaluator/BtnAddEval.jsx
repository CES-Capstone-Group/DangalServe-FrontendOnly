import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { API_ENDPOINTS } from "../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
        activityTitle: '',
        eval_type: ''
    });

    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({}); // Validation errors state


    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setFormData({
            proposal: '',
            activity: '',
            activityTitle: '',
            eval_type: ''
        });
        setShowModal(false);
        setValidationErrors({});
    };

    const handleShowConfirmation = () => {
        if (!validateForm()) return; // Exit if form validation fails
        setShowModal(false); // Close the Add Evaluation Form modal
        setShowConfirmation(true); // Show the confirmation modal
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
        setFormData({
            proposal: '',
            activity: '',
            activityTitle: '',
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
                const response = await axios.get(`${API_ENDPOINTS.PROPOSAL_LIST_CREATE}?status=Approved%20by%20President`, {
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

        if (name === "activity") {
            const selectedActivity = filteredActivities.find((activity) => activity.id === parseInt(value));
            setFormData((prevState) => ({
                ...prevState,
                activity: value,
                activityTitle: selectedActivity ? selectedActivity.activity_title : ''
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
                ...(name === "proposal" ? { activity: "", activityTitle: "" } : {}) // Reset activity and title when proposal changes
            }));
        }

        // Clear validation error for the field being changed
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };


    const validateForm = () => {
        const errors = {};
        if (!formData.proposal) errors.proposal = "Please select a proposal.";
        if (!formData.activity) errors.activity = "Please select an activity.";
        if (!formData.eval_type) errors.eval_type = "Please select an evaluation type.";

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
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
            const userId = decodedToken?.user_id;

            if (!userId) {
                throw new Error("User ID not found in token");
            }

            const selectedActivityDetails = filteredActivities.find(
                (activity) => activity.id === parseInt(formData.activity)
            );

            if (!selectedActivityDetails) {
                console.error("Activity not found");
                return;
            }

            // Debugging payload
            console.log("Payload:", {
                proposal_id: formData.proposal,
                activity_id: formData.activity,
                activity_title: selectedActivityDetails.activity_title,
                evaluation_type_id: formData.eval_type,
                user_id: userId,
            });

            // Navigate to ImpactEvalForm with state
            navigate("eval-create", {
                state: {
                    activity_id: formData.activity,
                    title: selectedActivityDetails.activity_title || "Default Title",
                    date: selectedActivityDetails.target_date || "Default Date",
                    activity_venue: selectedActivityDetails.activity_venue || "Default Venue",
                    activity_objectives: selectedActivityDetails.activity_objectives || "Default Objectives",
                    proposal_id: formData.proposal,
                    evaluation_type_id: formData.eval_type,
                    user_id: userId
                },
            });

            // Clear form data and close modal
            setFormData({
                proposal: "",
                activity: "",
                activityTitle: "",
                eval_type: "",
            });
            handleCloseConfirmation();
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
                <FontAwesomeIcon icon={faPlus} size={16} /> {/* Add the icon */}
                Add Evaluation
            </Button>

            <Modal size="lg" centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <h2 className="h2">Add Evaluation Form</h2>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" as={Row}>
                            <Form.Label column sm={2}>Proposal:<span style={{ color: "red" }}>*</span></Form.Label>
                            <Col>
                                <Form.Select
                                    name="proposal"
                                    value={formData.proposal}
                                    onChange={handleChange}
                                    isInvalid={!!validationErrors.proposal}
                                >
                                    <option value="" disabled>Select Proposal</option>
                                    {proposals.map((proposal) => (
                                        <option key={proposal.proposal_id} value={proposal.proposal_id}>
                                            {proposal.title}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.proposal}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Select Title of the Activity:<span style={{ color: "red" }}>*</span></Form.Label>
                            <Col>
                                <Form.Select
                                    name="activity"
                                    value={formData.activity}
                                    onChange={handleChange}
                                    disabled={!formData.proposal}
                                    isInvalid={!!validationErrors.activity}
                                >
                                    <option value="">Select an Activity</option>
                                    {filteredActivities.map((activity) => (
                                        <option key={activity.id} value={activity.id}>
                                            {activity.activity_title}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.activity}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Select Evaluation Type:<span style={{ color: "red" }}>*</span></Form.Label>
                            <Col>
                                <Form.Select
                                    name="eval_type"
                                    value={formData.eval_type}
                                    onChange={handleChange}
                                    isInvalid={!!validationErrors.eval_type}
                                >
                                    <option value="">Select Evaluation Type</option>
                                    {evaluationTypes.map((type) => (
                                        <option key={type.evaluation_type_id} value={type.evaluation_type_id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.eval_type}
                                </Form.Control.Feedback>
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
