import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
// import "../Styles/home.css"



export default function Home() {
  
  const [empData,setEmpData] = useState({emps: []});
  const fetchData = async()=>{
    try{
      const response =  await axios.get("http://localhost:5000/emp-data")
       setEmpData(response.data)
    } catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    
    fetchData()
    
       
  },[])

  const employess = empData.emps;
  
  const handleUpdate = (empDbId)=>{
    navigate(`/updateForm/${empDbId}`)
  }

  const handleDelete = (empDbId)=>{
  
    axios.delete(`http://localhost:5000/emp-data/${empDbId}`)
    .then(response => {alert(`User: ${response.data.emp.name} -- has been deleted`)})
    .catch(error =>{alert(`error: ${error}`)})
    fetchData()
  }
  const navigate = useNavigate();
  return (
    <div>
     <h1 style={{textAlign:"center"}}>Employee Table Data</h1>
        <table>
    <thead>
      <tr>
      <th>Emp Id</th>
      <th>Emp Name</th>
      <th>Email</th>
      <th> Profile Picture</th>
      <th> Update/Delete</th>
      </tr>
    
    </thead>
    <tbody>
      {employess.map((emp,key) => {
        return (
          <tr key={key}>
            <td>{emp.empId}</td>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>
              <img
                src={emp.photoUrl}
                alt="Emp"
                
              ></img>
            </td>
            <td>
              <button onClick={()=>{handleUpdate(emp._id)}}>Update</button>
              <button onClick={()=>{handleDelete(emp._id)}}>Delete</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
  <button className="btn" onClick={()=>{navigate("form")}}>Add profile</button></div>
  )
}
