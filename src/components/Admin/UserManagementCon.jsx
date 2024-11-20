import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import BtnEditDeac from "../Buttons/Admin/BtnEditDeac";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import BtnAddAcc from "../Buttons/Admin/BtnAddAcc";
import "../table.css"
import "../../App.css"
import { API_ENDPOINTS } from "../../config";

const Rows = ({ user_id, username, name, type, department_name, course_name, barangay_name, position, actDate, deacDate, status, fetchUsers }) => {
    const account = {
        user_id: user_id,
        username: username,
        name: name,
        accountType: type,
        department: department_name,
        course: course_name,
        barangay: barangay_name,
        position: position,
        activationDate: actDate,
        deactivationDate: deacDate,
        status: status
    };

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const handleDeactivateAccount = async (user_id, newStatus) => {
        // Construct the updated account data with all required fields
        const updatedAccount = {
            ...account, // Include existing account fields
            status: newStatus,
            activationDate: newStatus === 'Active' ? getCurrentDate() : account.activationDate,
            deactivationDate: newStatus === 'Inactive' ? getCurrentDate() : null
        };

        try {
            const response = await fetch(API_ENDPOINTS.USER_INFO_ACTION(user_id), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAccount),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Response error data:', errorData);
                throw new Error(`HksTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            fetchUsers();
        } catch (error) {
            console.error("Failed to update account status:", error);
        }
    };

    const displayField = (field, fallback) => field || fallback;

    return (
        <tr>
            <td>{user_id}</td>
            <td>{username}</td>
            <td>{name}</td>
            <td>{type}</td>
            {/* <td>{displayField(department_name, "Not Applicable")}</td> */}
            {/* <td>{displayField(course_name, "Not Applicable")}</td> */}
            {/* <td>{displayField(barangay_name, "Not Applicable")}</td> */}
            <td>{position}</td>
            <td>{actDate}</td>
            <td>{deacDate}</td>
            <td>
                <span
                    style={{
                        backgroundColor: status === "Active" ? "green" : "red",
                        color: 'white',
                        padding: '6px',
                        borderRadius: '3px',
                    }}
                >
                    {status}
                </span>
            </td>
            <td>
                <BtnEditDeac
                    account={account}
                    onDeactivate={handleDeactivateAccount}
                    onSave={fetchUsers}
                />
            </td>
        </tr>
    );
};

const NewTable = ({ data, fetchUsers }) => {
    return (
        <Table responsive striped bordered hover className="tableStyle">
            <thead>
                <th>ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Account Type</th>
                {/* <th>Department</th> */}
                {/* <th>Course</th> */}
                {/* <th>Barangay</th> */}
                <th>Position</th>
                <th>Activation Date</th>
                <th>Deactivation Date</th>
                <th>Status</th>
                <th style={{width: '9%'}}>Actions</th>
            </thead>
            <tbody>
                {data.map((row) => (
                    <Rows
                        key={row.user_id}  // Use a unique ID, like accountID
                        user_id={row.user_id}
                        username={row.username}
                        name={row.name}
                        type={row.accountType}
                        department_name={row.department_name}
                        course_name={row.course_name}
                        barangay_name={row.barangay_name}
                        position={row.position}
                        actDate={row.activationDate}
                        deacDate={row.deactivationDate}
                        status={row.status}
                        fetchUsers={fetchUsers}
                    />
                ))}
            </tbody>
        </Table>
    );
};

const UserManagementCon = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchUsers = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.GET_USERS);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const formattedData = data.map(user => ({
                user_id: user.user_id,
                username: user.username,
                name: user.accountType === 'Admin' ? user.adminaccount?.name || 'No Name' :
                    user.accountType === 'Proponent' ? user.proponentaccount?.name || 'No Name' :
                        user.accountType === 'Brgy. Official' ? user.brgyofficialaccount?.name || 'No Name' :
                            user.accountType === 'Evaluator' ? user.evaluatoraccount?.name || 'No Name' : 'No Name',
                accountType: user.accountType,
                department_name: user.department_name,
                course_name: user.course_name,
                barangay_name: user.barangay_name,
                position: user.position,
                activationDate: user.activationDate,
                deactivationDate: user.deactivationDate,
                status: user.status
            }));

            setUsers(data);  // Update the state with the fetched users           
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAccountAdded = () => {
        fetchUsers();
    };

    const navigate = useNavigate();

    // Go back to the previous page
    const handleBack = () => {
        navigate(-1); // This will navigate to the previous page in the history
    };

    //search function
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter users based on the search query
    const filteredUsers = users.filter(user => {
        if (!user || typeof user !== 'object') return false; // Safeguard against unexpected data
        return (
            (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.accountType && user.accountType.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.department_name && user.department_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.course_name && user.course_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.barangay_name && user.barangay_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.position && user.position.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.status && user.status.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });
    //end of search function

    return (
        <Container fluid style={{padding: '0'}}
            className="py-4 mt-5 d-flex flex-column justify-content-center me-0 ms-0">
            {/* Row for the Back Button */}
            <Row>
                <Col xs="auto">
                    <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success">
                        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                        <span className="ms-2">Back</span>
                    </Button>
                </Col>
            </Row>

            {/* Row for the Filter Button */}
            <Row>
                <Col className="d-flex justify-content-end">
                    <Button style={{ backgroundColor: '#71A872', border: '0px' }}>
                        <FontAwesomeIcon className='me-2' icon={faFilter}></FontAwesomeIcon>
                        Filter
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col><h1>Account Management</h1></Col>
            </Row>

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" onChange={handleSearch} className="form-control" placeholder='Search' style={{ width: '300px' }} />
                </Col>
            </Row>

            {/* Render the table with the latest data */}
            <NewTable data={filteredUsers} fetchUsers={fetchUsers} />

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <BtnAddAcc onAccountAdded={handleAccountAdded} style={{ backgroundColor: '#71A872', border: '0px' }} />
                </Col>
            </Row>
        </Container>
    );
};

export default UserManagementCon;