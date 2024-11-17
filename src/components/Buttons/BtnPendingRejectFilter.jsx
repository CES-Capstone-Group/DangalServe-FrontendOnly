import React from "react";
import { Button } from "react-bootstrap";  // Correctly import Button from react-bootstrap

const BtnPendingRejectFilter = ({ setFilterStatus }) => {
    // Move the handleFilterChange logic here
    const handleFilterChange = (status) => {
        setFilterStatus(status);  // Set the filter status when button is clicked
    };

    return (
        <>
            <Button onClick={() => handleFilterChange("Pending")} variant="success" className="me-2">
                Pending
            </Button>
            <Button onClick={() => handleFilterChange("Rejected")} variant="warning" className="me-2">
                Rejected
            </Button>
        </>
    );
};

export default BtnPendingRejectFilter;