import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { API_ENDPOINTS } from "../../config";

const BtnAddKpiProposal = ({  deptIndex, departments, fetchData }) => {
    const [showAddProposalModal, setShowAddProposalModal] = useState(null);
    const [newProposalTitle, setNewProposalTitle] = useState("");

    const addProposal = (deptIndex) => {
        // const updatedDepartments = [...departments];
        const departmentId = deptIndex;

        if (!departmentId) {
            console.error("Invalid Department ID");
            return;
        }

        const proposalData = {
            department: departmentId,
            title: newProposalTitle
        };

        fetch(`${API_ENDPOINTS.KPI_TABLE}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proposalData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    // Re-fetch data to update the state
                    fetchData();
                    setNewProposalTitle("");
                    setShowAddProposalModal(null);       
                } else {
                    console.error("Error creating proposal:", data);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    return (
        <>
            <Button
                variant="success"
                className="mt-3"
                onClick={() => setShowAddProposalModal(deptIndex)}
            >
                + Add Proposal / Activity KPI
            </Button>

            <Modal show={!!showAddProposalModal} onHide={() => setShowAddProposalModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Proposal / Activity KPI</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="proposalTitleInput">
                        <Form.Label>Proposal Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={newProposalTitle}
                            onChange={(e) => setNewProposalTitle(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddProposalModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => {
                            addProposal(deptIndex); // Call addProposal with the appropriate argument
                            setShowAddProposalModal(false);
                        }}
                    >
                        Add Proposal
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BtnAddKpiProposal;