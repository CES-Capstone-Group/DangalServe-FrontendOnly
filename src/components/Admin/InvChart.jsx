import React from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, Col, Container, Row } from "react-bootstrap";
import { data1, data2, data3, data4 } from "./ChartData.jsx";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const InvChart = () => {
    const navigate = useNavigate();

    const handleCardClick = (chartType) => {
        navigate(`/admin/inv-table/${chartType}`);
    };

    return (
        <Container>
            <Row>
                <Col className="mb-3">
                    <Card
                        style={{
                            width: '30em',
                            border: '1px',
                            borderStyle: "groove",
                            borderTop: '0px',
                            boxShadow: '1px 7px 7px 4px #888888',
                            padding: '2em'
                        }}
                        onClick={() => handleCardClick("Non-Teaching")}
                    >
                        <Card.Title>
                            Non-Teaching Personnel Involved <span className="h6 ms-4 text-secondary">Year 2023</span>
                        </Card.Title>
                        <Card.Body>
                            <Bar data={data1} />
                        </Card.Body>
                    </Card>
                </Col>

                <Col className="mb-3">
                    <Card
                        style={{
                            width: '30em',
                            border: '1px',
                            borderStyle: "groove",
                            borderTop: '0px',
                            boxShadow: '1px 7px 7px 4px #888888',
                            padding: '2em'
                        }}
                        onClick={() => handleCardClick("Teaching")}
                    >
                        <Card.Title>
                            Teaching Personnel Involved <span className="h5 ms-4 text-secondary">Year 2023</span>
                        </Card.Title>
                        <Card.Body>
                            <Bar data={data2} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col className="mb-3">
                    <Card
                        style={{
                            width: '30em',
                            border: '1px',
                            borderStyle: "groove",
                            borderTop: '0px',
                            boxShadow: '1px 7px 7px 4px #888888',
                            padding: '2em'
                        }}
                        onClick={() => handleCardClick("Participants")}
                    >
                        <Card.Title>
                            Participants Involved <span className="h5 ms-4 text-secondary">Year 2023</span>
                        </Card.Title>
                        <Card.Body>
                            <Bar data={data3} />
                        </Card.Body>
                    </Card>
                </Col>

                <Col className="mb-3">
                    <Card
                        style={{
                            width: '30em',
                            border: '1px',
                            borderStyle: "groove",
                            borderTop: '0px',
                            boxShadow: '1px 7px 7px 4px #888888',
                            padding: '2em'
                        }}
                        onClick={() => handleCardClick("Students")}
                    >
                        <Card.Title>
                            Students Involved <span className="h5 ms-4 text-secondary">Year 2023</span>
                        </Card.Title>
                        <Card.Body>
                            <Bar data={data4} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default InvChart;
