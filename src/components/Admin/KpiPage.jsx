import React, { useState } from "react";
import { Col, Container, Row, Table, Form, Alert, Modal, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "../table.css";

const KpiPage = () => {
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    // Sample data
    const [kpis, setKpis] = useState([
        {
            act_name: 'Cabuyeño’s Computer Literacy Program (CCLIP)',
            department: "College of Computing Studies",
            kpi: "Average score of individuals' knowledge assessment",
            target: "Achieve an average score of 80% or higher in the knowledge assessment by the end of 2025",
            quarterlyData: {
                "2023": [1, 0, 0, 84],
                "2024": [0, 0, 0, 85],
                "2025": [0, 0, 0, 86]
            }
        },
        {
            act_name: 'Cabuyeño’s Computer Literacy Program (CCLIP)',
            department: "College of Computing Studies",
            kpi: "Number of computer seminars and trainings conducted",
            target: "Conduct at least 20 computer seminars and trainings by the end of 2025",
            quarterlyData: {
                "2023": [0, 1, 2, 4],
                "2024": [2, 3, 5, 7],
                "2025": [4, 6, 9, 12]
            }
        },
        {
            act_name: 'Cabuyeño’s Computer Literacy Program (CCLIP)',
            department: "College of Computing Studies",
            kpi: "Number of beneficiaries trained on software applications",
            target: "Train at least 500 beneficiaries on the use of software applications by the end of 2025",
            quarterlyData: {
                "2023": [0, 0, 23, 44],
                "2024": [25, 30, 40, 50],
                "2025": [60, 70, 80, 94]
            }
        },
        {
            act_name: "Green Community Initiative: Empowering Sustainable Living through Energy and Waste Management",
            department: "College of Engineering",
            kpi: "Completion rate of engineering projects",
            target: "Achieve a 90% completion rate for all engineering projects by the end of 2025",
            quarterlyData: {
                "2023": [70, 75, 80, 85],
                "2024": [80, 85, 88, 90],
                "2025": [85, 88, 90, 90]
            }
        },
        {
            act_name: "Green Community Initiative: Empowering Sustainable Living through Energy and Waste Management",
            department: "College of Engineering",
            kpi: "Number of safety trainings conducted",
            target: "Conduct at least 15 safety trainings for engineering students and staff by the end of 2025",
            quarterlyData: {
                "2023": [3, 4, 5, 6],
                "2024": [6, 7, 8, 10],
                "2025": [10, 12, 14, 15]
            }
        },
        {
            act_name: "Green Community Initiative: Empowering Sustainable Living through Energy and Waste Management",
            department: "College of Engineering",
            kpi: "Energy efficiency improvements in engineering labs",
            target: "Improve energy efficiency in engineering labs by 20% by the end of 2025",
            quarterlyData: {
                "2023": [5, 7, 10, 12],
                "2024": [12, 15, 18, 20],
                "2025": [15, 18, 19, 20]
            }
        }
    ]);

    const filteredKpis = selectedDepartment
        ? kpis.filter((kpi) => kpi.department === selectedDepartment)
        : kpis;

    const handleSave = () => {
        setShowPasswordModal(true);
    };

    const handlePasswordConfirm = () => {
        const correctPassword = "yourPassword"; // Replace with your actual password for confirmation

        if (password === correctPassword) {
            setIsEditing(false);
            setShowSaveMessage(true);
            setShowPasswordModal(false);

            // Hide the message after 3 seconds
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

    return (
        <Container>
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
                <h3 style={{ paddingBottom: "1em" }}>KEY PERFORMANCE INDICATOR</h3>

                <Form.Group controlId="departmentSelect">
                    <Form.Label>College Department:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        <option value="">Select Department</option>
                        {["College of Computing Studies", "College of Engineering"].map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <div className="mt-4 d-flex justify-content-between align-items-center">
                    <h4>Community and Extension Service Project and Activity</h4>
                    <button
                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        className={`btn ${isEditing ? "btn-success" : "btn-warning"}`}
                    >
                        {isEditing ? "Save" : "Edit"}
                    </button>
                </div>

                {showSaveMessage && (
                    <Alert variant="success" className="mt-3">
                        Data saved successfully!
                    </Alert>
                )}

                {["College of Computing Studies", "College of Engineering"].map(department => (
                    (!selectedDepartment || selectedDepartment === department) && (
                        <div key={department} className="mt-5">
                            <h5>{department}</h5>
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
                                    {kpis
                                        .filter((kpi) => kpi.department === department)
                                        .map((kpi, kpiIndex) => (
                                            <tr key={kpiIndex}>
                                                <td>{kpi.kpi}</td>
                                                <td>{kpi.target}</td>
                                                {Object.keys(kpi.quarterlyData).map((year) =>
                                                    kpi.quarterlyData[year].map((value, quarterIndex) => (
                                                        <td key={`${year}-${quarterIndex}`}>
                                                            {isEditing ? (
                                                                <input
                                                                    type="text"
                                                                    value={value}
                                                                    onChange={(e) => {
                                                                        const newKpis = [...kpis];
                                                                        newKpis[kpiIndex].quarterlyData[year][quarterIndex] = e.target.value;
                                                                        setKpis(newKpis);
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

export default KpiPage;
