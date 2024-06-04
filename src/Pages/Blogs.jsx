import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
export default function Blogs() {
  const {id} = useParams();
  const [userBlogs, setUserBlogs] = useState([]);
  const [errors, setErrors] = useState(null);
  const {user} = useAuthContext();
  const isMobileScreen = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const navigate = useNavigate()
  useEffect(()=>{
    
    axios.get(`http://localhost:5000/blogs/${id}`)
    .then((resp)=>{
      
  
      setUserBlogs(resp.data.blogs)
      
    })  
    .catch((err)=>{
        setErrors(err)
        console.log(errors)
    })
  },[])
  if(userBlogs.length ===0)
    return (
    <div >
      <div style={{display:"flex", flexDirection:"column" ,justifyItems:"center", marginTop:isMobileScreen?"15%":"5%", marginLeft: isMobileScreen?"3%":"35%"}}>
      <h2 className="text-danger">Error 404</h2>
      <h3 className="text-body-secondary">There are no blogs by this user yet</h3>
      </div>
      
    </div>
  )
  return (

  
    <div  style={{margin:isMobileScreen?"10% auto":"3% auto" ,display:"flex", justifyContent:"center" }} >
      <div style={{display:"flex" , flexDirection:"column", justifyContent:"center", width:isMobileScreen?"90vw":"50vw" }}>
      {
       userBlogs.map((blog, index)=>{
        {console.log(blog)} 
        return (
        
          <div key={blog._id} onClick={()=>{navigate(`/Blogs/Blog/${blog._id}`)}} className= {(index%2===0)?"card bg-light mb-3":"card text-white bg-dark mb-3"}>
            <div className="card-header">
              <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                  <img src={blog.AuthorPhotoUrl} style={{borderRadius:"50%", height:isMobileScreen?"4vh":"4vh", marginLeft:"0.2vw"}} />
                <h4 style={{margin:"0 auto"}}className="card-title">{blog.BlogTitle}</h4>
    
              </div>
            </div>
            <div className="card-body" style={{display:"flex", justifyContent:"center"}}>
              
              <p className="card-text">
                {`${blog.BlogContent.slice(0,100)}...`}
              </p>
            </div>
          </div>
          )
      })
     }  
      </div>
     
      
    </div>
    
  );
}
