import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import "../../App.css";

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate to the previous page
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
                    <Button variant="success" onClick={() => navigate("/login")} className="back-button">
                        Go Back
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default UnauthorizedPage;
