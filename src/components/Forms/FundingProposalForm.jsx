import React from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container, FormControl } from 'react-bootstrap';

const FundingProposalForm = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <h2 className="mb-4 mt-4" style={{ textAlign: 'center', color: '#ffffff' }} id='propHeader'>COMMUNITY FUNDRAISING PROPOSAL FORM</h2>
            <Form className="form">
                <Form.Group as={Row} >
                    <Col>
                        <Form.Group as={Row} className="mb-3 h5">
                            <Form.Label>Project name
                                <Form.Control readOnly type="text" value={"CCLIP: PC Awareness"} />
                            </Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 h5">
                            <Form.Label>
                                Target Date:
                                <Form.Control controlId="txtDate" type="date" />
                            </Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 h5">
                            <Form.Label>
                                Event Organizer:
                                <Form.Control controlId="txtOrganizer" readonly type="text" value={""} />
                            </Form.Label>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group as={Row} className="mb-3 h5">
                            <Form.Label>
                                Date Proposed
                                <Form.Control controlId="txtDate" type="date" />
                            </Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 h5">
                            <Form.Label>
                                Venue:
                                <Form.Control controlId="txtDriversLicense" readOnly type="text" value={""} />
                            </Form.Label>
                        </Form.Group>
                        <Form.Group controlId="drpVehicleType" as={Row} className="mb-3 h5">
                            <Form.Label>
                                Contact Details:
                                <Form.Control cotntrolId="txtContact" type="text" ></Form.Control>
                            </Form.Label>
                        </Form.Group>
                    </Col>
                    <Form.Group as={Row} className="mb-3 h5">
                        <Form.Label>
                            Lead Proponent/Designation
                            <Form.Control controlId="txtLead" readonly type="text" value={"Bigaa"} />
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row} className="h5">
                        <Form.Label>
                            Executive Summary
                            <FormControl as="textarea" style={{ height: '180px' }}></FormControl>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row} className="h5">
                        <Form.Label>
                            Objective/s
                            <FormControl as="textarea" style={{ height: '180px' }}></FormControl>
                        </Form.Label>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 h5">
                        <Col sm={4}>
                            <Form.Label>
                                Target Community Beneficiary:
                            </Form.Label>
                        </Col>
                        <Col sm={8}>
                            <FormControl controlId='txtTargetComm' type="number"></FormControl>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 h5">
                        <Col sm={4}>
                            <Form.Label>
                                How much do you expect to raise:
                            </Form.Label>
                        </Col>
                        <Col sm={8}>
                            <FormControl controlId='txtRaise' type="number"></FormControl>
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3 h5">
                        <Row>
                            <Col sm={4}>
                                <Form.Label>
                                    Form of Donation:
                                </Form.Label>
                            </Col>
                            <Col sm={2}>
                                <Form.Check type="check"
                                    label="In-Kind"
                                    name="chkInKind"
                                    id="chkInKind" />
                            </Col>
                            <Col sm={1} >
                                <Form.Check type="check"
                                    label="Cash"
                                    name="chkCash"
                                    id="chkCash" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 h5">
                        <Col sm={4}>
                            <Form.Label>
                                What portion of the estimated net proceed will be allocated for the chosen community beneficiary?
                            </Form.Label>
                        </Col>
                        <Col sm={8}>
                            <FormControl type="text"></FormControl>
                        </Col>

                    </Form.Group>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant="success" type="submit" className="mt-4 ps-4 pe-4" id='formbtn' style={{ margin: '.5rem'}}>
                        Submit
                    </Button>

                    <Button onClick={() => navigate("/")} variant="danger" type="submit" className="mt-4 ps-4 pe-4" id='formbtn' style={{ margin: '.5rem' }}>
                        Cancel
                    </Button>
                </div>
            </Form>
            <div style={{ padding: '10px' }}></div>
        </Container>
    )
}

export default FundingProposalForm;