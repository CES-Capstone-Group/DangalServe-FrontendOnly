import { faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { API_ENDPOINTS } from "../../../config";

const BtnEditDeleteResearchAgenda = ({ researchAgenda, onResearchAgendaUpdated }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [label, setLabel] = useState("");
  const [image, setImage] = useState(null);

  // Pre-fill data when modal opens
  useEffect(() => {
    if (researchAgenda) {
      setLabel(researchAgenda.label);
    }
  }, [researchAgenda]);

  // **Update Research Agenda Functionality**
  const updateResearchAgenda = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("label", label);  // Append updated label

    if (image) {
      formData.append("image", image);  // Append updated image if selected
    }

    try {
      const response = await fetch(API_ENDPOINTS.RESEARCH_AGENDA_DETAIL(researchAgenda.id), {
        method: "PUT",  // Use PUT method for update
        body: formData,
      });

      if (response.ok) {
        onResearchAgendaUpdated();  // Refresh research agendas
        setShowEdit(false);         // Close modal
        alert("Research agenda updated successfully!");
      } else {
        alert("There was an error updating the research agenda.");
      }
    } catch (error) {
      alert("There was an error updating the research agenda.");
    }
  };

  // **Delete Research Agenda Functionality**
  const deleteResearchAgenda = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this research agenda?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(API_ENDPOINTS.RESEARCH_AGENDA_DETAIL(researchAgenda.id), {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Research agenda deleted successfully!");
        setShowDeleteConfirm(false);  // Close delete confirmation modal
        onResearchAgendaUpdated();  // Trigger callback to reload research agendas
      } else {
        alert("There was an error deleting the research agenda.");
      }
    } catch (error) {
      alert("There was an error deleting the research agenda.");
    }
  };

  return (
    <>
      {/* Edit and Delete Buttons */}
      <Button className="shadow" onClick={() => setShowEdit(true)} style={{ backgroundColor: "#71a872", border: '0px', color: 'white', marginRight: '10px', fontSize: '13px' }}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </Button>
      <Button className="shadow" onClick={() => setShowDeleteConfirm(true)} style={{ backgroundColor: "#ff3232", border: '0px', color: 'white', fontSize: '13px' }}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>

      {/* Edit Research Agenda Modal */}
      <Modal backdrop='static' centered size="lg" show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Research Agenda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateResearchAgenda}>
            <Form.Group className='mb-3' controlId='Label'>
              <Form.Label className='h5'>Label</Form.Label>
              <InputGroup>
                <Form.Control
                  type='text'
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className='mb-3' controlId='AchvImage'>
              <Form.Label className='h5'>Upload your Image (Optional)</Form.Label>
              <InputGroup>
                <Form.Control
                  className="inputFile"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                />
              </InputGroup>
              <p className="text-sm">Max Size: 25MB</p>
            </Form.Group>

            <Modal.Footer className="d-flex justify-content-center">
              <Button size="lg" variant='success' type="submit">
                Save Changes
              </Button>
              <Button size="lg" variant="danger" onClick={() => setShowEdit(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal size="m" centered show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this research agenda?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteResearchAgenda} variant="danger"> {/* Delete Confirmation Button */}
            Yes, Delete
          </Button>
          <Button onClick={() => setShowDeleteConfirm(false)} variant="secondary">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BtnEditDeleteResearchAgenda;
