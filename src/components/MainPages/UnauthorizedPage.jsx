import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import "../../App.css";

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        // Check if token has expired (implement your expiration logic here)
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        const isTokenExpired = () => {
            // Assuming the token payload includes an expiration time 'exp'
            if (!accessToken) return true;
            const payload = JSON.parse(atob(accessToken.split(".")[1]));
            return payload.exp * 1000 < Date.now(); // Check if the token is expired
        };

        if (isTokenExpired()) {
            // Clear tokens from local storage and redirect to login
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate("/login");
        } else {
            // Navigate to the previous page
            navigate(-1);
        }
    };

    return (
        <Container className="unauthorized-page d-flex align-items-center justify-content-center">
            <Row className="text-center">
                <Col>
                    <FontAwesomeIcon icon={faExclamationTriangle} className="warning-icon" />
                    <h1 className="unauthorized-title">Access Denied</h1>
                    <p className="unauthorized-message">
                        Sorry, you do not have permission to access this page.
                    </p>
                    <Button variant="success" onClick={handleGoBack} className="back-button">
                        Go Back
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default UnauthorizedPage;
