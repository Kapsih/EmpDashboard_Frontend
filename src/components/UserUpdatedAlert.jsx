
import Alert from 'react-bootstrap/Alert';
import { useMediaQuery } from 'react-responsive';



export default function UserUpdatedAlert({setShowAlert, showAlert}) {
    
  const isMobileScreen = useMediaQuery({
    query: "(max-width: 768px)",
  });
   
        return (
          <Alert style={{marginTop:isMobileScreen?"4%":"0.5%", height:"55px", width:isMobileScreen?"97.5%":"20%", display:"flex", justifyContent:"center"}} variant="success" onClose={() => setShowAlert(showAlert.AlertType="", showAlert.show= false)} dismissible>
            <p >
              User successfully updated!
            </p>
          </Alert>
        );
      
  
}
