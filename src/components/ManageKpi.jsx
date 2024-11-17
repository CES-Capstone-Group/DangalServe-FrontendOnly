import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Col,
    Container,
    Row,
    Table,
    Form,
    Alert,
    Modal,
    Button,
    InputGroup
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./table.css";

const ManageKpi = () => {
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [showAddKpiModal, setShowAddKpiModal] = useState(null); // Changed to null initially
    const [newKpi, setNewKpi] = useState({ kpi: "", target: "" });
    const [showAddProposalModal, setShowAddProposalModal] = useState(null); // Changed to null initially
    const [newProposalTitle, setNewProposalTitle] = useState("");
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([
        {
            name: "College of Computing Studies",
            tables: [
                {
                    title: "Cabuyeño’s Computer Literacy Program (CCLIP)",
                    kpis: [
                        {
                            kpi: "Average score of individuals' knowledge assessment",
                            target: "Achieve an average score of 80% or higher in the knowledge assessment by the end of 2025",
                            quarterlyData: {
                                "2023": [1, 0, 0, 84],
                                "2024": [0, 0, 0, 85],
                                "2025": [0, 0, 0, 86]
                            }
                        },
                        {
                            kpi: "Number of computer seminars and trainings conducted",
                            target: "Conduct at least 20 computer seminars and trainings by the end of 2025",
                            quarterlyData: {
                                "2023": [0, 1, 2, 4],
                                "2024": [2, 3, 5, 7],
                                "2025": [4, 6, 9, 12]
                            }
                        },
                        {
                            kpi: "Number of beneficiaries trained on software applications",
                            target: "Train at least 500 beneficiaries on the use of software applications by the end of 2025",
                            quarterlyData: {
                                "2023": [0, 0, 23, 44],
                                "2024": [25, 30, 40, 50],
                                "2025": [60, 70, 80, 94]
                            }
                        }
                    ]
                }
            ]
        },
        {
            name: "College of Engineering",
            tables: [
                {
                    title: "Green Community Initiative: Empowering Sustainable Living through Energy and Waste Management",
                    kpis: [
                        {
                            kpi: "Completion rate of engineering projects",
                            target: "Achieve a 90% completion rate for all engineering projects by the end of 2025",
                            quarterlyData: {
                                "2023": [70, 75, 80, 85],
                                "2024": [80, 85, 88, 90],
                                "2025": [85, 88, 90, 90]
                            }
                        },
                        {
                            kpi: "Number of safety trainings conducted",
                            target: "Conduct at least 15 safety trainings for engineering students and staff by the end of 2025",
                            quarterlyData: {
                                "2023": [3, 4, 5, 6],
                                "2024": [6, 7, 8, 10],
                                "2025": [10, 12, 14, 15]
                            }
                        },
                        {
                            kpi: "Energy efficiency improvements in engineering labs",
                            target: "Improve energy efficiency in engineering labs by 20% by the end of 2025",
                            quarterlyData: {
                                "2023": [5, 7, 10, 12],
                                "2024": [12, 15, 18, 20],
                                "2025": [15, 18, 19, 20]
                            }
                        }
                    ]
                }
            ]
        }
    ]);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setShowPasswordModal(true);
    };

    const handlePasswordConfirm = () => {
        const correctPassword = "yourPassword"; // Replace with your actual password for confirmation

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

    const addKpi = (deptIndex, tableIndex) => {
        const updatedDepartments = [...departments];
        updatedDepartments[deptIndex].tables[tableIndex].kpis.push({
            kpi: newKpi.kpi,
            target: newKpi.target,
            quarterlyData: { "2023": [0, 0, 0, 0], "2024": [0, 0, 0, 0], "2025": [0, 0, 0, 0] }
        });
        setDepartments(updatedDepartments);
        setNewKpi({ kpi: "", target: "" });
        setShowAddKpiModal(null);
    };

    const addProposal = (deptIndex) => {
        const updatedDepartments = [...departments];
        updatedDepartments[deptIndex].tables.push({
            title: newProposalTitle,
            kpis: []
        });
        setDepartments(updatedDepartments);
        setNewProposalTitle("");
        setShowAddProposalModal(null);
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
                        {departments.map((dept, index) => (
                            <option key={index} value={dept.name}>
                                {dept.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <div className="mt-4 d-flex justify-content-end align-items-center">
                    <Button
                        onClick={toggleEdit}
                        className={`btn ${isEditing ? "btn-success" : "btn-warning"}`}
                    >
                        {isEditing ? "Save" : "Edit"}
                    </Button>
                </div>

                {departments.map((dept, deptIndex) => (
                    (!selectedDepartment || selectedDepartment === dept.name) && (
                        <div key={deptIndex} className="mt-5">
                            <h5>{dept.name}</h5>
                            {dept.tables.map((table, tableIndex) => (
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
                                                                            const updatedDepartments = [...departments];
                                                                            updatedDepartments[deptIndex].tables[tableIndex].kpis[kpiIndex].quarterlyData[year][quarterIndex] = e.target.value;
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
                                        <Button
                                            variant="success"
                                            className="mt-2"
                                            onClick={() => setShowAddKpiModal({ deptIndex, tableIndex })}
                                        >
                                            + Add KPI
                                        </Button>
                                    </div>

                                </div>
                            ))}
                            <div className="d-flex justify-content-end">
                                <Button
                                    variant="success"
                                    className="mt-3"
                                    onClick={() => setShowAddProposalModal(deptIndex)}
                                >
                                    + Add Proposal / Activity KPI
                                </Button>
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

            {/* Add KPI Modal */}
            <Modal show={!!showAddKpiModal} onHide={() => setShowAddKpiModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add KPI</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="kpiInput">
                        <Form.Label>KPI</Form.Label>
                        <Form.Control
                            type="text"
                            value={newKpi.kpi}
                            onChange={(e) => setNewKpi({ ...newKpi, kpi: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="targetInput" className="mt-3">
                        <Form.Label>Target</Form.Label>
                        <Form.Control
                            type="text"
                            value={newKpi.target}
                            onChange={(e) => setNewKpi({ ...newKpi, target: e.target.value })}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddKpiModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => addKpi(showAddKpiModal.deptIndex, showAddKpiModal.tableIndex)}
                    >
                        Add KPI
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Proposal/Activity KPI Modal */}
            <Modal show={!!showAddProposalModal} onHide={() => setShowAddProposalModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Proposal / Activity KPI</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="proposalTitleInput">
                        <Form.Label>Proposal Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={newProposalTitle}
                            onChange={(e) => setNewProposalTitle(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddProposalModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={() => addProposal(showAddProposalModal)}>
                        Add Proposal
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ManageKpi;