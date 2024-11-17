import { faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { API_ENDPOINTS } from "../../../config";

const BtnEditDeleteAnnouncement = ({ announcement, onAnnouncementUpdated }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!title) newErrors.title = 'Please enter an Announcement Title';
        if (!details) newErrors.details = 'Please enter the Announcement Details';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // Pre-fill data when modal opens
    useEffect(() => {
        if (announcement) {
            setTitle(announcement.title);
            setDetails(announcement.details);
        }
    }, [announcement]);

    // **Update Announcement Functionality**
    const updateAnnouncement = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const announcementData = new FormData();
        announcementData.append("title", title);
        announcementData.append("details", details);

        if (image) {
            announcementData.append("image", image);
        }

        try {
            const response = await fetch(API_ENDPOINTS.ANNOUNCEMENT_DETAIL(announcement.id), {
                method: "PUT",
                body: announcementData,
            });

            if (response.ok) {
                onAnnouncementUpdated();  // Trigger the callback to reload announcements
                setShowEdit(false);       // Close the edit modal
                alert("Announcement updated successfully!");
            } else {
                alert("There was an error updating the announcement.");
            }
        } catch (error) {
            alert("There was an error updating the announcement.");
        }
    };

    // **Delete Announcement Functionality**
    const deleteAnnouncement = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.ANNOUNCEMENT_DETAIL(announcement.id), {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Announcement deleted successfully!");
                setShowDeleteConfirm(false);  // Close delete confirmation modal
                onAnnouncementUpdated();  // Trigger the callback to reload announcements
            } else {
                alert("There was an error deleting the announcement.");
            }
        } catch (error) {
            alert("There was an error deleting the announcement.");
        }
    };

    return (
        <>
            {/* Edit and Delete Buttons */}
            <Button className="shadow" onClick={() => setShowEdit(true)} style={{ backgroundColor: "#71a872", border: '0px', color: 'white', margin: '10px', fontSize: '13px' }}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button className="shadow" onClick={() => setShowDeleteConfirm(true)} style={{ backgroundColor: "#ff3232", border: '0px', color: 'white', fontSize: '13px' }}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>

            {/* Edit Announcement Modal */}
            <Modal backdrop='static' centered size="lg" show={showEdit} onHide={() => setShowEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Announcement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={updateAnnouncement}>
                        <Form.Group className='mb-3' controlId='AnnouncementTitle'>
                            <Form.Label className='h5'>Announcement Title</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    className='input'
                                    type='text'
                                    name="title"
                                    placeholder=''
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='AnnouncementDetails'>
                            <Form.Label className='h5'>Announcement Details</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    className='input'
                                    as='textarea'
                                    name="details"
                                    rows={4}
                                    placeholder=''
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    isInvalid={!!errors.details}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='AnnouncementImage'>
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
                    <p>Are you sure you want to delete this announcement?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={deleteAnnouncement} variant="danger">
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

export default BtnEditDeleteAnnouncement;
