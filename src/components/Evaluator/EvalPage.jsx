import React from "react";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import "../table.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import BtnAddEval from "../Buttons/Evaluator/BtnAddEval";
import BtnViewTally from "../Buttons/Evaluator/BtnViewTally";
import BtnViewAllResponse from "../Buttons/Evaluator/BtnViewAllResponse";


const EvalPage = () => {
    const navigate = useNavigate();
    // // Go back to the previous page
    const handleBack = () => {
        navigate(-1); // This will navigate to the previous page in the history
    };

    return (
        <Container fluid className="py-4 d-flex flex-column justify-content-center">
            <Row>
                <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>

                <Col className="d-flex justify-content-end">
                    <Button style={{ backgroundColor: '#71A872', border: '0px' }}>
                        <FontAwesomeIcon className='me-2' icon={faFilter} ></FontAwesomeIcon>
                        Filter
                    </Button>
                </Col>
            </Row>
            <div className="container">
                <h1> ACTIVITY EVALUATION </h1>
            </div>

            <Table responsive bordered striped hover className="tableStyle" >
                <thead>
                    <tr>
                        <th>Proposal Title</th>
                        <th>Location</th>
                        <th>Target Date</th>
                        <th style={{width: '40%'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CCLIP: PC Awareness</td>
                        <td>San Isidro Elementary School</td>
                        <td>April 21, 2023</td>
                        <td><BtnViewTally /><BtnViewAllResponse /></td>
                    </tr>
                </tbody>
            </Table>

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <BtnAddEval />
                </Col>
            </Row>
        </Container>
    );
};

export default EvalPage;