import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import BtnAddQuestion from "./Buttons/Manage/BtnAddQuestion.jsx";
import BtnAddSection from "./Buttons/Manage/BtnAddSection.jsx";
import { API_ENDPOINTS } from '../config.js';

const ManageEvaluationForm = () => {
    const location = useLocation();
    const { formId } = location.state || {}; // Retrieve formId from state
    const navigate = useNavigate();

    const [formDetails, setFormDetails] = useState({ title: "", description: "" });
    const [sections, setSections] = useState([]);
    const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
    const [addQuestionType, setAddQuestionType] = useState(null);
    const [selectedSectionId, setSelectedSectionId] = useState(null);

    // Fetch form details and sections when the component mounts
    useEffect(() => {
        if (!formId) {
            console.error("Form ID is missing.");
            return;
        }

        const fetchFormDetails = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.EVALUATION_TYPE_WITH_SECTIONS(formId));
                if (!response.ok) {
                    throw new Error("Failed to fetch form details");
                }
                const data = await response.json();

                // Update form details and sections with data from response
                setFormDetails({ title: data.name, description: data.description });
                setSections(data.sections || []);
            } catch (error) {
                console.error("Error fetching form details:", error);
            }
        };

        fetchFormDetails();
    }, [formId]);

    const handleBack = () => {
        navigate(-1);
    };

    // Simplified function to open the modal with the correct sectionId and questionType
    const openAddQuestionModal = (sectionId, questionType) => {
        console.log("Setting sectionId:", sectionId, "and questionType:", questionType); // Debugging output
        setSelectedSectionId(sectionId);
        setAddQuestionType(questionType);
        setIsAddQuestionModalOpen(true);
    };

    const handleAddNewQuestion = (questionData) => {
        const updatedSections = sections.map((section) => {
            if (section.section_id=== questionData.sectionId) {
                return {
                    ...section,
                    questions: [...section.questions, questionData]
                };
            }
            return section;
        });

        setSections(updatedSections);
    };

    const handleAddNewSection = (newSection) => {
        setSections([...sections, newSection]);
    };

    const renderInfoSection = (section) => (
        <div key={section.section_id} className="mb-4">
            <h3>{section.title}</h3>
            <Form.Control as="textarea" value={section.content} disabled className="mb-3" />
            <Button variant="warning" className="me-2">Edit</Button>
            <Button variant="danger">Delete</Button>
        </div>
    );

    const renderQuestionSection = (section) => {
        const isRating = section.question_type === "rating";
        const isMultipleChoice = section.question_type === "multiple_choice";
    
        return (
            <div key={section.section_id} className="mb-4">
                <h3>{section.title}</h3>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Question</th>
                            {isRating && <th>Rating Options</th>}
                            {isMultipleChoice && <th>Choices</th>}
                            <th>Is Fixed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {section.questions && section.questions.length > 0 ? (
                            section.questions.map((question, index) => (
                                <tr key={question.question_id || index}>
                                    <td>{index + 1}</td>
                                    <td>{question.text}</td>
                                    {isRating && (
                                        <td>
                                            {question.rating_options && question.rating_options.length > 0
                                                ? question.rating_options
                                                      .sort((a, b) => a.option_order - b.option_order)
                                                      .map((option) => ` ${option.value} - ${option.label}`)
                                                      .join(", ")
                                                : "No rating options"}
                                        </td>
                                    )}
                                    {isMultipleChoice && (
                                        <td>
                                            {question.multiple_choice_options && question.multiple_choice_options.length > 0
                                                ? question.multiple_choice_options
                                                      .sort((a, b) => a.option_order - b.option_order)
                                                      .map((option) => ` ${option.value} ${option.label}`)
                                                      .join(", ")
                                                : "No choices available"}
                                        </td>
                                    )}
                                    <td>{question.is_fixed ? "Fixed" : "Not Fixed"}</td>
                                    <td>
                                        <Button variant="warning" className="me-2">Edit</Button>
                                        <Button variant="danger">Delete</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={isRating || isMultipleChoice ? 5 : 4} className="text-center">No questions available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Button
                    variant="primary"
                    onClick={() => {
                        console.log("Button clicked for section:", section.section_id); // Log the section ID here
                        openAddQuestionModal(section.section_id, section.question_type); // Pass section.id and question_type directly
                    }}
                >
                    Add {section.question_type === "rating" ? "Rating" : "Multiple Choice"} Question
                </Button>
            </div>
        );
    };
    
    

    useEffect(() => {
        // Debug log to ensure sectionId is being set
        console.log("Selected Section ID:", selectedSectionId);
        console.log("Question Type:", addQuestionType);
    }, [selectedSectionId, addQuestionType]);

    return (
        <Container fluid className="vh-80 d-flex flex-column justify-content-center m-5">
            <Row>
                <Button variant="link" onClick={handleBack} className="d-flex align-items-center text-success me-3">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>
            </Row>
            <Row>
                <Col><h1>{formDetails.title}</h1></Col>
            </Row>
            <Row>
                <Col><p>{formDetails.description}</p></Col>
            </Row>

            {sections.map((section) =>
                section.section_type === "info" ? renderInfoSection(section) : renderQuestionSection(section)
            )}

            <Row>
                <Col className="d-flex align-items-center">
                    <BtnAddSection onSectionAdded={handleAddNewSection} evalTypeId={formId} />
                </Col>
            </Row>

            <BtnAddQuestion
                show={isAddQuestionModalOpen}
                onHide={() => setIsAddQuestionModalOpen(false)}
                questionType={addQuestionType}
                sectionId={selectedSectionId} // Pass the correct sectionId
                onSubmit={handleAddNewQuestion}
            />
        </Container>
    );
};

export default ManageEvaluationForm;
