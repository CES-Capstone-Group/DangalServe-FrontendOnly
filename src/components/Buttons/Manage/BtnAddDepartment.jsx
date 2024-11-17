import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { API_ENDPOINTS } from "../../../config";

const BtnAddDepartment = ({ onDepartmentAdded }) => {  // <-- Added `onDepartmentAdded` prop
    const [showModal, setShowModal] = useState(false);
    const [departmentName, setDepartmentName] = useState("");  // <-- State for department name
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if(!departmentName) newErrors.deptName = 'Please enter a Department Name ex: CCS, COE, CHAS';


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // Open the modal
    const handleShowModal = () => setShowModal(true);

    // Close the modal and reset form fields
    const handleCloseModal = () => {
        setShowModal(false);
        setDepartmentName("");  // Reset department name
    };

    // **Function to handle form submission and backend integration**
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validateForm()) return;

        const formData = { dept_name: departmentName };  // Prepare data to send to backend

        try {
            const response = await fetch(API_ENDPOINTS.DEPARTMENT_CREATE, {  // Backend URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  // Specify the content type
                },
                body: JSON.stringify(formData),  // Convert formData to JSON
            });

            if (response.ok) {
                alert("Department added successfully!");
                handleCloseModal();  // Close the modal on success
                onDepartmentAdded();  // Trigger parent to re-fetch data
            } else {
                const data = await response.json();
                alert(`Failed to add department: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error("Error adding department:", error);
        }
    };

    return (
        <div className="d-flex justify-content-end m-3">
            <Button className="shadow" style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} onClick={handleShowModal}>
                Add Department
            </Button>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Department </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Department Name:</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="text"
                                    name="deptName"
                                    isInvalid={!!errors.deptName}
                                    placeholder="Enter Department Name"
                                    value={departmentName}  // Link the state
                                    onChange={(e) => setDepartmentName(e.target.value)}  // Update state on change
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.deptName}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button onClick={handleSubmit} variant='success'>  {/* <-- Call handleSubmit on click */}
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

export default BtnAddDepartment;
