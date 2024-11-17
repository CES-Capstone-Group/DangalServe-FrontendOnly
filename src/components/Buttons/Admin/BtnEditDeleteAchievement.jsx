import { faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { API_ENDPOINTS } from "../../../config";

const BtnEditDeleteAchievement = ({ achievement, onAchievementUpdated }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [awardTitle, setAwardTitle] = useState("");
    const [awardee, setAwardee] = useState("");
    const [awardedBy, setAwardedBy] = useState("");
    const [dateAwarded, setDateAwarded] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!awardTitle) newErrors.title = 'Please enter an Award Title';
        if (!awardee) newErrors.awardee = 'Please indicate the name of the Awardee';
        if (!awardedBy) newErrors.awardedBy = 'Please indicate the name who gave the award';
        if (!dateAwarded) newErrors.date = 'Please enter the date of the award';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    // Pre-fill data when modal opens
    useEffect(() => {
        if (achievement) {
            setAwardTitle(achievement.award_title);
            setAwardee(achievement.awardee);
            setAwardedBy(achievement.awarded_by);
            setDateAwarded(achievement.date_awarded);
        }
    }, [achievement]);

    // **Update Achievement Functionality**
    const updateAchievement = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const achievementData = new FormData();
        achievementData.append("award_title", awardTitle);
        achievementData.append("awardee", awardee);
        achievementData.append("awarded_by", awardedBy);
        achievementData.append("date_awarded", dateAwarded);

        if (image) {
            achievementData.append("image", image);
        }

        try {
            const response = await fetch(API_ENDPOINTS.ACHIEVEMENT_DETAIL(achievement.id), {
                method: "PUT",  // PUT for updating
                body: achievementData,
            });

            if (response.ok) {
                onAchievementUpdated();  // Trigger the callback to reload achievements
                setShowEdit(false);       // Close the edit modal
                alert("Achievement updated successfully!");
            } else {
                alert("There was an error updating the achievement.");
            }
        } catch (error) {
            alert("There was an error updating the achievement.");
        }
    };

    // **Delete Achievement Functionality**
    const deleteAchievement = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.ACHIEVEMENT_DETAIL(achievement.id), {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Achievement deleted successfully!");
                setShowDeleteConfirm(false);  // Close delete confirmation modal
                onAchievementUpdated();  // Trigger the callback to reload achievements
            } else {
                alert("There was an error deleting the achievement.");
            }
        } catch (error) {
            alert("There was an error deleting the achievement.");
        }
    };

    return (
        <>
            {/* Edit and Delete Buttons */}
            <Button className="shadow" onClick={() => setShowEdit(true)} style={{ backgroundColor: "#71a872", border: '0px', color: 'white', marginRight: '10px', fontSize: '13px' }}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button className="shadow" onClick={() => setShowDeleteConfirm(true)} style={{ backgroundColor: "#ff3232", border: '0px', color: 'white', fontSize: '13px' }}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>

            {/* Edit Achievement Modal */}
            <Modal backdrop='static' centered size="lg" show={showEdit} onHide={() => setShowEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Achievement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={updateAchievement}>
                        <Form.Group className='mb-3' controlId='AwardTitle'>
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
                            <Form.Label className='h5'>Upload your Image (Optional)</Form.Label>
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
                                Save Changes
                            </Button>
                            <Button size="lg" variant="danger" onClick={() => setShowEdit(false)}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal size="m" centered show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this achievement?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={deleteAchievement} variant="danger"> {/* Delete Confirmation Button */}
                        Yes, Delete
                    </Button>
                    <Button onClick={() => setShowDeleteConfirm(false)} variant="secondary">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BtnEditDeleteAchievement;
