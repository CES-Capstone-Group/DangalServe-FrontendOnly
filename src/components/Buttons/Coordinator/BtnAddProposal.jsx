import React, { useState } from "react";
import { Button, Container, Modal, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProposalForm from "../../Forms/ProposalForm";
import { NavLink } from "react-router-dom";

const BtnAddProposal = () => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/coor/proposal-form';
        navigate(path);
    }
    
    return (
        <div className="d-flex justify-content-end m-3">
            <div>
                <Button className="shadow" style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} onClick={routeChange}>
                    + Add Proposal
                </Button>
            </div>

          
        </div>
    );
};

export default BtnAddProposal;