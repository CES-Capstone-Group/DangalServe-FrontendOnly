import React, { useState, useRef, useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Col, Container, Form, InputGroup, Row, Modal } from "react-bootstrap";
import BtnResched from "../Buttons/BtnResched";
import BtnAddSchedule from "../Buttons/BtnAddSchedule"; // Import BtnAddSchedule

import { API_ENDPOINTS } from "../../config";
function AdminCalendar() {
    const calendarRef = useRef(null);
    const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
    const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [events, setEvents] = useState([]); // **State to store events fetched from backend**
    const [proposals, setProposals] = useState([]);
    const [proposalMap, setProposalMap] = useState({});



    const fetchActivities = async () => {
        fetch(API_ENDPOINTS.ACTIVITY_SCHEDULE_LIST)
            .then(response => {
                if (!response.ok) {
                    // Throw an error if the response is not okay
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse response as JSON
            })
            .then(data => {
                const formattedEvents = data.map(event => ({
                    id: event.id,
                    title: event.activity_title,
                    start: `${event.target_date}T${event.target_time}`,
                    extendedProps: {
                        proposal: event.proposal_title, // Assume you have 'proposal_title' in your backend
                        file: event.file,
                    }
                }));
                setEvents(formattedEvents);  // Set the events into state
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }
    useEffect(() => {
        fetchActivities();
    }, [currentYear]);

    // Handle event click to show modal with event details
    const handleEventClick = (clickInfo) => {
        const event = clickInfo.event;

        setSelectedEvent({
            proposal: event.extendedProps.proposal || "No proposal title",  // Ensure the proposal is passed
            activity: event.title || "No activity title",
            date: event.startStr.split('T')[0] || "No date",
            time: event.startStr.split('T')[1] || "No time",
        });

        setShowEventDetailsModal(true);  // Show the event details modal
    };

    // Function to open modal for creating new events
    const handleShowAddScheduleModal = (selectInfo) => {
        setSelectedDate(selectInfo.startStr);  // Get the start date from the selection
        setShowAddScheduleModal(true);  // Show the Add Schedule modal
    };

    // Function to close Add Schedule modal
    const handleCloseAddScheduleModal = () => {
        setShowAddScheduleModal(false);
        setSelectedDate(null);  // Reset the selected date when modal closes;

        fetchActivities();
    };

    // Function to close Event Details modal
    const handleCloseEventDetailsModal = () => {
        setShowEventDetailsModal(false);
        setSelectedEvent(null);  // Reset selected event when modal closes
    };

    const fetchProposals = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            console.error("No token found.");
            return;
        }

        try {
            const response = await fetch(`${API_ENDPOINTS.PROPOSAL_LIST_CREATE}?status=Approved by Barangay`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProposals(data);       

                // Create a title-to-id mapping for easy lookup
                const map = {};
                data.forEach((proposal) => {
                    map[proposal.title] = proposal.id; // Assuming `title` and `id` are keys in your proposal data
                });
                setProposalMap(map);
            } else {
                console.error("Error fetching proposals:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching proposals:", error);
        }
    };

    useEffect(() => {
        fetchProposals();
    }, []);


    const addNewEvent = (eventData) => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent(eventData); // Add the new event to the calendar

        setEvents((prevEvents) => [...prevEvents, eventData]);
        fetchActivities();
    };

    // Handle year change from the combo box
    const handleYearChange = (e) => {
        const newYear = e.target.value;
        setCurrentYear(newYear);  // Update the state
        const calendarApi = calendarRef.current.getApi();  // Get the calendar API
        calendarApi.gotoDate(`${newYear}-01-01`);  // Go to January 1st of the selected year
    };

    // Render modal dynamically based on selected event
    const renderEventModal = () => {
        if (!selectedEvent) return null;  // Return null if no event is selected
        const { proposal, activity, date, time } = selectedEvent;
        return (
            <Modal backdrop="static" centered size="lg" show={showEventDetailsModal} onHide={handleCloseEventDetailsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Activity Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="txtProposalTitle">
                            <Form.Label column sm={2} className="h5">Proposal Title:</Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        className="input"
                                        type="text"
                                        value={proposal || "No Proposal"} // Display the proposal title
                                        readOnly
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="txtActivityTitle">
                            <Form.Label column sm={2} className="h5">Activity Title:</Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        className="input"
                                        type="text"
                                        value={activity}
                                        readOnly
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="DateActivity">
                            <Form.Label column sm={2} className="h5">Target Date:</Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        className="input"
                                        type="date"
                                        value={date}
                                        readOnly
                                    />
                                </InputGroup>
                            </Col>
                            <Form.Label column sm={2} className="h5">Target Time:</Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        className="input"
                                        type="time"
                                        value={time}
                                        readOnly
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCloseEventDetailsModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <Container fluid>
            <h1>Admin Calendar</h1>
            <BtnResched />

            {/* Pass modal state and close function to BtnAddSchedule */}
            <BtnAddSchedule
                showModal={showAddScheduleModal}
                handleShowModal={handleShowAddScheduleModal}
                handleCloseModal={handleCloseAddScheduleModal}
                selectedDate={selectedDate}
                addNewEvent={addNewEvent}
            />

            {/* Dropdown to select the year */}
            <div className="calendar-header">
                <Form.Group controlId="yearSelect" className="mb-3">
                    <Form.Label>Select Year:</Form.Label>
                    <Form.Select
                        value={currentYear}
                        onChange={handleYearChange}
                        style={{
                            marginRight: '10px',
                            height: 'auto',
                            overflowY: 'auto'
                        }}
                    >
                        {Array.from({ length: 20 }, (_, index) => {
                            const year = new Date().getFullYear() - 5 + index;
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>
            </div>

            <div className="m-5">
                <Fullcalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={"dayGridMonth"}
                    height={'50em'}

                    customButtons={{
                        Legend: {
                            text: 'Legend:',
                        },
                        Extension: {
                            text: 'Extension',
                        },
                        Service: {
                            text: 'Service',
                        },
                    }}

                    headerToolbar={{
                        start: 'today,prev,next',
                        center: 'title',
                        end: 'Legend,Extension,Service',
                    }}

                    footerToolbar={{
                        start: '',
                        center: '',
                        end: '',
                    }}

                    // Set events fetched from the backend
                    events={events}

                    eventClick={handleEventClick}  // Handle event clicks

                    // Trigger modal on select
                    select={handleShowAddScheduleModal}
                    editable={true}
                    selectable={true}
                    dayMaxEvents={true}
                />
            </div>

            {/* Render the event modal */}
            {renderEventModal()}
        </Container>
    );
}

export default AdminCalendar;
