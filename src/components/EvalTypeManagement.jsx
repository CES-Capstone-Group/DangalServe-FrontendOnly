import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Container, Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPenToSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS } from '../config';

const EvalTypeManagement = () => {
  const [forms, setForms] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingForm, setEditingForm] = useState(null);
  const [deleteFormId, setDeleteFormId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  const fetchEvaluationForms = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.EVALUATION_TYPE_LIST);
      if (!response.ok) throw new Error('Failed to fetch evaluation forms');
      const data = await response.json();
      setForms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluationForms();
  }, []);

  const addEvaluationForm = async (formName, formDescription) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert('Please log in to add a form');
      return;
    }

    const userId = jwtDecode(accessToken).user_id;
    const formData = { name: formName, description: formDescription, created_by: userId };

    try {
      const response = await fetch(API_ENDPOINTS.EVALUATION_TYPE_CREATE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newForm = await response.json();
        setForms([...forms, newForm]);
        setAddModalOpen(false);
        alert("Evaluation form added successfully!");
      } else {
        alert("There was an error adding the evaluation form.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  const editEvaluationForm = async (formName, formDescription) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert('Please log in to edit the form');
      return;
    }

    const userId = jwtDecode(accessToken).user_id;
    const formData = { name: formName, description: formDescription, updated_by: userId };

    try {
      const response = await fetch(API_ENDPOINTS.EVAL_TYPE_DETAIL(editingForm.evaluation_type_id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedForm = await response.json();
        setForms(forms.map((form) => (form.evaluation_type_id === editingForm.evaluation_type_id ? updatedForm : form)));
        setEditModalOpen(false);
        alert("Evaluation form updated successfully!");
      } else {
        alert("There was an error updating the evaluation form.");
      }
    } catch (error) {
      alert("There was an error updating the evaluation form.");
    }
  };

  const handleShowDeleteConfirm = (evaluation_type_id) => {
    setDeleteFormId(evaluation_type_id);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.EVAL_TYPE_DETAIL(deleteFormId), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setForms(forms.filter((form) => form.evaluation_type_id !== deleteFormId));
        alert("Evaluation form deleted successfully!");
        setShowDeleteConfirm(false);
      } else {
        alert("There was an error deleting the evaluation form.");
      }
    } catch (error) {
      alert("There was an error deleting the evaluation form.");
    }
  };

  const handleEdit = (evaluation_type_id, name, description) => {
    setEditingForm({ evaluation_type_id, name, description });
    setEditModalOpen(true);
  };

  const handleManage = (formId) => {
    navigate('/manage/manage-eval-form', { state: { formId } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <Container fluid className="py-4 mt-5">
      <Row className="mb-3">
        <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success me-3">
          <FontAwesomeIcon icon={faChevronLeft} /> Back
        </Button>
      </Row>
      <Row className="mb-3">
        <Col><h1>Evaluation Form Management</h1></Col>
      </Row>
      <Row>
        {forms.map((form) => (
          <Card key={form.evaluation_type_id} className="mb-3" id='conCard' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '15px' }}>
            <Card.Body style={{ flex: '1' }}>
              <Card.Title>{form.name}</Card.Title>
              <Card.Text>{form.description}</Card.Text>
            </Card.Body>
            <div className="d-flex align-items-center">
              <Button variant="warning" className="me-2 shadow-sm" onClick={() => handleManage(form.evaluation_type_id)}>
                Manage Form
              </Button>
              <Button variant="success" className="me-2" onClick={() => handleEdit(form.evaluation_type_id, form.name, form.description)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <Button variant="danger" onClick={() => handleShowDeleteConfirm(form.evaluation_type_id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </div>
          </Card>
        ))}
      </Row>
      <Row>
        <Col className='d-flex justify-content-end'>
          <Button variant="success" onClick={() => setAddModalOpen(true)}>+ Add Evaluation</Button>
        </Col>
      </Row>

      {/* Add Modal */}
      <Modal show={isAddModalOpen} onHide={() => setAddModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Evaluation Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => { e.preventDefault(); addEvaluationForm(e.target.formName.value, e.target.formDescription.value); }}>
            <Form.Group controlId="formName">
              <Form.Label>Form Name</Form.Label>
              <Form.Control type="text" placeholder="Enter form name" required />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-3 d-flex justify-content-end">+ Add</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal size="m" centered show={showDeleteConfirm} onHide={handleCloseDeleteConfirm} backdrop="static">
        <Modal.Header closeButton>
          <h4>Confirm Deletion</h4>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this evaluation form?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDelete} variant="danger">
            Yes, Delete
          </Button>
          <Button onClick={handleCloseDeleteConfirm} variant="secondary">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={isEditModalOpen} onHide={() => setEditModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Evaluation Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => { e.preventDefault(); editEvaluationForm(e.target.formName.value, e.target.formDescription.value); }}>
            <Form.Group controlId="formName">
              <Form.Label>Form Name</Form.Label>
              <Form.Control type="text" defaultValue={editingForm?.name} required />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} defaultValue={editingForm?.description} />
            </Form.Group>
            <div className='d-flex justify-content-end'>
            <Button variant="success" type="submit" className="mt-3">Save</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EvalTypeManagement;
