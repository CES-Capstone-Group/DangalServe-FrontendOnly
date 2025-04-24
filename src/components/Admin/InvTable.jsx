import React from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const InvTable = () => {
    const { chartType } = useParams();
    let tableHeaders, tableData;

    const navigate = useNavigate();

    // Go back to the previous page
    const handleBack = () => {
        navigate(-1); // This will navigate to the previous page in the history
    };
// push
    return (
        <Container>
            <Row>
                <Col xs="auto">
                    <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success">
                        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                        <span className="ms-2">Back</span>
                    </Button>
                </Col>
            </Row>
            <h3>{chartType.replace(/([A-Z])/g, " $1")} Details</h3>
            <Table striped bordered hover className="my-4 tableStyle">
                <thead>
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.activityName}</td>
                            <td>{row.personnelInvolved || row.teachersInvolved || row.participantsInvolved || row.studentsInvolved}</td>
                            <td>{row.date}</td>
                            <td>{row.extension}</td>
                            <td>{row.service}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default InvTable;
