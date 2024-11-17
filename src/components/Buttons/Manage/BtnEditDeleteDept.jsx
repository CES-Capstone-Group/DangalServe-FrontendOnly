import { faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { API_ENDPOINTS } from "../../../config";

const BtnEditDeleteDept = ({ deptId, deptName: initialDeptName, onDepartmentUpdated }) => {  // <-- Changed `initialDeptName` prop
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deptName, setDeptName] = useState("");  // State for department name
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!deptName) newErrors.deptName = 'Please enter a Department Name ex: CCS, COE, CHAS';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // **Open/Close Edit Modal with Prefilled Values**
    const handleShowEdit = () => {
        setDeptName(initialDeptName);  // Set current `deptName` from props
        setShowEdit(true);
    };
    const handleCloseEdit = () => setShowEdit(false);

    // Open/Close Delete Confirmation Modal
    const handleShowDeleteConfirm = () => setShowDeleteConfirm(true);
    const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

    // **Handle Edit Form Submission**
    const handleEditSubmit = async () => {
        if (!validateForm()) return;
        const formData = { dept_name: deptName };  // Create form data for department

        try {
            const response = await fetch(API_ENDPOINTS.DEPARTMENT_DETAIL(deptId), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),  // Convert formData to JSON
            });

            if (response.ok) {
                alert("Department updated successfully!");
                handleCloseEdit();  // Close edit modal on success
                onDepartmentUpdated();  // Trigger callback to refresh parent component
            } else {
                const data = await response.json();
                alert(`Failed to update department: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error("Error updating department:", error);
        }
    };

    // **Handle Delete Functionality**
    const handleDelete = async () => {
        try {
            // console.log(`Deleting department with ID: ${deptId}`);

            const response = await fetch(API_ENDPOINTS.DEPARTMENT_DETAIL(deptId), {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert("Department deleted successfully!");
                handleCloseDeleteConfirm();  // Close delete modal on success
                onDepartmentUpdated();  // Trigger callback to refresh parent component
            } else {
                const data = await response.json();
                // console.log("Failed to delete:", data);
                alert(`Failed to delete department: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error("Error deleting department:", error);
        }
    };

    return (
        <>
            {/* Edit and Delete Buttons */}
            <Button className="shadow" onClick={handleShowEdit} style={{ backgroundColor: "#71a872", border: '0px', color: 'white', marginRight: '10px', fontSize: '13px' }}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button className="shadow" onClick={handleShowDeleteConfirm} style={{ backgroundColor: "#ff3232", border: '0px', color: 'white', fontSize: '13px' }}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>

            {/* **Edit Department Modal with Prefilled Values** */}
            <Modal size="lg" centered show={showEdit} onHide={handleCloseEdit} backdrop="static">
                <Modal.Header closeButton>
                    <h1>Edit Department</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Department Id:
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" name="deptId" value={deptId} disabled /> {/* Display ID */}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Department Name:
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="deptName"
                                    isInvalid={!!errors.deptName}
                                    value={deptName}  // Prefill current name
                                    onChange={(e) => setDeptName(e.target.value)}  // Handle name change
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.deptName}
                                </Form.Control.Feedback>
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
                    <p>Are you sure you want to delete this Department?</p>
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

export default BtnEditDeleteDept;
