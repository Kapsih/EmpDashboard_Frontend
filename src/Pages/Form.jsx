import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
export default function UpdateForm() {
  const {user} = useAuthContext()
  
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password:"",
    photoUrl: "",
  });
  const [image, setImage] = useState(undefined);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


 

  const Submit = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ngsvh7oj");

      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dc4ypjcrp/image/upload",
          formData
        )
        .then((res) => {
          employee.photoUrl = res.data.url
         
        });
    }

     
    
    await axios
      .post('http://localhost:5000/emp-data', employee, {
        headers: { Authorization: "Bearer " + user.token }
      })
      .then((response) => console.log(response))
      .catch((response) => console.log(response));
       navigate("/home");
  };

  return (
    <>
      <div  style={{display:"flex",flexDirection:"column" }}>
        <h1 style={{ display: "flex", justifyContent: "center", marginTop:"3%" }} className="text-body-secondary">Add Employee Form</h1>
        <form style={{display:"flex",   justifyContent:"center", flexDirection:"column", marginTop:"3%" }}>
         
          <div className="row" style={{display:"flex",   justifyContent:"center"}}>
              <label className="col-sm-1 col-form-label" htmlFor="name">
                 Name:
                </label>
              <div className="col-sm-3">
                 <input id="name" name="name" className="form-control" type="text"  value={employee.name} onChange={handleInputChange} />
              </div>
          </div>

          <br></br>

          <div  className="row" style={{display:"flex",   justifyContent:"center"}}>
            <label className="col-sm-1 col-form-label" htmlFor="email">
              Email:
            </label>
            <div className="col-sm-3">
              <input
                id="email"
                className="form-control"
                name="email"
                type="email"
                value={employee.email} onChange={handleInputChange}
              />
            </div>

          </div>
         
          <br></br>
          <div className="row" style={{display:"flex",   justifyContent:"center"}}>
              <label className="col-sm-1 col-form-label" htmlFor="Password">
                Password
              </label>
              <div className="col-sm-3">
                <input
                id="Password"
                  type="password"
                  name="password"
                  className="form-control"
                  value={employee.password} onChange={handleInputChange}
                />
              </div>
            </div>

          <div
              className="row"
              style={{ display: "flex", justifyContent: "center", width:"25%", margin:"2% auto" }}
            >
              <input className="form-control" type="file"
                accept="images/*"
               onChange={handleImageChange}
              />
            </div>

            <br></br>

            <button className="btn btn-primary col-sm-1" style={{ display: "flex", justifyContent: "center", width:"25%", margin:"0 auto" }}onClick={Submit}>Save</button>
        </form>
      </div>
    </>
  );
}
