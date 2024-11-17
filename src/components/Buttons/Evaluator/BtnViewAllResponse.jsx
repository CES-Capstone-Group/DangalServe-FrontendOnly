import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BtnViewAllResponse = () => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '../responses';
        navigate(path);
    }

    return(
        <Button onClick={routeChange} className='me-3' style={{backgroundColor:"#71A872", border: '0px', color: 'white'}}>View All Responses</Button>             
    );
    
};

export default BtnViewAllResponse;