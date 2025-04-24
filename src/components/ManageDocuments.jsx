import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faEye, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import BtnAddDocument from "./Buttons/Manage/BtnAddDocument";
import { API_ENDPOINTS } from "../config";

const ManageDocuments = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [contentType, setContentType] = useState("");
    const [documents, setDocuments] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentDocument, setCurrentDocument] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [newFile, setNewFile] = useState(null); // State for the new file
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch documents from the backend
    const fetchDocuments = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.DOCUMENT_LIST);
            if (!response.ok) throw new Error("Failed to fetch documents.");
            const data = await response.json();
            setDocuments(data);
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    // Search function
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter documents based on the search query
    const filteredDocs = documents.filter(document => {
        return (
            (document.title && document.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (document.id && document.id.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    // Open the content (PDF, DOCX, Image)
    const handleContentClick = (contentUrl) => {
        const fullUrl = `${API_ENDPOINTS.BASE}${contentUrl}`;
        if (fullUrl.endsWith(".pdf")) {
            window.open(fullUrl, "_blank");
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

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContent(null);
        setContentType("");
    };

    const handleBack = () => {
        navigate(-1);
    };

    // Delete document
    const handleDeleteDocument = async (documentId) => {
        if (!window.confirm("Are you sure you want to delete this document?")) {
            return;
        }
        try {
            const response = await fetch(API_ENDPOINTS.DELETE_DOCUMENT(documentId), {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchDocuments();
            } else {
                throw new Error('Failed to delete document.');
            }
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };

    // Handle editing document
    const handleEditDocument = (document) => {
        setCurrentDocument(document);
        setNewTitle(document.title);
        setShowEditForm(true);
    };

    // Handle file selection for edit
    const handleFileChange = (e) => {
        setNewFile(e.target.files[0]);
    };

    // Save the edited document
    const handleSaveEdit = async () => {
        const formData = new FormData();
        formData.append("title", newTitle);
        if (newFile) {
            formData.append("file", newFile); // Append the new file
        }

        try {
            const response = await fetch(API_ENDPOINTS.UPDATE_DOCUMENT(currentDocument.id), {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                setShowEditForm(false);
                fetchDocuments();
            } else {
                throw new Error('Failed to update document.');
            }
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    const Rows = ({ id, title, file }) => {
        return (
            <tr>
                
                <td>{title}</td>
                <td>
                    <Button style={{ fontSize: '13px' }} variant="success" onClick={() => handleContentClick(file)}>
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                </td>
                <td>
                    <Button
                        style={{ fontSize: '13px', marginRight: '5px' }}
                        variant="success"
                        onClick={() => handleEditDocument({ id, title })}
                    >
                        <FontAwesomeIcon icon={faEdit} style={{ color: "white" }} />
                    </Button>
                    <Button
                        style={{ fontSize: '13px' }}
                        variant="danger"
                        onClick={() => handleDeleteDocument(id)}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                </td>
            </tr>
        );
    };

    const NewTable = ({ data }) => {
        return (
            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                    <tr>
                        
                        <th>Document Title</th>
                        <th>Document File</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((document) => (
                        <Rows key={document.id} id={document.id} title={document.title} file={document.file} />
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <Container fluid className="py-4 mt-5 d-flex flex-column justify-content-center me-0 ms-0">
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
                    <h1 className="mb-0" style={{ color: '#4B4A4A' }}>Document Management</h1>
                </Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{ width: '300px' }} onChange={handleSearch} />
                </Col>
            </Row>

            {/* Edit Document Form */}
            {showEditForm && (
                <Modal show={showEditForm} onHide={() => setShowEditForm(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Document Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formFile">
                                <Form.Label>Upload New File</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        
                        <Button variant="success" onClick={handleSaveEdit}>
                            Save Changes
                        </Button>

                        <Button variant="danger" onClick={() => setShowEditForm(false)}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* Documents Table */}
            <NewTable data={filteredDocs} />

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <BtnAddDocument onDocumentAdded={fetchDocuments} />
                </Col>
            </Row>
        </Container>
    );
};

export default ManageDocuments;
