import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../../config";

const BtnAddImpact = ({ show, handleClose }) => {
  const [proposals, setProposals] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [formData, setFormData] = useState({
    proposal: "",
    activity: "",
  });
  const navigate = useNavigate();

  // Fetch proposals and dynamically fetch activities based on the selected proposal
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error("No access token found");
          return;
        }
    
        const response = await axios.get(
          `${API_ENDPOINTS.PROPOSAL_LIST_CREATE}?status=Approved%20by%20President`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Proposals Response:", response.data); // Log proposals
        setProposals(response.data || []);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    };
    fetchProposals();
  }, []);

  useEffect(() => {
    if (formData.proposal) {
      console.log("Selected Proposal ID:", formData.proposal); // Print the value of formData.proposal
      axios
        .get(API_ENDPOINTS.ACTIVITY_SCHEDULE_BY_PROPOSAL(formData.proposal))
        .then((response) => {
          setFilteredActivities(response.data || []);
        })
        .catch((error) => {
          console.error("Error fetching activities:", error);
        });
    } else {
      setFilteredActivities([]);
    }
  }, [formData.proposal]);
  
  const handleSubmit = () => {
    
    if (formData.proposal && formData.activity) {
      const selectedActivityDetails = filteredActivities.find(
        (activity) => activity.id === parseInt(formData.activity)
      );
      
      navigate("/impact-eval", {
        state: { selectedProposal: formData.proposal, selectedActivityDetails },
      });
    } else {
      console.error("Proposal or activity not selected.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Proposal and Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Proposal</Form.Label>
            <Form.Select
              onChange={(e) =>
                setFormData({ ...formData, proposal: e.target.value }) // Store the proposal ID
              }
              value={formData.proposal}
            >
              <option value="">Select Proposal</option>
              {proposals.map((proposal) => (
                <option key={proposal.id} value={proposal.proposal_id}> {/* Use proposal.id */}
                  {proposal.title} {/* Display the title */}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Activity</Form.Label>
            <Form.Select
              onChange={(e) =>
                setFormData({ ...formData, activity: e.target.value })
              }
              value={formData.activity}
              disabled={!formData.proposal}
            >
              <option value="">Select Activity</option>
              {filteredActivities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.activity_title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={handleSubmit}
          disabled={!formData.proposal || !formData.activity}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BtnAddImpact;
