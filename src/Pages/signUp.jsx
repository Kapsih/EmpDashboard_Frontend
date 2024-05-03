import React, { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";
export default function SignUp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName] = useState("")
  const { signUp, error, isLoading } = useSignUp();

  const handleRegister = async (e) => {
    e.preventDefault();
    await signUp(name, email, password);
  };
  return (
    <div style={{display:"flex",flexDirection:"column" }}>
        <h1 style={{display:"flex",   justifyContent:"center", marginTop:"5%"}} className="text-body-secondary">Sign-up</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "3%",
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
              </div>
            </div>
        
        </form>
        <div style={{ display:"flex", marginTop:"3%", justifyContent:"center", }}>
           <button
             disabled={isLoading}
             className="btn btn-primary"
              onClick={handleRegister}
           >
          Sign-up
        </button>
        </div>
       
        {/* {error && <div >{JSON.stringify(error)}</div>} */}
        {/* {error && <div >{console.log(error)}</div>} */}
        {error && <div style={{ display:"flex", marginTop:"3%", justifyContent:"center", }} ><p className="text-danger">{error.response.data.msg.message}</p></div>}
      </div>
    </div>
  );
}
