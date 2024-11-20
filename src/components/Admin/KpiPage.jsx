import React, { useState, useEffect } from "react";
import { Container, Row, Table, Form, Modal, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS } from "../../config";
import "../table.css";

const KpiPage = () => {
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [departments, setDepartments] = useState([]);
    const [originalDepartments, setOriginalDepartments] = useState([]);

    // Function to fetch departments and KPI tables
    const fetchData = async () => {
        try {
            const departmentResponse = await fetch(API_ENDPOINTS.DEPARTMENT_LIST);
            const departmentData = await departmentResponse.json();
            const departments = Array.isArray(departmentData) ? departmentData : [];

            // Fetch KPI tables for each department
            const updatedDepartments = await Promise.all(
                departments.map(async (dept) => {
                    const kpiTableResponse = await fetch(`${API_ENDPOINTS.KPI_TABLE}?dept_id=${dept.dept_id}`);
                    const kpiTables = await kpiTableResponse.json();
                    dept.tables = Array.isArray(kpiTables) ? kpiTables : [];
                    return dept;
                })
            );

            setDepartments(updatedDepartments);
            setOriginalDepartments(JSON.parse(JSON.stringify(updatedDepartments))); // Save original state
        } catch (error) {
            console.error("Error fetching department and KPI data:", error);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setDepartments(originalDepartments); // Revert to the original state
        setIsEditing(false);
    };

    const handleSave = () => {
        setShowPasswordModal(true);
    };

    const handlePasswordConfirm = () => {
        const correctPassword = "yourPassword"; // Replace with your actual password

        if (password === correctPassword) {
            setIsEditing(false);
            setShowSaveMessage(true);
            setShowPasswordModal(false);
            setTimeout(() => setShowSaveMessage(false), 3000);
        } else {
            setPasswordError("Incorrect password. Please try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container fluid className="">
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
                <h3>KEY PERFORMANCE INDICATOR</h3>
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

                <div className="mt-4 d-flex justify-content-end">
                    {isEditing ? (
                        <div>
                            <Button onClick={handleSave} className="btn btn-success me-2">Save</Button>
                            <Button onClick={handleCancel} className="btn btn-danger">Cancel</Button>
                        </div>
                    ) : (
                        <Button onClick={handleEdit} className="btn btn-warning">Edit</Button>
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
                                        <Table responsive bordered striped hover className="mt-3 tableStyle">
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
                                                                                updatedDepartments[deptIndex].tables[tableIndex].kpis[kpiIndex].quarterly_data[year][quarterIndex] = e.target.value;
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
                                    </div>
                                ))
                            ) : (
                                <p>No KPI tables available for this department.</p>
                            )}
                        </div>
                    )
                ))}
            </Container>

            
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
                    <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>Cancel</Button>
                    <Button variant="success" onClick={handlePasswordConfirm}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default KpiPage;
