import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

const BtnEvalEdit = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    // Dummy questions for demonstration purposes
    const questions = [
        { id: 1, text: "Q1: Clarity of objectives" },
        { id: 2, text: "Q2: Relevance of objectives" },
        { id: 3, text: "Q3: Attainment of objectives" },
        { id: 4, text: "Q4: Alignment with the objectives" },
        { id: 5, text: "Q5: Extent to which they enrich participants" }
    ];

    // Open the modal
    const handleShowModal = () => setShowModal(true);

    // Close the modal
    const handleCloseModal = () => setShowModal(false);

    // Toggle question selection
    const handleQuestionChange = (questionId) => {
        if (selectedQuestions.includes(questionId)) {
            setSelectedQuestions(selectedQuestions.filter(id => id !== questionId));
        } else {
            setSelectedQuestions([...selectedQuestions, questionId]);
        }
    };

    return (
        <div className="d-flex justify-content-end m-3">
            <Button
                className="shadow"
                style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }}
                onClick={handleShowModal}
            >
                Edit Questions
            </Button>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title>Edit Questions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {questions.map((question) => (
                            <Form.Group key={question.id} className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label={question.text}
                                    checked={selectedQuestions.includes(question.id)}
                                    onChange={() => handleQuestionChange(question.id)}
                                />
                            </Form.Group>
                        ))}
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant='success'>  
                        Done
                    </Button>
                    <Button onClick={handleCloseModal} variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnEvalEdit;
