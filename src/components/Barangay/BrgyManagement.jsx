import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFilter, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import BtnAddBrgy from "../Buttons/Manage/BtnAddBrgy";
import "../table.css";
import BtnEditDelete from "../Buttons/Manage/BtnEditDelete";  // <-- Import BtnEditDelete
import { API_ENDPOINTS } from "../../config";

const BrgyManagement = () => {
    const [barangays, setBarangays] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [contentType, setContentType] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Function to fetch barangay data from the backend
    const fetchBarangays = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.BARANGAY_LIST);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setBarangays(data);  // Set the fetched data into state
        } catch (error) {
            console.error("Failed to fetch barangays:", error);
        }
    };

    // Fetch barangay data when the component mounts
    useEffect(() => {
        fetchBarangays();  // Initial data load
    }, []);

    // Handle file view logic
    const handleContentClick = (contentUrl) => {
        if (contentUrl.endsWith(".pdf")) {
            setContentType("pdf");
        } else {
            setContentType("image");
        }
        setSelectedContent(contentUrl);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContent(null);
        setContentType("");
    };

    const navigate = useNavigate();

    // Go back to the previous page
    const handleBack = () => {
        navigate(-1);
    };

    //search function
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
      };
      
      // Filter barangays based on the search query
      const filteredBrgy = barangays.filter(barangay => {
        if (!barangay || typeof barangay !== 'object') return false; // Safeguard against unexpected data
        return (
          barangay.brgy_name && barangay.brgy_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    //end of search function

    // Updated `Rows` component to pass all required props to `BtnEditDelete`
    const Rows = (props) => {
        const { brgy_id, brgyName, moa, phone_number } = props;
        return (
            <tr>
               
                <td>{brgyName}</td>
                <td>
                    <Button variant="success link" style={{fontSize: '13px'}} onClick={() => handleContentClick(moa)}>
                        <FontAwesomeIcon  icon={faEye} />
                    </Button>
                </td>
                <td>{phone_number}</td>
                {/* Pass `brgy_id` and `brgyName` to `BtnEditDelete` */}
                <td><BtnEditDelete brgyId={brgy_id} brgyName={brgyName} onBrgyUpdated={fetchBarangays} /></td> {/* <-- Pass `brgyName` as a prop */}
            </tr>
        );
    };

    const NewTable = ({ data }) => {
        return (
            <Table responsive striped bordered hover className="tableStyle">
                <thead>
                    <tr>
                        
                        <th>Barangay Name</th>
                        <th>MOA</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <Rows
                            key={row.id}
                            
                            brgyName={row.brgy_name}  // <-- Pass `brgy_name` to the child component
                            moa={row.moa}
                            phone_number={row.phone_number}

                        />
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <Container fluid 
        className="py-4 mt-5 d-flex flex-column justify-content-center me-0 ms-0">
          <Row className="align-items-center">
                          <Col xs="auto">
                              <Button 
                                  variant="link" 
                                  onClick={handleBack} 
                                  className="backBtn d-flex align-items-center text-success"
                              >
                                  <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                                 
                              </Button>
                          </Col>
                          <Col>
                              <h1 className="mb-0" style={{ color: '#4B4A4A' }}>Barangay Management</h1>
                          </Col>
                      </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{ width: '300px' }} onChange={handleSearch}/>
                </Col>
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

            {/* Render the table with the fetched data */}
            <NewTable data={filteredBrgy} />

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    {/* Pass `fetchBarangays` as `onBrgyAdded` prop */}
                    <BtnAddBrgy onBrgyAdded={fetchBarangays} />  {/* <-- Pass `fetchBarangays` as a prop */}
                </Col>
            </Row>
        </Container>
    );
};

export default BrgyManagement;
