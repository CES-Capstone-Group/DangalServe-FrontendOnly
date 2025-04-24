import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { API_ENDPOINTS } from "../../config";
import Chart from "chart.js/auto";

export const useInvolvementData = () => {
    const [chartData, setChartData] = useState({
        nonTeaching: null,
        teaching: null,
        participants: null,
        students: null,
        faculty: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.AFTER_ACTIVITY_EVALUATION_RESPONSES);
                const result = await response.json();

                console.log("API Response:", result);

                const quarterlyReport = result.detailed_quarterly_involvement_report;

                const transformData = (key) => {
                    const data = ["Q1", "Q2", "Q3", "Q4"].map((quarter) => {
                        const quarterData = quarterlyReport[quarter] || {};
                        const extensionValue = (quarterData.Extension?.[key] || 0);
                        const serviceValue = (quarterData.Service?.[key] || 0);
                        return { extension: extensionValue, service: serviceValue };
                    });

                    return {
                        labels: ["Q1", "Q2", "Q3", "Q4"],
                        datasets: [
                            {
                                type: "bar",
                                label: "Service",
                                data: data.map((d) => d.service),
                                backgroundColor: "rgb(50, 224, 230)",
                            },
                            {
                                type: "bar",
                                label: "Extension",
                                data: data.map((d) => d.extension),
                                backgroundColor: "rgb(45, 180, 214)",
                            },
                        ],
                    };
                };

                setChartData({
                    nonTeaching: transformData("NonTeaching"),
                    teaching: transformData("Teaching"),
                    participants: transformData("Participants"),
                    students: transformData("Student"),
                    faculty: transformData("Faculty"),
                });
            } catch (error) {
                console.error("Error fetching involvement data:", error);
            }
        };

        fetchData();
    }, []);

    return chartData;
};

const InvolvementReports = () => {
    const chartData = useInvolvementData();

    if (!chartData.nonTeaching) {
        return <p>Loading charts...</p>;
    }

    return (
        <div className="involvement-reports">
            <h2>Involvement Reports</h2>
            <div className="chart-container">
                <div className="chart">
                    <h3>Non-Teaching Personnel Involved</h3>
                    <Bar data={chartData.nonTeaching} />
                </div>
                <div className="chart">
                    <h3>Teaching Personnel Involved</h3>
                    <Bar data={chartData.teaching} />
                </div>
                <div className="chart">
                    <h3>External Participants Involved</h3>
                    <Bar data={chartData.participants} />
                </div>
                <div className="chart">
                    <h3>Students Personnel Involved</h3>
                    <Bar data={chartData.students} />
                </div>
                <div className="chart">
                    <h3>Faculty Personnel Involved</h3>
                    <Bar data={chartData.faculty} />
                </div>
            </div>
        </div>
    );
};

export default InvolvementReports;
