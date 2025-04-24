import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faDatabase, faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";

const BackupRestore = () => {
  const [backupMessage, setBackupMessage] = useState("");
  const [restoreMessage, setRestoreMessage] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Handle back navigation
  const handleBack = () => {
    navigate(-1);  // Navigate to the previous page
  };

  // Function to handle database backup
  const handleBackup = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Get JWT token
      const response = await fetch("http://127.0.0.1:8000/backup/backup/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBackupMessage(data.message);
      } else {
        const errorData = await response.json();
        setBackupMessage(errorData.error || "An error occurred during backup.");
      }
    } catch (error) {
      setBackupMessage("An error occurred while connecting to the server.");
    }
  };

  // Function to handle database restore
  const handleRestore = async () => {
    if (!file) {
      setRestoreMessage("Please select a backup file to restore.");
      return;
    }

    const formData = new FormData();
    formData.append("backup_file", file);

    try {
      const token = localStorage.getItem("access_token"); // Get JWT token
      const response = await fetch("http://127.0.0.1:8000/backup/restore/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the header
        },
        body: formData, // Pass FormData directly
      });

      if (response.ok) {
        const data = await response.json();
        setRestoreMessage(data.message);
      } else {
        const errorData = await response.json();
        setRestoreMessage(errorData.error || "An error occurred during restore.");
      }
    } catch (error) {
      setRestoreMessage("An error occurred while connecting to the server.");
    }
  };

  return (
    <Container fluid className="py-4 mt-5 d-flex flex-column justify-content-center me-0 ms-0">
        {/* Row for Back Button and Title */}
    <Row className="align-items-center">
                    <Col xs="auto">
                        <Button 
                            variant="link" 
                            onClick={handleBack} 
                            className="backBtn d-flex align-items-center text-success"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                           
                        </Button>
                    </Col>
                    <Col>
                        <h1 className="mb-0" style={{ color: '#4B4A4A' }}>Backup and Restore</h1>
                    </Col>
                </Row>

      {/* Backup and Restore Options */}
      <Row className="g-4 d-flex justify-content-center">
        {/* Backup Card */}
        <Col xs={12} className="d-flex justify-content-center">
          <Card
            onClick={handleBackup}
            className="clickable-card landCard text-center shadow p-3"
            style={{
              cursor: "pointer",
              width: "90%",
              maxWidth: "300px",
              minHeight: "150px",
            }}
          >
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <FontAwesomeIcon icon={faDownload} size="3x" className="mb-3" style={{ color: "#71A872" }} />
              <Card.Title className="mt-auto text-success">Backup Database</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        {/* Restore Card */}
        <Col xs={12} className="d-flex justify-content-center">
          <Card
            className="landCard text-center shadow  p-3"
            style={{
              width: "90%",
              maxWidth: "300px",
              minHeight: "150px",
            }}
          >
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <FontAwesomeIcon icon={faUpload} size="3x" className="mb-3" style={{ color: "#71A872" }} />
              <Card.Title className="mt-auto text-success">Restore Database</Card.Title>

              <Form.Group controlId="fileUpload" className="w-100 mt-3">
                <Form.Control
                  type="file"
                  accept=".sql"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{
                    fontSize: "14px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                />
                <Form.Text className="text-muted text-center">
                  {file ? `Selected file: ${file.name}` : "No file selected"}
                </Form.Text>
              </Form.Group>

              <Button
                className="mt-3"
                variant="success"
                style={{
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleRestore}
              >
                Restore
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Messages */}
      <Row className="mt-4 d-flex flex-column align-items-center">
        {backupMessage && (
          <p className={backupMessage.includes("successful") ? "text-success" : "text-danger"}>{backupMessage}</p>
        )}
        {restoreMessage && (
          <p className={restoreMessage.includes("successfully") ? "text-success" : "text-danger"}>{restoreMessage}</p>
        )}
      </Row>
    </Container>
  );
};

export default BackupRestore;
