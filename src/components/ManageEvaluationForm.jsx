import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Table, Button, Row, Col, Form, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import BtnAddQuestion from "./Buttons/Manage/BtnAddQuestion.jsx";
import BtnAddSection from "./Buttons/Manage/BtnAddSection.jsx";
import BtnEditDelSection from "./Buttons/Manage/BtnEditDelSection.jsx";
import BtnEditDelQuestion from "./Buttons/Manage/BtnEditDelQuestion.jsx";
import { API_ENDPOINTS } from '../config.js';

const ManageEvaluationForm = () => {
    const location = useLocation();
    const { formId } = location.state || {};
    const navigate = useNavigate();

    const [formDetails, setFormDetails] = useState({ title: "", description: "" });
    const [sections, setSections] = useState([]);
    const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
    const [addQuestionType, setAddQuestionType] = useState(null);
    const [selectedSectionId, setSelectedSectionId] = useState(null);

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

    const fetchUpdatedSections = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.EVALUATION_TYPE_WITH_SECTIONS(formId));
            if (!response.ok) {
                throw new Error("Failed to re-fetch form details");
            }
            const data = await response.json();
            setSections(data.sections || []);
        } catch (error) {
            console.error("Error re-fetching sections:", error);
        }
    };

    const handleAddNewSection = async (newSection) => {
        const sectionWithDefaults = {
            ...newSection,
            questions: newSection.question_type === "open_ended" ? [] : newSection.questions || [],
        };
        setSections([...sections, sectionWithDefaults]);
        await fetchUpdatedSections();
    };

    const openAddQuestionModal = (sectionId, questionType) => {
        setSelectedSectionId(sectionId);
        setAddQuestionType(questionType);
        setIsAddQuestionModalOpen(true);
    };

    const renderSectionHeader = (section) => (
        <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
                <h3 className="d-inline-block me-2">{section.title}</h3>
                {section.is_fixed && <Badge bg="info">Fixed</Badge>}
            </div>
            <div>
                <BtnEditDelSection
                    section={section}
                    onSectionUpdated={fetchUpdatedSections}
                />
            </div>
        </div>
    );

    const renderInfoSection = (section) => (
        <div key={section.section_id} className="mb-4">
            {renderSectionHeader(section)}
            <Form.Control
                as="textarea"
                value={section.content || "No information provided"}
                readOnly
                className="mt-2"
            />
        </div>
    );

    const renderOpenEndedQuestions = (section) => {
        const questions = section.questions || [];
        return (
            <>
                {questions.map((question, index) => (
                    <div key={question.question_id || index} className="">
                        <h5 className="d-inline me-2">{`${index + 1}. ${question.text}`}</h5>
                        {question.is_fixed && <Badge className='mb-2' bg="info">Fixed</Badge>}
                        <Form.Control as="textarea" value={question.response} disabled className="mb-2" />
                        <BtnEditDelQuestion
                            question={question}
                            section={section} // Pass the section to BtnEditDelQuestion
                            onQuestionUpdated={fetchUpdatedSections}
                            onDelete={fetchUpdatedSections}
                        />
                    </div>
                ))}

            </>
        );
    };

    const renderQuestionSection = (section) => (
        <div key={section.section_id} className="mb-4">
            {renderSectionHeader(section)}
            {section.question_type === "open_ended" ? (
                renderOpenEndedQuestions(section)
            ) : (
                <Table responsive striped bordered hover className="tableStyle">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Question</th>
                            {section.question_type === "rating" && <th>Rating Options</th>}
                            {section.question_type === "multiple_choice" && <th>Choices</th>}
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
                                    {section.question_type === "rating" && (
                                        <td>
                                            {question.rating_options?.length
                                                ? question.rating_options.map(
                                                    (opt) => `${opt.value} - ${opt.label}  `
                                                ).join(", ") // Properly formatted with commas and spacing
                                                : "No rating options"}
                                        </td>
                                    )}
                                    {section.question_type === "multiple_choice" && (
                                        <td>
                                            {question.multiple_choice_options?.length
                                                ? question.multiple_choice_options.map(
                                                    (opt) => `${opt.value} - ${opt.label}  `
                                                ).join(", ") // Properly formatted with commas and spacing
                                                : "No choices available"}
                                        </td>
                                    )}
                                    <td>{question.is_fixed ? "Fixed" : "Not Fixed"}</td>
                                    <td>
                                        <BtnEditDelQuestion
                                            question={question}
                                            section={section} // Pass the section to BtnEditDelQuestion
                                            onQuestionUpdated={fetchUpdatedSections}
                                            onDelete={fetchUpdatedSections}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    No questions available. Please add one using the button below.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
            <div className='text-end'>
                <Button
                    variant="success"
                    className="mt-3"
                    onClick={() => openAddQuestionModal(section.section_id, section.question_type)}
                >
                    Add Question
                </Button>
            </div>
        </div>
    );

    return (
        <Container fluid className="py-4 mt-5 d-flex flex-column justify-content-center">
            <Row>
                <Button variant="link" onClick={handleBack} className="d-flex align-items-center text-success">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>
            </Row>
            <Row>
                <Col>
                    <h1>{formDetails.title}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>{formDetails.description}</p>
                </Col>
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
                sectionId={selectedSectionId}
                onSubmit={fetchUpdatedSections}
            />
        </Container>
    );
};

export default ManageEvaluationForm;
