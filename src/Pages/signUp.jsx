import React, { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";
import { useMediaQuery } from "react-responsive";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [name, setName] = useState("");
  const { signUp, error, isLoading } = useSignUp();
  const [errors, setErrors] = useState({});
  const isMobileScreen = useMediaQuery({
    query: "(max-width: 830px)",
  });
  const isValidEmail = (email) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return passwordRegex.test(password);
  };
  const validateUser = (user_name, user_email, user_password) => {
    let newErrors = {};
    if (!user_name) {
      newErrors.name = "name is required";
    }
    if (!user_email) {
      newErrors.email = "email is required";
    } else if (!isValidEmail(user_email)) {
      newErrors.email = "Invalid Email";
    }
    if (!user_password) {
      newErrors.password = "password is required";
    } else if (!isValidPassword(user_password)) {
      newErrors.password =
        "Password must contain 8 characters, one uppercase, one lowercase, and one special case character";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
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

  const handleRegister = async (e) => {
    e.preventDefault();
    const isValidUser = validateUser(name, email, password);
    if (isValidUser) {
      await signUp(name, email, password);
    } else {
      console.log("validation failed");
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: isMobileScreen ? "25%" : "5%",
        }}
        className="text-body-secondary"
      >
        Sign-up
      </h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
     
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: isMobileScreen ? "18%" : "5%",
          }}
        >
       
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginRight: isMobileScreen ? "1%" : "4%",
            }}
          >
             
            {!isMobileScreen && (
              <label className="col-sm-1 col-form-label" htmlFor="Name">
                Name
              </label>
            )}
            <div className={isMobileScreen ? "col-11" : "col-sm-3"}>
              <input
                id="Name"
                type="text"
                placeholder={isMobileScreen ? "Name" : ""}
                className="form-control"
                style={{ marginLeft: "0.3rem" }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
               {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>
          </div>

      

          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginRight: isMobileScreen ? "1%" : "4%",
              marginTop:isMobileScreen?("11%"):("2%")
            }}
          >
            {!isMobileScreen && (
              <label className="col-sm-1 col-form-label" htmlFor="Email">
                Email
              </label>
            )}
            <div className={isMobileScreen ? "col-11" : "col-sm-3"}>
              <input
                id="Email"
                type="text"
                placeholder={isMobileScreen ? "Email" : ""}
                className="form-control"
                style={{ marginLeft: "0.3rem" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
          </div>

        

          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: isMobileScreen ? "11%" : "2.0%",
              marginRight: isMobileScreen ? "1%" : "4%",
            }}
          >
            {!isMobileScreen && (
              <label className="col-sm-1 col-form-label" htmlFor="Password">
                Password
              </label>
            )}
            <div
              className={isMobileScreen ? "col-11 " : "col-sm-3"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                id="Password"
                type={type}
                placeholder={isMobileScreen ? "Password" : ""}
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
          {errors.password && <div className="text-danger" style={{margin: "auto", width: isMobileScreen?("90vw"):("20vw") }}>{errors.password}</div>}

        </form>
        <div
          style={{
            display: "flex",
            marginTop: isMobileScreen ? "16%" : "3%",
            justifyContent: "center",
          }}
        >
          <button
            disabled={isLoading}
            className="btn btn-primary"
            onClick={handleRegister}
            style={{ width: isMobileScreen ? "45vw" : "12vw" }}
          >
            Sign-up
          </button>
        </div>

        {error && (
          <div
            style={{
              display: "flex",
              marginTop: "3%",
              justifyContent: "center",
            }}
          >
            <p className="text-danger">{error.response.data.msg.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
