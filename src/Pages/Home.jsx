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
     <h1 style={{textAlign:'center'}} className="text-body-secondary">Employee Table Data</h1>
        <table className='table table-hover'>
    <thead>
      <tr >
      <th scope='col'>Emp Id</th>
      <th scope="col">Emp Name</th>
      <th scope="col">Email</th>
      <th scope="col"> Profile Picture</th>
      <th scope="col"> Update/Delete</th>
      </tr>
    
    </thead>
    <tbody >
      {employess.map((emp,key) => {
        return (
          <tr className='table-primary' key={key}>
            <th scope='row'>{emp.empId}</th>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>
              <img
                style={{
                  width:"80px",
                  height:"80px",
                  "border-radius": "50%"
                }}
                src={emp.photoUrl}
                alt="Emp"
                
              ></img>
            </td>
            <td>
              <button  type='button' className='btn btn-secondary' style={{margin:"5px", borderRadius:"10px"}} onClick={()=>{handleUpdate(emp._id)}}>Update</button>
              <button type='button' className="btn btn-secondary" style={{margin:"5px", borderRadius:"10px"}} onClick={()=>{handleDelete(emp._id)}}>Delete</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
  <button type='button'  className="btn btn-secondary  m-5" style={{ borderRadius:"10px"}} onClick={()=>{navigate("form")}}>Add profile</button></div>
  )
}
