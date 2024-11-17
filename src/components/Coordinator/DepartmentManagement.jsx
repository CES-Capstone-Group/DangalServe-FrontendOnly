import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import BtnAddDepartment from "../Buttons/Manage/BtnAddDepartment";  // Import Add Button
import "../table.css";
import BtnEditDeleteDept from "../Buttons/Manage/BtnEditDeleteDept";  // Import Edit/Delete Button
import { API_ENDPOINTS } from "../../config";

const DepartmentManagement = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    // **State for Department Data**
    const [departments, setDepartments] = useState([]);  // State to store departments

    // Function to Fetch Department Data from Backend
    const fetchDepartments = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.DEPARTMENT_LIST);  // Fetch data from the backend
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDepartments(data);  // Update state with the fetched data
        } catch (error) {
            console.error("Failed to fetch departments:", error);
        }
    };

    // Fetch departments on component mount
    useEffect(() => {
        fetchDepartments();  // Load departments initially
    }, []);

    //search function
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
      };
      
      // Filter barangays based on the search query
      const filteredDept = departments.filter(department => {
        if (!department || typeof department !== 'object') return false; // Safeguard against unexpected data
        return (
            department.dept_name && department.dept_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    //end of search function

    // Handle navigation to the previous page
    const handleBack = () => {
        navigate(-1);  // Navigate to the previous page
    };

    // **Rows Component to Display Each Department**
    const Rows = (props) => {
        const { dept_id, dept_name } = props;

        return (
            <tr>
                <td>{dept_id}</td>
                <td>{dept_name}</td>
                {/* **Pass Parameters to BtnEditDelete** */}
                <td><BtnEditDeleteDept deptId={dept_id} deptName={dept_name} onDepartmentUpdated={fetchDepartments} /></td>
            </tr>
        );
    };

    // **NewTable Component to Display All Departments**
    const NewTable = ({ data }) => {
        return (
            <Table responsive striped bordered hover className="tableStyle">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>ID</th>
                        <th>Department Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <Rows
                            key={row.dept_id}  // Use a unique ID for each row
                            dept_id={row.dept_id}  // Pass department ID
                            dept_name={row.dept_name}  // Pass department name
                        />
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <Container fluid 
        className="py-4 mt-5  d-flex flex-column justify-content-center me-0 ms-0">
            <Row>
                <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success me-3">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>
                <Col className="d-flex justify-content-end">
                    <Button style={{ backgroundColor: '#71A872', border: '0px' }}>
                        <FontAwesomeIcon className='me-2' icon={faFilter}></FontAwesomeIcon>
                        Filter
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col><h1>Department Management</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{ width: '300px' }} onChange={handleSearch}/>
                </Col>
            </Row>

            {/* Render the table with the fetched data */}
            <NewTable data={filteredDept} />

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    {/* **Pass `fetchDepartments` as a Prop to BtnAddDepartment** */}
                    <BtnAddDepartment onDepartmentAdded={fetchDepartments} />  {/* Pass the fetch function */}
                </Col>
            </Row>
        </Container>
    );
};

export default DepartmentManagement;
