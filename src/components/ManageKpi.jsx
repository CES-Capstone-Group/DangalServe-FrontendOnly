import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Table,
    Form,
    Modal,
    Button,
    InputGroup
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import BtnAddKpiProposal from "./Buttons/BtnAddKpiProposal";

// Import API_ENDPOINTS from your config
import { API_ENDPOINTS } from "../config";
import BtnAddKpi from "./Buttons/BtnAddKpi";

const ManageKpi = () => {
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();
    const [originalDepartments, setOriginalDepartments] = useState([]);


    // Function to fetch departments and KPI tables
    const fetchData = async () => {
        try {
            // Fetch departments
            const departmentResponse = await fetch(API_ENDPOINTS.DEPARTMENT_LIST);
            const departmentData = await departmentResponse.json();
            const departments = Array.isArray(departmentData) ? departmentData : [];

            console.log(departments);
            // Fetch KPI tables and associate them with departments
            const updatedDepartments = await Promise.all(
                departments.map(async (dept) => {
                    // Fetch KPI tables for each department
                    const kpiTableResponse = await fetch(`${API_ENDPOINTS.KPI_TABLE}?dept_id=${dept.dept_id}`);
                    const kpiTables = await kpiTableResponse.json();
                    dept.tables = Array.isArray(kpiTables) ? kpiTables : [];
                    return dept;
                })
            );

            setDepartments(updatedDepartments);
        } catch (error) {
            console.error("Error fetching department and KPI data:", error);
            setDepartments([]);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Function to toggle edit mode
    const toggleEdit = () => {
        if (isEditing) {
            handleSave();
        } else {
            // Store a copy of the current departments state before editing
            setOriginalDepartments(JSON.parse(JSON.stringify(departments)));
            setIsEditing(true);
        }
    };

    const handleSave = () => {
        setShowPasswordModal(true);
    };

    const handleCancel = () => {
        // Reset departments to the original state
        setDepartments(originalDepartments);
        setIsEditing(false);
    };

    const handlePasswordConfirm = () => {
        const correctPassword = "yourPassword"; // Replace with your actual password

        if (password === correctPassword) {
            setIsEditing(false);
            setShowSaveMessage(true);
            setShowPasswordModal(false);

            setTimeout(() => {
                setShowSaveMessage(false);
            }, 3000);
        } else {
            setPasswordError("Incorrect password. Please try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Container fluid className="py-4 mt-5 d-flex flex-column justify-content-center me-0 ms-0">
            <Row className="mb-3">
                <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success me-3">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>
            </Row>
            <Container
                fluid
                style={{
                    border: "1px",
                    borderStyle: "groove",
                    borderTop: "0px",
                    boxShadow: "1px 7px 7px 4px #888888",
                    padding: "2em"
                }}
            >
                <h3 style={{ paddingBottom: "1em" }}>KPI Management</h3>
                <Form.Group controlId="departmentSelect">
                    <Form.Label>College Department:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.dept_id} value={dept.dept_name}>
                                {dept.dept_name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <div className="mt-4 d-flex justify-content-end align-items-center">
                    {isEditing ? (
                        <>
                            <Button onClick={toggleEdit} className="btn btn-success me-2">
                                Save
                            </Button>
                            <Button onClick={handleCancel} className="btn btn-danger">
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button onClick={toggleEdit} className="btn btn-warning">
                            Edit
                        </Button>
                    )}
                </div>

                {departments.map((dept, deptIndex) => (
                    (!selectedDepartment || selectedDepartment === dept.dept_name) && (
                        <div key={dept.dept_id} className="mt-5">
                            <h5>{dept.dept_name}</h5>
                            {dept.tables && dept.tables.length > 0 ? (
                                dept.tables.map((table, tableIndex) => (
                                    <div key={tableIndex}>
                                        <h6>{table.title}</h6>
                                        <Table responsive bordered striped hover className="tableStyle mt-3">
                                            <thead>
                                                <tr>
                                                    <th>KPI's</th>
                                                    <th>Target</th>
                                                    <th colSpan={4}>2023</th>
                                                    <th colSpan={4}>2024</th>
                                                    <th colSpan={4}>2025</th>
                                                </tr>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                    <th>Q1</th>
                                                    <th>Q2</th>
                                                    <th>Q3</th>
                                                    <th>Q4</th>
                                                    <th>Q1</th>
                                                    <th>Q2</th>
                                                    <th>Q3</th>
                                                    <th>Q4</th>
                                                    <th>Q1</th>
                                                    <th>Q2</th>
                                                    <th>Q3</th>
                                                    <th>Q4</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {table.kpis.map((kpi, kpiIndex) => (
                                                    <tr key={kpiIndex}>
                                                        <td>{kpi.kpi_name}</td>
                                                        <td>{kpi.target}</td>
                                                        {Object.keys(kpi.quarterly_data).map((year) =>
                                                            kpi.quarterly_data[year].map((value, quarterIndex) => (
                                                                <td key={`${year}-${quarterIndex}`}>
                                                                    {isEditing ? (
                                                                        <input
                                                                            type="text"
                                                                            value={value}
                                                                            onChange={(e) => {
                                                                                // Create a deep copy of the departments state
                                                                                const updatedDepartments = departments.map(dept => ({
                                                                                    ...dept,
                                                                                    tables: dept.tables.map(table => ({
                                                                                        ...table,
                                                                                        kpis: table.kpis.map(kpi => ({
                                                                                            ...kpi,
                                                                                            quarterly_data: { ...kpi.quarterly_data }
                                                                                        }))
                                                                                    }))
                                                                                }));

                                                                                // Update the specific value
                                                                                updatedDepartments[deptIndex].tables[tableIndex].kpis[kpiIndex].quarterly_data[year][quarterIndex] = e.target.value;

                                                                                // Set the updated state
                                                                                setDepartments(updatedDepartments);
                                                                            }}
                                                                            style={{ width: "50px" }}
                                                                        />
                                                                    ) : (
                                                                        value
                                                                    )}
                                                                </td>
                                                            ))
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        <div className="d-flex justify-content-end">
                                            <BtnAddKpi departments={departments} fetchData={fetchData} deptIndex={deptIndex} tableIndex={tableIndex} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No KPI tables available for this department.</p>
                            )}

                            <div className="d-flex justify-content-end">
                                <BtnAddKpiProposal fetchData={fetchData} departments={departments} deptIndex={dept.dept_id} />
                            </div>
                        </div>
                    )
                ))}
            </Container>

            {/* Password Confirmation Modal */}
            <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Password Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="passwordInput">
                        <Form.Label>Please enter your password to confirm the save:</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                            />
                            <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </Button>
                        </InputGroup>
                        {passwordError && <p className="text-danger mt-2">{passwordError}</p>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handlePasswordConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ManageKpi;
