import React,{useState} from 'react'
// import "../Styles/form.css"
import axios from "axios";
import {useNavigate} from "react-router-dom"


export default function Form() {
    const [name,setName] = useState(null);
    const   [empId,setempId] = useState(null)
    const [email,setEmail] = useState(null);
    const [image,setImage] = useState(undefined);
    const [imgUrl, setImgUrl] = useState(null);
    const navigate = useNavigate()
  
    
    const uploadImage = ()=>{
        const formData = new FormData();
        formData.append("file",image);
        formData.append("upload_preset", "ngsvh7oj")
        
        axios.post("https://api.cloudinary.com/v1_1/dc4ypjcrp/image/upload",formData)
        .then((res)=>{
          setImgUrl(res.data.url)

        })
      
        alert("Image Uploaded successfully!")
    }
    
    const Submit = (e)=>{
      e.preventDefault()
      if(!name || !empId || !email || !imgUrl ){
        alert("Please enter data in all the fields.")
        return
      }
      axios.post("http://localhost:5000/emp-data", {name: name,
      email: email,
      empId: empId,
      photoUrl: imgUrl,})
      .then((response)=>console.log(response))
      .catch((response)=>console.log(response))
      navigate("/")
      }
      

  return (

    <>
        <h1 style={{textAlign:"center"}} className="text-body-secondary">Employee profile form</h1>
        <br></br>
        <form >   
                 <div className="row">
                    <label htmlFor="name" className="col-sm-1 col-form-label">Name:</label>
                    <div className="col-sm-4"> 
                      <input id="name"  type="text" className="form-control" onChange={(e)=>{setName(e.target.value)}} />
                    </div>
                  </div>         
               
                  <br></br>

             
                <div className="row">
                   <label htmlFor="empId" className="col-sm-1 col-form-label" >EmpId:</label>
                   <div className="col-sm-4">
                      <input id="empId" type="text" className="form-control" onChange={(e)=>{setempId(e.target.value)}} />
                   </div>
                </div>
                
                <br></br>
                 

                  <div className='row'>
                    <label className="col-sm-1 col-form-label" htmlFor="email">Email:</label>
                    <div className="col-sm-4">
                      <input id="email" className='form-control' type='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                  </div>
                 
                 <br></br>
                <br></br>

                  <div className="col-sm-3 ms-3" >
                     <input className="form-control"  type='file' accept='images/*' onChange={(e)=>{setImage(e.target.files[0])}} />
                  </div>

                 <br></br>

                 <button className="btn btn-primary col-sm-1" style={{margin:"5px", borderRadius:"10px"}} type="button" onClick={uploadImage} >Upload Image</button>
                 <button className="btn btn-primary col-sm-1" style={{margin:"5px", borderRadius:"10px"}} onClick={Submit} > Upload Data</button>
                 
        </form>
        <br></br>
        <button className="btn btn-primary" style={{margin:"5px", borderRadius:"10px", textAlign:"center"}}  onClick={()=>{navigate("/")}}>Go Home</button>
    </>
  )
}
