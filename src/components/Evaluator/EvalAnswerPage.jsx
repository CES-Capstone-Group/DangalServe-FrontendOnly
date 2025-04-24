import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Container, Row, Col, Card, Form, Button, Modal, Spinner, Table, Alert } from "react-bootstrap";
import { API_ENDPOINTS } from "../../config";
import "./EvalAnswerStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const EvalAnswerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formId } = location.state || {};

  const [formDetails, setFormDetails] = useState(null);
  const [sections, setSections] = useState([]);
  const [answers, setAnswers] = useState({});
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch user ID from token
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setUserId(decoded.user_id);
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }
  }, []);

  // Fetch form details and sections
  useEffect(() => {
    const fetchFormDetails = async () => {
      if (!formId) {
        setError("Form ID is missing.");
        return;
      }
      try {
        const response = await fetch(API_ENDPOINTS.EVALUATION_FORM_SPECIFIC(formId));
        if (!response.ok) {
          throw new Error("Failed to fetch evaluation form details.");
        }
        const data = await response.json();
        setFormDetails(data.evaluation_form);
        setSections(data.sections || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFormDetails();
  }, [formId]);

  // Handle input changes for all questions
  const handleInputChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!userId) {
      alert("User not logged in. Please log in to submit the form.");
      setIsSubmitting(false);
      return;
    }

    // Prepare response payload
    const responsePayload = {
      form: formId,
      user: userId,
    };

    try {
      // First, create the response and get the ResponseID
      const response = await fetch(API_ENDPOINTS.RESPONSE_CREATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responsePayload),
      });

      if (!response.ok) {
        throw new Error("Failed to create response.");
      }

      const responseData = await response.json();
      const responseId = responseData.response_id;

      // Submit all answers associated with the response
      const answerPromises = Object.entries(answers).map(([questionId, selectedOptionId]) => {
        const question = sections
          .flatMap((section) => section.questions)
          .find((q) => q.question_id.toString() === questionId);

        const answerPayload = {
          response: responseId,
          question: questionId,
          section_option: question?.question_type === "rating" ? selectedOptionId : null,
          question_option: question?.question_type === "multiple_choice" ? selectedOptionId : null,
          text_answer: question?.question_type === "open_ended" ? selectedOptionId : null,
        };
        return fetch(API_ENDPOINTS.ANSWER_CREATE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answerPayload),
        });
      });

      // Wait for all answers to be submitted
      await Promise.all(answerPromises);

      // Show success modal
      setSuccess(true);
      setShowModal(true);

      // Redirect after closing the modal
      setTimeout(() => {
        navigate("/eval/dashboard");
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!formDetails) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading form details...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1 id="propHeader" className="text-center mb-4">{formDetails.title}</h1>
          <p className="text-center">
            {formDetails.activity_objectives || "No objectives provided."}
          </p>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        {sections.map((section, index) => (
          <Card className="mb-4 shadow border" key={section.section_id}>
            <Card.Header style={{fontWeight: "bold", backgroundColor: "#669567", color: "white"  }}>
              <h5 className="mb-0">{` ${section.section_title}`}</h5>
            </Card.Header>
            <Card.Body>
              {/* Render Section Info if it's an informational section */}
              {section.section_type === "info" && (
                <div className="section-info">
                  <p>{section.section_content || "No content available"}</p>
                </div>
              )}

              {/* Display Rating Questions in a Table */}
              {section.questions.some((q) => q.question_type === "rating") && (
                <Table responsive bordered className="text-center align-middle tableStyle" id="evaltable">
                  <thead>
                    <tr>
                      <th style={{ width: "40%" }}>Question</th>
                      {section.questions[0]?.options.map((option, idx) => (
                        <th key={idx}>{option.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.questions
                      .filter((q) => q.question_type === "rating")
                      .map((question) => (
                        <tr key={question.question_id}>
                          <td className="text-start">{question.question_text}</td>
                          {question.options.map((option) => (
                            <td key={option.id}>
                              <Form.Check
                                type="radio"
                                name={`question-${question.question_id}`}
                                value={option.id}
                                checked={answers[question.question_id] === String(option.id)}
                                onChange={(e) =>
                                  handleInputChange(question.question_id, e.target.value)
                                }
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </Table>
              )}

              {/* Display Multiple-Choice Questions */}
              {section.questions
                .filter((q) => q.question_type === "multiple_choice")
                .map((question) => (
                  <div key={question.question_id} className="mb-4">
                    <p className="fw-bold">{question.question_text}</p>
                    {question.options.map((option) => (
                      <Form.Check
                        key={option.id}
                        type="radio"
                        label={option.label}
                        name={`question-${question.question_id}`}
                        value={option.id}
                        checked={answers[question.question_id] === String(option.id)}
                        onChange={(e) =>
                          handleInputChange(question.question_id, e.target.value)
                        }
                      />
                    ))}
                  </div>
                ))}

              {/* Display Open-Ended Questions */}
              {section.questions
                .filter((q) => q.question_type === "open_ended")
                .map((question) => (
                  <div key={question.question_id} className="mb-4">
                    <p className="fw-bold">{question.question_text}</p>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={answers[question.question_id] || ""}
                      onChange={(e) => handleInputChange(question.question_id, e.target.value)}
                    />
                  </div>
                ))}
            </Card.Body>
          </Card>
        ))}
        <Row className="mt-4">
          <Col className="text-center">
            <Button
              type="submit"
              variant="success"
              disabled={isSubmitting}
              className="btn-lg"
            >
              {isSubmitting ? <Spinner animation="border" size="lg" /> : "Submit"}
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Success Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
        className="success-modal"
      >
        <Modal.Body className="text-center">
          <FontAwesomeIcon icon={faCheckCircle} size="3x" color="#4CAF50" />
          <h4 className="mt-3">Your response have been successfully submitted!</h4>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EvalAnswerPage;
