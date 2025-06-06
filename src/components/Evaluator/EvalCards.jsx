import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import BtnAddImpact from "../Buttons/Evaluator/BtnAddImpact";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config";
import "./EvalCards.css";

const EvalCards = () => {
  const navigate = useNavigate();
  const [evalCards, setEvalCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control the modal for Impact Evaluation

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Fetch evaluation forms using the API
  useEffect(() => {
    const fetchEvalCards = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.EVALUATION_FORM_LIST_ACTIVE);
        if (!response.ok) {
          throw new Error("Failed to fetch evaluation forms");
        }
        const data = await response.json();
        setEvalCards(data.evaluation_forms || []);
      } catch (err) {
        setError(err.message || "Failed to fetch evaluation forms.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvalCards();
  }, []);

  // Handle navigation for other evaluation forms
  const handleEvaluate = (formId) => {
    console.log(formId);
    navigate(`/eval/eval-answer`, { state: { formId } });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <>
      <Container className="py-4">
        <div className="text-center mb-4 evaluator-header">
          <h1 className="text-success">
            <FontAwesomeIcon icon={faUserCheck} className="me-2" />
            Evaluation Forms
          </h1>
          <p className="text-muted">Access and Answer evaluation forms</p>
        </div>
        <Row className="g-4">
          {/* Render cards for other evaluation forms */}
          {evalCards.length > 0 ? (
            evalCards.map((evaluation, index) => (
              <Col md={4} sm={6} xs={12} key={index}>
                <Card className="h-100 shadow-sm border-0 text-center eval-card">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <div className="icon-container mb-3">
                      <FontAwesomeIcon
                        icon={faUserCheck}
                        size="3x"
                        className="text-success"
                      />
                    </div>
                    <Card.Title className="mb-2 text-dark">
                      {evaluation.title}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {evaluation.evaluation_type_name}
                    </Card.Subtitle>
                    <Card.Text className="text-muted small">
                      {evaluation.activity_objectives}
                    </Card.Text>
                    <Button
                      variant="success"
                      size="lg"
                      className="mt-auto evaluate-btn"
                      onClick={() => handleEvaluate(evaluation.form_id)}
                    >
                      Start Evaluation
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center text-muted">
              No active evaluations available.
            </p>
          )}

          {/* Impact Evaluation Form */}
          <Col md={4} sm={6} xs={12}>
            <Card className="h-100 shadow-sm border-0 text-center eval-card">
              <Card.Body className="d-flex flex-column align-items-center">
                <div className="icon-container mb-3">
                  <FontAwesomeIcon
                    icon={faUserCheck}
                    size="3x"
                    className="text-success"
                  />
                </div>
                <Card.Title className="mb-2 text-dark">
                  Impact Evaluation Form
                </Card.Title>
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleShowModal} // Display modal only for Impact Evaluation Form
                  className="mt-auto evaluate-btn"
                >
                  Start Evaluating
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for Impact Evaluation Form */}
      <BtnAddImpact show={showModal} handleClose={handleCloseModal} />
    </>
  );
};

export default EvalCards;
