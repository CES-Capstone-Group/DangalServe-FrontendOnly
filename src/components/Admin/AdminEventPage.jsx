import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faChevronLeft, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../../config";

const AdminEventPage = () => {
    const location = useLocation();
    const { proposalEvents, proposalName } = location.state || {};
    const navigate = useNavigate();

    const handleEventClick = async (event) => {
        try {
            // Fetch the event details using the event's ID
            const response = await fetch(API_ENDPOINTS.ACTIVITY_SCHEDULE_DETAIL(event.id));
            
            if (response.ok) {
                const eventData = await response.json();
                // Navigate to the event details page with the fetched event data
                navigate(`/admin/event-detail`, {
                    state: {
                        eventDetails: eventData,
                        eventName: event.activity_title
                    }
                });
            } else {
                console.error("Error fetching event details:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching event:", error);
        }
    };

    return (
        <Container fluid>
            <Row>
                <Button
                    variant="link"
                    onClick={() => navigate(-1)}
                    className="backBtn d-flex align-items-center text-success"
                >
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>
                <h2 className="mb-4">{proposalName} Events</h2>
            </Row>
            <Row className="mb-4">
                {proposalEvents && proposalEvents.length > 0 ? (
                    proposalEvents.map((event) => (
                        <Col key={event.id} sm={12} className="mb-4">
                            <Card
                                className="event-card shadow-sm d-flex flex-column"
                                onClick={() => handleEventClick(event)}
                                style={{ cursor: "pointer" }}
                            >
                                <Card.Header className="d-flex justify-content-between align-items-center">
                                    <Card.Title className="text-success" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                        {event.activity_title}
                                    </Card.Title>
                                    <Card.Title className={event.status === "Completed" ? "text-success" : "text-warning"}>{event.status}
                                        <FontAwesomeIcon
                                            icon={
                                                event.status === "Completed"
                                                    ? faCheckCircle
                                                    : event.status === "In Progress"
                                                    ? faMinusCircle
                                                    : null
                                            }
                                            className="ms-2"
                                        />
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
                                    <Card.Text style={{ fontSize: "1rem", color: "#555" }}>
                                        <strong>Date:</strong> {event.target_date} <br />
                                        <strong>Time:</strong> {event.target_time}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No active events for this proposal.</p>
                )}
            </Row>
        </Container>
    );
};

export default AdminEventPage;
