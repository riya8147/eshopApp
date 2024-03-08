import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@material-ui/core';
import axios from 'axios';

const CreateOrderPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleConfirmOrder = async () => {
    // Logic to confirm the order
    try {
      // Call backend API to create the order
      await axios.post('/api/v1/orders');
      // Display confirmation message
      alert('Your order is confirmed.');
    } catch (error) {
      console.error('Error confirming order:', error);
      // Handle error
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleProductSelection = (product) => {
    setSelectedProduct(product);
    handleNext(); // Proceed to the next step upon selecting a product
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step key="Order">
          <StepLabel>Order</StepLabel>
        </Step>
        <Step key="Address">
          <StepLabel>Address</StepLabel>
        </Step>
        <Step key="Confirm">
          <StepLabel>Confirm</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 0 && (
        <div>
          {/* Render product selection component */}
          <Button variant="contained" color="primary" onClick={() => handleProductSelection(/* pass selected product */)}>
            Next
          </Button>
        </div>
      )}
      {activeStep === 1 && (
        <div>
          {/* Render address form component */}
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
          <Button onClick={handleBack}>Back</Button>
        </div>
      )}
      {activeStep === 2 && (
        <div>
          {/* Render order confirmation component */}
          <Button variant="contained" color="primary" onClick={handleConfirmOrder}>
            Confirm Order
          </Button>
          <Button onClick={handleBack}>Back</Button>
        </div>
      )}
    </div>
  );
};

export default CreateOrderPage;
