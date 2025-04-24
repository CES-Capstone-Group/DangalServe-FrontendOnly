import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "/src/App.css";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { API_ENDPOINTS } from "../../config";
import axios from 'axios';

const ImpactEvalForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activityDetails, setActivityDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recommendations, setRecommendations] = useState("");
    const department = useState("");
    const [responses, setResponses] = useState({});

    const {
        division = "Name of the Division/Department/Organizing Team",
        activity_id ={},
        activity_objectives = {},
        activity_venue ={},
        selectedActivityDetails = {}, // Contains the activity details passed from the previous component
    } = location.state || {};

    useEffect(() => {
        if (activity_id) {
            const fetchActivityDetails = async () => {
                try {
                    const response = await fetch(ACTIVITY_SCHEDULE_DETAIL(activity_id));
                    if (!response.ok) {
                        throw new Error("Failed to fetch activity details.");
                    }
                    const data = await response.json();
                    setActivityDetails(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchActivityDetails();
        } else {
            setLoading(false);
        }
    }, [activity_id]);

    useEffect(() => {
        console.log("Received State in ImpactEvalForm:", location.state);
    }, [location.state]);

    const [text, setText] = useState("");

    const handleInputChange = (e) => {
        setText(e.target.value);
        e.target.style.height = "auto"; // Reset the height
        e.target.style.height = `${e.target.scrollHeight}px`; // Set the new height
    };

    const handleRadioChange = (question, value) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [question]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Ensure proper values are passed as strings
        const payload = {
            activity_schedule: selectedActivityDetails.id || "", // Ensure `activity_id` is sent as a string
            division_name: division || "",
            venue: selectedActivityDetails.activity_venue || "No Venue", // Use `selectedActivityDetails`
            objectives: selectedActivityDetails.activity_objectives || "No Objectives", // Use `selectedActivityDetails`
            Q1: responses.Q1 || "",
            Q2: responses.Q2 || "",
            Q3: responses.Q3 || "",
            Q4: responses.Q4 || "",
            Q5: responses.Q5 || "",
            Q6: responses.Q6 || "",
            Q7: responses.Q7 || "",
            Q8: responses.Q8 || "",
            Q9: responses.Q9 || "",
            Q10: responses.Q10 || "",
            Q11: responses.Q11 || "",
            Q12_recommendations: recommendations || "No Recommendations",
        };
    
        // Log the corrected payload to verify before sending
        console.log("Corrected Payload being sent to the server:", payload);
    
        try {
            const token = localStorage.getItem("access_token");
    
            const response = await fetch(`${API_ENDPOINTS.IMPACT_EVAL_LIST_CREATE}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include token in the header
                },
                body: JSON.stringify(payload), // Attach the payload as the request body
            });
    
            if (response.status === 201 || response.status === 200) {
                alert("Evaluation submitted successfully!");
                navigate(-1); // Redirect or navigate back
            } else {
                // Handle server errors
                const errorData = await response.json();
                console.error("Server error:", errorData);
                alert("Failed to submit evaluation. Please check the data.");
            }
        } catch (error) {
            console.error("Error submitting evaluation:", error);
            alert("Failed to submit the evaluation. Please try again.");
        }
    };


    return (
        <Container className="Formproposal">
            <h2 className="mt-4 mb-4" style={{ textAlign: "center" }} id="propHeader">
                Community Connection Impact Evaluation Form
            </h2>
            <Form className="form">
                {/* Division/Department */}
                <Form.Group as={Row} controlId="formDivisionDepartment" className="mb-4">
                    <Form.Label column sm={3}>
                        Name of the Division/Department/Organizing Team
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            disabled
                            readOnly
                            type="text"
                            value={division}
                            placeholder="Name of the Division/Department/Organizing Team"
                        />
                    </Col>
                </Form.Group>

                {/* Title of the Activity */}
                <Form.Group as={Row} controlId="formTitle" className="mb-4">
                    <Form.Label column sm={3}>Title of the Activity</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            disabled
                            readOnly
                            type="text"
                            value={selectedActivityDetails.activity_title || ""}
                            placeholder="Title of the Activity"
                        />
                    </Col>
                </Form.Group>

                {/* Date */}
                <Form.Group as={Row} controlId="formDate" className="mb-4">
                    <Form.Label column sm={3}>Date</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            disabled
                            readOnly
                            type="text"
                            value={selectedActivityDetails.target_date || ""}
                            placeholder="Date of the Activity"
                        />
                    </Col>
                </Form.Group>

                {/* Venue */}
                <Form.Group as={Row} controlId="formVenue" className="mb-4">
                    <Form.Label column sm={3}>Venue</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            disabled
                            readOnly
                            type="text"
                            value={selectedActivityDetails.activity_venue || ""}
                            placeholder="Venue"
                        />
                    </Col>
                </Form.Group>

                {/* Objectives */}
                <Form.Group as={Row} controlId="formObj" className="mb-4">
                    <Form.Label column sm={3}>Activity Objectives</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            disabled
                            readOnly
                            type="text"
                            value={selectedActivityDetails.activity_objectives || ""}
                            placeholder="Objectives of the Activity"
                        />
                    </Col>
                </Form.Group>

                {/* Instructions */}
                <h5>Directions:</h5>
                <p>Please select what best describes your answer on the items below using the rating scale specified for each item.</p>

                {/* Sample Questions */}
                {[
                    "What was the primary goal or objective of the community extension activity?",
                    "How effectively do you feel the activity addressed the needs of the target community?",
                    "Were the logistics and organization of the activity well-managed?",
                    "How would you rate the level of support and assistance provided to participants during the activity?",
                    "Did the activity foster meaningful engagement and interaction with community members?",
                    "To what extent did the activity promote awareness or understanding of relevant issues within the community?",
                    "Did the activity encourage collaboration and cooperation among participants?",
                    "How would you rate the level of engagement and participation among community members during the activity?",
                    "How do you perceive the impact of the activity on the community and its members?",
                    "How likely are you to participate in similar community extension activities in the future?",
                    "Overall, how would you rate your experience participating in this community extension activity?",

                ].map((question, index) => (
                    <Form.Group as={Row} controlId={`formQ${index + 1}`} className="mb-4" key={index}>
                        <Form.Label column sm={12} lg={6}>
                            {index + 1}. {question}
                        </Form.Label>
                        <Col sm={12} lg={6} className="mt-2">
                            <div className="d-flex flex-column">
                            {[
                                { label: "Excellent", value: 3 },
                                { label: "Neutral", value: 2 },
                                { label: "Poor", value: 1 },
                            ].map(({ label, value }) => (
                                <Form.Check
                                    label={label} // Display the text label
                                    value={value} // Assign the numeric value
                                    type="radio"
                                    name={`Q${index + 1}`}
                                    key={value}
                                    className="mb-2 me-lg-3"
                                    onChange={(e) => handleRadioChange(`Q${index + 1}`, e.target.value)}
                                />
                            ))}
                            </div>
                        </Col>
                    </Form.Group>
                ))}

                {/* Recommendations */}
                <Form.Group as={Row} controlId="formQ12" className="mb-4">
                    <Form.Label column sm={12}>
                        What recommendations do you have for improving future community extension activities?
                    </Form.Label>
                    <Row sm={12}>
                        <Form.Control
                            as="textarea"
                            onChange={handleInputChange}
                            style={{ overflow: "hidden" }}
                            rows={3}
                            placeholder="Enter your suggestions"
                        />
                    </Row>
                </Form.Group>

                {/* Submit and Cancel Buttons */}
                <div className="d-flex justify-content-end">
                    <Button
                        variant="success"
                        type="submit"
                        className="mt-4"
                        id="formbtn"
                        onClick={handleSubmit}
                        style={{ margin: ".5rem" }}
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={() => navigate(-1)}
                        variant="danger"
                        type="button"
                        className="mt-4"
                        id="formbtn"
                        style={{ margin: ".5rem" }}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
            <div style={{ padding: "10px" }}></div>
        </Container>
    );
};

export default ImpactEvalForm;
