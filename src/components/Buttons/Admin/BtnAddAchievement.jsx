import React, { useState } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { API_ENDPOINTS } from "../../../config";

const BtnAddAchievement = ({ onAchievementAdded }) => {
    const [showModal, setShowModal] = useState(false);
    const [awardTitle, setAwardTitle] = useState("");
    const [awardee, setAwardee] = useState("");
    const [awardedBy, setAwardedBy] = useState("");
    const [dateAwarded, setDateAwarded] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if(!awardTitle) newErrors.title = 'Please enter an Award Title';
        if(!awardee) newErrors.awardee = 'Please indicate the name of the Awardee';
        if(!awardedBy) newErrors.awardedBy = 'Please indicate the name who gave the award';
        if(!dateAwarded) newErrors.date = 'Please enter the date of the award';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        // Reset all form fields to their default values
        setAwardTitle("");
        setAwardee("");
        setAwardedBy("");
        setDateAwarded("");
        setImage(null);

        // Close the modal
        setShowModal(false);
    };

    const addAchievement = async (e) => {
        e.preventDefault();
        if(!validateForm()) return;

        const achievementData = new FormData();
        achievementData.append("award_title", awardTitle);
        achievementData.append("awardee", awardee);
        achievementData.append("awarded_by", awardedBy);
        achievementData.append("date_awarded", dateAwarded);
        
        if (image) {
            achievementData.append("image", image);
        }

        try {
            const response = await fetch(API_ENDPOINTS.ACHIEVEMENT_CREATE, {
                method: "POST",
                body: achievementData,
            });

            if (response.ok) {
                // Trigger the callback to reload achievements
                onAchievementAdded();

                // Close the modal
                handleCloseModal();

                alert("Achievement added successfully!");
            } else {
                alert("There was an error adding the achievement.");
            }
        } catch (error) {
            alert("There was an error adding the achievement.");
        }
    };

    return (
        <div className="d-flex justify-content-end m-3">
            <div>
                <Button className="shadow" style={{ backgroundColor: "#71A872", border: '0px', color: 'white', fontSize: '1rem'}} onClick={handleShowModal}>
                    + Add Achievement
                </Button>
            </div>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Achievement </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addAchievement}>
                        <Form.Group className='mb-3' controlId='AwardTitle'>
                            <Form.Label className='h5'>Award Title</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    className='input' 
                                    type='text' 
                                    name="title"
                                    placeholder='' 
                                    value={awardTitle}
                                    onChange={(e) => setAwardTitle(e.target.value)}
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='Awardee'>
                            <Form.Label className='h5'>Awardee</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    className='input' 
                                    type='text'
                                    name="awardee" 
                                    placeholder='' 
                                    value={awardee}
                                    onChange={(e) => setAwardee(e.target.value)}
                                    isInvalid={!!errors.awardee}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.awardee}
                                </Form.Control.Feedback>                               
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='AwardedBy'>
                            <Form.Label className='h5'>Awarded By</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    className='input' 
                                    type='text' 
                                    name="awardedBy"
                                    placeholder='' 
                                    value={awardedBy}
                                    onChange={(e) => setAwardedBy(e.target.value)}
                                    isInvalid={!!errors.awardedBy}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.awardedBy}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='DateAwarded'>
                            <Form.Label className='h5'>Date Awarded</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    className='input' 
                                    type='date' 
                                    name="date"
                                    placeholder='' 
                                    value={dateAwarded}
                                    onChange={(e) => setDateAwarded(e.target.value)}
                                    isInvalid={!!errors.date}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.date}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='AchvImage'>
                            <Form.Label className='h5'>Upload your Image</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    className="inputFile" 
                                    type="file" 
                                    onChange={(e) => setImage(e.target.files[0])} 
                                    accept="image/*"
                                />
                            </InputGroup>
                            <p className="text-sm">Max Size: 25MB</p>
                        </Form.Group>

                        <Modal.Footer className="d-flex justify-content-center">
                            <Button size="lg" variant='success' type="submit">
                                Add
                            </Button>
                            <Button size="lg" variant="danger" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default BtnAddAchievement;
