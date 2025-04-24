import React, { useState } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import InvChart from "./InvChart.jsx";

const InvolvementPage = () => {
    const [selectedFilter, setSelectedFilter] = useState("All"); // State to track the filter

    // Handle filter selection
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };
// push
    return (
        <div>
            <Container fluid className="d-flex flex-column justify-content-center me-0 ms-0">
                <Row>
                    <Col className="d-flex justify-content-end mb-3">
                        <Dropdown>
                            <Dropdown.Toggle
                                style={{ backgroundColor: '#71A872', border: '0px' }}
                            >
                                <FontAwesomeIcon className="me-2" icon={faFilter}></FontAwesomeIcon>
                                Filter
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleFilterChange("All")}>All</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange("Teaching")}>Teaching Personnel</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange("NonTeaching")}>Non-Teaching Personnel</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange("Students")}>Students</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange("Participants")}>External Participant</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange("Faculty")}>Faculty</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Container fluid style={{ padding: "1rem", height: "100vh" }}>
                    <Row>
                        <Col>
                            <InvChart filter={selectedFilter} />
                        </Col>
                    </Row>
                </Container>

            </Container>
        </div>
    );
}

export default InvolvementPage;