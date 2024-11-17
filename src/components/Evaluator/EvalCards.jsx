import React from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import "../table.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const EvalCards = () => {
  const navigate = useNavigate();

  const handleEvaluate = (path) => {
    navigate(path);
  };
  // // Go back to the previous page
  const handleBack = () => {
    navigate(-1); // This will navigate to the previous page in the history
  };


  const evalCard = [{ title: 'CCLIP: PC Awareness', info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquam facilisis ex, ut aliquet leo pretium in. Fusce tortor magna, iaculis eget ante sit amet, molestie aliquet turpis.', path: '/actEvalForm' }, { title: 'CCLIP: PC Awareness', info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquam facilisis ex, ut aliquet leo pretium in. Fusce tortor magna, iaculis eget ante sit amet, molestie aliquet turpis.', path: '/actEvalForm' }, { title: 'CCLIP: PC Awareness', info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquam facilisis ex, ut aliquet leo pretium in. Fusce tortor magna, iaculis eget ante sit amet, molestie aliquet turpis.', path: '/actEvalForm' }, { title: 'CCLIP: PC Awareness', info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquam facilisis ex, ut aliquet leo pretium in. Fusce tortor magna, iaculis eget ante sit amet, molestie aliquet turpis.', path: '/actEvalForm' }];

  return (
    <Container className="container-fluid">
      <Row>
        <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success">
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          <span className="ms-2">Back</span>
        </Button>

        <Col className="d-flex justify-content-end">
          <Button style={{ backgroundColor: '#71A872', border: '0px' }}>
            <FontAwesomeIcon className='me-2' icon={faFilter} ></FontAwesomeIcon>
            Filter
          </Button>
        </Col>
      </Row>
      <div className="container mb-4">
        <h1> ACTIVITY EVALUATION </h1>
      </div>

      <Row>
        {evalCard.length > 0 ? (
          evalCard.map((evaluation, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-3">
              <Card className="h-100 d-flex flex-column" id="conCard">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title style={{ fontWeight: 'bold' }}>
                    {evaluation.title}
                  </Card.Title>
                  <Card.Text>
                    <strong>Evaluation Info:</strong> {evaluation.info}
                  </Card.Text>
                  <Button
                    variant="success"
                    onClick={() => handleEvaluate(evaluation.path)}
                    className="mt-auto"
                  >
                    Evaluate
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No evaluations available.</p>
        )}
      </Row>

    </Container>
  );
};

export default EvalCards;