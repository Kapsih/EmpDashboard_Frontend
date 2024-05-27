import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMediaQuery } from "react-responsive";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";


export default function UpdateForm() {
  const { user } = useAuthContext();
  const fileRef = useRef(null);
  const isMobileScreen = useMediaQuery({
    query: "(max-width: 830px)",
  });

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    photoUrl: "",
  });
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [image, setImage] = useState(undefined);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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

  const Submit = async (e) => {
    e.preventDefault();
    const isValidUser = validateUser(
      employee.name,
      employee.email,
      employee.password
    );
    if (isValidUser) {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "ngsvh7oj");

        await axios
          .post(
            "https://api.cloudinary.com/v1_1/dc4ypjcrp/image/upload",
            formData
          )
          .then((res) => {
            employee.photoUrl = res.data.url;
          });
      }

      await axios
        .post("http://localhost:5000/emp-data", employee, {
          headers: { Authorization: "Bearer " + user.token },
        })
        .then((response) => console.log(response))
        .catch((response) => console.log(response));
      navigate("/home");
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: isMobileScreen ? "15%" : "3.5%",
          }}
          className="text-body-secondary"
        >
          Employee Information Form
        </h1>

      
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: isMobileScreen ? "5%" : "0%",
          }}
        >
        
            <input
              className="form-control"
              ref={fileRef}
              type="file"
              hidden
              accept="images/*"
              onChange={handleImageChange}
            />
              <img
              src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
              
              onClick={() => {
                fileRef.current.click();
              }}
              style={{ cursor:"pointer",width: isMobileScreen?(""):("8vw"), height: isMobileScreen?("14vh"):("14vh"), borderRadius: "50%", margin:"auto", marginTop:isMobileScreen?("4%"):("2%")}}
            />
        

          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginRight: isMobileScreen ? "1%" : "4%",
              marginTop:isMobileScreen?("18%"):("2.5%")
            }}
          >
            {!isMobileScreen && (
              <label className="col-sm-1 col-form-label" htmlFor="Name">
                Name
              </label>
            )}
            <div className={isMobileScreen ? "col-11" : "col-sm-3"}>
              <input
                id="name"
                name="name"
                placeholder="Name"
                className="form-control"
                type="text"
                value={employee.name}
                onChange={handleInputChange}
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
              marginTop: isMobileScreen ? "8%" : "2%",
            }}
          >
            {!isMobileScreen && (
              <label className="col-sm-1 col-form-label" htmlFor="Email">
                Email
              </label>
            )}
            <div className={isMobileScreen ? "col-11" : "col-sm-3"}>
              <input
                id="email"
                className="form-control"
                placeholder="Email"
                name="email"
                type="email"
                value={employee.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
          </div>

          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: isMobileScreen ? "8%" : "2.0%",
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
                marginRight: isMobileScreen ? "1%" : "0.7%",
              }}
            >
              <input
                id="Password"
                name="password"
                placeholder="Password"
                value={employee.password}
                type={type}
                className="form-control"
                onChange={handleInputChange}
                
              />
              <Icon
                onClick={handleToggle}
                style={{ marginLeft: "-1.7rem", cursor: "pointer" }}
                icon={icon}
              />
            </div>
          </div>
          {errors.password && (
            <div
              className="text-danger"
              style={{
                margin: "auto",
                width: isMobileScreen ? "90vw" : "20vw",
              }}
            >
              {errors.password}
            </div>
          )}

         

          <button
            className="btn btn-primary col-lg-1"
            style={{
              display: "flex",
              justifyContent: "center",
              width: isMobileScreen ? "30%" : "20%",
              margin: isMobileScreen ? "15% auto" : "4% auto",
            }}
            onClick={Submit}
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}
