import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../../../config";
const BtnEditDeac = ({ account, onDeactivate, onSave }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState(account); // Initialize formData with account details
    // console.log("account is", account);
    const handleShow = () => {
        setShow(true);

        const user = getCurrentUserFromToken(); // Get the current user when "Edit" is clicked
        if (user) {
            setCurrentUser(user); // Set the current user info
        }

        // Check if the current user is trying to edit their own account
        if (user && user.user_id === account.user_id) {
            // console.log("User is editing their own account.");
            // Redirect to profile page
            navigate("/admin/profile");
        }
    };
    const handleClose = () => setShow(false);

    const [currentUser, setCurrentUser] = useState(null);

    const [userChangedDepartment, setUserChangedDepartment] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [barangays, setBarangays] = useState([]);

    const navigate = useNavigate();

    const getCurrentUserFromToken = () => {
        const token = localStorage.getItem("access_token"); // Assuming token is stored in localStorage
        if (token) {
            const decoded = jwtDecode(token); // Decode the token to get user info
            return decoded;
        }
        return null;
    };

    // Fetch departments
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.DEPARTMENT_LIST);
                if (response.ok) {
                    const data = await response.json();
                    setDepartments(data);
                } else {
                    console.error("Failed to fetch departments");
                }
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };
        fetchDepartments();
    }, []);

    // Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.COURSE_LIST);
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data);
                } else {
                    console.error("Failed to fetch courses");
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    // Fetch barangays
    useEffect(() => {
        const fetchBarangays = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.BARANGAY_LIST);
                if (response.ok) {
                    const data = await response.json();
                    setBarangays(data);
                } else {
                    console.error("Failed to fetch barangays");
                }
            } catch (error) {
                console.error("Error fetching barangays:", error);
            }
        };
        fetchBarangays();
    }, []);

    // Populate formData on modal open
    useEffect(() => {
        // console.log(account)
        if (account) {
            if (account.accountType === "Proponent") {
                const matchedDepartment = departments.find(dept => dept.dept_name === account.department);
                const matchedCourse = courses.find(course => course.course_name === account.course);
                // console.log("matched course: ", matchedCourse)
                setFormData({
                    ...account,
                    department: matchedDepartment ? matchedDepartment.dept_id : "",  // Set dept_id if found
                    course: matchedCourse ? matchedCourse.course_id : ""  // Set course_id if found
                });
            }
            else if (account.accountType === "Brgy. Official") {
                const matchedBarangay = barangays.find(b => b.brgy_name === account.barangay);
                setFormData({
                    ...account,
                    barangay: matchedBarangay ? matchedBarangay.id : "" // Assuming `barangay
                });
                // console.log("matched:", matchedBarangay)
                // console.log("brgy :", formData.barangay)
            }
        }
    }, [account, departments, courses]);

    // Pre-fill department and courses based on the account data when modal is shown
    useEffect(() => {
        if (formData.department) {
            const filtered = courses.filter(course => course.dept === formData.department);
            setFilteredCourses(filtered);
        }
    }, [formData.department, courses]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Filter courses when department changes
        if (name === "department") {
            setUserChangedDepartment(true);
            const filtered = courses.filter(course => course.department_id === value); // Ensure filtering is based on department_id
            setFilteredCourses(filtered);
            setFormData((prevState) => ({
                ...prevState,
                course: "" // Reset course when department changes
            }));
            if (value) {
                fetch(API_ENDPOINTS.COURSES_BY_DEPARTMENT(value))
                    .then((response) => response.json())
                    .then((data) => {
                        setFilteredCourses(data);  // Update the filtered courses state
                    })
                    .catch((error) => {
                        console.error("Error fetching courses:", error);
                    });
            } else {
                setFilteredCourses([]);  // Clear courses if no department selected
            }
        }

    };

    const handleSave = async (e) => {
        e.preventDefault();
        // console.log("form data",  JSON.stringify(formData))
        try {
            const response = await fetch(API_ENDPOINTS.USER_INFO_ACTION(account.user_id), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Send the updated form data
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            onSave();  // Notify the parent to refresh data
            handleClose();
        } catch (error) {
            console.error("Failed to update account:", error);
        }
    };


    const handleDeactivate = async () => {
        const newStatus = formData.status === "Active" ? "Inactive" : "Active";

        // Send only the status in the request
        const updatedData = {
            status: newStatus,
        };
        // console.log(JSON.stringify(updatedData))
        try {
            const response = await fetch(API_ENDPOINTS.USER_INFO_ACTION(account.user_id), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData), // Only send status change
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            onSave();  // Notify the parent to refresh data
            setFormData((prev) => ({ ...prev, status: newStatus })); // Update status locally
            handleClose();
        } catch (error) {
            console.error("Failed to deactivate account:", error);
        }
    };

    return (
        <>
            <Button style={{ backgroundColor: "#71A872", border: '0px', color: 'white', marginRight: '10px', fontSize: '12px' }} onClick={handleShow}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </Button>

            {currentUser?.user_id !== account.user_id && (
                <Button
                    style={{
                        backgroundColor: formData.status === "Active" ? "#ff2322" : "#71A872",
                        color: "white",
                        border: "0px",
                        fontSize: '12px'
                    }}
                    onClick={handleDeactivate}
                >
                    {/* Include FontAwesomeIcon inside the button */}
                    <FontAwesomeIcon
                        icon={formData.status === "Active" ? faTimes : faCheck}
                       
                    />
                </Button>
            )}


            <Modal show={show} onHide={handleClose} backdrop="static" centered size="lg">
                <Modal.Header closeButton>
                    <Button onClick={handleClose} className="me-5 mb-5 p-0 ps-2 pe-2" variant="danger">
                        Back
                    </Button>
                    <Modal.Title> Edit Account </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        {/* Account ID */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Account ID:</Form.Label>
                            <Col sm={8}>
                                <Form.Control value={formData.user_id} disabled />
                            </Col>
                        </Form.Group>

                        {/* Username */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>User Name</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    disabled
                                />
                            </Col>
                        </Form.Group>

                        {/* Name */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Name</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name} // Bind formData.name to input field
                                    onChange={handleChange} // Update formData when name is changed
                                />
                            </Col>
                        </Form.Group>

                        {/* Account Type */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Type of Account</Form.Label>
                            <Col sm={8}>
                                <Form.Select name="accountType" value={formData.accountType} onChange={handleChange}>
                                    <option value="Admin">Admin</option>
                                    <option value="Proponent">Proponent</option>
                                    <option value="Brgy. Official">Brgy. Official</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        {/* Proponent Account Type */}
                        {formData.accountType === "Proponent" && (
                            <>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={4}>Department</Form.Label>
                                    <Col sm={8}>
                                        <Form.Select
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map(dept => (
                                                <option key={dept.dept_id} value={dept.dept_id}>
                                                    {dept.dept_name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>

                                {formData.department && (
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={4}>Course</Form.Label>
                                        <Col sm={8}>
                                            <Form.Select
                                                name="course"
                                                value={formData.course}
                                                onChange={handleChange}
                                            >
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
                            </>
                        )}

                        {/* Barangay Official Account Type */}
                        {formData.accountType === "Brgy. Official" && (
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={4}>Barangay</Form.Label>
                                <Col sm={8}>
                                    <Form.Select
                                        name="barangay"
                                        value={formData.barangay}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Barangay</option>
                                        {barangays.map(b => (
                                            <option key={b.id} value={b.id}>
                                                {b.brgy_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        )}

                        {/* Position */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Position</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    placeholder="Enter Position"
                                />
                            </Col>
                        </Form.Group>

                        {/* Deactivation Date */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Deactivation Date</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="date"
                                    name="deactivationDate"
                                    value={formData.deactivationDate || ""}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button type="submit" onClick={handleSave} style={{ backgroundColor: "#71A872", color: "white" }}>
                        Save Changes
                    </Button>
                    <Button onClick={handleClose} variant="danger" style={{ backgroundColor: "red", color: "white" }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BtnEditDeac;
