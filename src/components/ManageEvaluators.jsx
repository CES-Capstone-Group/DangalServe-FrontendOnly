import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import { CSSTransition } from "react-transition-group";

const ManageEvaluators = () => {
    const navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false);
    const [visible, setVisible] = useState('student');

    const handleVisibility = (type) => {
        setVisible(type)
    };

    // Handle back navigation
    const handleBack = () => {
        navigate(-1);  // Navigate to the previous page
    };
    
    const studentData = [{id:1, stud_name:'Student Full Name', stud_email:'student@email.com', stud_num:'09986854452', stud_id:'19087657', course:'Bachelor of Science in Information Technology', stud_section:'4IT-A', stud_dept:'CCS'}];
    const nonteachingData = [{id:1, nt_name:'NonTeaching Full Name', nt_email:'nonteaching@email.com', nt_num:'09986854452', nt_dept:'Government', nt_brgy:'Bigaa'}];
    const teachingData = [{id:1, t_name:'Teaching Full Name', t_email:'teaching@email.com', t_num:'09986854452', t_school:'University of Cabuyao', t_dept:'CCS'}];
    const alumniData = [{id:1, alumni_name:'Alumni Full Name', alumni_email:'alumni@email.com', alumni_num:'09986854452', alumni_school:'University of Cabuyao', alumni_course:'Bachelor of Science in Information Technology', alumni_dept:'CCS'}];
    const participantData = [{id:1, p_name:'Participant Full Name', p_email:'participantg@email.com', p_num:'09986854452', p_brgy:'Bigaa'}];


    // Table student row 
    const StudentRows = (props) => {
        const { id, stud_name, stud_email, stud_num, stud_id, course, stud_section, stud_dept} = props;
        return (
            <tr>
                <td>{id}</td>
                <td>{stud_name}</td>
                <td>{stud_email}</td>
                <td>{stud_num}</td>
                <td>{stud_id}</td>
                <td>{course}</td>
                <td>{stud_section}</td>
                <td>{stud_dept}</td>

            </tr>
        );
    };

    // Table Student
    const StudentTable = ({ data }) => {
        return (
            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student Full Name</th>
                        <th>Student Email</th>
                        <th>Contact Number</th>
                        <th>Student ID</th>
                        <th>Course</th>
                        <th>Section</th>
                        <th>Department</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {studentData.map((student, index) => (
                        <StudentRows key={index}
                        id={student.id}
                        stud_name={student.stud_name}
                        stud_email={student.stud_email}  
                        stud_num={student.stud_num}
                        stud_id={student.stud_id} 
                        course={student.course}  
                        stud_section={student.stud_section}
                        stud_dept={student.stud_dept}
                        /> 
                    ))}
                </tbody>
            </Table>
        );
    };

    // Table Non Teaching row 
    const NonTeachingRows = (props) => {
        const { id, nt_name, nt_email, nt_num, nt_dept, nt_brgy} = props;
        return (
            <tr>
                <td>{id}</td>
                <td>{nt_name}</td>
                <td>{nt_email}</td>
                <td>{nt_num}</td>
                <td>{nt_dept}</td>
                <td>{nt_brgy}</td>

            </tr>
        );
    };
    // Table Non Teaching
    const NonTeachingTable = ({ data }) => {
        return (
            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Department</th>
                        <th>Barangay</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {nonteachingData.map((nt, index) => (
                        <NonTeachingRows key={index}
                        id={nt.id}
                        nt_name={nt.nt_name}
                        nt_email={nt.nt_email}  
                        nt_num={nt.nt_num}
                        nt_dept={nt.nt_dept} 
                        nt_brgy={nt.nt_brgy}  
                        /> 
                    ))}
                </tbody>
            </Table>
        );
    };

    // Table Non Teaching row 
    const TeachingRows = (props) => {
            const { id, t_name, t_email, t_num, t_school, t_dept} = props;
            return (
                <tr>
                    <td>{id}</td>
                    <td>{t_name}</td>
                    <td>{t_email}</td>
                    <td>{t_num}</td>
                    <td>{t_school}</td>
                    <td>{t_dept}</td>
                </tr>
            );
    };
    // Table Non Teaching
    const TeachingTable = ({ data }) => {
            return (
                <Table responsive bordered striped hover className="tableStyle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Department</th>
                            <th>Barangay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachingData.map((t, index) => (
                            <TeachingRows key={index}
                            id={t.id}
                            t_name={t.t_name}
                            t_email={t.t_email}  
                            t_num={t.t_num}
                            t_school={t.t_school} 
                            t_dept={t.t_dept}  
                            /> 
                        ))}
                    </tbody>
                </Table>
            );
    };

    // Table Alumni
    const AlumniRows = (props) => {
        const { id, alumni_name, alumni_email, alumni_num, alumni_school, alumni_course, alumni_dept} = props;
        return (
            <tr>
                <td>{id}</td>
                <td>{alumni_name}</td>
                <td>{alumni_email}</td>
                <td>{alumni_num}</td>
                <td>{alumni_school}</td>
                <td>{alumni_course}</td>
                <td>{alumni_dept}</td>

            </tr>
        );
    };
    // Table Alumni
    const AlumniTable = ({ data }) => {
            return (
                <Table responsive bordered striped hover className="tableStyle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>School</th>
                            <th>Course</th>
                            <th>Department</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {alumniData.map((alumni, index) => (
                            <AlumniRows key={index}
                            id={alumni.id}
                            alumni_name={alumni.alumni_name}
                            alumni_email={alumni.alumni_email}  
                            alumni_num={alumni.alumni_num}
                            alumni_school={alumni.alumni_school} 
                            alumni_course={alumni.alumni_course} 
                            alumni_dept={alumni.alumni_dept}  
                            /> 
                        ))}
                    </tbody>
                </Table>
            );
    };

    // Table Non Teaching row 
    const ParticipantRows = (props) => {
        const { id, p_name, p_email, p_num, p_brgy} = props;
            return (
                <tr>
                    <td>{id}</td>
                    <td>{p_name}</td>
                    <td>{p_email}</td>
                    <td>{p_num}</td>
                    <td>{p_brgy}</td>
                </tr>
            );
        };
    // Table Non Teaching
    const ParticipantTable = ({ data }) => {
        return (
            <Table style={{display: visible}} responsive bordered striped hover className="tableStyle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Barangay</th>
                    </tr>
                </thead>
                <tbody>
                    {participantData.map((p, index) => (
                        <ParticipantRows key={index}
                            id={p.id}
                            p_name={p.p_name}
                            p_email={p.p_email}  
                            p_num={p.p_num}
                            p_brgy={p.p_brgy} 
                            /> 
                        ))}
                </tbody>
            </Table>
        );
    };

    return (
        <Container fluid
        className="py-4 mt-5 d-flex flex-column justify-content-center me-0 ms-0" >
            <Row>
                <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>

                <Col className="d-flex justify-content-end">
                    <Dropdown align='end' onToggle={() => setShowFilter(!showFilter)} show={showFilter}>
                        <Dropdown.Toggle style={{ borderWidth: '0px', backgroundColor: '#71A872' }}>
                            <FontAwesomeIcon className='me-2' icon={faFilter} /> Filter
                        </Dropdown.Toggle>
                        <CSSTransition in={showFilter} timeout={300} classNames="dropdown" unmountOnExit>
                        <Dropdown.Menu className='dropDown'>
                            <Dropdown.Item onClick={() => handleVisibility('student')}>Student</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleVisibility('nonTeaching')}>Non-Teaching</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleVisibility('teaching')}>Teaching</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleVisibility('alumni')}>Alumni</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleVisibility('participant')}>Participant</Dropdown.Item>
                        </Dropdown.Menu>
                        </CSSTransition>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <Col><h1>Evaluation Response Management</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{ width: '300px' }} />
                </Col>
            </Row>

            {/* Render the achievements table */}
            {visible === 'student' && <StudentTable data={studentData} />}
            {visible === 'nonTeaching' && <NonTeachingTable data={nonteachingData} />}
            {visible === 'teaching' && <TeachingTable data={teachingData} />}
            {visible === 'alumni' && <AlumniTable data={alumniData} />}
            {visible === 'participant' && <ParticipantTable data={participantData} />}

        </Container>
    );
};

export default ManageEvaluators;
