import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ProgressBar, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const EvalSummary = () => {
    const navigate = useNavigate();

    // Go back to the previous page
    const handleBack = () => {
        navigate(-1); // This will navigate to the previous page in the history
    };

    // Mock data to simulate backend response
    const mockTallyData = {
        department: "College of Computing Studies",
        activityTitle: "CCLIP: PC Awareness",
        questions: [
            {
                section: "A. Objectives",
                items: [
                    {
                        question: "1. Clarity of objectives",
                        tally: { "1": 34, "2": 22, "3": 1, "4": 56, "5": 99 },
                    },
                    {
                        question: "2. Relevance of objectives",
                        tally: { "1": 12, "2": 8, "3": 5, "4": 30, "5": 45 },
                    },
                    {
                        question: "3. Attainment of objectives",
                        tally: { "1": 5, "2": 15, "3": 10, "4": 40, "5": 30 },
                    },
                ],
            },
            {
                section: "B. Activities",
                items: [
                    {
                        question: "1. Alignment with the objectives",
                        tally: { "1": 3, "2": 12, "3": 9, "4": 21, "5": 55 },
                    },
                    {
                        question: "2. Extent to which they enrich participants",
                        tally: { "1": 7, "2": 10, "3": 15, "4": 35, "5": 40 },
                    },
                ],
            },
            {
                section: "C. Conduct of Activities",
                items: [
                    {
                        question: "1. Conduct of activities",
                        tally: { "1": 5, "2": 8, "3": 12, "4": 25, "5": 50 },
                    },
                ],
            },
            {
                section: "D. Flow of the Program",
                items: [
                    {
                        question: "1. Flow of the program",
                        tally: { "1": 2, "2": 5, "3": 10, "4": 20, "5": 30 },
                    },
                ],
            },
            {
                section: "E. Time Management",
                items: [
                    {
                        question: "1. Time management",
                        tally: { "1": 4, "2": 9, "3": 13, "4": 22, "5": 45 },
                    },
                ],
            },
            {
                section: "F. Venue and Facilities",
                items: [
                    {
                        question: "1. Suitability",
                        tally: { "1": 8, "2": 6, "3": 14, "4": 18, "5": 50 },
                    },
                    {
                        question: "2. Cleanliness",
                        tally: { "1": 3, "2": 5, "3": 10, "4": 20, "5": 40 },
                    },
                ],
            },
            {
                section: "G. Food",
                items: [
                    {
                        question: "1. Quality of food",
                        tally: { "1": 5, "2": 7, "3": 15, "4": 25, "5": 35 },
                    },
                ],
            },
            {
                section: "H. Resource Person/Speaker (if any)",
                items: [
                    {
                        question: "1. Competence and effectiveness",
                        tally: { "1": 6, "2": 8, "3": 12, "4": 30, "5": 44 },
                    },
                    {
                        question: "2. Orderliness in presentation",
                        tally: { "1": 4, "2": 6, "3": 11, "4": 22, "5": 50 },
                    },
                ],
            },
            {
                section: "I. Organizing Team",
                items: [
                    {
                        question: "1. Human relations",
                        tally: { "1": 3, "2": 9, "3": 14, "4": 28, "5": 42 },
                    },
                    {
                        question: "2. Promptness in delivery of service",
                        tally: { "1": 5, "2": 7, "3": 10, "4": 20, "5": 45 },
                    },
                ],
            },
        ],
    };

    const [tallyData, setTallyData] = useState(null);

    useEffect(() => {
        // Simulate fetching data from backend
        setTallyData(mockTallyData);
    }, []);

    return (
        <Container fluid className="py-5">
            <Row className="mb-5">
                <Col xs={6} className="d-flex align-items-center mt-4">
                    <Button variant="link" onClick={() => window.history.back()} className="backBtn d-flex align-items-center text-success">
                        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                        <span className="ms-2">Back</span>
                    </Button>
                </Col>
                <Col xs={6} className="d-flex justify-content-end mt-4">
                    <Button style={{ backgroundColor: '#71A87E', border: '0px' }}>
                        <FontAwesomeIcon className="me-2" icon={faFilter} />
                        Filter
                    </Button>
                </Col>
            </Row>


            <Card className="mx-auto" id='conCard' style={{ maxWidth: '1000px' }}>
                <Card.Header className="text-center">
                    <h2>Evaluation Results Summary</h2>
                </Card.Header>
                <Card.Body>
                    {tallyData ? (
                        <>
                            <Row className="mb-4">
                                <Col>
                                    <strong className='h4'>Activity:</strong> <span style={{ fontSize: '17px' }}>{tallyData.activityTitle}</span>
                                </Col>
                            </Row>

                            <Row className="mb-4">
                                <Col>
                                    <strong className='h4'>Department:</strong> <span style={{ fontSize: '17px' }}>{tallyData.department}</span>
                                </Col>
                            </Row>

                            <Row><p id='scale'>1 – Poor, 2 – Fair, 3 – Satisfactory, 4 – Very Good, 5 – Excellent</p></Row>

                            {tallyData.questions.map((sectionData, sectionIndex) => (
                                <Card key={sectionIndex} id='conCard' className="mb-4">
                                    <Card.Body>
                                        <h3 className="mb-3">{sectionData.section}</h3>
                                        {sectionData.items.map((item, itemIndex) => {
                                            // Calculate total responses for the question
                                            const totalResponses = Object.values(item.tally).reduce((sum, count) => sum + count, 0);

                                            return (
                                                <div key={itemIndex} className="mb-4">
                                                    <Row className="align-items-center">
                                                        <Col className="mb-2 h5">
                                                            <strong>{item.question}</strong>
                                                        </Col>
                                                        <Col className="text-end">
                                                            <small className="text-muted">{totalResponses} responses</small>
                                                        </Col>
                                                    </Row>
                                                    {Object.entries(item.tally).map(([key, value]) => (
                                                        <div key={key} className="d-flex align-items-center mb-2">
                                                            <span className="me-3" style={{ minWidth: '20px' }}>{key}</span>
                                                            <ProgressBar
                                                                now={(value / totalResponses) * 100}
                                                                label={`${((value / totalResponses) * 100).toFixed(1)}%`}
                                                                className="flex-grow-1"
                                                                style={{ height: '20px' }}
                                                                variant='success'
                                                            />
                                                            <span className="ms-3">{value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })}
                                    </Card.Body>
                                </Card>
                            ))}
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EvalSummary;