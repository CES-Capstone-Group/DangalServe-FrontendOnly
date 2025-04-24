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
    const [venue, setVenue] = useState('');
    const [activityObjectives, setActivityObjectives] = useState('');
    const [organizingTeam, setOrganizingTeam] = useState(''); // Added state for Organizing Team
    const [error, setError] = useState(null);
    const [loadingProposals, setLoadingProposals] = useState(true);

    const handleAddSchedule = () => {
        if (!activityTitle || !manualDate || !targetTime || !proposalTitle || !venue || !activityObjectives || !organizingTeam) {
            alert("Please fill in all the details.");
            return;
        }
    
        // Format date and time correctly for the backend
        const formattedDate = new Date(manualDate).toISOString().split('T')[0]; // Ensure date is in YYYY-MM-DD
        const formattedTime = `${targetTime}:00.000000`; // Add seconds and microseconds to match backend format
    
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
        formData.append("target_date", formattedDate); // Date in YYYY-MM-DD
        formData.append("target_time", formattedTime); // Time in HH:mm:ss.000000 format
        formData.append("proposal", proposalId);
        formData.append("activity_venue", venue);
        formData.append("activity_objectives", activityObjectives);
        formData.append("organizing_team", organizingTeam);
    
        // Append each file to FormData
        if (files.length > 0) {
            files.forEach((file, index) => {
                formData.append("files[]", file); // Use 'files[]' to send as an array
            });
        } else {
            console.warn("No files to upload.");
        }
    
        console.log("Form Data Sent:", Object.fromEntries(formData));
    
        // Send the formData to the backend
        fetch(API_ENDPOINTS.ACTIVITY_SCHEDULE_CREATE, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text); });
                }
                return response.json();
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
        setVenue("");
        setActivityObjectives("");
        setOrganizingTeam(""); // Reset organizing team
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
                const response = await fetch(`${API_ENDPOINTS.PROPOSAL_LIST_CREATE}?status=Approved%20by%20President`, {
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
                            <Form.Label column sm={2}>Proposal:<span style={{ color: "red" }}>*</span></Form.Label>
                            <Col>
                                <Form.Select
                                    value={proposalTitle}
                                    onChange={(e) => setProposalTitle(e.target.value)}
                                    required={true}
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
                            <Form.Label column sm={2} className="h5">Activity Title:<span style={{ color: "red" }}>*</span></Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        className="input"
                                        type="text"
                                        required={true}
                                        placeholder="Enter activity title"
                                        value={activityTitle}
                                        onChange={(e) => setActivityTitle(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="DateActivity">
                            <Form.Label column sm={2} className="h5">Target Date:<span style={{ color: "red" }}>*</span></Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        className="input"
                                        required={true}
                                        type="date"
                                        value={manualDate}
                                        onChange={(e) => setManualDate(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                            <Form.Label column sm={2} className="h5">Target Time:<span style={{ color: "red" }}>*</span></Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        className="input"
                                        required={true}
                                        type="time"
                                        value={targetTime}
                                        onChange={handleTimeChange}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        {/* Venue */}
                        <Form.Group as={Row} className="mb-3" controlId="venue">
                            <Form.Label column sm={2} className="h5">Venue:<span style={{ color: "red" }}>*</span></Form.Label>
                            <Col>
                                <Form.Control
                                    className="input"
                                    type="text"
                                    required={true}
                                    placeholder="Enter venue"
                                    value={venue}
                                    onChange={(e) => setVenue(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        {/* Organizing Team */}
                        <Form.Group as={Row} className="mb-3" controlId="organizingTeam">
                            <Form.Label column sm={2} className="h5">Organizing Team:<span style={{ color: "red" }}>*</span></Form.Label>
                            <Col>
                                <Form.Control
                                    className="input"
                                    type="text"
                                    required={true}
                                    placeholder="Enter the name of the division/department/organizing team"
                                    value={organizingTeam}
                                    onChange={(e) => setOrganizingTeam(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        {/* Objectives */}
                        <Form.Group as={Row} className="mb-3" controlId="activityObjectives">
                            <Form.Label column sm={2} className="h5">Objectives:<span style={{ color: "red" }}>*</span></Form.Label>
                            <Col>
                                <Form.Control
                                    className="input"
                                    as="textarea"
                                    rows={4}
                                    required={true}
                                    placeholder="Enter the objectives of the activity"
                                    value={activityObjectives}
                                    onChange={(e) => setActivityObjectives(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        {/* File Inputs */}
                        {fileInputs.map((input) => (
                            <Form.Group as={Row} className="mb-3" controlId="formFileMultiple" key={input.id}>
                                <Form.Label column sm={2}>Upload Files</Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                        type="file"
                                        multiple
                                        onChange={(e) => handleFileChange(e, input.id)}
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleRemoveFile(input.id)}
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                                </Col>
                            </Form.Group>
                        ))}

                        <Button variant="success" onClick={handleAddMoreFile}>
                            <FontAwesomeIcon icon={faPlus} /> Add More File
                        </Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="success" onClick={handleAddSchedule}>Add Schedule</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddSchedule;
