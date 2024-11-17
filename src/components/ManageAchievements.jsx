import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import BtnEditDeleteAchievement from "./Buttons/Admin/BtnEditDeleteAchievement";
import BtnAddAchievement from "./Buttons/Admin/BtnAddAchievement";
import { API_ENDPOINTS } from "../config";

const ManageAchievements = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [contentType, setContentType] = useState("");
    const [achievements, setAchievements] = useState([]);  // <-- Store achievements data
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // Fetch Achievements from Backend
    const fetchAchievements = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.ACHIEVEMENT_LIST);  // Adjust your backend URL
            if (!response.ok) throw new Error("Failed to fetch achievements.");
            const data = await response.json();
            setAchievements(data);  // Update state with fetched data
        } catch (error) {
            console.error("Error fetching achievements:", error);
        }
    };

    // Fetch achievements on component mount
    useEffect(() => {
        fetchAchievements();
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

    // Handle Achievement Update
    const handleAchievementUpdated = () => {
        fetchAchievements();  // Refresh the table data after an update
    };

    // Table row component
    const Rows = (props) => {
        const { achievement } = props;
        return (
            <tr>
                <td>{achievement.award_title}</td>
                <td>{achievement.awardee}</td>
                <td>{achievement.awarded_by}</td>
                <td>{achievement.date_awarded}</td>
                <td>
                    <Button style={{fontSize: '13px'}} variant="success link" onClick={() => handleContentClick(achievement.image_url)}>
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                </td>
                {/* Pass required props to child component for edit/delete functionality */}
                <td>
                    <BtnEditDeleteAchievement
                        achievement={achievement}
                        onAchievementUpdated={handleAchievementUpdated}  // Callback to refresh the table
                    />
                </td>
            </tr>
        );
    };

    //search function
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
      };
      
      // Filter barangays based on the search query
      const filteredAch = achievements.filter(achievement => {
        if (!achievement || typeof achievement !== 'object') return false; // Safeguard against unexpected data
        return (
            (achievement.award_title && achievement.award_title.toLowerCase().includes(searchQuery.toLowerCase()))||
            (achievement.awardee && achievement.awardee.toLowerCase().includes(searchQuery.toLowerCase()))||
            (achievement.awarded_by && achievement.awarded_by.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      });
    //end of search function

    // Table component
    const NewTable = ({ data }) => {
        return (
            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                    <tr>
                        <th>Award Title</th>
                        <th>Awardee</th>
                        <th>Awarded By</th>
                        <th>Date Awarded</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((achievement, index) => (
                        <Rows key={achievement.id} achievement={achievement} />  // Pass each achievement as a prop
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <Container fluid
        className="py-4 mt-5 d-flex flex-column justify-content-center me-0 ms-0" >
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
                <Col><h1>Achievement Management</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{ width: '300px' }} onChange={handleSearch}/>
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

            {/* Render the achievements table */}
            <NewTable data={filteredAch} />

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    {/* Add Achievement Button */}
                    <BtnAddAchievement onAchievementAdded={handleAchievementUpdated} />  {/* <-- Call the refresh function on add */}
                </Col>
            </Row>
        </Container>
    );
};

export default ManageAchievements;
