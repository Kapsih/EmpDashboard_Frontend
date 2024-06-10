import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMediaQuery } from "react-responsive";
import { Icon } from "react-icons-kit"
import {ic_delete} from 'react-icons-kit/md/ic_delete';
import {ic_search} from 'react-icons-kit/md/ic_search';
import {ic_mode_edit} from 'react-icons-kit/md/ic_mode_edit';
import {ic_person_add} from 'react-icons-kit/md/ic_person_add'

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import "../Styles/home.css";
import DeleteModal from "../DeleteModal";
import { useLogout } from "../hooks/useLogout";

const fetchData = async (user, setEmpData, logout) => {
  try {
    const response = await axios.get("http://localhost:5000/emp-data", {
      headers: { Authorization: "Bearer " + user.token },
    });
    setEmpData(response.data);
  } catch (error) {
    console.log(error)
    logout()
  }
};

export default function Home() {
  const [empData, setEmpData] = useState({ emps: [] });
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
 
  // const [doDelete, setDoDelete]  = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { logout } = useLogout();
  
  const isMobileScreen = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isLandscape = useMediaQuery({
    query: "(orientation: landscape)",
  });

  

  useEffect(() => {
    fetchData(user, setEmpData,logout);
  }, []);

  const employees = empData.emps;

  const handleUpdate = (empDbId) => {
    navigate(`/updateForm/${empDbId}`);
  };


  const handleDelete = async(empDbId) => {
  
    
   
    // if(doDelete){
    //   axios
    //   .delete(`http://localhost:5000/emp-data/${empDbId}`, {
    //     headers: { Authorization: "Bearer " + user.token },
    //   })
    //   .then((response) => {
    //     alert(`User: ${response.data.emp.name} -- has been deleted`);
    //   })
    //   .catch((error) => {
    //     alert(`error: ${error}`);
    //   });
    // window.location.reload();
    // }
    
  };
  const navigate = useNavigate();
 
  const leadingActions = (empId) => (
    <LeadingActions>
      <SwipeAction onClick={() => handleUpdate(empId)}>Update</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (empId) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => handleDelete(empId)}>
        Delete
      </SwipeAction>
    </TrailingActions>
  );



  return (
    
    <div>
  
 
      <div style={{display:"flex", flexDirection:"column"}}>
      {showDeleteModal && <DeleteModal setShowDeleteModal handleDelete empId />}

      <div style={{margin:"2% auto"}}>
        <div className="input-group m-2" style={{width: isMobileScreen?("75vw"):("35vw"), height: isMobileScreen?("2.0vh"):("")}}>
      <input type="text" className="form-control" placeholder="Search Employee" value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} aria-label="employee search bar" aria-describedby="button-addon2"/>
      <button className="btn btn-secondary" type="button" id="button-addon2" ><Icon icon={ic_search}/></button>
    </div>
      {}
    </div>
    
        
        {isMobileScreen ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100vw",
              marginTop: "10%",
            }}
          >
            <SwipeableList
              type={ListType.IOS}
              style={{
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                margin: "auto",
              }}
            >
              {employees.filter((emp)=>{
                if(searchTerm===""){
                  return emp
                }
                else if(emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ){
                  return emp
                }
              }).map((emp, key) => {
                return (
                  <SwipeableListItem
                    type={""}
                    key={key}
                    leadingActions={leadingActions(emp._id)}
                    trailingActions={trailingActions(emp._id)}
                
                  >
                    <div
                      className="card text-white bg-primary mb-1"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "10px 10px",
                        width: "100vw",
                        height: isLandscape?("18vh"):("8vh"),
                      }}
                    >
                      <div className="card-body" style={{ display: "flex" }}>
                        <img
                          src={emp.photoUrl}
                          alt="Employee photo"
                          style={{
                            width: isLandscape?("12vw"):("12vw"),
                            height: isLandscape?("15vh"):("5vh"),
                            borderRadius: "50%",
                            marginRight: "8%",
                          }}
                        />
                        <div
                          className="text"
                          style={{ display: "flex", flexDirection: "column", width:"65%" }}
                        >
                          <span
                            style={{
                              fontSize:  isLandscape?("4.5vh"):("1.6vh"),
                              fontWeight: "100",
                              
                            }}
                          >
                            {emp.name}
                          </span>
                          <span style={{ fontSize: isLandscape?("4.0vh"):("1.5vh"), fontWeight: "100" }}>
                            {emp.email}
                          </span>
                        </div>
                      
                      </div>
                    </div>
                  </SwipeableListItem>
                );
              })}
            </SwipeableList>
          </div>
        ) : (
          <table
            className="table table-hover"
            style={{ width: "95vw", margin: "auto", marginTop: "1.0%" }}
          >
            <thead>
              <tr>
                <th scope="col">Emp Name</th>
                <th scope="col"> Profile Picture</th>

                <th scope="col">Email</th>
                {/* <th scope="col">Blogs</th> */}
                 <th scope="col"> Update/Delete</th>
              </tr>
            </thead>
            <tbody>
              {employees.filter((emp)=>{
                if(searchTerm === ""){
                  return emp
                }else if(emp.name.toLowerCase().includes(searchTerm.toLowerCase())|| emp.email.toLowerCase().includes(searchTerm.toLowerCase())){
                  return emp
                }
                
        
              }).map((emp, key) => {
                return (
                  <tr className="table-primary" key={key}>
                    <td>{emp.name}</td>
                    <td>
                      <img
                        style={{
                          width: "3.0vw",
                          height: "5.0vh",
                          borderRadius: "50%",
                        }}
                        src={emp.photoUrl}
                        alt="Emp"
                      ></img>
                    </td>
                    <td>{emp.email}</td>
                    
               
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning"
                        style={{ margin: "5px", borderRadius: "10px" }}
                        onClick={() => {
                          handleUpdate(emp._id);
                        }}
                      >
                        <Icon icon={ic_mode_edit}/>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{ margin: "5px", borderRadius: "10px" }}
                        onClick={() => {
                          // handleDelete(emp._id);
                          setShowDeleteModal(true)
                      
                        }}
                      >
                           <Icon icon={ic_delete}/>
                      </button>
                   
                    </td>
                   
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      { !isMobileScreen &&
            <button
            type="button"
            className="btn btn-dark "
            style={{ borderRadius: "10px", margin: isMobileScreen?("2% auto"):("2% auto") }}
            onClick={() => {
              navigate("/form");
            }}
          >
            Add Employee
          </button>
      }
       { isMobileScreen &&
               <button
               type="button"
               className="btn btn-dark "
               style={{ borderRadius: "48%", margin:"8% auto"}}
               onClick={() => {
                 navigate("/form");
               }}
               >
               <Icon icon={ic_person_add}/>
               </button> 
        }
      </div>
    </div>
  );
}


