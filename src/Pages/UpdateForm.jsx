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
        <h1 style={{textAlign:"center"}}>Update Details Form</h1>
        <form className='formBox'>   

                <label htmlFor="name">Name:</label>
                 <input id="name" name="name"  type='text' value={employee.name} onChange={handleInputChange} />
                 <br></br>

                <label htmlFor="empId">EmpId:</label>
                 <input id="empId" name="empId" type='text' value={employee.empId} onChange={handleInputChange} />
                    <br></br>

                 <label htmlFor="email">Email:</label>
                 <input id="email" name="email" type='email' value={employee.email} onChange={handleInputChange}/>
                 <br></br>

                 <input style={{margin:"auto"}} type='file'  accept='images/*' onChange={handleImageChange} />
                 <br></br>
                 <button type="button" onClick={uploadImage} >Upload Image</button>
                 <button onClick={Submit} > Upload Data</button>
        </form>
        <button className="btn" onClick={()=>{navigate("/")}}>Go Home</button>
    </>
  )
}
