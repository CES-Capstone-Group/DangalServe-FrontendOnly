import { API_ENDPOINTS } from "../../../config";
import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const BtnEditDelSection = ({ section, onSectionUpdated }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [sectionTitle, setSectionTitle] = useState("");
    const [ratingOptions, setRatingOptions] = useState([]);
    const [infoContent, setInfoContent] = useState("");
    const [isFixed, setIsFixed] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    if (!section?.section_id) {
        console.error("Section ID is missing or undefined.");
        return null;
    }

    const loadSectionData = async () => {
        try {
            setIsLoading(true);

            setSectionTitle(section.title || "");
            setIsFixed(section.is_fixed || false);

            if (section.question_type === "rating") {
                const url = API_ENDPOINTS.RATING_OPTION_BY_SECTION(section.section_id);
                const response = await fetch(url);

                if (!response.ok) {
                    console.error("Failed to fetch rating options:", response.status, response.statusText);
                    return;
                }

                const data = await response.json();
                setRatingOptions(data);
            } else if (section.section_type === "info") {
                setInfoContent(section.content || "");
            }
        } catch (error) {
            console.error("Error loading section data:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (showEdit) {
            loadSectionData();
        }
    }, [showEdit]);

    const validateForm = () => {
        const newErrors = {};

        if (!sectionTitle) newErrors.title = "Please enter a section title.";
        if (section.section_type === "info" && !infoContent) {
            newErrors.content = "Please provide content for the info section.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddRatingOption = () => {
        if (ratingOptions.length < 10) {
            const newOption = {
                value: ratingOptions.length + 1,
                label: `Label ${ratingOptions.length + 1}`,
                option_order: ratingOptions.length + 1,
                section_id: section.section_id,
            };

            setRatingOptions([...ratingOptions, newOption]);
        } else {
            alert("You can only add up to 10 rating options.");
        }
    };

    const deleteRatingOption = async (optionId, index) => {
        try {
            if (optionId) {
                const url = API_ENDPOINTS.RATING_OPTION_DETAIL(optionId);
                const response = await fetch(url, { method: "DELETE" });

                if (!response.ok) {
                    console.error("Failed to delete rating option:", response.status, response.statusText);
                    alert("Failed to delete the rating option.");
                    return;
                }
            }

            const updatedOptions = [...ratingOptions];
            updatedOptions.splice(index, 1);

            const reorderedOptions = updatedOptions.map((option, idx) => ({
                ...option,
                option_order: idx + 1,
            }));

            setRatingOptions(reorderedOptions);
        } catch (error) {
            console.error("Error deleting rating option:", error.message);
            alert("There was an error deleting the rating option.");
        }
    };

    const updateSection = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const reorderedOptions = ratingOptions.map((option, index) => ({
            ...option,
            option_order: index + 1,
        }));

        const updatedSection = {
            ...section,
            title: sectionTitle,
            is_fixed: isFixed,
            content: section.section_type === "info" ? infoContent : undefined,
        };

        try {
            const sectionUrl = API_ENDPOINTS.SECTION_DETAIL(section.section_id);
            const response = await fetch(sectionUrl, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedSection),
            });

            if (!response.ok) {
                alert("Failed to update section.");
                return;
            }

            const updatePromises = reorderedOptions.map((option) => {
                const { option_id, label, value, option_order } = option;
                if (option_id) {
                    const optionUrl = API_ENDPOINTS.RATING_OPTION_DETAIL(option_id);
                    return fetch(optionUrl, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ label, value, option_order }),
                    });
                } else {
                    return fetch(API_ENDPOINTS.RATING_OPTION_CREATE, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            section: section.section_id,
                            value,
                            label,
                            option_order,
                        }),
                    });
                }
            });

            await Promise.allSettled(updatePromises);

            alert("Section updated successfully!");
            onSectionUpdated();
            setShowEdit(false);
        } catch (error) {
            console.error("Error updating section:", error);
            alert("There was an error updating the section.");
        }
    };

    const deleteSection = async () => {
        try {
            const url = API_ENDPOINTS.SECTION_DETAIL(section.section_id);
            const response = await fetch(url, { method: "DELETE" });

            if (!response.ok) {
                alert("Failed to delete section.");
                return;
            }

            alert("Section deleted successfully!");
            setShowDeleteConfirm(false);
            onSectionUpdated();
        } catch (error) {
            console.error("Error deleting section:", error.message);
            alert("There was an error deleting the section.");
        }
    };

    return (
        <div>
            <Button
                className="shadow"
                onClick={() => setShowEdit(true)}
                style={{ backgroundColor: "#71a872", border: "0px", color: "white", marginRight: "10px" }}
            >
                <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
                className="shadow"
                onClick={() => setShowDeleteConfirm(true)}
                style={{ backgroundColor: "#ff3232", border: "0px", color: "white" }}
            >
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>


            <Modal show={showEdit} onHide={() => setShowEdit(false)} backdrop="static" centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <Form onSubmit={updateSection}>
                            <Form.Group className="mb-3">
                                <Form.Label>Section Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={sectionTitle}
                                    onChange={(e) => setSectionTitle(e.target.value)}
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                            </Form.Group>

                            {section.question_type === "rating" && (
                                <>
                                    <h5 className="mb-3">Rating Options</h5>
                                    {ratingOptions.map((option, index) => (
                                        <Row key={index} className="align-items-center mb-2">
                                            <Col xs={3}>
                                                <Form.Label className="mb-0">Value:</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    min="1"
                                                    max="10"
                                                    value={option.value || ""}
                                                    onChange={(e) => {
                                                        const updatedOptions = [...ratingOptions];
                                                        updatedOptions[index].value = e.target.value;
                                                        setRatingOptions(updatedOptions);
                                                    }}
                                                    placeholder="Value"
                                                />
                                            </Col>
                                            <Col xs={7}>
                                                <Form.Label className="mb-0">Label:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={option.label || ""}
                                                    onChange={(e) => {
                                                        const updatedOptions = [...ratingOptions];
                                                        updatedOptions[index].label = e.target.value;
                                                        setRatingOptions(updatedOptions);
                                                    }}
                                                    placeholder="Label"
                                                />
                                            </Col>
                                            <Col xs={2} className="d-flex justify-content-center mt-4">
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => deleteRatingOption(option.option_id, index)}
                                                >
                                                    <FontAwesomeIcon style={{fontStyle: '13px'}} icon={faMinus} />
                                                </Button>
                                            </Col>
                                        </Row>
                                    ))}
                                    {ratingOptions.length < 10 && (
                                        <Button className="mt-2 mb-2" variant="success" onClick={handleAddRatingOption}>
                                            <FontAwesomeIcon icon={faPlus} /> Add Rating Option
                                        </Button>
                                    )}
                                </>
                            )}

                            {section.section_type === "info" && (
                                <>
                                    {!showEdit ? (
                                        // Display content as a paragraph when not editing
                                        <div className="mb-3">
                                            <Form.Label>Content</Form.Label>
                                            <p>{infoContent || "No content available"}</p>
                                        </div>
                                    ) : (
                                        // Render textarea inside modal for editing
                                        <Form.Group className="mb-3">
                                            <Form.Label>Content</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                value={infoContent}
                                                onChange={(e) => setInfoContent(e.target.value)}
                                                isInvalid={!!errors.content}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.content}</Form.Control.Feedback>
                                        </Form.Group>
                                    )}
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
                <Modal.Body>
                    Are you sure you want to delete this section?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteSection}>
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

export default BtnEditDelSection;
