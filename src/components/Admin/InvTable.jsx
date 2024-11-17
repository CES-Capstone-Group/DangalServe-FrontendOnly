import React from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { data1, data2, data3, data4 } from "./ChartData.jsx";
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

    // Define the headers and data based on the chartType
    switch (chartType) {
        case "Non-Teaching":
            tableHeaders = ["Activity Name", "No. of Personnel Involved", "Date", "Community Extension", "Community Service"];
            tableData = [
                { activityName: "Clean-Up Drive", personnelInvolved: 50, date: "2023-01-15", extension: "Yes", service: "No" },
                { activityName: "Tree Planting", personnelInvolved: 30, date: "2023-03-10", extension: "No", service: "Yes" },
                { activityName: "IT Literacy Program", personnelInvolved: 40, date: "2023-06-05", extension: "Yes", service: "Yes" }
            ];
            break;
        case "Teaching":
            tableHeaders = ["Activity Name", "No. of Teachers Involved", "Date", "Community Extension", "Community Service"];
            tableData = [
                { activityName: "Math Workshop", teachersInvolved: 20, date: "2023-02-12", extension: "No", service: "Yes" },
                { activityName: "Science Fair", teachersInvolved: 25, date: "2023-05-18", extension: "Yes", service: "No" },
                { activityName: "Coding Camp", teachersInvolved: 35, date: "2023-08-21", extension: "Yes", service: "Yes" }
            ];
            break;
        case "Participants":
            tableHeaders = ["Activity Name", "No. of Participants Involved", "Date", "Community Extension", "Community Service"];
            tableData = [
                { activityName: "Volunteer Meeting", participantsInvolved: 15, date: "2023-03-04", extension: "No", service: "Yes" },
                { activityName: "Community Workshop", participantsInvolved: 50, date: "2023-07-23", extension: "Yes", service: "No" },
                { activityName: "Charity Run", participantsInvolved: 40, date: "2023-10-15", extension: "Yes", service: "Yes" }
            ];
            break;
        case "Students":
            tableHeaders = ["Activity Name", "No. of Students Involved", "Date", "Community Extension", "Community Service"];
            tableData = [
                { activityName: "Student Assembly", studentsInvolved: 60, date: "2023-04-11", extension: "Yes", service: "No" },
                { activityName: "Environmental Project", studentsInvolved: 45, date: "2023-09-09", extension: "No", service: "Yes" },
                { activityName: "Tech Symposium", studentsInvolved: 80, date: "2023-12-05", extension: "Yes", service: "Yes" }
            ];
            break;
        default:
            tableHeaders = [];
            tableData = [];
    }

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
