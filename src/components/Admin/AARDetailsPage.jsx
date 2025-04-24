import React, { useEffect, useState } from "react";
import { Container, Card, Button, Table, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { API_ENDPOINTS } from "../../config";

const AARDetailsPage = () => {
    const location = useLocation();
    const { activity_schedule_id } = location.state || {};

    const [aarDetails, setAarDetails] = useState(null);
    const [mergedPdfUrl, setMergedPdfUrl] = useState(null);

    useEffect(() => {
        const fetchAarDetails = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.AAR_DETAILS_VIEW(activity_schedule_id));
                if (response.ok) {
                    const data = await response.json();
                    setAarDetails(data.aar_details);
                    setMergedPdfUrl(data.merged_pdf_url);
                } else {
                    console.error("Failed to fetch AAR details");
                }
            } catch (error) {
                console.error("Error fetching AAR details:", error);
            }
        };

        fetchAarDetails();
    }, [activity_schedule_id]);

    if (!aarDetails) {
        return <p>Loading AAR details...</p>;
    }

    return (
        <Container className="my-4">
            <Card className="shadow p-4">
                <Card.Body>
                    <Card.Title>{aarDetails.title}</Card.Title>
                    <Card.Text><strong>Department:</strong> {aarDetails.department}</Card.Text>
                    <Card.Text><strong>Target Date:</strong> {aarDetails.target_date}</Card.Text>
                    <Card.Text><strong>Venue:</strong> {aarDetails.venue}</Card.Text>
                    <Card.Text><strong>Objectives:</strong> {aarDetails.objectives}</Card.Text>
                    <Card.Text><strong>Objectives Achieved:</strong> {aarDetails.objectives_achieved || "N/A"}</Card.Text>
                    <Card.Text><strong>Activity Highlights:</strong> {aarDetails.activity_highlights || "N/A"}</Card.Text>
                    <Card.Text><strong>Budget:</strong> {aarDetails.budget}</Card.Text>
                    <Card.Text><strong>Total Expenses:</strong> {aarDetails.total_expenses}</Card.Text>
                    <Card.Text><strong>Revenue Savings:</strong> {aarDetails.revenue_savings}</Card.Text>
                    <Card.Text><strong>Qualitative Evaluation:</strong> {aarDetails.qualitative_evaluation}</Card.Text>
                </Card.Body>
            </Card>

            <h4 className="mt-4">Quantitative Evaluations</h4>
            {aarDetails.quantitative_evaluations && aarDetails.quantitative_evaluations.length > 0 ? (
                <Table bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Average</th>
                            <th>Interpretation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aarDetails.quantitative_evaluations.map((evaluation, index) => (
                            <tr key={index}>
                                <td>{evaluation.parameter}</td>
                                <td>{evaluation.average}</td>
                                <td>{evaluation.interpretation}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="mt-3 text-muted">No quantitative evaluations available.</p>
            )}

            <h4 className="mt-4">Photos</h4>
            {aarDetails.photos && aarDetails.photos.length > 0 ? (
                <div className="d-flex flex-wrap mt-3">
                    {aarDetails.photos.map((photo, index) => {
                        // Log the computed src value
                        const photoSrc = `${API_ENDPOINTS.MEDIA_BASE_URL}${photo.photo}`;
                        console.log(`Photo ${index}: ${photoSrc}`); // Log the src URL for each photo

                        return (
                            <div key={index} className="m-2">
                                <a href={photoSrc} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={photoSrc}
                                        alt={`Highlight ${index}`}
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                                </a>
                                {photo.description && <p className="text-center mt-2">{photo.description}</p>}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="mt-3 text-muted">No photos available.</p>
            )}

            {mergedPdfUrl ? (
                <Button className="mt-3" href={mergedPdfUrl} target="_blank" variant="primary">
                    View Merged PDF
                </Button>
            ) : (
                <p className="mt-3 text-danger">No PDF attachments available.</p>
            )}
        </Container>
    );
};

export default AARDetailsPage;
