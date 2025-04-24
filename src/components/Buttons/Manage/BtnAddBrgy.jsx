import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { API_ENDPOINTS } from "../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const BtnAddBrgy = ({ onBrgyAdded }) => {
    const [brgyName, setBrgyName] = useState(""); // Barangay name state
    const [moaFile, setMoaFile] = useState(null); // File upload state
    const [phoneNumber, setPhoneNumber] = useState(""); // Phone number state
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setShowModal(false);
        setBrgyName(""); // Reset Name
        setMoaFile(null); // Reset File
        setPhoneNumber(""); // Reset Phone Number
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};

        if (!brgyName) newErrors.brgyName = "Barangay Name is required";
        if (!phoneNumber) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^(\+63|0)\d{10}$/.test(phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be in the format '+639123456789' or '09123456789'";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("brgy_name", brgyName); // Append the barangay name
        formData.append("phone_number", phoneNumber); // Append the phone number
        if (moaFile) {
            formData.append("moa", moaFile); // Append the file if selected
        }

        try {
            const response = await fetch(API_ENDPOINTS.BARANGAY_CREATE, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Barangay added successfully!");
                handleCloseModal(); // Close the modal on success
                onBrgyAdded(); // Call the onBrgyAdded callback
            } else {
                const errorData = await response.json();
                alert(`Failed to add barangay: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error adding barangay:", error);
        }
    };

    return (
        <div className="d-flex justify-content-end m-3">
            <Button
                className="shadow d-flex align-items-center gap-2"
                style={{ backgroundColor: "#71A872", border: "0px", color: "white", padding: "10px 20px" }}
                onClick={handleShowModal}
            >
                <FontAwesomeIcon icon={faPlus} size={16} /> {/* Add the icon */}
                Add Barangay
            </Button>

            <Modal backdrop="static" centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">
                        Back
                    </Button>
                    <Modal.Title> Add New Barangay </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Name:<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="brgyName"
                                    placeholder="Enter Barangay Name"
                                    value={brgyName}
                                    onChange={(e) => setBrgyName(e.target.value)}
                                    isInvalid={!!errors.brgyName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.brgyName}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Phone Number:<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Enter Phone Number (e.g., +639123456789 or 09123456789)"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        const phoneRegex = /^[0-9+]*$/; // Only allows digits and optional '+'
                                        if (phoneRegex.test(input)) {
                                            setPhoneNumber(input); // Update state only if input is valid
                                        }
                                    }}
                                    isInvalid={!!errors.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phoneNumber}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Memorandum of Agreement:</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    className="inputFile"
                                    type="file"
                                    controlId="inpMoa"
                                    accept="image/*, application/pdf"
                                    onChange={(e) => setMoaFile(e.target.files[0])}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button onClick={handleSubmit} variant="success">
                        Add
                    </Button>
                    <Button onClick={handleCloseModal} variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddBrgy;
