import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../../../config";

const BtnEditDelQuestion = ({ question, section, onQuestionUpdated, onDelete }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [questionText, setQuestionText] = useState("");
    const [isFixed, setIsFixed] = useState(false);
    const [choices, setChoices] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (showEdit) {
            loadQuestionData();
        }
    }, [showEdit]);

    const loadQuestionData = async () => {
        try {
            setIsLoading(true);
            setQuestionText(question.text || "");
            setIsFixed(question.is_fixed || false);

            if (section.question_type === "multiple_choice") {
                const url = `${API_ENDPOINTS.MULTIPLE_CHOICE_OPTION_LIST}?question=${question.question_id}`;
                const response = await fetch(url);

                if (!response.ok) {
                    console.error("Failed to fetch choices:", response.status, response.statusText);
                    return;
                }

                const data = await response.json();
                setChoices(data);
            }
        } catch (error) {
            console.error("Error loading question data:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!questionText) newErrors.text = "Please enter a question.";

        if (section.question_type === "multiple_choice" && choices.length === 0) {
            newErrors.choices = "Please add at least one choice.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddChoice = () => {
        const newChoice = {
            label: `Choice ${choices.length + 1}`,
            value: choices.length + 1,
            option_order: choices.length + 1,
            question_id: question.question_id,
        };
        setChoices([...choices, newChoice]);
    };

    const handleChoiceChange = (index, value) => {
        const updatedChoices = [...choices];
        updatedChoices[index].label = value;
        setChoices(updatedChoices);
    };

    const deleteChoice = (index) => {
        const updatedChoices = [...choices];
        updatedChoices.splice(index, 1);

        const reorderedChoices = updatedChoices.map((choice, idx) => ({
            ...choice,
            option_order: idx + 1,
        }));

        setChoices(reorderedChoices);
    };

    const updateQuestion = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const updatedQuestion = {
            ...question,
            text: questionText,
            is_fixed: isFixed,
        };

        try {
            const questionUrl = `${API_ENDPOINTS.QUESTION_DETAIL(question.question_id)}`;
            const response = await fetch(questionUrl, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedQuestion),
            });

            if (!response.ok) {
                alert("Failed to update question.");
                return;
            }

            if (section.question_type === "multiple_choice") {
                const choicePromises = choices.map((choice) => {
                    if (choice.choice_id) {
                        const choiceUrl = `${API_ENDPOINTS.MULTIPLE_CHOICE_OPTION_DETAIL(choice.choice_id)}`;
                        return fetch(choiceUrl, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(choice),
                        });
                    } else {
                        return fetch(API_ENDPOINTS.MULTIPLE_CHOICE_OPTION_CREATE, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                question: question.question_id,
                                ...choice,
                            }),
                        });
                    }
                });

                await Promise.all(choicePromises);
            }

            alert("Question updated successfully!");
            onQuestionUpdated();
            setShowEdit(false);
        } catch (error) {
            console.error("Error updating question:", error);
            alert("There was an error updating the question.");
        }
    };

    const deleteQuestion = async () => {
        try {
            const url = `${API_ENDPOINTS.QUESTION_DETAIL(question.question_id)}`;
            const response = await fetch(url, { method: "DELETE" });

            if (!response.ok) {
                alert("Failed to delete question.");
                return;
            }

            alert("Question deleted successfully!");
            setShowDeleteConfirm(false);
            onDelete();
        } catch (error) {
            console.error("Error deleting question:", error.message);
            alert("There was an error deleting the question.");
        }
    };

    return (
        <div>
            <Button
                className="shadow"
                onClick={() => setShowEdit(true)}
                style={{ backgroundColor: "#71a872", border: "0px", color: "white", marginRight: "10px", fontSize: '13px' }}
            >
                <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
                className="shadow"
                onClick={() => setShowDeleteConfirm(true)}
                style={{ backgroundColor: "#ff3232", border: "0px", color: "white", fontSize: '13px' }}
            >
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>

            <Modal show={showEdit} onHide={() => setShowEdit(false)} backdrop="static" centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <Form onSubmit={updateQuestion}>
                            <Form.Group className="mb-3">
                                <Form.Label>Question</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={questionText}
                                    onChange={(e) => setQuestionText(e.target.value)}
                                    isInvalid={!!errors.text}
                                />
                                <Form.Control.Feedback type="invalid">{errors.text}</Form.Control.Feedback>
                            </Form.Group>

                            {section.question_type === "multiple_choice" && (
                                <>
                                    <h5 className="mb-3">Choices</h5>
                                    {choices.map((choice, index) => (
                                        <Row key={index} className="align-items-center mb-2">
                                            <Col xs={10}>
                                                <Form.Control
                                                    type="text"
                                                    value={choice.label || ""}
                                                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                                                    placeholder={`Choice ${index + 1}`}
                                                />
                                            </Col>
                                            <Col xs={2} className="d-flex justify-content-center">
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => deleteChoice(index)}
                                                >
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </Button>
                                            </Col>
                                        </Row>
                                    ))}
                                    <div className="mt-2 mb-2"> 
                                        <Button variant="success" onClick={handleAddChoice}>
                                            <FontAwesomeIcon icon={faPlus} /> Add Choice
                                        </Button>
                                    </div>
                                </>
                            )}

                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Is Fixed"
                                    checked={isFixed}
                                    onChange={(e) => setIsFixed(e.target.checked)}
                                />
                            </Form.Group>

                            <Modal.Footer>
                                <Button variant="success" type="submit">
                                    Save Changes
                                </Button>
                                <Button variant="danger" onClick={() => setShowEdit(false)}>
                                    Cancel
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this question?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteQuestion}>
                        Yes, Delete
                    </Button>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnEditDelQuestion;
