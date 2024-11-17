import React from "react";
import { Button, Container, Table, Col } from "react-bootstrap";
import BtnRecieve from "./Buttons/BtnRecieveReturn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import "./table.css";

const DocumentPage = () => {
    return (
        <Container className="container-fluid">

            <Col className="d-flex justify-content-end">
                <Button style={{ backgroundColor: '#71A872', border: '0px' }}>
                    <FontAwesomeIcon className='me-2' icon={faFilter} ></FontAwesomeIcon>
                    Filter
                </Button>
            </Col>

            <div className="container">
                <h1> DOCUMENTS </h1>
            </div>

            <Col className="mb-3 d-flex justify-content-end">
                <input type="search" className="form-control" placeholder='Search' style={{ width: '300px' }} />
            </Col>


            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                        <th>Document Type</th>
                        <th>Submitted by</th>
                        <th>Submission Date</th>
                        <th>Remarks</th>
                        <th>Status</th>
                        <th></th>
                </thead>
                <tbody>
                    <tr>
                        <td>Donation Form</td>
                        <td>CCS Coordinator</td>
                        <td>April 20, 2023</td>
                        <td></td>
                        <td>Pending</td>
                        <BtnRecieve />
                    </tr>
                    <tr>
                        <td>Donation Form</td>
                        <td>CBAA Coordinator</td>
                        <td>April 20, 2023</td>
                        <td></td>
                        <td>Pending</td>
                        <BtnRecieve />
                    </tr>
                </tbody>
            </Table>

            <div>

            </div>
        </Container>
    );
};

export default DocumentPage;