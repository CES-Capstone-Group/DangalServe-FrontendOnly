import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Table, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../config";

const ManageResponses = () => {
  const location = useLocation();  // Get the location object
  const { formId } = location.state || {};  // Destructure formId from state
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch form details and responses
  const fetchFormDetails = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const formResponse = await fetch(API_ENDPOINTS.EVAL_SUMMARY_DETAILS(id));
      const responseResponse = await fetch(API_ENDPOINTS.RESPONSES_AND_ANSWERS(id));

      if (!formResponse.ok) {
        throw new Error(`Failed to fetch form details: ${formResponse.statusText}`);
      }
      if (!responseResponse.ok) {
        throw new Error(`Failed to fetch responses: ${responseResponse.statusText}`);
      }

      const formData = await formResponse.json();
      const responseData = await responseResponse.json();

      setFormDetails(formData);
      setResponses(responseData);
    } catch (err) {
      setError(`Error fetching form details or responses: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formId) {
      fetchFormDetails(formId);
    }
  }, [formId]);

  // Handle back navigation
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Render table
  const renderTable = () => {
    if (!formDetails || !responses.length) return null;

    // Extract questions and sections
    const questions = formDetails.sections
      .flatMap((section) => section.questions)
      .map((question) => question.question_text);

    return (
      <Table responsive bordered striped hover className="tableStyle">
        <thead>
          <tr>
            <th>ID</th>
            {questions.map((question, index) => (
              <th key={index}>{question}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => (
            <tr key={index}>
              <td>{response.response_id}</td>
              {questions.map((question, questionIndex) => {
                const answer = response.answers.find(
                  (ans) => ans.question_text === question
                );
                return (
                  <td key={questionIndex}>
                    {answer
                      ? answer.text_answer ||
                        answer.section_option?.label ||
                        answer.question_option?.label ||
                        "N/A"
                      : "N/A"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Container fluid className="py-4 mt-5">
      <Row>
        <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success">
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          <span className="ms-2">Back</span>
        </Button>
      </Row>

      <h1 className="mb-3">Evaluation Responses</h1>

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        renderTable()
      )}
    </Container>
  );
};

export default ManageResponses;
