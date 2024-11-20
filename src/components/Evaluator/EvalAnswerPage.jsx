import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Table } from "react-bootstrap";
import { API_ENDPOINTS } from "../../config";
import "./EvalAnswerStyle.css";

const EvalAnswerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formId } = location.state || {};

  const [formDetails, setFormDetails] = useState(null);
  const [sections, setSections] = useState([]);
  const [answers, setAnswers] = useState({});
  const [userId, setUserId] = useState(null); // Store user ID
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // State for success message

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
        console.log(answerPayload);
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

      // Show success message
      setSuccess(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/eval/dashboard");
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (success) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="success" className="p-4">
          <h4>Thank you!</h4>
          <p>Your response has been successfully submitted.</p>
          <Spinner animation="grow" variant="success" />
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center text-primary">{formDetails.title}</h2>
          <p className="text-center text-muted">
            {formDetails.activity_objectives || "No objectives provided."}
          </p>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        {sections.map((section, index) => (
          <Card className="mb-4 shadow-sm border-0" key={section.section_id}>
            <Card.Header style={{ backgroundColor: "#78C57B", color: "#fff", fontWeight: "bold" }}>
              <h5 className="mb-0">{`${index + 1}. ${section.section_title}`}</h5>
            </Card.Header>
            <Card.Body>
              {/* Display Rating Questions in a Table */}
              {section.questions.some((q) => q.question_type === "rating") && (
                <Table bordered className="text-center align-middle">
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
              className="px-5 py-2"
              style={{ fontSize: "1.2rem", fontWeight: "bold" }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default EvalAnswerPage;
