import { faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { API_ENDPOINTS } from "../../../config";

const BtnEditDeleteCourse = ({ courseId, courseName: initialCourseName, deptName, deptId, onCourseUpdated }) => {
    const [showEdit, setShowEdit] = useState(false);  // Controls edit modal visibility
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);  // Controls delete confirmation modal
    const [courseName, setCourseName] = useState(initialCourseName);  // Store course name
    const [departments, setDepartments] = useState([]);  // Store available departments
    const [selectedDept, setSelectedDept] = useState(deptId);  // Store selected department

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if(!selectedDept) newErrors.departmentName = 'Please Select a Department first';
        if(!courseName) newErrors.courseName = 'Please enter a Course Name';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // **Fetch Departments from Backend**
    const fetchDepartments = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.DEPARTMENT_LIST);
            if (!response.ok) throw new Error("Failed to fetch departments.");
            const data = await response.json();
            setDepartments(data);  // Store departments in state
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    // Fetch departments when the component mounts
    useEffect(() => {
        fetchDepartments();
    }, []);

    // Open/Close Edit Modal
    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    // Open/Close Delete Confirmation Modal
    const handleShowDeleteConfirm = () => setShowDeleteConfirm(true);
    const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

    // Handle Edit Submission
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if(!validateForm()) return;
        
        const formData = {
            course_name: courseName,
            dept: selectedDept  // Include selected department ID
        };

        try {
            const response = await fetch(API_ENDPOINTS.COURSE_DETAIL(courseId), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Course updated successfully!");
                handleCloseEdit();  // Close modal on success
                onCourseUpdated();  // Refresh course list
            } else {
                const data = await response.json();
                alert(`Failed to update course: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    // Handle Delete Functionality
    const handleDelete = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.COURSE_DETAIL(courseId), {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                alert("Course deleted successfully!");
                handleCloseDeleteConfirm();  // Close confirmation modal
                onCourseUpdated();  // Refresh course list
            } else {
                const data = await response.json();
                alert(`Failed to delete course: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    return (
        <>
            {/* Edit and Delete Buttons */}
            <Button 
                className="shadow" 
                onClick={handleShowEdit} 
                style={{ backgroundColor: "#71a872", border: '0px', color: 'white', marginRight: '10px', fontSize: '12px' }}
            >
                <FontAwesomeIcon icon={faPenToSquare}/>
            </Button>
            <Button 
                className="shadow" 
                onClick={handleShowDeleteConfirm} 
                style={{ backgroundColor: "#ff3232", border: '0px', color: 'white', fontSize: '12px' }}
            >
                <FontAwesomeIcon icon={faTrashAlt}/>
            </Button>

            {/* Edit Course Modal */}
            <Modal size="lg" centered show={showEdit} onHide={handleCloseEdit} backdrop="static">
                <Modal.Header closeButton>
                    <h1>Edit Course</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Course ID:
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="text" 
                                    value={courseId} 
                                    disabled 
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Department:
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Select
                                    name="selectedDepartment"
                                    value={selectedDept}
                                    isInvalid={!!errors.departmentName}
                                    onChange={(e) => setSelectedDept(e.target.value)}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((dept) => (
                                        <option key={dept.dept_id} value={dept.dept_id}>
                                            {dept.dept_name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.departmentName}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Course Name:
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="courseName"
                                    value={courseName}
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
                <Modal.Footer>
                    <Button onClick={handleEditSubmit} variant="success">
                        Save Changes
                    </Button>
                    <Button onClick={handleCloseEdit} variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal size="m" centered show={showDeleteConfirm} onHide={handleCloseDeleteConfirm} backdrop="static">
                <Modal.Header closeButton>
                    <h4>Confirm Deletion</h4>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this course?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDelete} variant="danger">
                        Yes, Delete
                    </Button>
                    <Button onClick={handleCloseDeleteConfirm} variant="secondary">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BtnEditDeleteCourse;
