import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { API_ENDPOINTS } from "../../../config";

const BtnAddCourse = ({ onCourseAdded }) => {  
    const [showModal, setShowModal] = useState(false);
    const [CourseName, setCourseName] = useState("");  // State for Course name
    const [departments, setDepartments] = useState([]);  // Store departments
    const [selectedDepartment, setSelectedDepartment] = useState("");  // Store selected department ID
    const [errors, setErrors] = useState({});


    // **Open the modal**
    const handleShowModal = () => setShowModal(true);

    // **Close the modal and reset form fields**
    const handleCloseModal = () => {
        setShowModal(false);
        setCourseName("");  
        setSelectedDepartment("");  
    };

    const validateForm = () => {
        const newErrors = {};

        if(!selectedDepartment) newErrors.departmentName = 'Please Select a Department first';
        if(!CourseName) newErrors.courseName = 'Please enter a Course Name';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }



    // **Function to handle form submission and backend integration**
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validateForm()) return;

        const formData = {  
            course_name: CourseName,
            dept: selectedDepartment  // Send selected department ID
        };
        
        try {
            const response = await fetch(API_ENDPOINTS.COURSE_CREATE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)  // Convert form data to JSON
            });

            if (response.ok) {  
                alert("Course added successfully!");
                handleCloseModal();  
                onCourseAdded();  // Notify parent to refresh the table
            } else {
                // const errorData = await response.json();
                alert(`Failed to add Course: ${errors}`);
            }
        } catch (error) {
            console.error("Error adding Course:", errors);
        }
    };

    // **Fetch Departments on component mount using fetch API**
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.DEPARTMENT_LIST);
                if (response.ok) {
                    const data = await response.json();
                    setDepartments(data);  // Store department data in state
                } else {
                    console.error("Failed to fetch departments");
                }
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);  // Store selected department ID
    };

    return (
        <div className="d-flex justify-content-end m-3">
            <Button 
                className="shadow" 
                style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} 
                onClick={handleShowModal}>
                Add Course
            </Button>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Course </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Combo box for department */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Department:</Form.Label>
                            <Col>
                                <Form.Select
                                 name="selectedDepartment"
                                 value={selectedDepartment} 
                                 isInvalid={!!errors.departmentName}
                                 onChange={handleDepartmentChange}>
                                    <option value="">Select Department</option>  
                                    {departments.map(department => (
                                        <option key={department.dept_id} value={department.dept_id}>
                                            {department.dept_name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.departmentName}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Course Name:</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="text"
                                    name="courseName"
                                    placeholder="Enter Course Name"
                                    value={CourseName}  
                                    onChange={(e) => setCourseName(e.target.value)}
                                    isInvalid={!!errors.courseName}

                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.courseName}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button onClick={handleSubmit} variant='success'>  
                        Save Changes
                    </Button>
                    <Button onClick={handleCloseModal} variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddCourse;
