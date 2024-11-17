import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTableColumns, faUserPen } from '@fortawesome/free-solid-svg-icons';

const AdminLandingPage = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container fluid className="py-4 d-flex flex-column justify-content-center align-items-center vh-100">
      <Row className="w-100 d-flex justify-content-center align-items-center">
        <Col xs={12} sm={6} md={4} className="d-flex justify-content-center">
          <Card
            onClick={() => handleNavigation('/manage')}
            className="landCard clickable-card text-center shadow p-4 m-3"
            style={{
              cursor: 'pointer',
              border: '2px solid #71A872',
              width: '100%',  // Make width fill the column space
              maxWidth: '250px',  // Limit max width
              height: 'auto',  // Auto-adjust height
              minHeight: '250px',  // Minimum height for small screens
            }}
          >
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <FontAwesomeIcon icon={faUserPen} size="5x" className="mb-3" style={{ color: '#71A872' }} />
              <Card.Title className="mt-3 text-success">Management</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} className="d-flex justify-content-center">
          <Card
            onClick={() => handleNavigation('/admin')}
            className="landCard clickable-card text-center shadow p-4"
            style={{
              cursor: 'pointer',
              border: '2px solid #71A872',
              width: '100%',  // Make width fill the column space
              maxWidth: '250px',  // Limit max width
              height: 'auto',  // Auto-adjust height
              minHeight: '250px',  // Minimum height for small screens
            }}
          >
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <FontAwesomeIcon icon={faTableColumns} size="5x" className="mb-3" style={{ color: '#71A872' }} />
              <Card.Title className="mt-3 text-success">Dashboard</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLandingPage;
