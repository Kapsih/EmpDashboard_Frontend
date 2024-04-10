import React,{useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom"


export default function UpdateForm() {
 
  const {id} = useParams();

    const [employee, setEmployee] = useState({
      name:"",
      email:"",
      empId:0,
      photoUrl:"",    
    })
    const [image,setImage] = useState(undefined)
 
    const navigate = useNavigate()

    const handleInputChange = (e)=>{
      const {name,value} = e.target;
      setEmployee(prevEmployee=>({
        ...prevEmployee,
        [name]:value
      }))
    }
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    
  };

    const uploadImage = ()=>{
        const formData = new FormData();
        formData.append("file",image);
        formData.append("upload_preset", "ngsvh7oj")
        
        axios.post("https://api.cloudinary.com/v1_1/dc4ypjcrp/image/upload",formData)
        .then((res)=>{
          employee.photoUrl = res.data.url;
          
        })
      
        alert("Image Uploaded successfully!")
    }
    
    const Submit = (e)=>{
      e.preventDefault()
     
      axios.patch(`http://localhost:5000/emp-data/${id}`, employee)
      .then((response)=>console.log(response))
      .catch((response)=>console.log(response))
      navigate("/")
      
      }
      const loadEmpDetails = async()=>{
          const result = await axios.get(`http://localhost:5000/emp-data/${id}`)
          setEmployee(result.data.emp)
        
      }
      useEffect(()=>{
        loadEmpDetails()
      },[])

  return (

    <>
        <h1 style={{textAlign:"center"}} className="text-body-secondary" >Update Details Form</h1>
        <br></br>
        <br></br>
        <form>   
                <div className="row">
                  <label className="col-sm-1 col-form-label" htmlFor="name">Name:</label>
                  <div className="col-sm-4">
                    <input id="name" name="name" className="form-control" type='text' value={employee.name} onChange={handleInputChange} />
                  </div>
                 </div>
                 
                 <br></br>
               
                <div className="row">
                  <label className="col-sm-1 col-form-label" htmlFor="empId">EmpId:</label>
                  <div className="col-sm-4">
                    <input id="empId" name="empId" className="form-control" type='text' value={employee.empId} onChange={handleInputChange} />
                  </div>
                </div>

                <br></br>
                
                <div className="row">
                  <label className="col-sm-1 col-form-label" htmlFor="email">Email:</label>
                  <div className="col-sm-4">
                      <input id="email" className="form-control" name="email" type='email' value={employee.email} onChange={handleInputChange}/>

                  </div>
                </div>

                <br></br>

                <div className="col-sm-3 ms-3">
                  <input className="form-control"  style={{margin:"auto"}} type='file'  accept='images/*' onChange={handleImageChange} />
                </div>

                 <br></br>

                 <button className="btn btn-primary col-sm-1" style={{margin:"5px", borderRadius:"10px"}} type="button" onClick={uploadImage} >Upload Image</button>
                 <button className="btn btn-primary col-sm-1" style={{margin:"5px", borderRadius:"10px"}} onClick={Submit} > Upload Data</button>
        </form>
        <button className="btn btn-primary" style={{margin:"5px", borderRadius:"10px", textAlign:"center"}} onClick={()=>{navigate("/")}}>Go Home</button>
    </>
  )
}
