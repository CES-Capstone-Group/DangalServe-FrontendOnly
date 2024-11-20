import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import pncbg from '../assets/pncbg.png'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { API_ENDPOINTS } from "../config";

const EvalSelect = () => {
    const [showModal, setShowModal] = useState(false);
    const [role, setRole] = useState("");

    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        accountType: 'Evaluator',
        evaluator_type: '', // Will be set based on role
        email: '',
        contactNumber: '',
        department: '',
        course: '',
        position: '',
        username: '',
        password: '',
        status: "Active",
        activationDate: new Date().toISOString().slice(0, 10),
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBarangay = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.BARANGAY_LIST);
                setBarangays(response.data);
            } catch (error) {
                console.error("There was an error fetching the barangay data!", error);
            }
        };

        const fetchDepartments = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.DEPARTMENT_LIST);
                setDepartments(response.data); // Set the department data in state
            } catch (error) {
                console.error("There was an error fetching the department data!", error);
            }
        };

        const fetchCourses = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.COURSE_LIST);
                setCourses(response.data); // Set the courses data in state
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
        fetchDepartments();
        fetchBarangay();
    }, []);

    const handleDepartmentChange = async (e) => {
        const selectedValue = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            department: selectedValue,
            course: '', // Reset course selection when department changes
        }));

        if (selectedValue) {
            try {
                const response = await axios.get(API_ENDPOINTS.COURSES_BY_DEPARTMENT(selectedValue));
                setFilteredCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses for department:", error);
                setFilteredCourses([]);  // Clear courses if there's an error
            }
        } else {
            setFilteredCourses([]);  // Clear courses if no department selected
        }
    };

    const handleShowModal = () => { setShowModal(true); };
    const handleCloseModal = () => { setShowModal(false); };

    const handleSetRole = (selectedRole) => {
        setRole(selectedRole);

        const evaluatorTypeMap = {
            'Student': 'Student',
            'Non-Teaching': 'Non-Teaching',
            'Faculty': 'Faculty', // Changed from Teaching to Faculty
            'Alumni': 'Alumni',
            'Participant': 'External'
        };

        setFormData(prevState => ({
            ...prevState,
            evaluator_type: evaluatorTypeMap[selectedRole],
            position: selectedRole === 'Student' ? 'Student' : '', // Default position for Student
        }));

        handleShowModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_ENDPOINTS.CREATE_USER, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });        
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            navigate("/eval");
        } catch (error) {
            console.error("There was an error creating the account:", error);
        }
    };

    const roles = ['Student', 'Non-Teaching', 'Faculty', 'Alumni', 'Participant'];

    return (
        <div className="vh-100 fluid loginBg" style={{ backgroundImage: `url(${pncbg})`, backgroundSize: 'cover' }}>
            <Container className="d-flex flex-column justify-content-center align-items-center evalSel">
                <h2 className="mt-4 mb-4" style={{ textAlign: 'center' }} id='propHeader1'>
                    Account Registration
                </h2>
                {roles.map((roleItem, index) => (
                    <Button key={index} variant="outline-success"
                        className="d-flex align-items-center mb-3 px-4"
                        style={{ borderRadius: "10px", fontSize: "50px", width: "500px" }}
                        onClick={() => handleSetRole(roleItem)}>
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        {roleItem}
                    </Button>
                ))}
            </Container>

            <Modal size="lg" centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <h2 className="h2">{role}</h2>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <InputField label="Full Name" type="text" name="name" placeholder="eg. Dela Cruz, Juan B." required onChange={handleInputChange} />
                        <InputField label="Email" type="email" name="email" placeholder="eg. account@gmail.com" required onChange={handleInputChange} /> {/* Changed to general email field */}
                        {role === 'Student' && (
                            <InputField label="Student ID" type="text" name="studentId" placeholder="Enter Student ID" required onChange={handleInputChange} />
                        )}
                        <InputField label="Contact Number" type="text" name="contactNumber" placeholder="eg. 09123456789" required onChange={handleInputChange} />

                        {(role === 'Student' || role === 'Alumni' || role === 'Faculty') && (
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Department:</Form.Label>
                                <Col>
                                    <Form.Select name="department" onChange={handleDepartmentChange} required>
                                        <option value="">Select Department</option>
                                        {departments.map(dept => (
                                            <option key={dept.dept_id} value={dept.dept_id}>
                                                {dept.dept_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        )}

                        {(role === 'Student' || role === 'Alumni' || role === 'Faculty') && (
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Course:</Form.Label>
                                <Col>
                                    <Form.Select name="course" onChange={handleInputChange} required>
                                        <option value="">Select Course</option>
                                        {filteredCourses.map(course => (
                                            <option key={course.course_id} value={course.course_id}>
                                                {course.course_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        )}

                        {(role === 'Non-Teaching' || role === 'Faculty') && ( // Changed Teaching to Faculty
                            <InputField label="Position" type="text" name="position" placeholder="Enter Position" required onChange={handleInputChange} />
                        )}

                        {role === 'Participant' && (
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Barangay:</Form.Label>
                                <Col>
                                    <Form.Select name="barangay" onChange={handleInputChange} required>
                                        <option value="">Select Barangay</option>
                                        {barangays.map(barangay => (
                                            <option key={barangay.id} value={barangay.id}>
                                                {barangay.brgy_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        )}

                        <InputField label="Username" type="text" name="username" placeholder="Enter username" required onChange={handleInputChange} />
                        <InputField label="Password" type="password" name="password" placeholder="Enter password" required onChange={handleInputChange} />
                        <Button type="submit" variant='success' size='lg'>Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

const InputField = ({ label, type, name, placeholder, required, onChange }) => (
    <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>{label}:</Form.Label>
        <Col>
            <Form.Control
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
            />
        </Col>
    </Form.Group>
);

export default EvalSelect;
