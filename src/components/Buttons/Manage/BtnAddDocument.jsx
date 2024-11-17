import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { API_ENDPOINTS } from "../../../config";

const BtnAddDocument = ({ onDocumentAdded }) => {
    const [showModal, setShowModal] = useState(false);
    const [documentTitle, setDocumentTitle] = useState("");  // <-- Changed to `documentTitle`
    const [documentFile, setDocumentFile] = useState(null);  // <-- Set Document File 
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if(!documentTitle) newErrors.docTitle = 'Please Enter Document Title';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // Open the modal
    const handleShowModal = () => setShowModal(true);

    // Close the modal and reset form fields
    const handleCloseModal = () => {
        setShowModal(false);
        setDocumentTitle("");  // Reset document title
        setDocumentFile(null);  // Reset file selection
    };

    // **Function to handle form submission and backend integration**
    const handleSubmit = async () => {
        if(!validateForm()) return;

        if (!documentTitle || !documentFile) {
            alert("Please provide both a document title and a file.");
            return;
        }

        const formData = new FormData();  // Prepare FormData to send both file and title
        formData.append("title", documentTitle);  // Append document title, renamed to `title`
        formData.append("file", documentFile);  // Append selected file, renamed to `file`

        try {
            const response = await fetch(API_ENDPOINTS.UPLOAD_DOCUMENT, {  // Backend URL
                method: "POST",
                body: formData,  // Send FormData (not JSON)
            });

            if (response.ok) {
                alert("Document added successfully!");
                handleCloseModal();  // Close the modal on success
                onDocumentAdded();  // Trigger parent to re-fetch data
            } else {
                const data = await response.json();
                alert(`Failed to add document: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error("Error adding document:", error);
        }
    };

    return (
        <div className="d-flex justify-content-end m-3">
            <Button className="shadow" style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} onClick={handleShowModal}>
                Add Document
            </Button>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Document </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Document Title:</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="text"
                                    name="docTitle"
                                    isInvalid={!!errors.docTitle}
                                    placeholder="Enter Document Title"
                                    value={documentTitle}  // Link the state
                                    onChange={(e) => setDocumentTitle(e.target.value)}  // Update state on change
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.docTitle}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Upload File:</Form.Label>
                            <Form.Control
                                 className="inputFile" 
                                 type="file" 
                                 accept="image/*, application/pdf, .docx"  // Accept image, PDF, DOCX formats
                                 onChange={(e) => setDocumentFile(e.target.files[0])}  // Handle file selection
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button onClick={handleSubmit} variant='success'>  {/* Call handleSubmit on click */}
                        Save Changes
                    </Button>
                    <Button onClick={handleCloseModal} variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddDocument;
