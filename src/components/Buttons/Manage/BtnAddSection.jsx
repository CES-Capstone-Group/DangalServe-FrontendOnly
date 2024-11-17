import React, { useState, useEffect } from "react"; // Make sure all hooks are imported
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { API_ENDPOINTS } from "../../../config";

const BtnAddSection = ({ onSectionAdded, evalTypeId }) => {
    // Declare all hooks at the top of the component
    const [showModal, setShowModal] = useState(false);
    const [sectionLabel, setSectionLabel] = useState("");
    const [sectionType, setSectionType] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [ratingScale, setRatingScale] = useState(5);
    const [informationContent, setInformationContent] = useState("");
    const [isFixed, setIsFixed] = useState(false);
    const [ratingLabels, setRatingLabels] = useState(Array(5).fill(""));

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setShowModal(false);
        setSectionLabel("");
        setSectionType("");
        setQuestionType("");
        setRatingScale(5);
        setInformationContent("");
        setIsFixed(false);
        setRatingLabels(Array(5).fill(""));
    };

    const handleSectionTypeChange = (e) => {
        const value = e.target.value;
        setSectionType(value);
        if (value !== "question") {
            setQuestionType("");
        }
    };

    const handleRatingScaleChange = (newScale) => {
        setRatingScale(newScale);
        setRatingLabels((prevLabels) => {
            const updatedLabels = [...prevLabels];
            if (newScale > prevLabels.length) {
                return [...updatedLabels, ...Array(newScale - prevLabels.length).fill("")];
            } else {
                return updatedLabels.slice(0, newScale);
            }
        });
    };

    const handleRatingLabelChange = (index, value) => {
        setRatingLabels((prevLabels) => {
            const newLabels = [...prevLabels];
            newLabels[index] = value;
            return newLabels;
        });
    };

    const handleAddSection = async () => {
        try {
            // Prepare the data based on the section type
            const sectionData = {
                evaluation_type: evalTypeId,
                title: sectionLabel,
                section_type: sectionType,
                question_type: sectionType === "question" ? questionType : null,  // Only include if section_type is "question"
                content: sectionType === "info" ? informationContent : null,      // Only include content if section_type is "info"
                is_fixed: isFixed,
            };

            // Log the section data to check before sending the request
            console.log("Section Data:", sectionData);

            const sectionResponse = await fetch(API_ENDPOINTS.SECTION_CREATE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sectionData),
            });

            if (!sectionResponse.ok) {
                throw new Error("Failed to create section");
            }

            const newSection = await sectionResponse.json();

            // If the question type is "rating," log and add rating options
            if (questionType === "rating") {
                const ratingOptionsPromises = ratingLabels.map((label, index) => {
                    const ratingOptData = {
                        section: newSection.section_id,
                        value: index + 1,
                        label: label,
                        option_order: index + 1,
                    };

                    // Log each rating option data to check before sending the request
                    console.log("Rating Option Data:", ratingOptData);

                    return fetch(API_ENDPOINTS.RATING_OPTION_CREATE, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(ratingOptData),
                    });
                });

                await Promise.all(ratingOptionsPromises);
            }

            // Notify the parent component of the new section and reset the form
            onSectionAdded(newSection);
            handleCloseModal();
            alert("Section added successfully!");

        } catch (error) {
            alert("An error occurred. Please try again later.");
            console.error(error);
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <Button 
                className="shadow w-100" 
                style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} 
                onClick={handleShowModal}>
                <FontAwesomeIcon icon={faPlus}/>
                <span className="h5"> Add Section </span>
            </Button>

            <Modal backdrop="static" centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Section </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Section:</Form.Label>
                            <Col>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter section label"
                                    value={sectionLabel}
                                    onChange={(e) => setSectionLabel(e.target.value)} 
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Section Type:</Form.Label>
                            <Col>
                                <Form.Control 
                                    as="select" 
                                    value={sectionType}
                                    onChange={handleSectionTypeChange}
                                >
                                    <option value="">Select Type</option>
                                    <option value="question">Question</option>
                                    <option value="info">Information</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        {sectionType === "info" && (
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Information Content:</Form.Label>
                                <Col>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter information content"
                                        value={informationContent}
                                        onChange={(e) => setInformationContent(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                        )}

                        {sectionType === "question" && (
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Question Type:</Form.Label>
                                <Col>
                                    <Form.Control 
                                        as="select" 
                                        value={questionType}
                                        onChange={(e) => setQuestionType(e.target.value)}
                                    >
                                        <option value="">Select Question Type</option>
                                        <option value="multiple_choice">Multiple Choice</option>
                                        <option value="rating">Rating</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        )}

                        {questionType === "rating" && (
                            <>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Rating Scale:</Form.Label>
                                    <Col>
                                        <Form.Control 
                                            type="number"
                                            min={1}
                                            max={10}
                                            value={ratingScale}
                                            onChange={(e) => handleRatingScaleChange(Number(e.target.value))}
                                        />
                                    </Col>
                                </Form.Group>

                                {Array.from({ length: ratingScale }).map((_, index) => (
                                    <Form.Group as={Row} className="mb-3" key={index}>
                                        <Form.Label column sm={3}>Label for {index + 1}:</Form.Label>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder={`Label for rating ${index + 1}`}
                                                value={ratingLabels[index]}
                                                onChange={(e) => handleRatingLabelChange(index, e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>
                                ))}
                            </>
                        )}

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Required Section:</Form.Label>
                            <Col>
                                <Form.Check 
                                    type="checkbox"
                                    label="Automatically include this section in every new form"
                                    checked={isFixed}
                                    onChange={(e) => setIsFixed(e.target.checked)}
                                />
                                <Form.Text className="text-muted">
                                    Note: If selected, this section will be automatically included in every new form.
                                </Form.Text>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="success" onClick={handleAddSection}>  
                        Add Section
                    </Button>
                    <Button onClick={handleCloseModal} variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddSection;
