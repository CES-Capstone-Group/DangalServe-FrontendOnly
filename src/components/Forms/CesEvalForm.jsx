
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Table } from 'react-bootstrap';

const CesEvalForm = () => {
    const [text, setText] = useState("");

    const handleInputChange = (e) => {
        setText(e.target.value);
        e.target.style.height = "auto"; // Reset the height
        e.target.style.height = `${e.target.scrollHeight}px`; // Set the new height
    };

    return (
        <Container>
            <h1 className="mt-4 mb-4" style={{ textAlign: 'center' }} id='propHeader'>Community and Extension Periodic Evaluation Form</h1>
            <Form className='form'>
                <Form.Group as={Row} controlId="formCoveredPeriod" className="mb-3">
                    <Form.Label column sm={3}><strong>Covered Period</strong></Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" placeholder="Enter Covered Period" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPartnerCommunity" className="mb-3">
                    <Form.Label column sm={3}><strong>Partner Community/Organization</strong></Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" placeholder="Enter Partner Community/Organization" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formActivitiesImplemented" className="mb-3">
                    <Form.Label column sm={3}><strong>Activities Implemented</strong></Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={2} placeholder="Enter Activities Implemented" />
                    </Col>
                </Form.Group>

                {/* Implementers Section */}
                <Form.Group as={Row} controlId="formImplementers" className="mb-3">
                    <Form.Label column sm={3}><strong>Number of Implementers</strong></Form.Label>
                    <Col sm={9}>
                        <Row>
                            <Col>
                                <Form.Label>Administrator</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Admins" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Teaching Personnel</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Teaching Personnel" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Non-Teaching Personnel</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Non-Teaching Personnel" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Student</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Students" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Alumni</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Alumni" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Others</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="text" placeholder="Specify Others" />
                            </Col>
                        </Row>
                    </Col>
                </Form.Group>


                <Form.Group as={Row} controlId="formVolunteers" className="mb-3">
                    <Form.Label column sm={3}><strong>Number of Volunteers</strong></Form.Label>
                    <Col sm={9}>
                        <Row>
                            <Col>
                                <Form.Label>Administrator</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Admins" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Teaching Personnel</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Teaching Personnel" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Non-Teaching Personnel</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Non-Teaching Personnel" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Student</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Students" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Alumni</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Alumni" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Others</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="text" placeholder="Specify Others" />
                            </Col>
                        </Row>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formExpectedOutcomes" className="mb-3">
                    <Form.Label column sm={3}><strong>Expected Program/Activity Outcomes / Success Indicators</strong></Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={2} placeholder="Enter Expected Outcomes/Success Indicators" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAchievedOutcomes" className="mb-3">
                    <Form.Label column sm={3}><strong>Achieved Program/Activity Outcomes / Success Indicators</strong></Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={2} placeholder="State the observable development in the behavior/attitude of partner community members" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formQuantitativeEvaluation" className="mb-3">
                    <Form.Label column sm={3}><strong>Quantitative Evaluation</strong></Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={2} placeholder="Enter Quantitative Evaluation" />
                    </Col>
                </Form.Group>

                <p className='text-sm'>Please accomplish the Evaluation Criteria</p>

                <Form.Group as={Row} controlId="formAreasForImprovement" className="mb-3">
                    <Form.Label column sm={3}><strong>Areas for Improvement</strong></Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={2} placeholder="Enter Areas for Improvement" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formRecommendations" className="mb-3">
                    <Form.Label column sm={3}><strong>Recommendations</strong></Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={2} placeholder="Enter Recommendations" />
                    </Col>
                </Form.Group>

                <h2>Evaluation Criteria</h2>


                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th>Key Area</th>
                            <th>1<br />Minimal Impact</th>
                            <th>2<br />Some Impact</th>
                            <th>3<br />Good Impact</th>
                            <th>4<br />Strong Impact</th>
                            <th> SCORE </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Actual Community Needs</strong></td>
                            <td>
                                <Form.Check type="radio" name="communityNeeds" value="1" label="Community needs were just secondary to what the project or initiative intends to do; it has only considered the needs of the college/program/students/proponents involved." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="communityNeeds" value="2" label="Community needs were not fully understood and therefore the project or initiative did not fully address the needs of the community." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="communityNeeds" value="3" label="Community needs were determined through past research, needs assessment, and profiling. The project or initiative addressed the needs of the community." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="communityNeeds" value="4" label="Community needs were determined accordingly through current research, needs assessment, and profiling. The project or initiative addressed the needs of the community." />
                            </td>
                            <td>
                                <Form.Control type="number" min="1" max="4" />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Collaboration with the Community & Active Community Participation</strong></td>
                            <td>
                                <Form.Check type="radio" name="communityCollaboration" value="1" label="Community members are coincidentally informed or not knowledgeable at all with the conduct of the project or initiative. Community members do not participate in the development & implementation of the project or initiative." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="communityCollaboration" value="2" label="Community members are informed of the project or initiative directly. Community members relatively participate in the development & implementation of the project or initiative." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="communityCollaboration" value="3" label="Community members act as consultants in the development and implementation of the project or initiative. Community members participate in the development & implementation of the project or initiative." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="communityCollaboration" value="4" label="Active, direct collaboration with the community by the proponents. Community members actively participate in the development & implementation of the project or initiative." />
                            </td>
                            <td>
                                <Form.Control type="number" min="1" max="4" />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Goals and Objectives Delivery</strong></td>
                            <td>
                                <Form.Check type="radio" name="goalsDelivery" value="1" label="Objectives and goals were not delivered according to plan. Changes, outputs, or results are mainly decorative, but there is limited benefit for the community. Benefits were not new or unique." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="goalsDelivery" value="2" label=" Objectives and goals were somewhat delivered according to plan. Changes, outputs, or results are mainly decorative, but new and unique benefits were realized in the community." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="goalsDelivery" value="3" label="Objectives and goals were delivered according to plan. Changes, outputs, or results enhanced an already good community situation as result of the project or initiative. The project or initiative brought light to a particular need or issue that needs to be addressed within the community." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="goalsDelivery" value="4" label="Objectives and goals were delivered according to plan. Changes, outputs, or results facilitated change or insight. The project or initiative helped solve a particular need or issue that needs to be addressed within the community." />
                            </td>
                            <td>
                                <Form.Control type="number" min="1" max="4" />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Facilitation and mobilization of resources</strong></td>
                            <td>
                                <Form.Check type="radio" name="facilitation" value="1" label="Available resources were not used during the development and implementation of the project or initiative" />
                            </td>
                            <td>
                                <Form.Check type="radio" name="facilitation" value="2" label=" Available internal resources were used during the development and implementation of the project or initiative. " />
                            </td>
                            <td>
                                <Form.Check type="radio" name="facilitation" value="3" label="Available resources (both internal and external) were used sometime during the development and implementation of the project or initiative. " />
                            </td>
                            <td>
                                <Form.Check type="radio" name="facilitation" value="4" label="Available resources (both internal and external) were used throughout the development and implementation of the project or initiative. " />
                            </td>
                            <td>
                                <Form.Control type="number" min="1" max="4" />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Relevance to college/ program/ academic curriculum </strong></td>
                            <td>
                                <Form.Check type="radio" name="relevance" value="1" label="Service-learning strategies are only supplemental to the college / program / curriculum.In essence, just an ordinary community or service project or good deed. " />
                            </td>
                            <td>
                                <Form.Check type="radio" name="relevance" value="2" label=" Service-learning strategies are part of the college / program / curriculum requirements but there is a sketchy connection between the project or initiative and such requirements." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="relevance" value="3" label="Service-learning strategies are used concurrent with the project or initiative that was developed and implemented. " />
                            </td>
                            <td>
                                <Form.Check type="radio" name="relevance" value="4" label="Service-learning strategies are used and integrated within the project or initiative that was developed and implemented." />
                            </td>
                            <td>
                                <Form.Control type="number" min="1" max="4" />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Active proponents' participation </strong></td>
                            <td>
                                <Form.Check type="radio" name="activeParticip" value="1" label="Proponents ran out of time for a true reflection; just provided a summary of events." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="activeParticip" value="2" label=" Proponents share with no individual reflection." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="activeParticip" value="3" label="Proponents think, share, and produce reflective outputs individually." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="activeParticip" value="4" label="Proponents think, share, and produce reflective outputs individually and collectively." />
                            </td>
                            <td>
                                <Form.Control type="number" min="1" max="4" />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Assessment Requirements </strong></td>
                            <td>
                                <Form.Check type="radio" name="assessReq" value="1" label="No assessment tools, reports, and other documentation requirements were completed and submitted: Proposal, Progress, and Accomplishment Reports; Pre-activity, post-activity, standard assessment, and community feedback forms." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="assessReq" value="2" label=" Some assessment tools, reports, and other documentation requirements were completed and submitted: Proposal, Progress, and Accomplishment Reports; Pre-activity, post-activity, standard assessment, and community feedback forms." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="assessReq" value="3" label="All assessment tools, reports, and other documentation requirements were completed and submitted: Proposal, Progress, and Accomplishment Reports; Pre-activity, post-activity, standard assessment, and community feedback forms." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="assessReq" value="4" label="All assessment tools, reports, and other documentation requirements were completed and submitted on time: Proposal, Progress, and Accomplishment Reports; Pre-activity, post-activity, standard assessment, and community feedback forms." />
                            </td>
                            <td>
                                <Form.Control type="number" min="1" max="4" />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Total Score</strong></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Form.Control type="number" min="1" max="28" />
                            </td>
                        </tr>
                    </tbody>
                </Table>


                <b>Scoring Interpretation:
                    (3.50-4=Strong Impact, 2.50-3.49=Good Impact, 1.50-2.49=Some Impact, 1-1.49=Minimal Impact)
                </b>
                <div className="d-flex justify-content-end">
                    <Button variant="success" type="submit" className="mt-4 ps-4 pe-4" id='formbtn' style={{ margin: '.5rem' }}>
                        Submit
                    </Button>

                    <Button onClick={() => navigate("/")} variant="danger" type="submit" className="mt-4 ps-4 pe-4" id='formbtn' style={{ margin: '.5rem' }}>
                        Cancel
                    </Button>
                </div>
            </Form>
            <div style={{ padding: '10px' }}></div>
        </Container>
    );
};

export default CesEvalForm;
