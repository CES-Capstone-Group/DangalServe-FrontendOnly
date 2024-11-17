import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { API_ENDPOINTS } from "../../../config";

const BtnAddQuestion = ({ show, onHide, questionType, sectionId, onSubmit }) => {
    const [questionText, setQuestionText] = useState("");
    const [isFixed, setIsFixed] = useState(false);
    const [choices, setChoices] = useState([]);
    const [ratingOptions, setRatingOptions] = useState([]);
    const [numChoices, setNumChoices] = useState(1); // State to track number of choices

    console.log("Received questionType:", questionType);
    console.log("Received sectionId:", sectionId);

    // Fetch and display rating options for the selected sectionId
    useEffect(() => {
        if (questionType === "rating" && sectionId) {
            const fetchRatingOptions = async () => {
                try {
                    const response = await fetch(API_ENDPOINTS.RATING_OPTION_BY_SECTION(sectionId));
                    if (!response.ok) throw new Error("Failed to fetch rating options");

                    let data = await response.json();
                    data = data.sort((a, b) => a.value - b.value); // Sort rating options by value
                    setRatingOptions(data);
                } catch (error) {
                    console.error("Error fetching rating options:", error);
                }
            };
            fetchRatingOptions();
        }
    }, [questionType, sectionId]);

    const handleNumChoicesChange = (e) => {
        const number = parseInt(e.target.value) || 1;
        setNumChoices(number);
        setChoices(Array(number).fill("")); // Initialize choices array with empty strings
    };

    const handleChoiceChange = (index, value) => {
        const updatedChoices = [...choices];
        updatedChoices[index] = value;
        setChoices(updatedChoices);
    };

    const handleFormSubmit = async () => {
        console.log("Submitting question with sectionId:", sectionId);
    
        try {
            const questionData = {
                text: questionText,
                question_type: questionType,
                section: sectionId,
                is_fixed: isFixed,
            };
    
            const questionResponse = await fetch(API_ENDPOINTS.QUESTION_CREATE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(questionData),
            });
    
            if (!questionResponse.ok) throw new Error("Failed to add question");
    
            const question = await questionResponse.json();
            console.log("Question created:", question);
    
            if (questionType === "multiple_choice") {
                const choicePromises = choices.map((choice, index) => {
                    return fetch(API_ENDPOINTS.MULTIPLE_CHOICE_OPTION_CREATE, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            question: question.question_id,
                            label: choice,
                            option_order: index + 1,
                            value: index + 1, // Add a value field with a unique integer
                        }),
                    });
                });
                await Promise.all(choicePromises);
            }
    
            onSubmit(question);
            onHide();
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };
    

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add {questionType === "rating" ? "Rating" : "Multiple Choice"} Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formQuestion">
                        <Form.Label>Question</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the question"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                        />
                    </Form.Group>

                    {questionType === "rating" && (
                        <div className="mt-3">
                            <Form.Label>Existing Rating Options</Form.Label>
                            <ul>
                                {ratingOptions.map((option, index) => (
                                    <li key={index}>{option.label} (Value: {option.value})</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {questionType === "multiple_choice" && (
                        <div className="mt-3">
                            <Form.Group controlId="formNumChoices">
                                <Form.Label>How many choices?</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={numChoices}
                                    onChange={handleNumChoicesChange}
                                />
                            </Form.Group>
                            <Form.Label>Choices</Form.Label>
                            {Array.from({ length: numChoices }).map((_, index) => (
                                <Form.Control
                                    key={index}
                                    type="text"
                                    placeholder={`Choice ${index + 1}`}
                                    value={choices[index] || ""}
                                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                                    className="mb-2"
                                />
                            ))}
                        </div>
                    )}

                    <Form.Group controlId="formFixed" className="mt-3">
                        <Form.Check
                            type="checkbox"
                            label="Is this question fixed?"
                            checked={isFixed}
                            onChange={(e) => setIsFixed(e.target.checked)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleFormSubmit}>
                    Add Question
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BtnAddQuestion;
