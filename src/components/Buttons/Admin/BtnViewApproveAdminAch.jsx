import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const BtnViewProposal = ({ proposal }) => {
    const [show, setShow] = useState(false);
    const [remarks, setRemarks] = useState("");

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // Check if proposal exists before rendering the component
    if (!proposal) {
        return null; // Return null or a loading indicator if proposal is undefined
    }

    return (
        <>
            <Button
                className="mt-2 mb-2 ms-3 me-5 ps-3 pe-3"
                onClick={handleShow}
                style={{
                    backgroundColor: "#71A872",
                    margin: "0px",
                    border: "0px",
                    color: "white",
                }}
            >
                View
            </Button>

            <Modal backdrop="static" centered size="lg" show={show} onHide={handleClose} className="p-6">
                <Modal.Header closeButton>
                    <Button onClick={handleClose} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">
                        Back
                    </Button>
                    <Modal.Title>Proposal Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Proposal Title</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.title}/> 
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Lead Proponent</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.lead_proponent}/>  
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Department</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.department}/>  
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Remarks</Form.Label>
                            <Col sm={8}>
                                <Form.Control as="textarea" rows={3} value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Add any remarks (optional)" />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BtnViewProposal;
