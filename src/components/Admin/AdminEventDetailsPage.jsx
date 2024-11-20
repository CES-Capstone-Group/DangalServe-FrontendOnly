import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faChevronLeft, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

const AdminEventDetailsPage = () => {
    const location = useLocation();
    const { eventDetails, eventName } = location.state || {};
    const navigate = useNavigate();
    const { proposal_title, target_date, target_time, status, file } = eventDetails || {};
    const [showModal, setShowModal] = useState(false);


    const handleFileClick = () => {
        if (eventDetails.file) {
            const fileExtension = eventDetails.file.split('.').pop();
            if (fileExtension === "pdf") {
                // Show the modal for PDF files
                setShowModal(true);
            } else {
                // Download the file if it's not a PDF
                const link = document.createElement("a");
                link.href = eventDetails.file;
                link.download = eventDetails.file.split('/').pop();
                link.click();
            }
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <Container fluid className="py-4 mt-5 d-flex flex-column justify-content-center">
            {/* Back Button */}
            <Row className="mb-3">
                <Col>
                    <Button
                        variant="link"
                        onClick={() => navigate(-1)}
                        className="backBtn d-flex align-items-center text-success"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                        <span className="ms-2">Back</span>
                    </Button>
                    <h2 className="mb-4">{eventName} Details</h2>
                </Col>
            </Row>

            {/* Event Details Card */}
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-sm p-4">
                        <Card.Body>
                            <Card.Title className="mb-4">
                                {eventDetails?.activity_title}{" "}
                                <span className={status === "Completed" ? "text-success" : "text-warning"}>
                                    <FontAwesomeIcon
                                        icon={status === "Completed" ? faCheckCircle : faMinusCircle}
                                        className="me-2"
                                    />
                                    {status}
                                </span>
                            </Card.Title>
                            <Card.Text>
                                <strong>Proposal Title:</strong> {proposal_title || "N/A"}
                            </Card.Text>
                            <Card.Text>
                                <strong>Target Date:</strong> {target_date || "N/A"}
                            </Card.Text>
                            <Card.Text>
                                <strong>Target Time:</strong> {target_time || "N/A"}
                            </Card.Text>
                            {/* File Viewing/Downloading Button */}
                            {file ? (
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        if (file.endsWith(".pdf")) {
                                            // Open PDF in a new tab
                                            window.open(file, "_blank");
                                        } else {
                                            // Download the file
                                            const link = document.createElement("a");
                                            link.href = file;
                                            link.download = file.split("/").pop();
                                            link.click();
                                        }
                                    }}
                                >
                                    View/Download File
                                </Button>
                            ) : (
                                <p>No file available</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            {/* PDF Modal */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>View PDF File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {eventDetails.file && (
                        <embed
                            src={eventDetails.file}
                            type="application/pdf"
                            width="100%"
                            height="600px"
                        />
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AdminEventDetailsPage;
