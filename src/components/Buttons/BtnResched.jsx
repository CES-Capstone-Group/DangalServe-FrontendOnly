import React, { useState } from "react";
import { Button, Container, Modal, Row, Col, Form, InputGroup } from "react-bootstrap";

const BtnResched = () => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="d-flex justify-content-start m-3">
            <div>
                <Button style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} onClick={handleShowModal}>
                    Request Reschedule
                </Button>
            </div>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Activity Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className='mb-3' controlId='ActivityTitle'>
                            <Form.Label column sm ={2} className='h5'>Activity Title</Form.Label>
                            <Col>
                                <Form.Control className='input' type='text' placeholder='' />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className='mb-3' controlId='DateAwarded'>
                            <Form.Label column sm ={2} className='h5'>Target Date: </Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control className='input' type='date' placeholder='' />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className='mb-3' controlId='AchvImage'>
                            <Form.Label column sm ={2} className='h5'>Attachment</Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control className="inputFile" type="file" />
                                </InputGroup>
                            </Col>
                            <p className="text-sm">Max Size: 25MB</p>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button size="lg" variant='success' onClick={handleCloseModal}>
                        Request Reschedule
                    </Button>
                    <Button size="lg" variant="danger" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnResched;