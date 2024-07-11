import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';



export default function AlertComp({AlertTitle,AlertText,AlertType}) {
    const [showAlert, setShowAlert] = useState("true")
 
    if (showAlert) {
        return (
          <Alert variant={AlertType} onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>{AlertTitle}</Alert.Heading>
            <p>
              {AlertText}
            </p>
          </Alert>
        );
      }
  
}
