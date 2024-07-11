import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { AlertContext } from "../Context/AlertContext";



export default function UpdateForm() {
  const {showAlert, setShowAlert} = useContext(AlertContext);
  const fileRef = useRef(null);
  const { user } = useAuthContext();
  const { id } = useParams();

  const isMobileScreen = useMediaQuery({
    query: "(max-width: 830px)",
  });
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    photoUrl: "",
  });
  const [photoUrl, setPhotoUrl] = useState();
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };
  const handleImageChange = async (e) => {
    setIsloading(true);
    console.log(e.target.files[0]);

    const img = e.target.files[0];

    console.log(img);
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "ngsvh7oj");
    
    await axios
      .post("https://api.cloudinary.com/v1_1/dc4ypjcrp/image/upload", formData)
      .then((res) => {
        employee.photoUrl = res.data.url;
        setPhotoUrl(res.data.url);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  };


  const Submit = async (e) => {
    e.preventDefault();


    axios
      .patch(`http://localhost:5000/emp-data/${id}`, employee, {
        headers: { Authorization: "Bearer " + user.token },
      })
      .then((response) => {
        console.log(response)
        setShowAlert({...showAlert, 
          AlertType: "userUpdated",
          show: true
        })
      })
      .catch((response) => console.log(response));
    
    navigate("/home");
    

   };

  const loadEmpDetails = async () => {
    const result = await axios.get(`http://localhost:5000/emp-data/${id}`, {
      headers: { Authorization: "Bearer " + user.token },
    });

    setEmployee(result.data.emp);
    setPhotoUrl(result.data.emp.photoUrl);
  };
  useEffect(() => {
    loadEmpDetails();
  }, []);

  return (
    <>
        
          
        <div style={{ display: "flex", flexDirection: "column", height: isMobileScreen?"40vh":"8vh" }}>
          <h1
          style={{
            display: "flex",
            justifyContent: "center",
            margin: isMobileScreen?("10% 0 auto"):("4% 0 auto"),
            textWrap: "balance"
          }}
          className="text-body-secondary"
        >
          Update Details Form
        </h1>
          <form
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: isMobileScreen?("6%"):("2%"),
          }}
        >
          <div
            className="row"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <input
              ref={fileRef}
              className="form-control"
              hidden
              type="file"
              accept="images/*"
              onChange={handleImageChange}
            />
            <img
              src={photoUrl}
              onClick={() => {
                fileRef.current.click();
              }}
              style={{ width: "195px", height: "185px", borderRadius: "50%" }}
            />
            <p></p>
          </div>

          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3%",
            }}
          >
            <label className="col-sm-1 col-form-label" htmlFor="name">
              Name:
            </label>
            <div className="col-sm-3">
              <input
                id="name"
                name="name"
                className="form-control"
                type="text"
                value={employee.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <br></br>

          <div
            className="row"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <label className="col-sm-1 col-form-label" htmlFor="email">
              Email:
            </label>
            <div className="col-sm-3">
              <input
                id="email"
                className="form-control"
                name="email"
                type="email"
                value={employee.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button
            disabled={isLoading}
            className="btn btn-primary col-sm-1"
            style={{
              display: "flex",
              justifyContent: "center",
              width: isMobileScreen?("30vw"):("10vw"),
              margin: isMobileScreen?("6% auto"):("3% auto"),
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
