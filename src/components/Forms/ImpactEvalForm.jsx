import React, { useState } from 'react';
import '/src/App.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const ImpactEvalForm = () => {
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setText(e.target.value);
        e.target.style.height = "auto"; // Reset the height
        e.target.style.height = `${e.target.scrollHeight}px`; // Set the new height
    };
    return (
        <Container className='Formproposal'>
            <h2 className="mt-4 mb-4" style={{ textAlign: 'center' }} id='propHeader' >
                Community Connection Impact Evaluation Form
            </h2>
            <Form className='form'>
                <Form.Group as={Row} controlId="formDivisionDepartment" className="mb-4">
                    <Form.Label column sm={3}>Name of the Division/Department/
                        Organizing Team</Form.Label>
                    <Col sm={9}>
                        <Form.Control disabled readOnly type="text" placeholder="Name of the Division/Department/Organizing Team" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formTitle" className="mb-4">
                    <Form.Label column sm={3}>Title of the Activity</Form.Label>
                    <Col sm={9}>
                        <Form.Control disabled readOnly type="text" placeholder="Title of the Activity" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDate" className="mb-4">
                    <Form.Label column sm={3}>Date</Form.Label>
                    <Col sm={9}>
                        <Form.Control disabled readOnly type="text" placeholder="Date of the Activty" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formVenue" className="mb-4">
                    <Form.Label column sm={3}>Venue</Form.Label>
                    <Col sm={9}>
                        <Form.Control disabled readOnly type="text" placeholder="Venue" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formObj" className="mb-4">
                    <Form.Label column sm={3}>Activty Objectives</Form.Label>
                    <Col sm={9}>
                        <Form.Control disabled readOnly type="text" placeholder="Objectives of the Activty" />
                    </Col>
                </Form.Group>

                <h5>Directions:</h5>

                <p>Please select what best describes your answer on the items below using the rating scale specified for each item</p>

                <Form.Group  as={Row} controlId="formQ1" className="mb-4">
                    <Form.Label  column sm={12} lg={6}>
                        1. What was the primary goal or objective of the community extension activity?
                    </Form.Label>
                    <Col sm={12} lg={6} className="mt-2">
                        <div className="d-flex flex-column">
                            {['Clearly defined and achieved', 'Partially', 'Not Achieved'].map((value) => (
                                <Form.Check
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="Q1"
                                    key={value}
                                    className="mb-2 me-lg-3" // Adds margin-bottom for spacing and right margin on larger screens
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formQ2" className="mb-4">
                    <Form.Label column sm={12} lg={6}>
                        2. How effectively do you feel the activity addressed the needs of the target community?
                    </Form.Label>
                    <Col sm={12} lg={6} className="mt-2">
                        <div className="d-flex flex-column ">
                            {['Very effectively', 'Moderately effectively', 'Ineffectively'].map((value) => (
                                <Form.Check
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="Q2"
                                    key={value}
                                    className="mb-2 me-lg-3" // Adds margin-bottom for spacing and right margin on larger screens
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formQ3" className="mb-4">
                    <Form.Label column sm={12} lg={6}>
                        3. Were the logistics and organization of the activity well-managed?
                    </Form.Label>
                    <Col sm={12} lg={6} className="mt-2">
                        <div className="d-flex flex-column ">
                            {['Excellently managed', 'Adequately managed', 'Poorly managed'].map((value) => (
                                <Form.Check
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="Q3"
                                    key={value}
                                    className="mb-2 me-lg-3" // Adds margin-bottom for spacing and right margin on larger screens
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formQ4" className="mb-4">
                    <Form.Label column sm={12} lg={6}>
                        4. How would you rate the level of support and assistance provided to participants during the activity?
                    </Form.Label>
                    <Col sm={12} lg={6} className="mt-2">
                        <div className="d-flex flex-column ">
                            {['Excellent support and assistance', 'Adequate support and assistance', 'Insufficient support and assistance'].map((value) => (
                                <Form.Check
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="Q4"
                                    key={value}
                                    className="mb-2 me-lg-3" // Adds margin-bottom for spacing and right margin on larger screens
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formQ5" className="mb-4">
                    <Form.Label column sm={12} lg={6}>
                        5. Did the activity foster meaningful engagement and interaction with community members?
                    </Form.Label>
                    <Col sm={12} lg={6} className="mt-2">
                        <div className="d-flex flex-column ">
                            {['Highly fostered engagement', 'Moderately fostered engagement', 'Minimally fostered engagement'].map((value) => (
                                <Form.Check
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="Q5"
                                    key={value}
                                    className="mb-2 me-lg-3" // Adds margin-bottom for spacing and right margin on larger screens
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formQ6" className="mb-4">
                    <Form.Label column sm={12} lg={6}>
                        6. To what extent did the activity promote awareness or understanding of relevant issues within the community?
                    </Form.Label>
                    <Col sm={12} lg={6} className="mt-2">
                        <div className="d-flex flex-column ">
                            {['Significantly promoted awareness', 'Partially promoted awareness', 'Did not promote awareness'].map((value) => (
                                <Form.Check
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="Q6"
                                    key={value}
                                    className="mb-2 me-lg-3" // Adds margin-bottom for spacing and right margin on larger screens
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formQ7" className="mb-4">
                    <Form.Label column sm={12} lg={6}>
                        7. Did the activity encourage collaboration and cooperation among participants?
                    </Form.Label>
                    <Col sm={12} lg={6} className="mt-2">
                        <div className="d-flex flex-column ">
                            {['Strongly encouraged collaboration', 'Somewhat encouraged collaboration ', 'Did not encourage collaboration'].map((value) => (
                                <Form.Check
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="Q7"
                                    key={value}
                                    className="mb-2 me-lg-3" // Adds margin-bottom for spacing and right margin on larger screens
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formQ8" className="mb-4">
                    <Form.Label column sm={12} lg={6}>
                        8. How would you rate the level of engagement and participation among community members during the activity?
                    </Form.Label>
                    <Col sm={12} lg={6} className="mt-2">
                        <div className="d-flex flex-column ">
                            {['Highly engaged and participative', 'Moderately engaged and participative ', 'Low engagement and participation'].map((value) => (
                                <Form.Check
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="Q8"
                                    key={value}
                                    className="mb-2 me-lg-3" // Adds margin-bottom for spacing and right margin on larger screens
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formQ9" className="mb-4">
                    <Form.Label column sm={12} lg={6}>
                        9. How do you perceive the impact of the activity on the community and its members?
                    </Form.Label>
                    <Col sm={12} lg={6} className="mt-2">
                        <div className="d-flex flex-column ">
                            {['Significant positive impact', 'Some positive impact', 'No discernible impact'].map((value) => (
                                <Form.Check
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="Q9"
                                    key={value}
                                    className="mb-2 me-lg-3" // Adds margin-bottom for spacing and right margin on larger screens
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formQ10" className="mb-4">
                    <Form.Label column sm={12} lg={6}>
                        10. How likely are you to participate in similar community extension activities in the future?
                    </Form.Label>
                    <Col sm={12} lg={6} className="mt-2">
                        <div className="d-flex flex-column ">
                            {['Very likely', 'Somewhat likely', 'Unlikely'].map((value) => (
                                <Form.Check
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="Q10"
                                    key={value}
                                    className="mb-2 me-lg-3" // Adds margin-bottom for spacing and right margin on larger screens
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formQ11" className="mb-4">
                    <Form.Label column sm={12} lg={6}>
                        11. Overall, how would you rate your experience participating in this community extension activity?
                    </Form.Label>
                    <Col sm={12} lg={6} className="mt-2">
                        <div className="d-flex flex-column ">
                            {['Highly positive experience', 'Neutral experience', 'Negative experience'].map((value) => (
                                <Form.Check
                                    label={value}
                                    value={value}
                                    type="radio"
                                    name="Q11"
                                    key={value}
                                    className="mb-2 me-lg-3" // Adds margin-bottom for spacing and right margin on larger screens
                                />
                            ))}
                        </div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formQ12" className="mb-4">
                    <Form.Label column sm={12}>What recommendations do you have for improving future community extension activities?</Form.Label>
                    <Row sm={12}>
                        <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={3} placeholder="Enter your suggestions" />
                    </Row>
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

export default ImpactEvalForm;