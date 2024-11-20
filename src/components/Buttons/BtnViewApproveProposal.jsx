import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import ProposalPB from "../ProposalPB";
// import Proposal from "../ProposalPB";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import ButtonDownloadProposal from "./BtnDownloadProposal";
import { API_ENDPOINTS } from "../../config";

const BtnViewApproveProposal = ({ proposal, onApprove }) => {
  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBrgy, setIsBrgy] = useState(false);
  const [rejectShow, setRejectShow] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const handleRejectShow = () => setRejectShow(true);
  const handleRejectClose = () => setRejectShow(false);

  const [dirProgress, setDirProgress] = useState(0);
  const [vpreProgress, setVpreProgress] = useState(0);
  const [preProgress, setPreProgress] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [userBarangay, setUserBarangay] = useState("");  // Track the user's barangay
  const [remarks, setRemarks] = useState("");  // Track any remarks

  const [dirApproved, setDirApprove] = useState(false);
  const [vpreApproved, setVpreApprove] = useState(false);
  const [preApproved, setPreApprove] = useState(false);
  const [brgyApproved, setBrgyApprove] = useState(false);
  const [buttonText, setButtonText] = useState("Approve");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const handleResubmit = async () => {
    navigate(`/coor/proposal-form/${proposal.proposal_id}/resubmit`);
  };

  // Fetch and set the user's barangay from the JWT token
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const isAdmin = decodedToken.is_staff || decodedToken.accountType === "Admin";
      setIsAdmin(isAdmin);
      const isBrgy = decodedToken.accountType === "Brgy. Official";  // Adjust for your data
      setIsBrgy(isBrgy);
      setUserBarangay(decodedToken.barangay || "");  // Fetch and store barangay from the token
    }
  }, []);

  // Check barangay approval status for the current proposal
  useEffect(() => {
    const checkApprovalStatus = async () => {
      if (userBarangay && proposal.proposal_id) {
        const token = localStorage.getItem("access_token");
        try {
          const response = await fetch(API_ENDPOINTS.BARANGAY_APPROVAL(proposal.proposal_id), {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const approvalData = await response.json();
            setIsApproved(approvalData.status === "Approved");
          } else {
            console.error("Error fetching barangay approval status");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    
    checkApprovalStatus();
  }, [proposal.proposal_id, userBarangay]);

  // Initialize the progress bars and button text based on the current proposal status
  useEffect(() => {
    switch (proposal.status) {
      case "Approved by Director":
        setDirApprove(true);
        setDirProgress(100);
        setButtonText("VPRE Approve");
        break;
      case "Approved by VPRE":
        setDirApprove(true);
        setDirProgress(100);
        setVpreApprove(true);
        setVpreProgress(100);
        setButtonText("President Approve");
        break;
      case "Approved by President":
        setDirApprove(true);
        setDirProgress(100);
        setVpreApprove(true);
        setVpreProgress(100);
        setPreApprove(true);
        setPreProgress(100);
        setButtonText("Barangay Approve");
        break;
      case "Partly Approved by Barangay":
        setButtonText("Barangay Approve");
        break;
      case "Approved":
        setIsApproved(true);
        setBrgyApprove(true);
        break;
      default:
        setButtonText("Approve");
        break;
    }
  }, [proposal.status]);

  const handleApprove = async () => {
    try {
      // Check if the user is a barangay official and if the proposal requires barangay approval
      if (isBrgy && (proposal.status === "Approved by President" || proposal.status === "Partly Approved by Barangay")  && !isApproved ) {
        //console.log("not approved")
        console.log("Final Approval for Barangay...");
        await barangayApproval("Approved");
      } else if (!dirApproved) {
        console.log("Approving as Director...");
        await approval("Approved by Director");
      } else if (dirApproved && !vpreApproved) {
        console.log("Approving as VPRE...");
        await approval("Approved by VPRE");
      } else if (dirApproved && vpreApproved && !preApproved) {
        console.log("Approving as President...");
        await approval("Approved by President");
      }
    } catch (error) {
      console.error("Error approving the proposal:", error);
    }
  };

  // The original approval function for Director/VPRE/President
  const approval = async (status) => {
    const token = localStorage.getItem("access_token");
    const apiUrl = API_ENDPOINTS.PROPOSAL_DETAIL(proposal.proposal_id);

    try {
      console.log("Sending approval request with status:", status);

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        console.log("Proposal approved successfully with status:", status);
        
        if (status === "Approved by Director") {
          setDirApprove(true);
          setButtonText("VPRE Approve");
        } else if (status === "Approved by VPRE") {
          setVpreApprove(true);
          setButtonText("President Approve");
        } else if (status === "Approved by President") {
          setPreApprove(true);
          setButtonText("Barangay Approve");
        } else if (status === "Partly Approved by Barangay") {
          setPreApprove(true);
          setButtonText("Barangay Approve");
        } else if (status === "Approved") {
          setButtonText("Approval Complete");
        }

        if (onApprove) onApprove();
        handleClose();
      } else {
        const errorData = await response.json();
        console.error("Failed to approve the proposal:", errorData);
      }
    } catch (error) {
      console.error("Error during the approval process:", error);
    }
  };

  // The Barangay approval function
  const barangayApproval = async (status) => {
    if (!userBarangay) {
      alert("Your barangay is not recognized.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const apiUrl = API_ENDPOINTS.BARANGAY_APPROVAL(proposal.proposal_id);

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, barangay: userBarangay, remarks }),
      });

      if (response.ok) {
        alert("Proposal approved successfully.");
        setIsApproved(true);  // Disable the button after approval
        if (onApprove) onApprove();
        handleClose();
      } else {
        const data = await response.json();
        console.error("Failed to approve the proposal", data);
      }
    } catch (error) {
      console.error("Error approving the proposal:", error);
    }
  };

  const handleReject = async () => {
    try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
            API_ENDPOINTS.PROPOSAL_DETAIL(proposal.proposal_id),
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    status: "Rejected",
                    reject_reason: rejectReason,  // Include the rejection reason
                    remarks: remarks,             // Include the remarks
                }),
            }
        );

        console.log(JSON.stringify({
          status: "Rejected",
          reject_reason: rejectReason,  // Include the rejection reason
          remarks: remarks,             // Include the remarks
      }))

        if (response.ok) {
            handleRejectClose();
            if (onApprove) onApprove();
        } else {
            const errorData = await response.json();
            console.error("Failed to reject the proposal:", errorData);
        }
    } catch (error) {
        console.error("Error rejecting the proposal:", error);
    }
};

  return (
    <>
      <Button
        className="me-2"
        onClick={handleShow}
        style={{ backgroundColor: "#71A872", border: "0px", color: "white" }}
      >
        View
      </Button>

      {isBrgy && !isApproved && (proposal.status === "Partly Approved by Barangay" || proposal.status === "Approved by President")  && (
        <Button
          className="mt-2 mb-2"
          style={{
            backgroundColor: isApproved ? "#ccc" : "#71A872",
            margin: "0px",
            border: "0px",
            color: "white",
          }}
          onClick={handleApprove}
          disabled={isApproved} // Disable if already approved
        >
          {isApproved ? "Already Approved" : buttonText}
        </Button>
      )}
      

      {isAdmin &&
        !preApproved &&
        proposal.status !== "Partly Approved by Barangay" &&
        proposal.status !== "Rejected" && (
          <>
            <Button
              className="me-2"
              onClick={handleApprove}
              style={{ backgroundColor: "#71A872", border: "0px", color: "white" }}
            >
              {buttonText}
            </Button>
            <Button
              className="btn btn-danger"
              onClick={handleRejectShow}
              style={{ border: "0px", color: "white" }}
            >
              Reject
            </Button>
          </>
      )}
      {!isAdmin && proposal.status === "Rejected" && (
        <Button
          onClick={handleResubmit}
          style={{ backgroundColor: "#007bff", border: "0px", color: "white" }}
        >
          Resubmit
        </Button>
      )}

      {/* Modal for Reject and Remarks */}
      <Modal
        backdrop="static"
        centered
        size="xl"
        show={rejectShow}
        onHide={handleRejectClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reject Proposal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Proposal Title
              </Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.title} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Reason for Rejection
              </Form.Label>
              <Col sm={8}>
                <Form.Select
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                >
                  <option value="">Select Reason</option>
                  <option value="Rejected">Rejected by Director</option>
                  <option value="Rejected by VPRE">Rejected by VPRE</option>
                  <option value="Rejected by President">Rejected by President</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Remarks
              </Form.Label>
              <Col sm={8}>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={remarks} 
                  onChange={(e) => setRemarks(e.target.value)}  // Correctly handle the change event
                  placeholder="Add any remarks (optional)" 
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleReject}>
            Confirm Rejection
          </Button>
          
        

          <Button variant="secondary" onClick={handleRejectClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for viewing proposal details */}
      <Modal backdrop="static" centered size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Proposal Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProposalPB status={proposal.status} />

          <Form>
            {/* Proposal Title */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Proposal Title
              </Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.title} />
              </Col>
            </Form.Group>

            {/* Location */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Location
              </Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.location || "N/A"} />
              </Col>
            </Form.Group>

            {/* Target Date */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Target Date
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  readOnly
                  type="text"
                  value={new Date(proposal.target_date).toLocaleDateString() || "N/A"}
                />
              </Col>
            </Form.Group>

            {/* Status */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Status</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.status || "N/A"} />
              </Col>
            </Form.Group>

            {/* Lead Proponent */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Lead Proponent</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.lead_proponent || "N/A"} />
              </Col>
            </Form.Group>

            {/* Contact Details */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Contact Details</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.contact_details || "N/A"} />
              </Col>
            </Form.Group>

            {/* Department */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Department</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.department || "N/A"} />
              </Col>
            </Form.Group>

            {/* Project Description */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Project Description</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.project_description || "N/A"} />
              </Col>
            </Form.Group>

            {/* Partner Community */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Partner Community</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.partner_community || "N/A"} />
              </Col>
            </Form.Group>

            {/* Government Organization */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Government Organization</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.government_org || "N/A"} />
              </Col>
            </Form.Group>

            {/* Non-Government Organization */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Non-Government Organization</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.non_government_org || "N/A"} />
              </Col>
            </Form.Group>

            {/* Success Indicators */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Success Indicators</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.success_indicators || "N/A"} />
              </Col>
            </Form.Group>

            {/* Identified Needs */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Identified Needs</Form.Label>
              <Col sm={8}>
                {proposal.identified_needs_file ? (
                  <a href={proposal.identified_needs_file} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                ) : (
                  <Form.Control readOnly type="text" value={proposal.identified_needs_text || "N/A"} />
                )}
              </Col>
          </Form.Group>

            {/* General Objectives */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>General Objectives</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.general_objectives || "N/A"} />
              </Col>
            </Form.Group>

            {/* Specific Objectives */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Specific Objectives</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.specific_objectives || "N/A"} />
              </Col>
            </Form.Group>

            {/* Cooperating Agencies */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Cooperating Agencies</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.cooperating_agencies || "N/A"} />
              </Col>
            </Form.Group>

            {/* Monitoring Mechanics */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Monitoring Mechanics</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.monitoring_mechanics || "N/A"} />
              </Col>
            </Form.Group>

            {/* Evaluation Mechanics */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Evaluation Mechanics</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.evaluation_mechanics || "N/A"} />
              </Col>
            </Form.Group>

            {/* Timetable */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Timetable</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.timetable || "N/A"} />
              </Col>
            </Form.Group>

            {/* Risk Assessment */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Risk Assessment</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.risk_assessment || "N/A"} />
              </Col>
            </Form.Group>

            {/* Action Plans */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Action Plans to Address Risks</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.action_plans || "N/A"} />
              </Col>
            </Form.Group>

            {/* Sustainability Approaches */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Sustainability Approaches</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.sustainability_approaches || "N/A"} />
              </Col>
            </Form.Group>

            {/* Budget Requirement */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Budget Requirement</Form.Label>
              <Col sm={8}>
                {proposal.budget_requirement_file ? (
                  <a href={proposal.budget_requirement_file} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                ) : (
                  <Form.Control readOnly type="text" value={proposal.budget_requirement_text || "N/A"} />
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Status</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.status} />
              </Col>
            </Form.Group> 

            {/* Remarks for Barangay approval */}
            {isBrgy && (
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>Remarks</Form.Label>
                <Col sm={8}>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={remarks} 
                    onChange={(e) => setRemarks(e.target.value)} 
                    placeholder="Add any remarks (optional)" 
                  />
                </Col>
              </Form.Group>
            )}                         
          </Form>
        </Modal.Body>

        
        <Modal.Footer>
        <ButtonDownloadProposal proposal={proposal}></ButtonDownloadProposal>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BtnViewApproveProposal;
