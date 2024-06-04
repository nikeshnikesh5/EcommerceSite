import { Alert, Button } from "react-bootstrap";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"

const AddedToCartMessageComponent = ({setShowCartMessage,showCartMessage}) =>{
  
    const navigate = useNavigate();
   const goBack =() =>{
    navigate(-1)
   }
   
    return(
        <Alert show={showCartMessage} 
        variant="danger" 
        onClose={() => setShowCartMessage(false)} 
        dismissible >
          <Alert.Heading>On snap!!</Alert.Heading>
        <p>
            <Button variant="success" onClick={goBack}>Go Back</Button>{" "}
            <Link to="/cart">
                <Button variant="danger">GO to cart</Button>
            </Link>
        </p>
        </Alert>
    );
};

export default AddedToCartMessageComponent;