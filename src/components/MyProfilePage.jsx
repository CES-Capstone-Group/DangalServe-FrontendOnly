import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

import { useUser } from './UserContext';
import { API_ENDPOINTS } from '../config';

const MyProfilePage = () => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [accountName, setAccountName] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [showModalPass, setShowModalPass] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [originalName, setOriginalName] = useState(''); // Store original name for cancel

    const { loggedUser, setLoggedUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken)
            setAccountName(decodedToken.name);
            setDepartment(decodedToken.department);
            setPosition(decodedToken.position);
            setOriginalName(decodedToken.name); // Store original name on load
        }
    }, []);

    // Function to handle profile update submission
    const handleNameUpdate = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const userId = jwtDecode(token).user_id;  // Assuming `user_id` is in the token payload
            
            const response = await fetch(API_ENDPOINTS.UPDATE_USER_PROFILE(userId), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username: accountName,
                }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                localStorage.setItem('access_token', result.access_token);
                localStorage.setItem('refresh_token', result.refresh_token);
                alert('Name updated successfully');
                setLoggedUser(accountName);
                setIsEditingName(false);
            } else {
                throw new Error('Failed to update name');
            }
        } catch (error) {
            console.error('Error updating name:', error);
            alert('Failed to update name');
        }
    };

    // Cancel editing and revert name to original value
    const handleCancelEdit = () => {
        setAccountName(originalName);
        setIsEditingName(false);
    };
     // Function to hnadle password change
   const handlePasswordChange = async () => {
    // Check if the new password and confirm password match
    if (newPassword !== confirmNewPassword) {
        alert('New password and confirm password do not match!');
        return;
    }

    try {
        const token = localStorage.getItem('access_token');
        const userId = jwtDecode(token).user_id;  // Assuming `user_id` is in the token payload

        const response = await fetch(API_ENDPOINTS.CHANGE_USER_PASSWORD(userId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword,
            }),
        });

        const result = await response.json();

        // Handle cases where the response is not successful
        if (!response.ok) {
            if (result.error === 'Current password is incorrect') {
                alert('Your current password is incorrect. Please try again.');
            } else {
                alert('Failed to change password: ' + result.error);
            }
            return;
        }

        // If successful, show success alert and close modal
        setShowModalPass(false);
        alert('Password changed successfully');
        setCurrentPassword('')
        setNewPassword('')
        setConfirmNewPassword('')

    } catch (error) {
        console.error('Error changing password:', error);
        alert('Failed to change password');
    }
};

    return (
        <Container fluid className="profile-container">
            <div className="profileContainer" style={{ backgroundColor: '#f7f7f7' }}>
                <div className="profile-header text-center py-5" style={{ backgroundColor: '#0a3d62', color: 'white' }}>
                    <h2 className="mt-3">
                        {isEditingName ? (
                            <>
                                <Form.Control
                                    type="text"
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                    className="d-inline w-auto"
                                />
                                <Button
                                    variant="link"
                                    onClick={handleNameUpdate}
                                    className="text-white"
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </Button>
                                <Button
                                    variant="link"
                                    onClick={handleCancelEdit}
                                    className="text-danger"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </>
                        ) : (
                            <>
                                {accountName}
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        setOriginalName(accountName); // Store current name when entering edit mode
                                        setIsEditingName(true);
                                    }}
                                    className="text-white"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </>
                        )}
                    </h2>
                    <p>{position}</p>
                </div>

                <Row className="py-4 m-1 profile-details">
                    <Col>
                        <p><strong>Account ID</strong>: #######</p>
                        <p><strong>Department</strong>: {department}</p>
                        <p><strong>Position</strong>: {position}</p>
                        <p><strong>Password</strong>: {'********'}</p>
                        <Button variant="link" className="text-success text-decoration-none" onClick={() => setShowModalPass(true)}>
                            Change Password
                        </Button>
                    </Col>
                </Row>
            </div>

            {/* Modal for Updating Password */}
            <Modal show={showModalPass} onHide={() => setShowModalPass(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formCurrentPass">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Current Password"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formNewPass">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="New Password"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formConNewPass">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        placeholder="Confirm New Password"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowModalPass(false)}>Close</Button>
                    <Button variant="success" onClick={handlePasswordChange}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default MyProfilePage;
