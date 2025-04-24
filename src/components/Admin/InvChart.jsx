import React from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useInvolvementData } from "./ChartData.jsx";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const InvChart = ({ filter }) => {
    const chartData = useInvolvementData();

    // Filter data based on the selected filter
    const filteredData = filter === "All"
        ? chartData
        : Object.fromEntries(
            Object.entries(chartData).filter(([key]) => key.toLowerCase() === filter.toLowerCase())
        );

    // Check if only one chart is displayed
    const isSingleChart = Object.keys(filteredData).length === 1;
// push ko daw
    return (
        <Row>
            <Col>
                <Container
                fluid
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1.5rem", // Space between charts
                    padding: "1rem",
                }}
            >
                {Object.entries(filteredData).map(([key, data]) => (
                    <div
                        key={key}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            padding: "2rem",
                            background: "#fff",
                            width: isSingleChart ? "90rem" : "28rem",
                            height: isSingleChart ? "48rem" : "20rem",
                        }}
                    >
                        <h4>
                            {key.replace(/^\w/, (c) => c.toUpperCase())} Personnel Involved <span className="h6 text-secondary">Year 2023</span>
                        </h4>
                        <div style={{ height: isSingleChart ? "calc(100% - 2rem)" : "13rem" }}>
                            {data ? (
                                <Bar data={data} options={{ maintainAspectRatio: false }} />
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                ))}
            </Container>
            </Col>
        </Row>
        
    );
};

export default InvChart;
