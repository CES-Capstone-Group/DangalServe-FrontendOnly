import React, { useState } from 'react';
import '/src/App.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { API_ENDPOINTS } from '../../config';

const ProposalForm = () => {
  const [text, setText] = useState("");
  const { proposalId } = useParams(); // Retrieve proposal ID from URL
  const [researchAgendas, setResearchAgendas] = useState([]);
  const [isResubmission, setIsResubmission] = useState(false); // To track if it's a resubmission
  const [govOrg, setGovOrg] = useState(false);
  const [nonGovOrg, setNonGovOrg] = useState(false);
  const [otherCommunity, setOtherCommunity] = useState(false); // Track if "Others" is selected
  const [otherCommunityValue, setOtherCommunityValue] = useState(''); // Store the "Others" value
  const [otherTypology, setOtherTypology] = useState(false); // Track if "Others" is selected
  const [otherTypologyValue, setOtherTypologyValue] = useState(''); // Store the "Others" value
  const [errors, setErrors] = useState({
    preparedByName: '',
    preparedByPosition: '',
    endorsedByName: '',
    endorsedByPosition: '',
    concurredByName: '',
    concurredByPosition: '',
  });

  const [signatoryNames, setSignatoryNames] = useState([]);
  const [selectedSignatory, setSelectedSignatory] = useState('');
  useEffect(() => {
    fetch(API_ENDPOINTS.SIGNATORY_NAMES)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched signatory names:', data); // Log fetched data
        if (Array.isArray(data)) {
          setSignatoryNames(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(error => console.error('Error fetching signatory names:', error));
  }, []);

  useEffect(() => {
    console.log('Updated signatory names:', signatoryNames);
  }, [signatoryNames]);

  const [barangays, setBarangays] = useState([]);
  // Fetch barangays
  useEffect(() => {
    const fetchBarangays = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.BARANGAY_LIST);
        if (response.ok) {
          const data = await response.json();
          setBarangays(data);
        } else {
          console.error("Failed to fetch barangays");
        }
      } catch (error) {
        console.error("Error fetching barangays:", error);
      }
    };

    const fetchResearchAgendas = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.RESEARCH_AGENDA_LIST);
        if (response.ok) {
          const data = await response.json();
          setResearchAgendas(data);
        } else {
          console.error('Failed to fetch research agendas');
        }
      } catch (error) {
        console.error('Error fetching research agendas:', error);
      }
    };

    fetchBarangays();
    fetchResearchAgendas();
  }, []);

  // State to hold the form data
  const [formData, setFormData] = useState({
    research_agendas: [],
    title: '',
    engagement_date: '',
    disengagement_date: '',
    department: '',
    contact_details: '',
    project_description: '',
    target_date: '',
    location: '',
    partner_community: [], // Array for checkboxes
    school: false,
    barangay: false,
    government_org: '',
    non_government_org: '',
    identified_needs_text: '',
    identified_needs_file: null, // for file upload
    general_objectives: '',
    specific_objectives: '',
    success_indicators: '',
    cooperating_agencies: '',
    monitoring_mechanics: '',
    evaluation_mechanics: '',
    timetable: '',
    risk_assessment: '',
    action_plans: '',
    sustainability_approaches: '',
    budget_requirement_text: '',
    budget_requirement_file: null, // for file upload
    is_three_year_plan: false,  // New field for Three-Year plan
    is_one_year_plan: false,  // New field for One-Year plan
    status: 'Pending',
  });

  // Proponents array to hold all proponents
  const [proponents, setProponents] = useState([]);
  const [proponent, setProponent] = useState({ name: '', position: '' });

  // Handle input change for proponent name and position
  const handleProponentChange = (e) => {
    const { name, value } = e.target;
    setProponent({
      ...proponent,
      [name]: value,
    });
  };

  const handleResearchAgendaChange = (e) => {
    const { value, checked } = e.target;
    const agendaId = Number(value); // Or use `String(value)` if agenda.id is a string
    setFormData((prevData) => {
      let updatedAgendas;
      if (checked) {
        // Add the value only if it doesn't already exist in the array
        updatedAgendas = prevData.research_agendas.includes(agendaId)
          ? prevData.research_agendas
          : [...prevData.research_agendas, agendaId];
      } else {
        // Remove the value
        updatedAgendas = prevData.research_agendas.filter((agenda) => agenda !== agendaId);
      }
      return { ...prevData, research_agendas: updatedAgendas };
    });
  };


  // Handle validation when the user leaves a field
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name.replace('_', ' ')} is required`,
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name]; // Clear the error if the field is not empty
        return newErrors;
      });
    }
  };

  // Validate Identified Needs when losing focus (onBlur)
  const validateIdentifiedNeeds = () => {
    if (!formData.identified_needs_text && !formData.identified_needs_file) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        identified_needs: 'Please either provide identified needs text or upload a file.',
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.identified_needs;
        return newErrors;
      });
    }
  };

  // Validate Budget Requirement when losing focus (onBlur)
  const validateBudgetRequirement = () => {
    if (!formData.budget_requirement_text && !formData.budget_requirement_file) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        budget_requirement: 'Please either provide budget requirement text or upload a file.',
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.budget_requirement;
        return newErrors;
      });
    }
  };

  // Add a new proponent to the list
  const handleAddProponent = () => {
    if (proponent.name && proponent.position) {
      setProponents([...proponents, proponent]); // Add the proponent
      setProponent({ name: '', position: '' });  // Clear the inputs
    }
  };

  const [isThreeYearPlan, setIsThreeYearPlan] = useState(false);
  const [isOneYearPlan, setIsOneYearPlan] = useState(false);

  const handleSignatoryChange = (e) => {
    const { name, value } = e.target;

    // Update the input value
    setSignatoryInput({
      ...signatoryInput,
      [name]: value,
    });

    // Update validation errors if the field is empty
    setErrors({
      ...errors,
      [name]: value.trim() === '' ? 'This field is required' : '',
    });
  };


  // State for signatories
  const [signatories, setSignatories] = useState([]);

  // State for input fields, now with more descriptive keys
  const [signatoryInput, setSignatoryInput] = useState({
    preparedByName: '',
    preparedByPosition: '',
    endorsedByName: '',
    endorsedByPosition: '',
    concurredByName: '',
    concurredByPosition: '',
  });

  const handleBlurSig = (e) => {
    const { name, value } = e.target;

    // Update validation errors if the field is empty
    setErrors({
      ...errors,
      [name]: value.trim() === '' ? 'This field is required' : '',
    });
  };


  // Add a new signatory to the respective section
  const handleAddSignatory = (section) => {
    if (section === 'prepared' && signatoryInput.preparedByName && signatoryInput.preparedByPosition) {
      setSignatories([
        ...signatories,
        {
          name: signatoryInput.preparedByName,
          position: signatoryInput.preparedByPosition,
          section: 'prepared',
        },
      ]);
      setSignatoryInput({ ...signatoryInput, preparedByName: '', preparedByPosition: '' }); // Reset input fields for "Prepared By"
    } else if (section === 'endorsed' && signatoryInput.endorsedByName && signatoryInput.endorsedByPosition) {
      setSignatories([
        ...signatories,
        {
          name: signatoryInput.endorsedByName,
          position: signatoryInput.endorsedByPosition,
          section: 'endorsed',
        },
      ]);
      setSignatoryInput({ ...signatoryInput, endorsedByName: '', endorsedByPosition: '' }); // Reset input fields for "Endorsed By"
    } else if (section === 'concurred' && signatoryInput.concurredByName && signatoryInput.concurredByPosition) {
      setSignatories([
        ...signatories,
        {
          name: signatoryInput.concurredByName,
          position: signatoryInput.concurredByPosition,
          section: 'concurred',
        },
      ]);
      setSignatoryInput({ ...signatoryInput, concurredByName: '', concurredByPosition: '' }); // Reset input fields for "Concurred By"
    }
  };



  useEffect(() => {
    // Check if partner_community is a string before splitting
    if (typeof formData.partner_community === 'string') {
      const communities = formData.partner_community.split(','); // Split by commas
      setFormData((prevData) => ({
        ...prevData,
        partner_community: communities,
      }));
    }
  }, [formData.partner_community]);

  useEffect(() => {
    if (proposalId) {
      setIsResubmission(true);
      const fetchProposalData = async () => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(API_ENDPOINTS.PROPOSAL_DETAIL(proposalId), {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFormData(data); // Pre-fill form with existing proposal data
          setProponents(data.proponents || []);  // Pre-fill proponents if any
        } else {
          console.error('Failed to fetch proposal data');
        }
      };

      fetchProposalData();
    }
  }, [proposalId]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setText(e.target.value);
    e.target.style.height = "auto"; // Reset the height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set the new height
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCommunityChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedCommunities = checked
        ? [...prevData.partner_community, value] // Add checked community
        : prevData.partner_community.filter((comm) => comm !== value); // Remove unchecked community
      return { ...prevData, partner_community: updatedCommunities };
    });
  };

  // Handle Other Community input field visibility
  const handleOtherCommunityChange = (e) => {
    setOtherCommunity(e.target.checked);
    if (!e.target.checked) {
      setOtherCommunityValue('');
    }
  };

  // Handle Other Typology input field visibility
  const handleOtherTypologyChange = (e) => {
    setOtherTypology(e.target.checked);
    if (!e.target.checked) {
      setOtherTypologyValue('');
    }
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  // Handle form submission
  // Now in the handleSubmit, use the correct reference

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    const token = localStorage.getItem('access_token');

    Object.keys(formData).forEach((key) => {
      if (key === 'research_agendas') {
        formData[key].forEach((agenda) => submitData.append('research_agendas[]', agenda));
      }
      else if (key === 'partner_community') {
        // Convert partner_community array to a comma-separated string
        const partnerCommunityString = formData[key].join(', ');
        submitData.append(key, partnerCommunityString);
      }
      else if (formData[key] && key !== 'identified_needs_file' && key !== 'budget_requirement_file') {
        submitData.append(key, formData[key]);
      }
    });

    // Append form fields except for proponents, signatories, and files
    Object.keys(formData).forEach(key => {
      if (formData[key] && key !== 'proponents' && key !== 'signatories' && key !== 'identified_needs_file' && key !== 'budget_requirement_file') {
        submitData.append(key, formData[key]);
      }
    });

    // Append file fields if they exist
    if (formData.identified_needs_file instanceof File) {
      submitData.append('identified_needs_file', formData.identified_needs_file);
    }
    if (formData.budget_requirement_file instanceof File) {
      submitData.append('budget_requirement_file', formData.budget_requirement_file);
    }

    submitData.append('is_three_year_plan', formData.is_three_year_plan ? 'true' : 'false');
    submitData.append('is_one_year_plan', formData.is_one_year_plan ? 'true' : 'false');

    const leadProponentString = proponents.map(p => p.name).join(', ');
    submitData.append('lead_proponent', leadProponentString);

    // Send proponents and signatories as JSON strings
    if (proponents.length > 0) {
      submitData.append('proponents', JSON.stringify(proponents)); // Sends proponents as a JSON array
    }

    if (signatories.length > 0) {
      submitData.append('signatories', JSON.stringify(signatories)); // Sends signatories as a JSON array
    }

    try {
      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }
      let url = API_ENDPOINTS.PROPOSAL_LIST_CREATE;
      let method = 'POST';

      if (isResubmission) {
        url = API_ENDPOINTS.PROPOSAL_RESUBMISSION(proposalId);
        method = 'PATCH'; // Use PATCH for resubmissions
      }

      const response = await fetch(url, {
        method: method,
        body: submitData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        navigate('/coor/pending-proposal');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
    }
  };

  return (
    <Container className='Formproposal'>
      <h2 className="mt-4 mb-4" style={{ textAlign: 'center' }} id='propHeader'>
        Community and Extension Service Project and Activity Proposal
      </h2>

      <Form className='form' onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formPlan" className="mb-4">
          <Col sm={12}>
            <h4 className="mb-4">Please Check</h4>
            <Form.Check>
              <label>
                <input
                  type="radio"
                  name="plan"
                  value="Three-Year"
                  checked={formData.is_three_year_plan}
                  onChange={(e) => {
                    setIsThreeYearPlan(e.target.checked);
                    setFormData((prevData) => ({
                      ...prevData,
                      is_three_year_plan: e.target.checked, // Update formData with this value
                    }));
                  }}
                  required={true}
                />
                Three-Year-Medium-Term Plan for Community Extension¹
              </label>
            </Form.Check>

            {/* Second radio button with label */}
            <Form.Check>
              <label>
                <input
                  type="radio"
                  name="plan"
                  value="LessThanYear"
                  checked={formData.is_one_year_plan}
                  onChange={(e) => {
                    setIsOneYearPlan(e.target.checked);
                    setFormData((prevData) => ({
                      ...prevData,
                      is_one_year_plan: e.target.checked, // Update formData with this value
                    }));
                  }}
                  required={true}
                />
                Less than a Year-One-Year Plan for Community Service²
              </label>
            </Form.Check>

          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label id="formLabel" column sm={12}>
            Research Agenda
          </Form.Label>
          <Col sm={12} className="d-flex flex-wrap flex-md-row flex-column">
            {researchAgendas.map((agenda) => (
              <Form.Check
                key={agenda.id}
                type="checkbox"
                id={`agenda-${agenda.id}`}
                label={agenda.label}
                value={agenda.id}
                checked={formData.research_agendas.includes(agenda.id)}
                onChange={handleResearchAgendaChange}
                className="me-3" // Adds margin to the right for spacing
              />
            ))}
          </Col>
        </Form.Group>

        <h4 className="mb-4">A. Basic Details</h4>

        {/* Title Field */}
        <Form.Group as={Row} controlId="formTitle" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Title of the Project/Activity</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              required={true}
              onChange={handleChange}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.title && <p className="text-danger">{errors.title}</p>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formDepartment" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Department
            /Program /Organization </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter department"
              name="department"
              value={formData.department}
              required={true}
              onChange={handleChange}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.department && <p className="text-danger">{errors.department}</p>}
          </Col>
        </Form.Group>

        <h6 className="mb-4">Covered Period</h6>

        <Form.Group as={Row} controlId="formEngagementDate" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Date of Engagement</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              name="engagement_date"
              value={formData.engagement_date}
              required={true}
              onChange={handleChange}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.engagement_date && <p className="text-danger">{errors.engagement_date}</p>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formDisengagementDate" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Date of Disengagement</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              name="disengagement_date"
              value={formData.disengagement_date}
              required={true}
              onChange={handleChange}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.disengagement_date && <p className="text-danger">{errors.disengagement_date}</p>}
          </Col>
        </Form.Group>

        <h6 className="mb-4">CESU Coordinator/Proponent(s)</h6>
        {proponents.length > 0 && (
          <div className="mb-3">
            <h5>Proponents List</h5>
            <ul>
              {proponents.map((p, index) => (
                <li key={index}>
                  {p.name} - {p.position}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Name</Form.Label>
          <Col sm={3}>
            <Form.Control
              type="text"
              placeholder="Enter proponent name"
              name="name"
              value={proponent.name}
              onChange={handleProponentChange}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </Col>
          <Form.Label column sm={2}>Position/Title</Form.Label>
          <Col sm={3}>
            <Form.Control
              type="text"
              placeholder="Enter position/title"
              name="position"
              value={proponent.position}
              onChange={handleProponentChange}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.position && <p className="text-danger">{errors.position}</p>}
          </Col>
        </Form.Group>
        <Button variant="success" onClick={handleAddProponent} className="mb-2">
          Add Proponent
        </Button>

        {/* Contact Details */}
        <Form.Group as={Row} controlId="formContactDetails" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Contact Details</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter contact details"
              name="contact_details"
              value={formData.contact_details}
              required={true}
              onChange={handleChange}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.contact_details && <p className="text-danger">{errors.contact_details}</p>}
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="formProjectDescription" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Project Description</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter project description"
              name="project_description"
              value={formData.project_description}
              required={true}
              onChange={handleChange || handleInputChange}
              style={{ overflow: "hidden" }}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.project_description && <p className="text-danger">{errors.project_description}</p>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTargetDate" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Target Date</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              name="target_date"
              value={formData.target_date}
              required={true}
              onChange={handleChange}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.target_date && <p className="text-danger">{errors.target_date}</p>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formLocation" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Location</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter location"
              name="location"
              value={formData.location}
              required={true}
              onChange={handleChange}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.location && <p className="text-danger">{errors.location}</p>}
          </Col>
        </Form.Group>

        <h4 className="mb-4">B. Project Details</h4>

        <Form.Group as={Row} controlId="formPartnerCommunity" className="mb-4">
          <Col sm={5}>
            <h6 className="mb-4">Partner Community/Organization</h6>
            {barangays.map((barangay) => (
              <Form.Check
                key={barangay.id}
                type="checkbox"
                id={`barangay-${barangay.id}`} // Unique id for each checkbox
                label={barangay.brgy_name}
                value={barangay.brgy_name}
                checked={formData.partner_community.includes(barangay.brgy_name)}
                onChange={(e) => handleCommunityChange(e, barangay.brgy_name, 'Barangay')}
              />
            ))}
            <Form.Check
              type="checkbox"
              id="other-community" // Unique id for "Others" checkbox
              label="Others"
              onChange={handleOtherCommunityChange}
            />
            {otherCommunity && (
              <Form.Control
                type="text"
                placeholder="Please specify"
                className="mt-2"
                value={otherCommunityValue}
                onChange={(e) => setOtherCommunityValue(e.target.value)}
              />
            )}
          </Col>

          <Col sm={5}>
            <h6 className="mb-4">Typology</h6>
            <Form.Check
              type="checkbox"
              id="typology-school" // Unique id for "School"
              label="School"
              name="school"
              onChange={handleChange}
              checked={formData.school}
            />
            <Form.Check
              type="checkbox"
              id="typology-barangay" // Unique id for "Barangay"
              label="Barangay"
              name="barangay"
              onChange={handleChange}
              checked={formData.barangay}
            />
            <Form.Check
              type="checkbox"
              id="typology-government-org" // Unique id for "Government Organization"
              label="Government Organization"
              name="government_org"
              onChange={(e) => handleChange({ target: { name: 'government_org', value: e.target.checked ? 'Yes' : '' } })}
              checked={formData.government_org === 'Yes'}
            />
            <Form.Check
              type="checkbox"
              id="typology-non-government-org" // Unique id for "Non-Government Organization"
              label="Non-Government Organization"
              name="non_government_org"
              onChange={(e) => handleChange({ target: { name: 'non_government_org', value: e.target.checked ? 'Yes' : '' } })}
              checked={formData.non_government_org === 'Yes'}
            />
            <Form.Check
              type="checkbox"
              id="typology-others" // Unique id for "Others"
              label="Others"
              // checked={formData.partner_community.includes('Others')}
              onChange={handleOtherTypologyChange}
            />
            {otherTypology && (
              <Form.Control
                type="text"
                placeholder="Please specify"
                className="mt-2"
                value={otherTypologyValue}
                onChange={(e) => setOtherTypologyValue(e.target.value)}
              />
            )}
          </Col>
        </Form.Group>


        {/* Identified Needs of the Partner Community */}
        <Form.Group as={Row} controlId="formNeeds" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Identified Needs of the Partner Community</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter identified needs"
              name="identified_needs_text"
              value={formData.identified_needs_text}
              onChange={handleChange || handleInputChange}
              style={{ overflow: "hidden" }}
              onBlur={validateIdentifiedNeeds}  // Validate when user leaves field
            />
            <div className="mt-3">or upload a file:</div>
            <Form.Control
              className="inputFile"
              type="file"
              name="identified_needs_file"
              onChange={(e) => {
                handleFileChange(e);
                validateIdentifiedNeeds(); // Validate as soon as file is uploaded
              }}
              onBlur={validateIdentifiedNeeds}
            />
            <p className='text-sm'>Max Size: 25MB</p>
            {errors.identified_needs && <p className="text-danger">{errors.identified_needs}</p>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formObjectives" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>General Objectives</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter general objectives"
              name="general_objectives"
              value={formData.general_objectives}
              required
              onChange={handleChange || handleInputChange}
              style={{ overflow: "hidden" }}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.general_objectives && <p className="text-danger">{errors.general_objectives}</p>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSpecificObjectives" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Specific Objectives</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter specific objectives"
              name="specific_objectives"
              value={formData.specific_objectives}
              required
              onChange={handleChange || handleInputChange}
              style={{ overflow: "hidden" }}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.specific_objectives && <p className="text-danger">{errors.specific_objectives}</p>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSuccessIndicators" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Success Indicators</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter success indicators"
              name="success_indicators"
              value={formData.success_indicators}
              required
              onChange={handleChange || handleInputChange}
              style={{ overflow: "hidden" }}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.success_indicators && <p className="text-danger">{errors.success_indicators}</p>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formCooperatingAgencies" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Cooperating Agencies</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter cooperating agencies"
              name="cooperating_agencies"
              value={formData.cooperating_agencies}
              required
              onChange={handleChange || handleInputChange}
              style={{ overflow: "hidden" }}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.cooperating_agencies && <p className="text-danger">{errors.cooperating_agencies}</p>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formMonitoringMechanics" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Monitoring Mechanics</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter monitoring mechanics"
              name="monitoring_mechanics"
              value={formData.monitoring_mechanics}
              required
              onChange={handleChange || handleInputChange}
              style={{ overflow: "hidden" }}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.monitoring_mechanics && <p className="text-danger">{errors.monitoring_mechanics}</p>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEvaluationMechanics" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Evaluation Mechanics</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter evaluation mechanics"
              required
              name="evaluation_mechanics"
              value={formData.evaluation_mechanics}
              onChange={handleChange || handleInputChange}
              style={{ overflow: "hidden" }}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.evaluation_mechanics && <p className="text-danger">{errors.evaluation_mechanics}</p>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTimetable" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Timetable</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter timetable"
              name="timetable"
              value={formData.timetable}
              required
              onChange={handleChange || handleInputChange}
              style={{ overflow: "hidden" }}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.timetable && <p className="text-danger">{errors.timetable}</p>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formRiskAssessment" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Risk Assessment</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter risk assessment"
              name="risk_assessment"
              value={formData.risk_assessment}
              required
              onChange={handleChange || handleInputChange}
              style={{ overflow: "hidden" }}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.risk_assessment && <p className="text-danger">{errors.risk_assessment}</p>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formActionPlans" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Action Plans to Address Risks</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter action plans to address risks"
              name="action_plans"
              value={formData.action_plans}
              required
              onChange={handleChange || handleInputChange}
              style={{ overflow: "hidden" }}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.action_plans && <p className="text-danger">{errors.action_plans}</p>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSustainabilityApproaches" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Sustainability Approaches</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter sustainability approaches"
              name="sustainability_approaches"
              value={formData.sustainability_approaches}
              required
              onChange={handleChange || handleInputChange}
              style={{ overflow: "hidden" }}
              onBlur={handleBlur} // Validate onBlur
            />
            {errors.sustainability_approaches && <p className="text-danger">{errors.sustainability_approaches}</p>}
          </Col>
        </Form.Group>

        {/* Budget Requirement */}
        <Form.Group as={Row} controlId="formBudgetRequirement" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Budget Requirement</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter budget requirement"
              name="budget_requirement_text"
              value={formData.budget_requirement_text}
              onChange={handleChange || handleInputChange}
              style={{ overflow: "hidden" }}
              onBlur={validateBudgetRequirement}  // Validate when user leaves field
            />
            <div className="mt-3">or upload a file:</div>
            <Form.Control
              className="inputFile"
              type="file"
              name="budget_requirement_file"
              onChange={(e) => {
                handleFileChange(e);
                validateBudgetRequirement(); // Validate as soon as file is uploaded
              }}
              onBlur={validateBudgetRequirement}
            />
            <p className='text-sm'>Max Size: 25MB</p>
            {errors.budget_requirement && <p className="text-danger">{errors.budget_requirement}</p>}
          </Col>
        </Form.Group>

        {/* Signatory List Section */}
        <h4>Signatory List</h4>
        <p className='text-sm mb-4'>Please provide names and titles/positions of individuals required to sign this document.</p>
        {/* Prepared By Section */}
        <h5 className="mb-3">Prepared By:</h5>
        {signatories.filter(s => s.section === 'prepared').length > 0 && (
          <ul>
            {signatories.filter(s => s.section === 'prepared').map((p, index) => (
              <li key={index}>
                {p.name} - {p.position}
              </li>
            ))}
          </ul>
        )}
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="preparedByName" // Unique name for "Prepared By" name field
                value={signatoryInput.preparedByName}
                onChange={handleSignatoryChange}
                onBlur={handleBlurSig}
                list="prepared-signatory-suggestions"
                placeholder="Enter name"
              />
              <datalist id="prepared-signatory-suggestions">
                {signatoryNames.map((name, index) => {

                  return <option key={index} value={name} />;
                })}
              </datalist>
            </Form.Group>
            {errors.preparedByName && <p className="text-danger">{errors.preparedByName}</p>}
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Position/Title</Form.Label>
              <Form.Control
                type="text"
                name="preparedByPosition" // Unique name for "Prepared By" position field
                value={signatoryInput.preparedByPosition}
                onChange={handleSignatoryChange}
                onBlur={handleBlurSig}
                placeholder="Enter position/title"
              />
            </Form.Group>
            {errors.preparedByPosition && <p className="text-danger">{errors.preparedByPosition}</p>}
          </Col>
        </Row>
        <Button
          variant="success"
          onClick={() => handleAddSignatory('prepared')}
          className="mb-4"
        >
          + Add Prepared By
        </Button>

        {/* Endorsed By Section */}
        <h5 className="mb-3">Endorsed By:</h5>
        {signatories.filter(s => s.section === 'endorsed').length > 0 && (
          <ul>
            {signatories.filter(s => s.section === 'endorsed').map((p, index) => (
              <li key={index}>
                {p.name} - {p.position}
              </li>
            ))}
          </ul>
        )}
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="endorsedByName" // Unique name for "Endorsed By" name field
                value={signatoryInput.endorsedByName}
                onChange={handleSignatoryChange}
                onBlur={handleBlurSig}
                list='endrosed-by-signatory-suggestions'
                placeholder="Enter name"
              />
              <datalist id="endrosed-by-signatory-suggestions">
                {signatoryNames.map((name, index) => (
                  <option key={index} value={name} />
                ))}
              </datalist>
            </Form.Group>
            {errors.endorsedByName && <p className="text-danger">{errors.endorsedByName}</p>}
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Position/Title</Form.Label>
              <Form.Control
                type="text"
                name="endorsedByPosition" // Unique name for "Endorsed By" position field
                value={signatoryInput.endorsedByPosition}
                onChange={handleSignatoryChange}
                onBlur={handleBlurSig}
                placeholder="Enter position/title"
              />
            </Form.Group>
            {errors.endorsedByPosition && <p className="text-danger">{errors.endorsedByPosition}</p>}
          </Col>
        </Row>
        <Button
          variant="success"
          onClick={() => handleAddSignatory('endorsed')}
          className="mb-4"
        >
          + Add Endorsed By
        </Button>

        {/* Concurred By Section */}
        <h5 className="mb-3">Concurred By:</h5>
        {signatories.filter(s => s.section === 'concurred').length > 0 && (
          <ul>
            {signatories.filter(s => s.section === 'concurred').map((p, index) => (
              <li key={index}>
                {p.name} - {p.position}
              </li>
            ))}
          </ul>
        )}
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="concurredByName" // Unique name for "Concurred By" name field
                value={signatoryInput.concurredByName}
                onChange={handleSignatoryChange}
                onBlur={handleBlurSig}
                list='concured-by-signatory-suggestions'
                placeholder="Enter name"
              />
              <datalist id="concured-by-signatory-suggestions">
                {signatoryNames.map((name, index) => (
                  <option key={index} value={name} />
                ))}
              </datalist>
            </Form.Group>
            {errors.concurredByName && <p className="text-danger">{errors.concurredByName}</p>}
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Position/Title</Form.Label>
              <Form.Control
                type="text"
                name="concurredByPosition" // Unique name for "Concurred By" position field
                value={signatoryInput.concurredByPosition}
                onChange={handleSignatoryChange}
                onBlur={handleBlurSig}
                placeholder="Enter position/title"
              />
            </Form.Group>
            {errors.concurredByPosition && <p className="text-danger">{errors.concurredByPosition}</p>}
          </Col>
        </Row>
        <Button
          variant="success"
          onClick={() => handleAddSignatory('concurred')}
          className="mb-4"
        >
          + Add Concurred By
        </Button>


        <div className="d-flex justify-content-end">
          <Button variant="success" type="submit" className="mt-4" id='formbtn' style={{ margin: '.5rem' }}>
            Submit
          </Button>
          <Button onClick={() => navigate("/coor/pending-proposal")} variant="danger" className="mt-4" id='formbtn' style={{ margin: '.5rem' }}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ProposalForm;
