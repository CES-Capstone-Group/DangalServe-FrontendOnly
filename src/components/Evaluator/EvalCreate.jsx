import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../table.css";
import BtnAddQuestion from "../Buttons/Manage/BtnAddQuestion";
import BtnEditDeleteQuestions from "../Buttons/Manage/BtnEditDeleteQuestions";
import BtnEvalEdit from "../Buttons/Manage/BtnEvalEdit";

const EvalCreate = () => {
    const navigate = useNavigate();

    // **Handle Back Navigation**
    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    // Sample data structure for sections and questions
    const sections = [
        {
            section: "A: Objectives",
            questions: [
                { question_id: 1, question: "Clarity of objectives" },
                { question_id: 2, question: "Relevance of objectives" },
                { question_id: 3, question: "Attainment of objectives" },
            ],
        },
        {
            section: "B: Activities",
            questions: [
                { question_id: 1, question: "Alignment with the objectives" },
                { question_id: 2, question: "Extent to which they enrich participants" },
            ],
        },
        {
            section: "C: Conduct of Activities",
            questions: [{ question_id: 1, question: "Conduct of activities" }],
        },
    ];

    // **NewTable Component to Display All Questions with Radio Buttons**
    const NewTable = ({ questions, sectionName }) => {
        return (
            <div className="mb-5">
                <h3>{sectionName}</h3>
                <Table responsive striped bordered hover className="tableStyle">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question) => (
                            <tr key={question.question_id}>
                                <td>{question.question}</td>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <td key={value}>
                                        <input
                                            type="radio"
                                            name={`question-${question.question_id}`}
                                            value={value}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    };

    return (
        <Container fluid className="py-4 mt-5 d-flex flex-column justify-content-center m-5">
            <Row>
                <Button
                    variant="link"
                    onClick={handleBack}
                    className="backBtn d-flex align-items-center text-success me-3"
                >
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>
            </Row>
            <Row>
                <Col>
                    <h1>Evaluation Form Creation</h1>
                </Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Search"
                        style={{ width: "300px" }}
                    />
                </Col>
            </Row>

            {sections.map((section, index) => (
                <React.Fragment key={index}>
                    <NewTable
                        questions={section.questions}
                        sectionName={section.section}
                    />
                    <Row>
                        <Col className="mb-3 d-flex justify-content-end">
                            <BtnEvalEdit />
                        </Col>
                    </Row>
                </React.Fragment>
            ))}
        </Container>
    );
};

export default EvalCreate;
