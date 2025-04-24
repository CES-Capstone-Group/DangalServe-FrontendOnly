import React, { useState, useEffect } from "react";
import { Container, Row, Table, Form, Modal, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS } from "../../config";
import "../table.css";
import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

const CoorKpiPage = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [originalDepartments, setOriginalDepartments] = useState([]);

    // Function to fetch departments and KPI tables
    const fetchData = async () => {
        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('access_token');
            const decodedToken = decodeToken(token);

            if (decodedToken && decodedToken.department) {
                // Set the department from the token
                setSelectedDepartment(decodedToken.department);
            }

            if (!token) {
                console.error("No token found! Please log in.");
                return;
            }

            if (decodedToken) {
                console.log("Logged-in User Data:", decodedToken); // Log current account data
            } else {
                console.error("Failed to decode token.");
                return;
            }

            // Fetch departments
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
            console.log("Fetched Departments with KPI Tables:", updatedDepartments);
            setOriginalDepartments(JSON.parse(JSON.stringify(updatedDepartments))); // Save original state
        } catch (error) {
            console.error("Error fetching department and KPI data:", error);
        }
    };
    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container fluid className="py-4 mt-5">
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
                        disabled
                        as="select"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        {departments.map((dept) => (
                            <option key={dept.dept_id} value={dept.dept_name}>
                                {dept.dept_name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

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
        </Container>
    );
};
export default CoorKpiPage;
