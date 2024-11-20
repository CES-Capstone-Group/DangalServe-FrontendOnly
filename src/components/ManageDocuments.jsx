import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft, faEye, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BtnAddDocument from "./Buttons/Manage/BtnAddDocument";
import { API_ENDPOINTS } from "../config";

const ManageDocuments = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [contentType, setContentType] = useState("");
    const [documents, setDocuments] = useState([]);  // <-- Store documents data
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch documents from the backend
    const fetchDocuments = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.DOCUMENT_LIST);  // Adjust your backend URL
            if (!response.ok) throw new Error("Failed to fetch documents.");
            const data = await response.json();
            setDocuments(data);  // Update state with fetched data
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

    // Fetch documents on component mount
    useEffect(() => {
        fetchDocuments();  // Initial data load
    }, []);

    //search function
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
      };
      
      // Filter barangays based on the search query
      const filteredDocs = documents.filter(document => {
        if (!document || typeof document !== 'object') return false; // Safeguard against unexpected data
        return (
            (document.title && document.title.toLowerCase().includes(searchQuery.toLowerCase()))||
            (document.id && document.id.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      });
    //end of search function

    const handleContentClick = (contentUrl) => {
        const fullUrl = `${API_ENDPOINTS.BASE}${contentUrl}`;
        if (fullUrl.endsWith(".pdf")) {
            window.open(fullUrl, "_blank"); // Open PDF in a new tab
        } else if (fullUrl.endsWith(".docx")) {
            const link = document.createElement("a");
            link.href = fullUrl;
            link.download = fullUrl.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            setContentType("image");
            setSelectedContent(fullUrl);
            setShowModal(true);
        }
    };

    useEffect(() => {    
    }, [selectedContent]);

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContent(null);
        setContentType("");
    };

    // Handle back navigation
    const handleBack = () => {
        navigate(-1);  // Navigate to the previous page
    };

    // Handle Document Deletion
    const handleDeleteDocument = async (documentId) => {
        if (!window.confirm("Are you sure you want to delete this document?")) {
            return;
        }
        try {
            const response = await fetch(API_ENDPOINTS.DELETE_DOCUMENT(documentId), {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchDocuments();  // Refresh the table data after deletion
            } else {
                throw new Error('Failed to delete document.');
            }
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };

    // Table row component
    const Rows = (props) => {
        const { id, title, file } = props;
        return (
            <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>
                    <Button style={{fontSize: '13px'}} variant="success" onClick={() => handleContentClick(file)}> 
                            <FontAwesomeIcon icon={faEye} />
                    </Button>
                </td>
                <td>
                    
                    <Button style={{fontSize: '13px'}} variant="danger link" onClick={() => handleDeleteDocument(id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                </td>
            </tr>
        );
    };

    // Table component
    const NewTable = ({ data }) => {
        return (
            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>ID</th>
                        <th>Document Title</th>
                        <th>Document File</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((document) => (
                        <Rows   
                            key={document.id} 
                            id={document.id}
                            title={document.title} 
                            file={document.file}
                        />  // Pass each document as a prop
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <Container fluid 
        className="py-4 mt-5  d-flex flex-column justify-content-center me-0 ms-0">
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
                <Col><h1>Document Management</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{ width: '300px' }} onChange={handleSearch}/>
                </Col>
                {/* Modal for viewing full image */}
                <Modal size="lg" show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body className="text-center">
                        {selectedContent && contentType === "pdf" && (
                            <embed src={selectedContent} type="application/pdf" width="100%" height="900px" />
                        )}
                        {selectedContent && contentType === "docx" && (
                            <a href={selectedContent} download>
                                Click here to download the document
                            </a>
                        )}
                        {/* Handle image content if necessary */}
                    </Modal.Body>
                </Modal>
            </Row>

            {/* Render the documents table */}
            <NewTable data={filteredDocs} className="tableStyle"/>

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    {/* Add Document Button */}
                    <BtnAddDocument onDocumentAdded={fetchDocuments}  />  {/* <-- Call the refresh function on add */}
                </Col>
            </Row>
        </Container>
    );
};

export default ManageDocuments;
