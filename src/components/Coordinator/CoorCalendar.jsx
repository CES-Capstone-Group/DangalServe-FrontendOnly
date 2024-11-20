import React, { useRef, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import { Container, Form } from "react-bootstrap";
import BtnResched from "../Buttons/BtnResched";
import BtnAddSchedule from "../Buttons/BtnAddSchedule";

function CoorCalendar() {
    const calendarRef = useRef(null);
    const [showModal, setShowModal] = useState(false);  
    const [selectedDate, setSelectedDate] = useState(null);  
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // Function to open modal
    const handleShowModal = (selectInfo) => {
        setSelectedDate(selectInfo.startStr);  // Get the start date from the selection
        setShowModal(true);  // Show the modal
    };

    // Function to close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDate(null);  // Reset the selected date when modal closes
    };

    // Function to add new event to FullCalendar
    const addNewEvent = (eventData) => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent(eventData);  // Add the new event to the calendar
    };

    // Handle year change from the combo box
    const handleYearChange = (e) => {
        const newYear = e.target.value;
        setCurrentYear(newYear);  // Update the state
        const calendarApi = calendarRef.current.getApi();  // Get the calendar API
        calendarApi.gotoDate(`${newYear}-01-01`);  // Go to January 1st of the selected year
    };

    return (
        <Container fluid>
            <h1>Admin Calendar</h1>
            <BtnResched />
            
            {/* Pass modal state and close function to BtnAddSchedule */}
            <BtnAddSchedule
                showModal={showModal}
                handleShowModal={() => setShowModal(true)}
                handleCloseModal={handleCloseModal}
                selectedDate={selectedDate}
                addNewEvent={addNewEvent}
            />

                        
            {/* Dropdown to select the year */}
            <div className="calendar-header">
                <Form.Group controlId="yearSelect" className="mb-3">
                    <Form.Label>Select Year:</Form.Label>
                    <Form.Select     value={currentYear} 
                    onChange={handleYearChange} 
                    style={{ 
                        marginRight: '10px', 
                        height: 'auto',
                        overflowY: 'auto'    
                    }}>
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
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, ]} 
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

                    // Trigger modal on select
                    select={handleShowModal}
                    editable={true}
                    selectable={true}
                    dayMaxEvents={true}
                />
            </div>
        </Container>
    );
}

export default CoorCalendar;
