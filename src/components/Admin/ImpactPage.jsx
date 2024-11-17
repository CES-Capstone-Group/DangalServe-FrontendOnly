import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { API_ENDPOINTS } from '../../config';

const ImpactPage = () => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [averages, setAverages] = useState([]);
    const [assessmentParagraphs, setAssessmentParagraphs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch activities from the backend
    const fetchActivities = async () => {
        try {
            const response = await fetch(`${API_ENDPOINTS.ACTIVITY_SCHEDULE_LIST}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setActivities(data);
            // Set the default selected activity to the first in the list
            if (data.length > 0) {
                setSelectedActivity(data[0].id);
            }
            // console.log(activities);
            setLoading(false); // Set loading to false after activities are fetched
        } catch (error) {
            console.error("Error fetching activities:", error);
            setLoading(false); // Set loading to false even if there is an error
        }
    };

    // Fetch impact data for the selected activity
    const fetchImpactData = async () => {
        if (!selectedActivity) return;

        setLoading(true);
        try {
            const newAverages = [];
            const newParagraphs = [];

            // Loop through question numbers from 1 to 11
            for (let questionNumber = 1; questionNumber <= 11; questionNumber++) {
                const response = await fetch(
                    `${API_ENDPOINTS.IMPACT_EVAL_SUMMARY}?activity_id=${selectedActivity}&question_number=${questionNumber}`
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                newAverages.push(parseFloat(data[`Q${questionNumber}_average`] || 0));
                newParagraphs.push(data.assessment_paragraph);
            }

            setAverages(newAverages);
            setAssessmentParagraphs(newParagraphs);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Ensure loading is set to false after data fetching completes
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    useEffect(() => {
        fetchImpactData();
    }, [selectedActivity]);

    const graphData = {
        labels: [
            "Q1: Goal Achievement",
            "Q2: Effectiveness",
            "Q3: Logistics",
            "Q4: Support",
            "Q5: Engagement",
            "Q6: Awareness",
            "Q7: Collaboration",
            "Q8: Participation",
            "Q9: Impact",
            "Q10: Future Interest",
            "Q11: Overall Experience"
        ],
        datasets: [
            {
                label: "Average Score",
                data: averages,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true, min: 0, max: 3, ticks: { stepSize: 0.5 } },
            x: { ticks: { maxRotation: 0, minRotation: 0 } }
        }
    };

    return (
        <Container>
            <h3 className="mb-4">Impact Evaluation Results</h3>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Activity</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedActivity || ''}
                            onChange={(e) => setSelectedActivity(e.target.value)}
                        >                        
                            {activities.map(activity => (
                                <option key={activity.id} value={activity.id}>
                                    {activity.activity_title}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <div style={{ height: '400px' }}>
                        <Bar data={graphData} options={chartOptions} />
                    </div>
                    <div className="mt-4 d-flex flex-wrap">
                        {averages.map((avg, index) => (
                            <div key={index} className="mb-3" style={{ flex: '0 0 50%', paddingRight: '1rem' }}>
                                <h5>{graphData.labels[index]}</h5>
                                <p>{assessmentParagraphs[index] || "No feedback data is available for this question."}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </Container>
    );
};

export default ImpactPage;
