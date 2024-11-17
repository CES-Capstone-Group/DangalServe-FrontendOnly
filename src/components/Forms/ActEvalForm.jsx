import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';

const ActEvalForm = () => {
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const [showPrompt, setShowPrompt] = useState(false); // State to manage the success prompt

    const handleInputChange = (e) => {
        setText(e.target.value);
        e.target.style.height = "auto"; // Reset the height
        e.target.style.height = `${e.target.scrollHeight}px`; // Set the new height
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Show native alert dialog
        window.alert("Your response has been submitted successfully!");

        // Navigate back after alert is closed
        navigate(-1);
    };

    return (
        <Container>
            <h2 className="mt-4 mb-4" style={{ textAlign: 'center' }} id='propHeader'>Activity Evaluation Form</h2>
            <Form className='form' onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="formDivisionDepartment" className="mb-4">
                    <Form.Label column sm={3}>Name of the Division/Department/
                        Organizing Team</Form.Label>
                    <Col sm={9}>
                        <Form.Control disabled readOnly type="text" placeholder="College of Computing Studies" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formTitle" className="mb-4">
                    <Form.Label column sm={3}>Title of the Activity</Form.Label>
                    <Col sm={9}>
                        <Form.Control disabled readOnly type="text" placeholder="CCLIP: PC Awareness" />
                    </Col>
                </Form.Group>

                <h5>Directions:</h5>

                <p>Please put a check (✔) on the space provided that best describe your answer on the items below using the following rating scale:</p>
                <p id='scale'>1 – Poor, 2 – Fair, 3 – Satisfactory, 4 – Very Good, 5 – Excellent</p>

                <h5>A. Objectives</h5>

                <Form.Group as={Row} controlId="formClarity" className="mb-4">
                    <Form.Label column sm={6}>1. Clarity of objectives</Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="clarityOfObjectives"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formRelevance" className="mb-4">
                    <Form.Label column sm={6}>2. Relevance of objectives</Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="relevanceOfObjectives"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAttain" className="mb-4">
                    <Form.Label column sm={6}>3. Attainment of objectives</Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="attainmentOfObjectives"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <h5>B. Activities</h5>

                <Form.Group as={Row} controlId="formAlign" className="mb-4">
                    <Form.Label column sm={6}>1. Alignment with the objectives</Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="alignmentOfObjectives"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formExtent" className="mb-4">
                    <Form.Label column sm={6}>2. Extent to which they enrich participants</Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="extentToWhichTheyEnrichParticipants"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formConduct" className="mb-4">
                    <Form.Label column sm={6}><strong>C. Conduct of Activites</strong></Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="conductOfActivities"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formExtent" className="mb-4">
                    <Form.Label column sm={6}><strong>D. Flow of the Program</strong></Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="flowOfTheProgram"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formExtent" className="mb-4">
                    <Form.Label column sm={6} ><strong>E. Time Management</strong></Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="timeManagement"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <h5>G. Venue and Facilities</h5>

                <Form.Group as={Row} controlId="formSuitability" className="mb-4">
                    <Form.Label column sm={6}>1. Suitability</Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="suitability"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formExtent" className="mb-4">
                    <Form.Label column sm={6}>2. Cleanliness</Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="cleanliness"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formFood" className="mb-4">
                    <Form.Label column sm={6} ><strong>H. Food</strong></Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="food"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <h5>I. Resource Person/Speaker (if any)</h5>

                <Form.Group as={Row} controlId="formCompetence" className="mb-4">
                    <Form.Label column sm={6}>1. Competence and effectivess</Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="suitability"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formOrderliness" className="mb-4">
                    <Form.Label column sm={6}>2. Orderliness in Presentation</Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="orderliness"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group    >

                <h5>J. Organazing Team</h5>

                <Form.Group as={Row} controlId="formHumanRel" className="mb-4">
                    <Form.Label column sm={6}>1. Human relations</Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="humanRelations"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPromptness" className="mb-4">
                    <Form.Label column sm={6}>2. Promptness in delivery of service</Form.Label>
                    <Col sm={6}>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Form.Check
                                    inline
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="promptnessInDeliveryOfService"
                                    key={value}
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formSuggestions" className="mb-4">
                    <Form.Label column sm={3}>Kindly write your suggestions for improvement</Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={3} placeholder="Enter your suggestions" />
                    </Col>
                </Form.Group>

                <div className="d-flex justify-content-end">
                    <Button variant="success" type="submit" className="mt-4" id='formbtn' style={{ margin: '.5rem' }}>
                        Submit
                    </Button>

                    <Button onClick={() => navigate(-1)} variant="danger" type='button' className="mt-4" id='formbtn' style={{ margin: '.5rem' }}>
                        Cancel
                    </Button>
                </div>

            </Form>
            <div style={{ padding: '10px' }}></div>
        </Container>
    );
};

export default ActEvalForm;
