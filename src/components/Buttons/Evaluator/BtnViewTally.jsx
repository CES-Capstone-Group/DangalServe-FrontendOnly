import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BtnViewTally = () => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/manage/eval-sum';
        navigate(path);
    }

    return(
        <Button onClick={routeChange} className='me-3' style={{backgroundColor:"#71A872", border: '0px', color: 'white'}}>View Summary</Button>             
    );
    
};

export default BtnViewTally;