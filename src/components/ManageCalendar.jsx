import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import { API_ENDPOINTS } from "../config";

const ManageCalendar = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [contentType, setContentType] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [calendars, setCalendar] = useState([]);
    const navigate = useNavigate();

    // Fetch activities from the backend
    const fetchCalendar = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.ACTIVITY_SCHEDULE_LIST);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCalendar(data);  // Update state with fetched data
        } catch (error) {
            console.error("Error fetching calendar:", error);
        }
    };

    // Fetch activities on component mount
    useEffect(() => {
        fetchCalendar();
    }, []);

    // Handle content view modal
    const handleContentClick = (contentUrl) => {
        setContentType(contentUrl.endsWith(".pdf") ? "pdf" : "image");
        setSelectedContent(contentUrl);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContent(null);
        setContentType("");
    };

    // Handle back navigation
    const handleBack = () => {
        navigate(-1);  // Navigate to the previous page
    };

    // Search function
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter calendar activities based on the search query
    const filteredCal = calendars.filter(calendar => {
        if (!calendar || typeof calendar !== 'object') return false; // Safeguard against unexpected data
        return (
            (calendar.proposal_title && calendar.proposal_title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (calendar.activity_title && calendar.activity_title.toLowerCase().includes(searchQuery.toLowerCase()))||
            (calendar.status && calendar.status.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    // Table row component
    const Rows = (props) => {
        const { proposal_title, activity_title, target_date, target_time, file, status } = props;
        return (
            <tr>
                <td>{proposal_title}</td>
                <td>{activity_title}</td>
                <td>{target_date}</td>
                <td>{target_time}</td>
                <td>
                    <Button variant="success link" onClick={() => handleContentClick(file)}>
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                </td>
                <td>{status}</td>
            </tr>
        );
    };

    // Table component
    const NewTable = ({ data }) => {
        return (
            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                    <tr>
                        <th>Proposal Title</th>
                        <th>Activity Title</th>
                        <th>Target Date</th>
                        <th>Target Time</th>
                        <th>File</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((calendar, index) => (
                        <Rows
                            key={index}
                            proposal_title={calendar.proposal_title}
                            activity_title={calendar.activity_title}
                            target_date={calendar.target_date}
                            target_time={calendar.target_time}
                            file={calendar.file}
                            status={calendar.status}
                        />
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <Container fluid className="py-4 mt-5 d-flex flex-column justify-content-center me-0 ms-0">
            <Row>
                <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>

                <Col className="d-flex justify-content-end">
                    <Button style={{ backgroundColor: '#71A872', border: '0px' }}>
                        <FontAwesomeIcon className='me-2' icon={faFilter} ></FontAwesomeIcon>
                        Filter
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col><h1>Calendar Management</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input
                        type="search"
                        className="form-control"
                        placeholder='Search'
                        style={{ width: '300px' }}
                        onChange={handleSearch}
                    />
                </Col>
                {/* Modal for viewing full image */}
                <Modal size="lg" show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body className="text-center">
                        {selectedContent && contentType === "image" && (
                            <img src={selectedContent} alt="Content" style={{ width: '100%' }} />
                        )}
                        {selectedContent && contentType === "pdf" && (
                            <embed src={selectedContent} type="application/pdf" width="100%" height="900px" />
                        )}
                    </Modal.Body>
                </Modal>
            </Row>

            <NewTable data={filteredCal} />
        </Container>
    );
};

export default ManageCalendar;
