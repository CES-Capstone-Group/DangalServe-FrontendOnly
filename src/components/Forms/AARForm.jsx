import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import { API_ENDPOINTS } from '../../config';

function AfterActivityReport() {
    const [selectedAttachments, setSelectedAttachments] = useState([]);
    const location = useLocation();
    const { eventDetails, activity_schedule_id } = location.state || {}; // Retrieve the passed event details
    const { activity_title, target_date, activity_venue, activity_objectives, dept_name } = eventDetails || {}; // Destructure relevant details
    const [files, setFiles] = useState({});
    const [errors, setErrors] = useState("");
    const [text, setText] = useState("");
    const [objectiveAchieved, setObjectiveAchieved] = useState("");
    const navigate = useNavigate();

    const [reportData, setReportData] = useState(null);
    const [deptName, setDeptName] = useState(dept_name || "");
    const [highlightImages, setHighlightImages] = useState([]);
    const [budget, setBudget] = useState("");
    const [totalExpenses, setTotalExpenses] = useState("");
    const [revenueSavings, setRevenueSavings] = useState("");
    const [qualitativeEvaluation, setQualitativeEvaluation] = useState("");

    const [quantitativeEvaluations, setQuantitativeEvaluations] = useState([
        { parameter: "Clarity of Objectives", average: "", interpretation: "" },
        { parameter: "Relevance of Objectives", average: "", interpretation: "" },
        { parameter: "Attainment of Objectives", average: "", interpretation: "" },
        { parameter: "Alignment of Activity with Objectives", average: "", interpretation: "" },
        { parameter: "Extent to which the activity enriches the participants", average: "", interpretation: "" },
        { parameter: "Conduct of Activities", average: "", interpretation: "" },
        { parameter: "Time Management", average: "", interpretation: "" },
        { parameter: "Resource Speaker", average: "", interpretation: "" },
        { parameter: "General Average", average: "", interpretation: "" },
    ]);

    const validateQuantitativeEvaluations = () => {
        return quantitativeEvaluations.every(evaluation =>
            evaluation.parameter && evaluation.average && evaluation.interpretation
        );
    };

    const calculateSavings = (budget, expenses) => {
        // Automatically calculate revenue/savings whenever the budget or expenses change
        if (budget && expenses) {
            return (parseFloat(budget) - parseFloat(expenses)).toFixed(2); // Round to two decimal places
        }
        return 0; // Return 0 if either is undefined or null
    };
    useEffect(() => {
        // When either budget or totalExpenses changes, recalculate the savings
        const savings = calculateSavings(budget, totalExpenses);
        setRevenueSavings(savings); // Set the calculated savings
    }, [budget, totalExpenses]);

    useEffect(() => {
        console.log(eventDetails);
    }, []);

    const handleCheckboxChange = (isChecked, attachment) => {
        if (isChecked) {
            setSelectedAttachments([...selectedAttachments, attachment]);
        } else {
            setSelectedAttachments(selectedAttachments.filter(item => item !== attachment));
        }
    };

    const handleInputChange = (e) => {
        if (e.target.name === "qualitativeEvaluation") {
            setQualitativeEvaluation(e.target.value);
        } else {
            setText(e.target.value); // Handle other fields if needed
        }
        e.target.style.height = "auto"; // Reset the height
        e.target.style.height = `${e.target.scrollHeight}px`; // Set the new height
    };

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter((file) => file.size <= MAX_FILE_SIZE);

        if (validFiles.length < selectedFiles.length) {
            setErrors("Some files exceed the size limit of 5MB.");
        } else {
            setErrors("");
            setHighlightImages((prevImages) => [...prevImages, ...validFiles]);
        }
    };

    const handleEvaluationChange = (index, field, value) => {
        const updatedEvaluations = [...quantitativeEvaluations]; // Create a copy
        updatedEvaluations[index][field] = value; // Update the specific field
        setQuantitativeEvaluations(updatedEvaluations); // Update the state
    };

    const handleFileUpload = (attachment, files) => {
        if (files.length >= 5) {
            setFiles({ ...files, [attachment]: files });
        }
        else {
            setErrors("Activity Highlight should atleast contain 5 Photos");
            alert("Activity Highlight should atleast contain 5 Photos");
        }
    };

    const handleAttachmentFileChange = (type, file) => {
        setSelectedAttachments((prevAttachments) => [
            ...prevAttachments.filter((attachment) => attachment.type !== type),
            { type, file },
        ]);
    };

    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        if (!budget || !totalExpenses || !revenueSavings) {
            setErrors("Budget, Total Expenses, and Revenue/Savings are required.");
            return false;
        }
        if (highlightImages.length < 5) {
            setErrors("Please upload at least 5 images.");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateQuantitativeEvaluations()) {
            setErrors("Please fill out all fields in quantitative evaluations.");
            return;
        }
        if (highlightImages.length < 5) {
            setErrors("Please upload at least 5 images for the activity highlights.");
            return;
        }

        if (!budget || !totalExpenses || !revenueSavings) {
            setErrors("Budget, Total Expenses, and Revenue/Savings are required.");
            return;
        }

        if (!validateForm()) return;

        const formData = new FormData();

        if (!activity_schedule_id) {
            setErrors("Activity Schedule ID is required.");
            return;
        }
        formData.append("activity_schedule_id", activity_schedule_id);
        formData.append("title", activity_title || "");
        formData.append("department", deptName || "");
        formData.append("venue", activity_venue || "");
        formData.append("objectives", activity_objectives || "");
        formData.append("target_date", target_date || "");
        formData.append("budget", parseFloat(budget) || 0);
        formData.append("total_expenses", parseFloat(totalExpenses) || 0);
        formData.append("revenue_savings", parseFloat(revenueSavings) || 0);
        formData.append("qualitative_evaluation", qualitativeEvaluation || "");
        formData.append("objectives_achieved", objectiveAchieved || "");
        formData.append("activity_highlights", "Highlights of the activity");
        // Attach quantitative evaluations
        quantitativeEvaluations.forEach((evaluation, index) => {
            formData.append(`quantitative_evaluations[${index}][parameter]`, evaluation.parameter);
            formData.append(`quantitative_evaluations[${index}][average]`, evaluation.average);
            formData.append(`quantitative_evaluations[${index}][interpretation]`, evaluation.interpretation);
        });

        // Attach highlight images
        highlightImages.forEach((image, index) => {
            if (image instanceof File) {
                formData.append(`highlight_images_${index}`, image);
            } else {
                console.error(`Invalid image at index ${index}`);
            }
        });

        // Attach additional attachments
        selectedAttachments.forEach((attachment, index) => {
            if (attachment.type && attachment.file) {
                formData.append(`attachments[${index}][type]`, attachment.type);
                formData.append(`attachments[${index}][file]`, attachment.file);
            } else {
                console.warn(`Skipping attachment at index ${index} due to missing type or file`);
            }
        });

        setLoading(true); // Start loading
        // POST request to create a new ARR
        fetch(API_ENDPOINTS.REPORTS, { method: "POST", body: formData })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((error) => {
                        throw new Error(error.message || "An error occurred.");
                    });
                }
                console.log(formData);

                return response.json();
            })
            .then(() => {

                alert("Report saved successfully!");
                navigate("/coor/event-detail"); // Redirect to the home page or another route
            })
            .catch((error) => {
                setErrors(error.message);
                console.error("Error:", error);
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
        console.log(formData);
    };


    return (
        <Container>
            <h1 className="my-4" style={{ textAlign: 'center' }} id='propHeader'>After-Activity Report</h1>
            <Form className='form'>
                {errors && <div className="alert alert-danger">{errors}</div>}
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="divisionDepartment">
                            <Form.Label className='h4'>Division/Department/Office</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                defaultValue={dept_name || ""}
                                onChange={(e) => setDeptName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="activityTitle">
                            <Form.Label className='h4'>Title of the Activity</Form.Label>
                            <Form.Control type="text" readOnly disabled defaultValue={eventDetails.activity_title || ""} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="date">
                            <Form.Label className='h4'>Date</Form.Label>
                            <Form.Control readOnly disabled defaultValue={target_date || ""} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="venue">
                            <Form.Label className='h4'>Venue</Form.Label>
                            <Form.Control type="text" readOnly disabled defaultValue={eventDetails.activity_venue || ""} />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="activityObjectives">
                    <Form.Label className='h4'>Activity Objectives</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        readOnly
                        disabled
                        defaultValue={eventDetails.activity_objectives || "N/A"}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className='h4'>Were the objectives achieved?</Form.Label>
                    <div>
                        <Form.Check
                            type="radio"
                            required
                            id="fully"
                            label="Fully"
                            name="objectivesAchieved"
                            value="Fully"
                            checked={objectiveAchieved === "Fully"} // Add this
                            onChange={(e) => setObjectiveAchieved(e.target.value)}
                        />
                        <Form.Check
                            type="radio"
                            id="partially"
                            label="Partially"
                            name="objectivesAchieved"
                            value="Partially"
                            checked={objectiveAchieved === "Partially"} // Add this
                            onChange={(e) => setObjectiveAchieved(e.target.value)}
                        />
                        <Form.Check
                            type="radio"
                            id="notAtAll"
                            label="Not at all"
                            name="objectivesAchieved"
                            value="Not at all"
                            checked={objectiveAchieved === "Not at all"} // Add this
                            onChange={(e) => setObjectiveAchieved(e.target.value)}
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="activityHighlight">
                    <Form.Label className='h4'>Activity Highlight</Form.Label>
                    <Form.Control as="textarea" required onChange={handleInputChange} style={{ overflow: "hidden" }} rows={3} placeholder="Enter activity highlights" />
                </Form.Group>

                {/* Activity Highlight Images */}
                <Form.Group controlId="activityHighlightPhotos">
                    <Form.Label>Activity Highlight (Upload at least 5 photos)</Form.Label>
                    <Form.Control
                        type="file"
                        multiple
                        required
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {errors && <div style={{ color: "red", marginTop: "10px" }}>{errors}</div>}
                    {/* Preview selected images */}
                    <div className="mt-3">
                        {highlightImages.map((image, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt={`highlight-${index}`}
                                style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }}
                            />
                        ))}
                    </div>
                </Form.Group>

                <h3 className="mt-5">Quantitative Evaluation Parameters</h3>

                <Table bordered className="tableStyle">
                    <thead>
                        <tr>
                            <th>Parameters</th>
                            <th>Average (1-5)</th>
                            <th>Verbal Interpretation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quantitativeEvaluations.map((evaluation, index) => (
                            <tr key={index}>
                                <td>{evaluation.parameter}</td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        max="5"
                                        placeholder="Rate 1-5"
                                        value={evaluation.average}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            // Allow empty input to let users backspace
                                            if (value === "") {
                                                handleEvaluationChange(index, 'average', value);
                                            } else if (/^\d+$/.test(value) && value >= 1 && value <= 5) {
                                                // Allow only numbers between 1 and 5
                                                handleEvaluationChange(index, 'average', value);
                                            }
                                        }}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        as="textarea"
                                        rows={1}
                                        style={{ overflow: "hidden" }}
                                        placeholder="Verbal interpretation"
                                        value={evaluation.interpretation}
                                        onChange={(e) => handleEvaluationChange(index, 'interpretation', e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Form.Group className="mb-3" controlId="qualiEval">
                    <Form.Label className='h4'>Qualitative Evaluation</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="qualitativeEvaluation"  // Add a name attribute to specify it's for qualitative evaluation
                        onChange={handleInputChange}
                        required
                        value={qualitativeEvaluation}  // Bind to qualitativeEvaluation state
                        style={{ overflow: "hidden" }}
                        rows={3}
                        placeholder="This can be culled from comments and suggestions of the Activity Evaluation Form."
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="qualiEval">
                    <Form.Label className="h4">Budget</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter budget"
                        value={budget}
                        required
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) { // Allow only numbers (including empty input for backspacing)
                                setBudget(value);
                            }
                        }}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="totalExpenses">
                            <Form.Label className="h4">Total Expenses</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter total expenses"
                                value={totalExpenses}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) { // Allow only numbers (including empty input for backspacing)
                                        setTotalExpenses(value);
                                    }
                                }}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="revenueSavings">
                            <Form.Label className='h4'>Revenue/Savings</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly
                                disabled
                                value={revenueSavings}
                                onChange={(e) => setRevenueSavings(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="attachments">
                    <Form.Label className="h4">Attachments</Form.Label>

                    {['Program Invitation', 'Actual Program of Activities', 'Relevant Photographs', 'Attendance', 'Financial Report', 'Souvenir Magazine', 'Others'].map((attachment, index) => (
                        <div key={index} className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label={attachment}
                                onChange={(e) => handleCheckboxChange(e.target.checked, attachment)}
                            />
                            {selectedAttachments.includes(attachment) && (
                                <Form.Control
                                    type="file"
                                    accept={attachment === "Relevant Photographs"
                                        ? ".jpg,.jpeg,.png" // Allow images for "Relevant Photographs"
                                        : ".pdf"           // Allow only PDFs for all other attachments
                                    }
                                    onChange={(e) => handleAttachmentFileChange(attachment, e.target.files[0])}
                                />
                            )}
                        </div>
                    ))}
                </Form.Group>

                <div className="d-flex justify-content-end">
                    <Button
                        variant="success"
                        type="submit"
                        className="mt-4"
                        onClick={handleSubmit}
                    // disabled={loading} // Disable while loading
                    >
                        {/* {loading ? "Submitting..." : "Submit"} */}
                        Submit
                    </Button>
                    <Button
                        onClick={() => navigate(-1)}
                        variant="danger"
                        className="mt-4 ms-3"
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
            <div style={{ padding: '10px' }}></div>
        </Container>
    );
}

export default AfterActivityReport;
