import { faPenToSquare, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { API_ENDPOINTS } from "../../../config";

const BtnEditDelete = ({ brgyId, brgyName: initialBrgyName, onBrgyUpdated }) => {  // <-- Added `initialBrgyName` prop to prefill values
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [brgyName, setBrgyName] = useState("");  // State for barangay name
    const [moaFile, setMoaFile] = useState(null);  // State for file upload

    // **Modified: Open/Close Edit Modal with Prefilled Values**
    const handleShowEdit = () => {
        setBrgyName(initialBrgyName);  // <-- Set current `brgyName` from props
        setShowEdit(true);
    };
    const handleCloseEdit = () => setShowEdit(false);

    // Open/Close Delete Confirmation Modal
    const handleShowDeleteConfirm = () => setShowDeleteConfirm(true);
    const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

    // **Handle Edit Form Submission**
    const handleEditSubmit = async () => {
        const formData = new FormData();
        formData.append("brgy_name", brgyName);  // Append the updated barangay name
        if (moaFile) {
            formData.append("moa", moaFile);  // Append the MOA file if selected
        }

        try {
            const response = await fetch(API_ENDPOINTS.BARANGAY_UPDATE_DELETE(brgyId), {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                alert("Barangay updated successfully!");
                handleCloseEdit();  // Close edit modal on success
                onBrgyUpdated();  // Trigger callback to refresh parent component
            } else {
                const data = await response.json();
                alert(`Failed to update barangay: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error("Error updating barangay:", error);
        }
    };

    // **Handle Delete Functionality**
    const handleDelete = async () => {
        try {
            // console.log(`Deleting barangay with ID: ${brgyId}`);

            const response = await fetch(API_ENDPOINTS.BARANGAY_UPDATE_DELETE(brgyId), {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert("Barangay deleted successfully!");
                handleCloseDeleteConfirm();  // Close delete modal on success
                onBrgyUpdated();  // Trigger callback to refresh parent component
            } else {
                const data = await response.json();
                // console.log("Failed to delete:", data);
                alert(`Failed to delete barangay: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error("Error deleting barangay:", error);
        }
    };

    return (
        <>
            {/* Edit and Delete Buttons */}
            <Button className="shadow" onClick={handleShowEdit} style={{ backgroundColor: "#71a872", border: '0px', color: 'white', marginRight: '10px', fontSize: '13px' }}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button className="shadow" onClick={handleShowDeleteConfirm} style={{ backgroundColor: "#ff3232", border: '0px', color: 'white' , fontSize: '13px' }}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>

            {/* **Edit Barangay Modal with Prefilled Values** */}
            <Modal size="lg" centered show={showEdit} onHide={handleCloseEdit} backdrop="static">
                <Modal.Header closeButton>
                    <h1>Edit Barangay</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Barangay Id:
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" name="brgyId" value={brgyId} disabled /> {/* Display ID */}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Barangay Name:
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="brgyName"
                                    value={brgyName}  // Prefill current name
                                    onChange={(e) => setBrgyName(e.target.value)}  // Handle name change
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Memorandum of Agreement:
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    className="inputFile"
                                    type="file"
                                    accept="image/*, application/pdf"
                                    onChange={(e) => setMoaFile(e.target.files[0])}  // Handle file change
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleEditSubmit} variant='success'>
                        Save Changes
                    </Button>
                    <Button onClick={handleCloseEdit} variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* **Delete Confirmation Modal** */}
            <Modal size="m" centered show={showDeleteConfirm} onHide={handleCloseDeleteConfirm} backdrop="static">
                <Modal.Header closeButton>
                    <h4>Confirm Deletion</h4>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this Barangay?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDelete} variant="danger">
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

export default BtnEditDelete;
