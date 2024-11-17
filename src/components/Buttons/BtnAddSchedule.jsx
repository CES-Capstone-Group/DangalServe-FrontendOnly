import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, InputGroup, Container } from "react-bootstrap";
import { API_ENDPOINTS } from "../../config";

const BtnAddSchedule = ({ showModal, handleCloseModal, handleShowModal, selectedDate, addNewEvent }) => {
    const [fileInputs, setFileInputs] = useState([{ id: 1 }]);
    const [files, setFiles] = useState([]); // Changed to an array to handle multiple files
    const [activityTitle, setActivityTitle] = useState(""); 
    const [targetTime, setTargetTime] = useState("");  
    const [manualDate, setManualDate] = useState(selectedDate || new Date().toISOString().split('T')[0]);
    const [proposalTitle, setProposalTitle] = useState(""); 
    const [proposals, setProposals] = useState([]);
    const [error, setError] = useState(null);
    const [loadingProposals, setLoadingProposals] = useState(true);
    
    const handleAddSchedule = () => {
        if (!activityTitle || !manualDate || !targetTime || !proposalTitle) {
            alert("Please fill in all the details.");
            return;
        }
    
        // Format date and time correctly
        const formattedDate = new Date(manualDate).toISOString().split('T')[0];
        const formattedTime = targetTime.length === 5 ? `${targetTime}:00` : targetTime;
    
        const selectedProposal = proposals.find(proposal =>
            proposal.title.trim().toLowerCase() === proposalTitle.trim().toLowerCase()
        );
    
        if (!selectedProposal) {
            console.error(`Proposal ID not found for title: ${proposalTitle}`);
            return;
        }
    
        const proposalId = selectedProposal.proposal_id;
    
        // Create FormData for API request
        const formData = new FormData();
        formData.append("activity_title", activityTitle);
        formData.append("target_date", formattedDate);
        formData.append("target_time", formattedTime);
        formData.append("proposal", proposalId);
    
        // Append each file to FormData
        if (files.length > 0) {
            files.forEach((file, index) => {
                formData.append("files[]", file); // Use 'files[]' to send as an array
            });
        } else {
            console.warn("No files to upload.");
        }
    
        // Debug: Log FormData content
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
    
        // Send the formData to the backend
        fetch(API_ENDPOINTS.ACTIVITY_SCHEDULE_CREATE, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
                // Note: Do NOT set 'Content-Type'; the browser will handle it
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(data => {
            // console.log('New event added to backend:', data);
        })
        .catch(error => {
            console.error('Error adding event to backend:', error.message);
        });
    
        // Close the modal and reset fields
        handleCloseModal();
        setActivityTitle("");
        setTargetTime("");
        setManualDate(new Date().toISOString().split("T")[0]);
        setProposalTitle("");
        setFiles([]); // Reset files
    };
    

    // Handle adding a new file input field
    const handleAddMoreFile = () => {
        setFileInputs([...fileInputs, { id: fileInputs.length + 1 }]);
    };

    // Handle removing a file input field
    const handleRemoveFile = (id) => {
        setFileInputs(fileInputs.filter(input => input.id !== id));
    };

    // Handle file input change
    const handleFileChange = (e, id) => {
        const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]); // Add new files to state
        // console.log(`Files for input ${id}:`, selectedFiles);
    };

    useEffect(() => {
        // Fetch proposals from API
        const fetchProposals = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                console.error("No token found.");
                setLoadingProposals(false);
                return;
            }

            try {
                const response = await fetch(`${API_ENDPOINTS.PROPOSAL_LIST_CREATE}?status=Approved%20by%20Barangay`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProposals(data);
                } else {
                    console.error("Error fetching approved proposals:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching approved proposals:", error);
                setError("Failed to load proposals");
            } finally {
                setLoadingProposals(false);
            }
        };

        fetchProposals();
    }, []);

    // Format target time for HTML input
    const handleTimeChange = (e) => {
        const time = e.target.value;
        setTargetTime(time.slice(0, 5)); // Set time in HH:mm format
    };

    return (
        <div className="d-flex justify-content-start m-3">
            <div>
                <Button
                    style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }}
                    onClick={handleShowModal}
                >
                    Add Schedule
                </Button>
            </div>

            <Modal backdrop="static" centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title>Activity Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="">
                    <Form>
                        <Form.Group className="mb-3" as={Row} controlId="proposalTitle">
                            <Form.Label column sm={2}>Proposal:</Form.Label>
                            <Col>
                                <Form.Select
                                    value={proposalTitle}
                                    onChange={(e) => setProposalTitle(e.target.value)}
                                >
                                    <option value="" disabled>Select Proposal</option>
                                    {proposals.map((proposal) => (
                                        <option key={proposal.id} value={proposal.title}>
                                            {proposal.title}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="txtActivityTitle">
                            <Form.Label column sm={2} className="h5">Activity Title:</Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        className="input"
                                        type="text"
                                        placeholder="Enter activity title"
                                        value={activityTitle}
                                        onChange={(e) => setActivityTitle(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="DateActivity">
                            <Form.Label column sm={2} className="h5">Target Date:</Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        className="input"
                                        type="date"
                                        value={manualDate}
                                        onChange={(e) => setManualDate(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                            <Form.Label column sm={2} className="h5">Target Time:</Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        className="input"
                                        type="time"
                                        value={targetTime}
                                        onChange={handleTimeChange}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        {fileInputs.map((input, index) => (
                            <Form.Group as={Row} className="mb-3 align-items-center" controlId={`file-${input.id}`} key={input.id}>
                                <Form.Label column sm={2} className="h5">File {index + 1}</Form.Label>
                                <Col className="d-flex align-items-center">
                                    <InputGroup>
                                        <Form.Control
                                            className="inputFile"
                                            type="file"
                                            accept="image/*, application/pdf, .docx"
                                            onChange={(e) => handleFileChange(e, input.id)}
                                            style={{ height: '38px' }}
                                        />
                                        {fileInputs.length > 1 && (
                                            <Button
                                                onClick={() => handleRemoveFile(input.id)}
                                                variant="danger"
                                                className="d-flex align-items-center"
                                                style={{ height: '38px' }}
                                            >
                                                <FontAwesomeIcon icon={faMinus} />
                                            </Button>
                                        )}
                                    </InputGroup>
                                </Col>
                                <p className="text-sm">Max Size: 25MB</p>
                            </Form.Group>
                        ))}

                        <Container fluid className="d-flex justify-content-center align-items-center">
                            <Button onClick={handleAddMoreFile} variant="success" className="mt-2">
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Container>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button size="lg" variant="success" onClick={handleAddSchedule}>
                        Add Schedule
                    </Button>
                    <Button size="lg" variant="danger" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddSchedule;
