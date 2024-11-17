import React from "react";
import { Button } from "react-bootstrap";

const BtnRecieveReturn = () => {
    return(
        <>
            <Button className='mt-2 mb-2 ms-5 me-3' style={{backgroundColor:"#71A872", border: '0px', color: 'white'}}>Recieve</Button>   
            <Button className='mt-2 mb-2' style={{backgroundColor:"#71A872", border: '0px', color: 'white'}}>Return</Button>            
        </>
    );
    
};

export default BtnRecieveReturn;