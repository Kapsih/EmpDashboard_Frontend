import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRef } from "react";
export default function UpdateForm() {
  const fileRef = useRef(null)
  const {user} = useAuthContext()
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    photoUrl: "",
  });
  const [photoUrl, setPhotoUrl] = useState();
  const [isLoading,setIsloading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };  
  const handleImageChange = async(e) => {
    setIsloading(true)
    console.log(e.target.files[0]);
  
     const img = e.target.files[0];
  

     console.log(img)
     const formData = new FormData();
     formData.append("file", img);
     formData.append("upload_preset", "ngsvh7oj");
     console.log(formData)
     await axios
       .post(
         "https://api.cloudinary.com/v1_1/dc4ypjcrp/image/upload",
         formData
       )
       .then((res) => {
      
         employee.photoUrl =res.data.url;
         setPhotoUrl(res.data.url);
         setIsloading(false)
       })
       .catch((err)=>{
        console.log(err)
        setIsloading(false);
       })
    }


  const Submit = async (e) => {
    e.preventDefault();
   
    axios
      .patch(`http://localhost:5000/emp-data/${id}`, employee, {
        headers: { Authorization: "Bearer " + user.token },
      })
      .then((response) => console.log(response))
      .catch((response) => console.log(response));
    navigate("/home");
  };
 
  const loadEmpDetails = async () => {
  
    const result = await axios.get(`http://localhost:5000/emp-data/${id}`, {
      headers: { Authorization: "Bearer " + user.token },
    });
    
    setEmployee(result.data.emp);
    setPhotoUrl(result.data.emp.photoUrl)
    
  };
  useEffect(() => {
    loadEmpDetails();
    
  }, []);

  return (
    <>
      <div  style={{display:"flex",flexDirection:"column" }}>
        <h1 style={{ display: "flex", justifyContent: "center", marginTop:"3%" }} className="text-body-secondary">Update Details Form</h1>
        <form style={{display:"flex",   justifyContent:"center", flexDirection:"column", marginTop:"1%" }}>
          <div className="row" style={{display:"flex",   justifyContent:"center"}}>
            <input ref={fileRef} className="form-control" hidden type="file"
                accept="images/*"
                onChange={handleImageChange}
                />
            <img src={photoUrl} onClick={()=>{fileRef.current.click()}}style={{ width:"175px",height:"170px",borderRadius: "50%"}}/>
            <p></p>
          </div>
          <br></br>
          <br></br>
          <div className="row" style={{display:"flex",   justifyContent:"center"}}>
              <label className="col-sm-1 col-form-label" htmlFor="name">
                 Name:
                </label>
              <div className="col-sm-3">
                 <input id="name" name="name" className="form-control" type="text" value={employee.name} onChange={handleInputChange} />
              </div>
          </div>

          <br></br>

          <div  className="row" style={{display:"flex",   justifyContent:"center"}}
          >
            <label className="col-sm-1 col-form-label" htmlFor="email">
              Email:
            </label>
            <div className="col-sm-3">
              <input
                id="email"
                className="form-control"
                name="email"
                type="email"
                value={employee.email}
                onChange={handleInputChange}
              />
            </div>
           
          </div>
         
             
          

            <br></br>

            <button disabled={isLoading}className="btn btn-primary col-sm-1" style={{ display: "flex", justifyContent: "center", width:"25%", margin:"0 auto" }} onClick={Submit}>Save</button>
        </form>
      </div>
    </>
  );
}
