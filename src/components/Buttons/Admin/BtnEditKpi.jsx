import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons'

const BtnEditKpi = () => {
    const [show, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false); 
   
    return(
        <div>
            <Button variant="success" onClick={handleShowModal}>
                <FontAwesomeIcon icon={faEdit}/>
                Edit
            </Button>
            
            <Modal centered backdrop="static" show={show} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Button className="me-5 mb-5 p-0 ps-2 pe-2" variant="success" onClick={handleCloseModal}>Back</Button>
                    <Modal.Title className="ms-5 p-0 ps-5">KEY PERFORMANCE INDICATOR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className='mb-5' controlId="KpiSelect">
                            <Form.Label column sm={2} className="h1">Select KPI: </Form.Label>
                            <Col >
                                <Form.Select>
                                    <option value="1">Average score of individuals' knowledge assessment</option>
                                    <option value="2">Number of computer seminars and trainings conducted</option>
                                    <option value="3">Number of beneficiaries trained on the use the use of software application, hardware, internet, social media, data privacy and graphics</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-5" controlId="KpiQuarter">
                            <Form.Label column sm={2} className="h1">
                                Quarter: 
                            </Form.Label>
                            <Col>
                                <Form.Select>
                                    <option value="1">1st Quarter</option>
                                    <option value="2">2nd Quarter</option>
                                    <option value="3">3rd Quarter</option>
                                    <option value="4">4th Quarter</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-5" controlId="KpiYear">
                            <Form.Label column sm={2} className="h1">Year: </Form.Label>
                            <Col>
                                <Form.Control className="input" type="text" value={2023}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-5" controlId="KpiVal">
                            <Form.Label column sm={2} className="h1">Value: </Form.Label>
                            <Col>
                                <Form.Control className="input" type="text" placeholder="Enter Value Here"/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button style={{color:'white', width:'10em', fontSize:'2em'}} variant="success" onClick={handleCloseModal}>Save </Button>
                </Modal.Footer>
                
            </Modal>
        </div>
        
    );
}

export default BtnEditKpi;``