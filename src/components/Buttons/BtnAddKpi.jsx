import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { API_ENDPOINTS } from "../../config";

const BtnAddKpi = ({ departments, fetchData, deptIndex, tableIndex }) => {
    const [showAddKpiModal, setShowAddKpiModal] = useState(null);
    const [newKpi, setNewKpi] = useState({ kpi: "", target: "" });
    const [validationErrors, setValidationErrors] = useState({}); // State to store validation errors

    // Function to add a KPI
    const addKpi = (deptIndex, tableIndex) => {
        if (!validateForm()) return; // Perform validation before proceeding

        const updatedDepartments = [...departments];
        const kpiTableId = updatedDepartments[deptIndex]?.tables?.[tableIndex]?.id;

        if (!kpiTableId) {
            console.error("Invalid KPI Table ID");
            return;
        }

        const kpiData = {
            kpi_table: kpiTableId,
            kpi_name: newKpi.kpi,
            target: newKpi.target,
            quarterly_data: { "2023": [0, 0, 0, 0], "2024": [0, 0, 0, 0], "2025": [0, 0, 0, 0] }
        };

        fetch(`${API_ENDPOINTS.KPI_TABLE_KPIS}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(kpiData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    // Re-fetch data to update the state
                    fetchData();
                    setNewKpi({ kpi: "", target: "" });
                    setValidationErrors({}); // Clear validation errors
                    setShowAddKpiModal(null);
                } else {
                    console.error("Error creating KPI:", data);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    // Validation logic
    const validateForm = () => {
        const errors = {};
        if (!newKpi.kpi.trim()) {
            errors.kpi = "KPI is required.";
        }
        if (!newKpi.target.trim()) {
            errors.target = "Target is required.";
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    return (
        <>
            <Button
                variant="success"
                className="mt-2"
                onClick={() => setShowAddKpiModal({ deptIndex, tableIndex })}
            >
                + Add KPI
            </Button>

            {/* Add KPI Modal */}
            <Modal show={!!showAddKpiModal} onHide={() => setShowAddKpiModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add KPI</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="kpiInput">
                        <Form.Label>
                            KPI<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={newKpi.kpi}
                            onChange={(e) => setNewKpi({ ...newKpi, kpi: e.target.value })}
                            isInvalid={!!validationErrors.kpi} // Highlight if invalid
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.kpi}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="targetInput" className="mt-3">
                        <Form.Label>
                            Target<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={newKpi.target}
                            onChange={(e) => setNewKpi({ ...newKpi, target: e.target.value })}
                            isInvalid={!!validationErrors.target} // Highlight if invalid
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.target}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddKpiModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => addKpi(showAddKpiModal.deptIndex, showAddKpiModal.tableIndex)}
                    >
                        Add KPI
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BtnAddKpi;
