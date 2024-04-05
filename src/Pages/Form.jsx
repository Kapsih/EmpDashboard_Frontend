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
        <h1 style={{textAlign:"center"}}>Employee profile form</h1>
        <form className='formBox'>   

                <label htmlFor="name">Name:</label>
                 <input id="name"  type='text' onChange={(e)=>{setName(e.target.value)}} />
                 <br></br>

                <label htmlFor="empId">EmpId:</label>
                 <input id="empId" type='text'  onChange={(e)=>{setempId(e.target.value)}} />
                    <br></br>

                 <label htmlFor="email">Email:</label>
                 <input id="email" type='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                 <br></br>

                 <input style={{margin:"auto"}} type='file' accept='images/*' onChange={(e)=>{setImage(e.target.files[0])}} />
                 <br></br>
                 <button type="button" onClick={uploadImage} >Upload Image</button>
                 <button onClick={Submit} > Upload Data</button>
                 
        </form>
        <button className="btn" onClick={()=>{navigate("/")}}>Go Home</button>
    </>
  )
}
