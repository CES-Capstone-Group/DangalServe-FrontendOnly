import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import BtnAddResearchAgenda from "./Buttons/Admin/BtnAddResearchAgenda";
import BtnEditDeleteResearchAgenda from "./Buttons/Admin/BtnEditDeleteResearchAgenda";
import { API_ENDPOINTS } from "../config";

const ManageAgenda = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [contentType, setContentType] = useState("");
    const [agendas, setAgendas] = useState([]);
    const [loadingAgendas, setLoadingAgendas] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // Fetch Research Agendas from Backend
    const fetchAgendas = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.RESEARCH_AGENDA_LIST);
            if (!response.ok) throw new Error("Failed to fetch agendas.");
            const data = await response.json();
            setAgendas(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingAgendas(false);
        }
    };

    useEffect(() => {
        fetchAgendas();
    }, []);

    //search function
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
      };
      
      // Filter barangays based on the search query
      const filteredAgenda = agendas.filter(agenda => {
        if (!agenda || typeof agenda !== 'object') return false; // Safeguard against unexpected data
        return (
            agenda.label && agenda.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    //end of search function

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

    const handleBack = () => {
        navigate(-1);
    };

    const handleAgendaUpdated = () => {
        fetchAgendas();
    };

    // Table row component for displaying each agenda
    const Rows = ({ agenda }) => (
        <tr>
            <td>{agenda.label}</td>
            <td>
                <Button
                    variant="link"
                    className="viewBtn"
                    onClick={() => handleContentClick(agenda.image_url)}
                    style={{ backgroundColor: '#71A872', color: 'white', fontSize: '13px' }}
                >
                    <FontAwesomeIcon icon={faEye} />
                </Button>
            </td>
            <td>
                {/* Pass agenda and handleAgendaUpdated as props */}
                <BtnEditDeleteResearchAgenda
                    researchAgenda={agenda}
                    onResearchAgendaUpdated={handleAgendaUpdated}
                />
            </td>
        </tr>
    );

    // Table component
    const NewTable = ({ data }) => (
        <Table responsive bordered striped hover className="tableStyle">
            <thead>
                <tr> {/* Dark green header */}
                    <th>Research Agenda Label</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((agenda, index) => <Rows key={agenda.id} agenda={agenda} />)
                ) : (
                    <tr>
                        <td colSpan="3" className="text-center">No research agendas found.</td>
                    </tr>
                )}
            </tbody>
            
            
        </Table>
    );

    if (loadingAgendas) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    return (
        <Container fluid 
        className="py-4 mt-5 d-flex flex-column justify-content-center me-0 ms-0">
            <Row>
                <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success me-3">
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
                <Col><h1>Research Agenda Management</h1></Col>
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

            {/* Render the agendas table */}
            <NewTable data={filteredAgenda} />

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <BtnAddResearchAgenda onResearchAgendaAdded={handleAgendaUpdated} /> {/* Call the refresh function on add */}
                </Col>
            </Row>
        </Container>
    );
};

export default ManageAgenda;
