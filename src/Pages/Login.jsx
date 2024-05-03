import React, { useState} from "react";
import { useLogin } from "../hooks/useLogin";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login,error,isLoading} = useLogin()
  
  
  
    const handleLogin = async(e) => {
    e.preventDefault();
    if(!email || !password){
      alert("Please enter valid credentials")
      return
    }
    
    await login(email,password)
  };
  return (
    <div>
      <div >
        
        <div style={{display:"flex",flexDirection:"column" }} >
        <h1 style={{display:"flex",   justifyContent:"center", marginTop:"5%"}} className="text-body-secondary"> Login</h1>
          <form  style={{display:"flex",   justifyContent:"center", flexDirection:"column", marginTop:"3%" }} >
            <div className="row " style={{display:"flex",   justifyContent:"center"}}>
              <label className="col-sm-1 col-form-label" htmlFor="Email">
                Email
              </label>
              <div className="col-sm-3" >
                <input
                id="Email"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div style={{ display:"flex", marginTop:"3%", justifyContent:"center", }}>
            <button disabled={isLoading}className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
    
            </div>
            {error && <div style={{ display:"flex", marginTop:"3%", justifyContent:"center", }} ><p className="text-danger">{error.response.data.msg}</p></div>}
        
          </form>
       
        </div>
       
      </div>
    </div>
  );
}
