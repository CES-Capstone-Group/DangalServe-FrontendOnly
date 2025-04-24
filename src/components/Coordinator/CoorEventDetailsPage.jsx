import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faChevronLeft, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../../config";

const CoorEventDetailsPage = () => {
    const location = useLocation();
    const { eventDetails, eventName, activity_schedule_id } = location.state || {};
    const navigate = useNavigate();
    const { proposal_title, target_date, target_time, activity_venue, activity_objectives, status, files } = eventDetails || {};
    const [showModal, setShowModal] = useState(false);
    const [aar, setAar] = useState(null);

    // Display the list of files as links
    const displayFiles = (files) => {
        if (!files || files.length === 0) {
            return "No files available";
        }

        return files.map((file, index) => (
            <a
                key={index}
                href={`${API_ENDPOINTS.BASE}${file.file}`} // Ensure the correct file path
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", marginBottom: "8px" }}
            >
                {file.file.split("/").pop()} {/* Display just the file name */}
            </a>
        ));
    };

    useEffect(() => {
        console.log(eventDetails); // Log the files array

        if (files) {
            console.log("Files:", files); // Log the files array
        }
    }, [files]);

    useEffect(() => {
        const fetchAar = async () => {
            if (activity_schedule_id) {
                try {
                    const response = await fetch(API_ENDPOINTS.AAR_BY_PROPOSAL(activity_schedule_id));
                    
                    if (!response.ok) {
                        if (response.status === 404) {
                            console.log("No AAR found for this activity schedule.");
                        } else {
                            console.error("Error fetching AAR:", response.statusText);
                        }
                        return;
                    }
    
                    const data = await response.json();
                    setAar(data); // Store the AAR data
                } catch (error) {
                    console.error("Error fetching AAR:", error);
                }
            }
        };
    
        fetchAar();
    }, [activity_schedule_id]);

    const handleCloseModal = () => setShowModal(false);

    return (
        <Container fluid className="d-flex flex-column justify-content-center">
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
                    <Card className="shadow border p-4">
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
                            <Card.Text>
                                <strong>Activity Venue:</strong> {activity_venue || "N/A"}
                            </Card.Text>
                            <Card.Text>
                                <strong>Activity Objectives:</strong> {activity_objectives || "N/A"}
                            </Card.Text>
                            {/* File Viewing/Downloading Button */}
                            <Card.Text>
                                <strong>Activity File:</strong> {displayFiles(files)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card className="mt-4 shadow border">
                        <Card.Body>
                            <Row>
                                <Col md={8}>
                                    <Card.Title className="h1">After Activity Report</Card.Title>
                                </Col>
                                <Col md={4} className="d-flex justify-content-end">
                                {aar ? (
                                    <Button
                                        onClick={() =>
                                            navigate("/coor/aarview", {
                                                state: { activity_schedule_id },
                                            })
                                        }
                                        variant="success"
                                    >
                                        View AAR
                                    </Button>
                                    ) : (
                                    <Button
                                        onClick={() =>
                                            navigate("/coor/aarform", {
                                                state: {
                                                    activity_schedule_id,
                                                    eventDetails,
                                                    eventName,
                                                    target_date,
                                                    activity_venue,
                                                    activity_objectives,
                                                },
                                            })
                                        }
                                        variant="success"
                                    >
                                        Submit
                                    </Button>
                                )}
                                </Col>
                            </Row>
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
                    {files && files[0]?.file && (
                        <embed
                            src={`${API_ENDPOINTS.BASE}${files[0].file}`} // Show the first file for now
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

export default CoorEventDetailsPage;
