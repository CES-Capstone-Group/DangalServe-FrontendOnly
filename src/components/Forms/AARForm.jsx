import React from 'react';
import { useState } from "react";
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';

function AfterActivityReport() {
    const [selectedAttachments, setSelectedAttachments] = useState([]);
    const [files, setFiles] = useState({});
    const [errors, setErrors] = useState("");
    const [text, setText] = useState("");

    const handleCheckboxChange = (isChecked, attachment) => {
        if (isChecked) {
            setSelectedAttachments([...selectedAttachments, attachment]);
        } else {
            setSelectedAttachments(selectedAttachments.filter(item => item !== attachment));
        }
    };

    const handleInputChange = (e) => {
        setText(e.target.value);
        e.target.style.height = "auto"; // Reset the height
        e.target.style.height = `${e.target.scrollHeight}px`; // Set the new height
    };

    const handleFileUpload = (attachment, files) => {
        if(files.length >= 5){
            setFiles({ ...files, [attachment]: files });
        }
        else{
            setErrors("Activity Highlight should atleast contain 5 Photos");
            alert("Activity Highlight should atleast contain 5 Photos");
        }
    };

    return (
        <Container>
            <h1 className="my-4" style={{ textAlign: 'center' }} id='propHeader'>After-Activity Report</h1>
            <Form className='form'>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="divisionDepartment">
                            <Form.Label className='h4'>Division/Department/Office</Form.Label>
                            <Form.Control type="text" placeholder="Enter department" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="activityTitle">
                            <Form.Label  className='h4'>Title of the Activity</Form.Label>
                            <Form.Select>
                                <option value="">select an activity</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="date">
                            <Form.Label  className='h4'>Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="venue">
                            <Form.Label  className='h4'>Venue</Form.Label>
                            <Form.Control type="text" placeholder="Enter venue" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="activityObjectives">
                    <Form.Label  className='h4'>Activity Objectives</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={handleInputChange} style={{ overflow: "hidden" }} placeholder="Enter activity objectives" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label  className='h4'>Were the objectives achieved?</Form.Label>
                    <div>
                        <Form.Check type="radio" id="fully" label="Fully" name="objectivesAchieved" />
                        <Form.Check type="radio" id="partially" label="Partially" name="objectivesAchieved" />
                        <Form.Check type="radio" id="notAtAll" label="Not at all" name="objectivesAchieved" />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="activityHighlight">
                    <Form.Label  className='h4'>Activity Highlight</Form.Label>
                    <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={3} placeholder="Enter activity highlights" />
                </Form.Group>

                <Form.Group controlId="activityHighlightPhotos">
                    <Form.Label className='h6'>Activity Highlight (Please attach minimum of 5 photos)</Form.Label>
                    <Form.Control                  
                        name='files'
                        isInvalid={!!errors.files}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files)}
                    />
                    <Form.Control.Feedback>
                        {errors.files}
                    </Form.Control.Feedback>
                </Form.Group>

                <h3 className="mt-5">Quantitative Evaluation Parameters</h3>

                <Table bordered className='tableStyle'>
                    <thead>
                        <tr>
                            <th>Parameters</th>
                            <th>Average (1-5)</th>
                            <th>Verbal Interpretation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Clarity of Objectives</td>
                            <td>
                                <Form.Control type="number" min="1" max="5" placeholder="Rate 1-5" />
                            </td>
                            <td>
                                <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={1} placeholder="Verbal interpretation" />
                            </td>
                        </tr>
                        <tr>
                            <td>Relevance of Objectives</td>
                            <td>
                                <Form.Control type="number" min="1" max="5" placeholder="Rate 1-5" />
                            </td>
                            <td>
                                <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={1} placeholder="Verbal interpretation" />
                            </td>
                        </tr>
                        <tr>
                            <td>Attainment of Objectives</td>
                            <td>
                                <Form.Control type="number" min="1" max="5" placeholder="Rate 1-5" />
                            </td>
                            <td>
                                <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={1} placeholder="Verbal interpretation" />
                            </td>
                        </tr>
                        <tr>
                            <td>Alignment of Activity with Objectives</td>
                            <td>
                                <Form.Control type="number" min="1" max="5" placeholder="Rate 1-5" />
                            </td>
                            <td>
                                <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={1} placeholder="Verbal interpretation" />
                            </td>
                        </tr>
                        <tr>
                            <td>Extent to which the activity enriches the participants</td>
                            <td>
                                <Form.Control type="number" min="1" max="5" placeholder="Rate 1-5" />
                            </td>
                            <td>
                                <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={1} placeholder="Verbal interpretation" />
                            </td>
                        </tr>
                        <tr>
                            <td>Conduct of Activities</td>
                            <td>
                                <Form.Control type="number" min="1" max="5" placeholder="Rate 1-5" />
                            </td>
                            <td>
                                <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={1} placeholder="Verbal interpretation" />
                            </td>
                        </tr>
                        <tr>
                            <td>Time Management</td>
                            <td>
                                <Form.Control type="number" min="1" max="5" placeholder="Rate 1-5" />
                            </td>
                            <td>
                                <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={1} placeholder="Verbal interpretation" />
                            </td>
                        </tr>
                        <tr>
                            <td>Resource Speaker</td>
                            <td>
                                <Form.Control type="number" onChange={handleInputChange} style={{ overflow: "hidden" }} min="1" max="5" placeholder="Rate 1-5" />
                            </td>
                            <td>
                                <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={1} placeholder="Verbal interpretation" />
                            </td>
                        </tr>
                        <tr>
                            <td>General Average</td>
                            <td>
                                <Form.Control type="number" min="1" max="5" placeholder="Rate 1-5" />
                            </td>
                            <td>
                                <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={1} placeholder="Verbal interpretation" />
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <Form.Group className="mb-3" controlId="qualiEval">
                    <Form.Label  className='h4'>Qualitative Evaluation</Form.Label>
                    <Form.Control as="textarea" onChange={handleInputChange} style={{ overflow: "hidden" }} rows={3} placeholder="This can be culled from comments and suggestions of the Activity Evaluation Form." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="budget">
                    <Form.Label  className='h4'>Budget</Form.Label>
                    <Form.Control type='text' placeholder="enter budget" />
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="totalExpenses">
                            <Form.Label  className='h4'>Total Expenses</Form.Label>
                            <Form.Control type="text" placeholder="Enter total expenses" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="revenueSavings">
                            <Form.Label  className='h4'>Revenue/Savings</Form.Label>
                            <Form.Control type="text" placeholder="Enter revenue/savings" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="attachments">
                    <Form.Label  className='h4'>Attachments</Form.Label>

                    {['Program Invitation', 'Actual Program of Activities', 'Relevant Photographs', 'Attendance', 'Financial Report', 'Souvenir Magazine', 'Others'].map((attachment, index) => (
                        <div key={index} className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label={attachment}
                                onChange={(e) => handleCheckboxChange(e.target.checked, attachment)}
                            />
                            {selectedAttachments.includes(attachment) && (
                                <Form.Control
                                    type="file"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onChange={(e) => handleFileUpload(attachment, e.target.files)}
                                />
                            )}
                        </div>
                    ))}
                </Form.Group>

                <div className="d-flex justify-content-end">
                    <Button variant="success" type="submit" className="mt-4 ps-4 pe-4" id='formbtn' style={{ margin: '.5rem', fontSize: '1.5em' }}>
                        Submit
                    </Button>

                    <Button onClick={() => navigate("/")} variant="danger" type="submit" className="mt-4 ps-4 pe-4" id='formbtn' style={{ margin: '.5rem', fontSize: '1.5em' }}>
                        Cancel
                    </Button>
                </div>
            </Form>
            <div style={{ padding: '10px' }}></div>
        </Container>
    );
}

export default AfterActivityReport;
