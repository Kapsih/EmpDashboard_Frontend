import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useMediaQuery } from "react-responsive";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const { login, error, isLoading } = useLogin();

  const isMobileScreen = useMediaQuery({
    query: "(max-width: 830px)",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter valid credentials");
      return;
    }

    await login(email, password);
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  return (
    <div>
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: isMobileScreen ? "25%" : "5%",
            }}
            className="text-body-secondary"
          >
            {" "}
            Login
          </h1>
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: isMobileScreen ? "18%" : "4%",
            }}
          >
            <div
              className="row"
              style={{ display: "flex", justifyContent: "center", marginRight: isMobileScreen?("1%"):("4%")}}
            >
              {!isMobileScreen && 
                <label
                className="col-sm-1 col-form-label"
                htmlFor="Email"
                
              >
                Email
              </label>
              }
              <div className={isMobileScreen?("col-11"):("col-sm-3")}>
              
            
                <input
                  id="Email"
                  type="text"
                  value={email}
                  placeholder={isMobileScreen?("Email"):("")}
                  className="form-control"
                  style={{ marginLeft: "0.3rem" }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

           

            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: isMobileScreen ? "12%" : "2.0%",
                marginRight:isMobileScreen?("1%"):("4%")
              }}
            >
              {!isMobileScreen&&
                 <label
                  className="col-sm-1 col-form-label"
                  htmlFor="Password"
                 
                >
                  Password
                </label>
                    }
              <div
                className= {isMobileScreen?("col-11 "):("col-sm-3")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
             
                <input
                  id="Password"
                  type={type}
                  value={password}
                  placeholder={isMobileScreen?("Password"):("")}
                  className="form-control"
                  style={{}}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <Icon
                  onClick={handleToggle}
                  style={{ marginLeft: "-1.7rem", cursor: "pointer" }}
                  icon={icon}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                margin: "auto",
                marginTop:isMobileScreen?("16%"):("4%")
              }}
            >
              <button
                disabled={isLoading}
                className="btn btn-primary"
                style={{ width: isMobileScreen ? "45vw" : "12vw" }}
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            {error && (
              <div
                style={{
                  display: "flex",
                  marginTop: "1%",
                  justifyContent: "center",
                }}
              >
                <p className="text-danger">{error.response.data.msg}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
