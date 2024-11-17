import React, { useState } from "react";
import { Button, Form, Modal, Col, Row} from "react-bootstrap";

const BtnViewApproveRE = () => {
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);   

    const handleEditMode = () => setEditMode(true);
    const handleCancel = () => setEditMode(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
        

    return(
        <>
            <td>
            <Button className='me-3' onClick={handleShow} style={{backgroundColor:"#71A872", border: '0px', color: 'white'}}>View</Button>             
            <Button style={{backgroundColor:'#71A872', border: '0px', color: 'white'}}>Approve</Button>
            </td>

            <Modal backdrop='static' centered size="lg" show={show} onHide={handleClose} className="p-6">
                <Modal.Header closeButton>
                    <Button onClick={handleClose} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4} >Request Title</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={"Community Cleanup Drive"}/> 
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Requester</Form.Label>
                            <Col column sm={8}>
                                <Form.Control readOnly type="text" value={"Brgy. Diezmo"}/>  
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Request Date</Form.Label>
                            <Col column sm={8}>
                               <Form.Control readOnly type="text" value={"August 9, 2024"}/> 
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Department</Form.Label>
                            <Col column sm={8}>
                                <Form.Control readOnly type="text" value={"Pending"}/>  
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}> 
                        Close</Button>
                </Modal.Footer>
            </Modal>
        </> 
    );
};

export default BtnViewApproveRE;