import React from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Row } from "react-bootstrap";
import InvChart from "./InvChart.jsx";


const InvolvementPage = () => {
    return (
        <div>
            <Container fluid className="d-flex flex-column justify-content-center me-0 ms-0">
                <Row>
                    <Col className="involvement "><h2>Involvement Reports</h2></Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end mb-3">
                        <Button style={{ backgroundColor: '#71A872', border: '0px' }}>
                            <FontAwesomeIcon className='me-2 ' icon={faFilter}></FontAwesomeIcon>
                            Filter
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Container>
                <InvChart />
            </Container>
        </div>
    );
}

export default InvolvementPage;