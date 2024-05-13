import React, { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";
import { useMediaQuery } from 'react-responsive';
export default function SignUp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName] = useState("")
  const { signUp, error, isLoading } = useSignUp();
  const [errors, setErrors] = useState({});
  const isMobileScreen = useMediaQuery({
    query: '(max-width: 830px)'
  })
    const isValidEmail = (email)=>{
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
      return emailRegex.test(email)
    }
    const isValidPassword = (password)=>{
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/ ;
      return passwordRegex.test(password)
    }
    const validateUser = (user_name,user_email,user_password)=>{
      let newErrors = {}  
      if(!user_name){
        newErrors.name = "name is required"
        }
      if(!user_email){
          newErrors.email = "email is required"
          } else if(!isValidEmail(user_email)){
            newErrors.email = "Invalid Email"
          }
      if(!user_password){
            newErrors.password = "password is required"
            }else if(!isValidPassword(user_password)){
              newErrors.password = "Password must contain 8 characters, one uppercase, one lowercase, and one special case character"
            }
      
      setErrors(newErrors)

      return Object.keys(newErrors).length === 0;
    }
console.log(errors)
  const handleRegister = async (e) => {
    e.preventDefault();
    const isValidUser = validateUser(name,email,password)
    if(isValidUser){
      await signUp(name, email, password);
    }
   else {
    console.log("validation failed")
   }
  };
  return (
    <div style={{display:"flex",flexDirection:"column" }}>
        <h1 style={{display:"flex",   justifyContent:"center", marginTop: isMobileScreen?("14%"):("5%")}} className="text-body-secondary">Sign-up</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: isMobileScreen?("8%"):("3%"),
          }}
        >
        
        <div className="row"  style={{display:"flex",   justifyContent:"center"}}>
              <label className="col-sm-1 col-form-label" htmlFor="name">
                Name
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                {errors.name && <div className="text-danger">{errors.name}</div>}
              </div>
            </div>

            <br></br>

            <div className="row"  style={{display:"flex",   justifyContent:"center"}}>
              <label className="col-sm-1 col-form-label" htmlFor="email">
                
                Email
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
            </div>

            <br></br>

            <div className="row"  style={{display:"flex",   justifyContent:"center"}}>
              <label className="col-sm-1 col-form-label" htmlFor="Password">
                Password
              </label>
              <div className="col-sm-3">
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
               {errors.password && <div className="text-danger">{errors.password}</div>}
              </div>
            </div>
        
        </form>
        <div style={{ display:"flex", marginTop:isMobileScreen?("16%"):("3%"), justifyContent:"center", }}>
           <button
             disabled={isLoading}
             className="btn btn-primary"
              onClick={handleRegister}
              style={{width:isMobileScreen?("45vw"):("10vw")}}
           >
          Sign-up
        </button>
        </div>
       
   
        {error && <div style={{ display:"flex", marginTop:"3%", justifyContent:"center", }} ><p className="text-danger">{error.response.data.msg.message}</p></div>}
      </div>
    </div>
  );
}
