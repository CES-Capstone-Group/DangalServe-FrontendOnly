import React, { useState } from "react";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import ProposalPB from "../../ProposalPB";
import BtnDownloadProposal from "../BtnDownloadProposal";

const BtnCoorViewApprovedProposal = ({ proposal }) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <>
            <Button
                className="me-3"
                onClick={handleShow}
                style={{ backgroundColor: "#71A872", border: "0px", color: "white" }}
            >
                View
            </Button>

            <Modal backdrop="static" centered size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Proposal Details</Modal.Title>
                </Modal.Header>
                <ProposalPB
                    status={proposal.status}
                    />
                <Modal.Body>
                    <Form>
                        {/* Proposal Title */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Proposal Title</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.title || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Location */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Location</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.location || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Target Date */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Target Date</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    readOnly
                                    type="text"
                                    value={new Date(proposal.target_date).toLocaleDateString() || "N/A"}
                                />
                            </Col>
                        </Form.Group>

                        {/* Status */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Status</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.status || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Lead Proponent */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Lead Proponent</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.lead_proponent || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Contact Details */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Contact Details</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.contact_details || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Department */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Department</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.department || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Project Description */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Project Description</Form.Label>
                            <Col sm={8}>
                                <Form.Control as="textarea" rows={3} readOnly value={proposal.project_description || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Partner Community */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Partner Community</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.partner_community || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Government Organization */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Government Organization</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.government_org || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Non-Government Organization */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Non-Government Organization</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.non_government_org || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Success Indicators */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Success Indicators</Form.Label>
                            <Col sm={8}>
                                <Form.Control as="textarea" rows={3} readOnly value={proposal.success_indicators || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Identified Needs */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Identified Needs</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.identified_needs || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* General Objectives */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>General Objectives</Form.Label>
                            <Col sm={8}>
                                <Form.Control as="textarea" rows={3} readOnly value={proposal.general_objectives || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Specific Objectives */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Specific Objectives</Form.Label>
                            <Col sm={8}>
                                <Form.Control as="textarea" rows={3} readOnly value={proposal.specific_objectives || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Cooperating Agencies */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Cooperating Agencies</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.cooperating_agencies || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Monitoring Mechanics */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Monitoring Mechanics</Form.Label>
                            <Col sm={8}>
                                <Form.Control as="textarea" rows={3} readOnly value={proposal.monitoring_mechanics || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Evaluation Mechanics */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Evaluation Mechanics</Form.Label>
                            <Col sm={8}>
                                <Form.Control as="textarea" rows={3} readOnly value={proposal.evaluation_mechanics || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Timetable */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Timetable</Form.Label>
                            <Col sm={8}>
                                <Form.Control as="textarea" rows={3} readOnly value={proposal.timetable || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Risk Assessment */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Risk Assessment</Form.Label>
                            <Col sm={8}>
                                <Form.Control as="textarea" rows={3} readOnly value={proposal.risk_assessment || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Action Plans */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Action Plans to Address Risks</Form.Label>
                            <Col sm={8}>
                                <Form.Control as="textarea" rows={3} readOnly value={proposal.action_plans || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Sustainability Approaches */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Sustainability Approaches</Form.Label>
                            <Col sm={8}>
                                <Form.Control as="textarea" rows={3} readOnly value={proposal.sustainability_approaches || "N/A"} />
                            </Col>
                        </Form.Group>

                        {/* Budget Requirement */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Budget Requirement</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.budget_requirement || "N/A"} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    {/* <Button variant="primary" onClick={handleDownload}>
                        Download Proposal
                    </Button> */}
                    <BtnDownloadProposal proposal={proposal}></BtnDownloadProposal>
                    <Button variant="success" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BtnCoorViewApprovedProposal;
