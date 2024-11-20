import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import BtnAddEval from "../Buttons/Evaluator/BtnAddEval";
import BtnViewTally from "../Buttons/Evaluator/BtnViewTally";
import BtnViewAllResponse from "../Buttons/Evaluator/BtnViewAllResponse";
import { API_ENDPOINTS } from "../../config";
import "../table.css";

const EvalPage = () => {
    const navigate = useNavigate();
    const [evaluationForms, setEvaluationForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // State for success message

    // Fetch evaluation forms using the API
    useEffect(() => {
        const fetchEvaluationForms = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.EVALUATION_FORM_LIST_ALL);
                if (!response.ok) {
                    throw new Error("Failed to fetch evaluation forms");
                }
                const data = await response.json();
                setEvaluationForms(data.evaluation_forms || []);
            } catch (err) {
                setError(err.message || "Failed to fetch evaluation forms.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvaluationForms();
    }, []);

    // Handle Activate/Deactivate button click
    const toggleStatus = async (formId, currentStatus) => {
        try {
            const newStatus = currentStatus === "active" ? "inactive" : "active";
            const response = await fetch(API_ENDPOINTS.EVALUATION_FORM_DETAIL(formId), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) {
                throw new Error("Failed to update status");
            }

            // Update the local state
            setEvaluationForms((prevForms) =>
                prevForms.map((form) =>
                    form.form_id === formId ? { ...form, status: newStatus } : form
                )
            );
            setSuccessMessage(`Status updated to ${newStatus} successfully!`);
            setTimeout(() => setSuccessMessage(null), 3000); // Clear the message after 3 seconds
        } catch (err) {
            console.error("Failed to toggle status:", err);
            alert("Failed to update the status. Please try again.");
        }
    };

    // Go back to the previous page
    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <Container fluid className="py-4 d-flex flex-column justify-content-center">
            <Row>
                <Button
                    variant="link"
                    onClick={handleBack}
                    className="backBtn d-flex align-items-center text-success"
                >
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>

                <Col className="d-flex justify-content-end">
                    <Button style={{ backgroundColor: "#71A872", border: "0px" }}>
                        <FontAwesomeIcon className="me-2" icon={faFilter}></FontAwesomeIcon>
                        Filter
                    </Button>
                </Col>
            </Row>

            <div className="container">
                <h1>ACTIVITY EVALUATION</h1>
            </div>

            {/* Display success message */}
            {successMessage && (
                <Alert variant="success" className="mt-3">
                    {successMessage}
                </Alert>
            )}

            <Table responsive bordered striped hover className="tableStyle mt-3">
                <thead>
                    <tr>
                        <th>Evaluation Type</th>
                        <th>Activity Title</th>
                        <th>Location</th>
                        <th>Activity Venue</th>
                        <th>Date Created</th>
                        <th>Status</th>
                        <th style={{ width: "40%" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {evaluationForms.map((form) => (
                        <tr key={form.form_id}>
                            <td>{form.evaluation_type_name}</td>
                            <td>{form.title}</td>
                            <td>{form.brgy_name || "N/A"}</td>
                            <td>{form.activity_venue || "N/A"}</td>
                            <td>{new Date(form.created_at).toLocaleDateString()}</td>
                            <td>{form.status}</td>
                            <td>
                                <BtnViewTally />
                                <BtnViewAllResponse />
                                <Button
                                    variant="warning"
                                    onClick={() => toggleStatus(form.form_id, form.status)}
                                    className="ms-2"
                                >
                                    {form.status === "active" ? "Deactivate" : "Activate"}
                                </Button>
                            </td>
                        </tr>
                    ))}
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
