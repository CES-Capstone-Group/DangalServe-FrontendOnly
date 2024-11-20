import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container, Table } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../../config";
import axios from "axios";

const EvalCreate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const payload = location.state; // Retrieve the payload passed from BtnAddEval

    const [sections, setSections] = useState([]);
    const [activityDetails, setActivityDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivityDetails = async () => {
            try {
                if (!payload || !payload.evaluation_type_id || !payload.activity_id) {
                    setError("Required data (evaluation type or activity ID) is missing.");
                    return;
                }

                // Fetch activity details
                const activityResponse = await axios.get(
                    API_ENDPOINTS.ACTIVITY_SCHEDULE_DETAIL(payload.activity_id)
                );
                setActivityDetails(activityResponse.data);

                // Fetch sections and questions
                const sectionsResponse = await axios.get(
                    API_ENDPOINTS.GET_FIXED_EVALUATION_DETAIL(payload.evaluation_type_id)
                );
                setSections(sectionsResponse.data.sections || []);
            } catch (err) {
                setError(err.message || "Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchActivityDetails();
    }, [payload]);

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    const handleCreateForm = async () => {
        try {
            const formResponse = await axios.post(API_ENDPOINTS.EVALUATION_FORM_CREATE, {
                title: payload.activity_title,
                evaluation_type: payload.evaluation_type_id,
                created_by: payload.user_id,
                activity_schedule_id: payload.activity_id,
                proposal_id: payload.proposal_id,
                status: "active",
            });

            const formId = formResponse.data.form_id;

            for (const [index, section] of sections.entries()) {
                const sectionResponse = await axios.post(API_ENDPOINTS.FORM_SECTION_CREATE, {
                    form: formId,
                    section: section.section_id,
                    section_order: index + 1,
                });

                const sectionId = sectionResponse.data.form_section_id;

                for (const [qIndex, question] of (section.questions || []).entries()) {
                    await axios.post(API_ENDPOINTS.FORM_QUESTION_CREATE, {
                        form_section: sectionId,
                        question: question.question_id,
                        question_order: qIndex + 1,
                    });
                }
            }

            alert("Form created successfully!");
            navigate("/evaluation-forms");
        } catch (err) {
            console.error(err);
            alert("Failed to create the form. Please try again.");
        }
    };

    const renderInfoSection = (section) => (
        <div key={section.section_id} className="mb-5">
            <h3 className="mb-3">{section.title}</h3>
            <p>{section.content || "No content available"}</p>
        </div>
    );

    const renderRatingQuestions = (questions) => (
        <Table bordered responsive className="mb-4 tableStyle">
            <thead>
                <tr>
                    <th>Question</th>
                    {(questions[0]?.rating_options || []).map((option) => (
                        <th key={option.option_id}>{option.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {questions.map((question) => (
                    <tr key={question.question_id}>
                        <td>{question.text}</td>
                        {(question.rating_options || []).map((option) => (
                            <td style={{ width: '10%' }} key={option.option_id}>
                                <input
                                    type="radio"
                                    name={`question-${question.question_id}`}
                                    value={option.value}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );

    const renderMultipleChoiceQuestions = (questions) => (
        <div style={{ marginLeft: '10px' }}>
            {questions.map((question, index) => (
                <div key={question.question_id} className="mb-4">
                    <h5>{`${index + 1}. ${question.text}`}</h5>
                    <div>
                        {(question.multiple_choice_options || []).map((option) => (
                            <label key={option.option_id} className="d-block">
                                <input
                                    type="radio"
                                    name={`question-${question.question_id}`}
                                    value={option.label}
                                />{" "}
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderOpenEndedQuestions = (questions) => (
        <div>
            {questions.map((question, index) => (
                <div key={question.question_id} className="mb-4">
                    <h5>{`${index + 1}. ${question.text}`}</h5>
                    <textarea
                        className="form-control"
                        rows="3"
                        name={`question-${question.question_id}`}
                    />
                </div>
            ))}
        </div>
    );

    const renderSection = (section) => (
        <div key={section.section_id} className="mb-5">
            {section.section_type === "info" && renderInfoSection(section)}
            {section.question_type === "rating" && renderRatingQuestions(section.questions || [])}
            {section.question_type === "multiple_choice" &&
                renderMultipleChoiceQuestions(section.questions || [])}
            {section.question_type === "open_ended" &&
                renderOpenEndedQuestions(section.questions || [])}
        </div>
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <Container fluid className="py-4 mt-5 d-flex flex-column justify-content-center m-5">
            <Row>
                <Button
                    variant="link"
                    onClick={handleBack}
                    className="backBtn d-flex align-items-center text-success me-3"
                >
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>
            </Row>
            <Row>
                <Col>
                    <h1 id="propHeader" className="text-center mt-4 mb-4">
                        Evaluation Form Creation
                    </h1>
                </Col>
            </Row>
            <div id="conCard" style={{
                padding: '35px',
                borderRadius: '8px'
            }}>
                {activityDetails && (
                    <div className="mb-5" style={{ lineHeight: '1.6' }}>
                        <h1 className="mb-4" style={{ fontWeight: '600', color: '#333' }}>Activity Details</h1>
                        <p style={{fontSize: '20px'}}><strong>Title of the Activity:</strong> {activityDetails.activity_title || "N/A"}</p>
                        <p style={{fontSize: '20px'}}><strong>Date:</strong> {activityDetails.target_date || "N/A"}</p>
                        <p style={{fontSize: '20px'}}><strong>Venue:</strong> {activityDetails.activity_venue || "N/A"}</p>
                        <p style={{fontSize: '20px'}}><strong>Activity Objectives:</strong> {activityDetails.activity_objectives || "N/A"}</p>
                    </div>
                )}
                {sections.map((section) => renderSection(section))}
                <Row className="mt-4">
                    <Col className="d-flex justify-content-end">
                        <Button variant="success" onClick={handleCreateForm}>
                            Create Form
                        </Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default EvalCreate;
