
import Alert from 'react-bootstrap/Alert';
import { useMediaQuery } from 'react-responsive';



export default function UserCreatedAlert({setShowAlert, showAlert}) {
    // const [showAlert, setShowAlert] = useState("true")
    const isMobileScreen = useMediaQuery({
      query: "(max-width: 768px)",
    });
 
        return (
          <Alert  style={{marginTop:isMobileScreen?"3%":"0.5%", height:"55px", width:isMobileScreen?"100%":"20%", display:"flex", justifyContent:"center"}} variant="success" onClose={() => setShowAlert(showAlert.AlertType="", showAlert.show= false)} dismissible>

            <p>
              User successfully created!
            </p>
          </Alert>
        );
      
  
}
