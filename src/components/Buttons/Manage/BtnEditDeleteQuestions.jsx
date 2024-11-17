import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";

const BtnEditDeleteQuestions = ({tableQuestion ,questionId, question }) => {
    const [showEdit, setShowEdit] = useState(false);  // Controls edit modal visibility
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);  // Controls delete confirmation modal

    // Open/Close Edit Modal
    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    // Open/Close Delete Confirmation Modal
    const handleShowDeleteConfirm = () => setShowDeleteConfirm(true);
    const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

    return (
        <>
            {/* Edit and Delete Buttons */}
            <Button 
                className="shadow" 
                onClick={handleShowEdit} 
                style={{ backgroundColor: "#71a872", border: '0px', color: 'white', margin: '8px', fontSize: '15px' }}
            >
                Edit
            </Button>
            <Button 
                className="shadow" 
                onClick={handleShowDeleteConfirm} 
                style={{ backgroundColor: "#ff3232", border: '0px', color: 'white', fontSize: '15px' }}
            >
                Delete
            </Button>

            {/* Edit Course Modal */}
            <Modal size="lg" centered show={showEdit} onHide={handleCloseEdit} backdrop="static">
                <Modal.Header closeButton>
                    <h1>Edit Question: 1</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Question: 
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="text" 
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success">
                        Save Changes
                    </Button>
                    <Button onClick={handleCloseEdit} variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal size="m" centered show={showDeleteConfirm} onHide={handleCloseDeleteConfirm} backdrop="static">
                <Modal.Header closeButton>
                    <h4>Confirm Deletion</h4>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this question?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger">
                        Yes, Delete
                    </Button>
                    <Button onClick={handleCloseDeleteConfirm} variant="secondary">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BtnEditDeleteQuestions;
