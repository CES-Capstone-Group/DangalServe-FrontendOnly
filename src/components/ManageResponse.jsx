import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import { CSSTransition } from "react-transition-group";

const ManageResponses = () => {
    const navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false);
    const [visible, setVisible] = useState('student');

    const handleVisibility = (type) => {
        setVisible(type)
    };

    // Handle back navigation
    const handleBack = () => {
        navigate(-1);  // Navigate to the previous page
    };
    
    const array = [{id:1, eval_name: 'Laurence Andrew B. Santos' , eval_deptname: 'CCS', eval_title: 'CCLIP: PC Awareness', QA1: 1, QA2: 2, QA3: 3, QB1: 4, QB2: 5, QC: 4, QD: 3, QE: 2, QG1: 1, QG2: 2, QH: 3,QI1: 4,QI2: 5,QJ1: 4,QJ2: 3, eval_suggestion: 'N/A'}];


    // Table student row 
    const Rows = (props) => {
        const { id,eval_name, eval_deptname, eval_title, QA1, QA2, QA3, QB1, QB2, QC, QD, QE, QG1, QG2, QH, QI1, QI2, QJ1, QJ2, eval_suggestion} = props;
        return (
            <tr>
                <td>{id}</td>
                <td>{eval_name}</td>
                <td>{eval_deptname}</td>
                <td>{eval_title}</td>
                <td>{QA1}</td>
                <td>{QA2}</td>
                <td>{QA3}</td>
                <td>{QB1}</td>
                <td>{QB2}</td>
                <td>{QC}</td>
                <td>{QD}</td>
                <td>{QE}</td>
                <td>{QG1}</td>
                <td>{QG2}</td>
                <td>{QH}</td>
                <td>{QI1}</td>
                <td>{QI2}</td>
                <td>{QJ1}</td>
                <td>{QJ2}</td>
                <td>{eval_suggestion}</td>

            </tr>
        );
    };

    const NewTable = ({ data }) => {
        return (
            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                    {/* <tr>
                        <th>ID</th>
                        <th>Evaluator Name</th>
                        <th>Division/ Department/ Organizing Team</th>
                        <th>Activity Title</th>
                        <th>A1</th>
                        <th>A2</th>
                        <th>A3</th>
                        <th>B1</th>
                        <th>B2</th>
                        <th>C</th>
                        <th>D</th>
                        <th>E</th>
                        <th>G1</th>
                        <th>G2</th>
                        <th>H</th>
                        <th>I1</th>
                        <th>I2</th>
                        <th>J2</th>
                        <th>J2</th>
                        <th>Suggestions</th>
                    </tr> */}
                    <tr>
                        <th rowSpan={2}>ID</th>
                        <th rowSpan={2}>Evaluator Name</th>
                        <th rowSpan={2}>Division/ Department/ Organizing Team</th>
                        <th rowSpan={2}>Activity Title</th>
                        <th colSpan={3}>Objectives</th>
                        <th colSpan={2}>Activities</th>
                        <th colSpan={1}>Conduct of Activites</th>
                        <th colSpan={1}>Flow of the Program</th>
                        <th colSpan={1}>Time Management</th>
                        <th colSpan={2}>Venue and Facilities</th>
                        <th colSpan={1}>Food</th>
                        <th colSpan={2}>Resource Person/Speaker</th>
                        <th colSpan={2}>Organazing Team</th>
                        <th rowSpan={2}>Suggestions</th>
                    </tr>
                    <tr>
                        <th>A1</th>
                        <th>A2</th>
                        <th>A3</th>
                        <th>B1</th>
                        <th>B2</th>
                        <th>C</th>
                        <th>D</th>
                        <th>E</th>
                        <th>G1</th>
                        <th>G2</th>
                        <th>H</th>
                        <th>I1</th>
                        <th>I2</th>
                        <th>J2</th>
                        <th>J2</th>
                    </tr>

                    
                </thead>
                <tbody>
                    {array.map((response, index) => (
                        <Rows key={index}
                        id={response.id}
                        eval_name={response.eval_name}
                        eval_deptname={response.eval_deptname}
                        eval_title={response.eval_title}  
                        QA1={response.QA1}
                        QA2={response.QA2} 
                        QA3={response.QA3}  
                        QB1={response.QB1}
                        QB2={response.QB2}
                        QC={response.QC}
                        QD={response.QD}
                        QE={response.QE}
                        QG1={response.QG1}
                        QG2={response.QG2}
                        QH={response.QH}
                        QI1={response.QI1}
                        QI2={response.QI2}
                        QJ1={response.QJ1}
                        QJ2={response.QJ2}
                        eval_suggestion={response.eval_suggestion}
                        /> 
                    ))}
                </tbody>
            </Table>
        );
    };


    return (
        <Container fluid
        className="py-4 mt-5  d-flex flex-column justify-content-center me-0 ms-0" >
            <Row>
                <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>

                <Col className="d-flex justify-content-end">
                    <Dropdown align='end' onToggle={() => setShowFilter(!showFilter)} show={showFilter}>
                        <Dropdown.Toggle style={{ borderWidth: '0px', backgroundColor: '#71A872' }}>
                            <FontAwesomeIcon className='me-2' icon={faFilter} /> Filter
                        </Dropdown.Toggle>
                        <CSSTransition in={showFilter} timeout={300} classNames="dropdown" unmountOnExit>
                        <Dropdown.Menu className='dropDown'>
                            <Dropdown.Item onClick={() => handleVisibility('student')}>Student</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleVisibility('nonTeaching')}>Non-Teaching</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleVisibility('teaching')}>Teaching</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleVisibility('alumni')}>Alumni</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleVisibility('participant')}>Participant</Dropdown.Item>
                        </Dropdown.Menu>
                        </CSSTransition>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <Col><h1>Evaluation Response Management</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{ width: '300px' }} />
                </Col>
            </Row>

            <NewTable data={array}/>

        </Container>
    );
};

export default ManageResponses;
