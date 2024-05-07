import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext';
import { useMediaQuery } from 'react-responsive'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import "../Styles/home.css"



export default function Home() {

  const [empData,setEmpData] = useState({emps: []});
  const {user} = useAuthContext()
  const isMobileScreen = useMediaQuery({
    query: '(max-width: 830px)'
  })
  const fetchData = async()=>{
    
    try{
      const response =  await axios.get("http://localhost:5000/emp-data",{headers: {Authorization: 'Bearer '+user.token}})
       setEmpData(response.data)
    } catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    
    fetchData()
    
       
  },[])

  const employees = empData.emps;
  
  const handleUpdate = (empDbId)=>{
    navigate(`/updateForm/${empDbId}`)
  }

  const handleDelete = (empDbId)=>{
  
    axios.delete(`http://localhost:5000/emp-data/${empDbId}`,{headers: {Authorization: 'Bearer '+user.token}})
    .then(response => {alert(`User: ${response.data.emp.name} -- has been deleted`)})
    .catch(error =>{alert(`error: ${error}`)})
    window.location.reload()
  }
  const navigate = useNavigate();
  
const leadingActions = (empId) => (
  <LeadingActions>
    <SwipeAction onClick={() => handleUpdate(empId)}
      >
      Update
    </SwipeAction>
  </LeadingActions>
);

const trailingActions = (empId) => (
  <TrailingActions>
    <SwipeAction
      destructive={true}
      onClick={() => handleDelete(empId)}
      
    >
      Delete
    </SwipeAction>
  </TrailingActions>
);
 
  return (
    <div>
    <div >
     <h1 style={{textAlign:'center', marginTop:"2%"}} className="text-body-secondary">Employee Table Data</h1>

    {isMobileScreen?(
    <div style={{display:"flex",flexDirection:"column", justifyContent:"center", width:"100vw", marginTop:"4%"}}>
    <SwipeableList style={{width: "100vw",display:"flex",flexDirection:"column",  margin: "auto" }}>

    {
    employees.map((emp, key)=>{
     return <SwipeableListItem 
     type={""}
     key={key}
      leadingActions={leadingActions(emp._id)}
      trailingActions={trailingActions(emp._id)}
    >
      
   <div className='card text-white bg-primary mb-2' style={{display:"flex", flexDirection:"column", boxShadow:"10px 10px", width:"100vw" }}>
        <div className='card-body' style={{display:"flex"}}>
          <img src={emp.photoUrl} style={{width:"30%", height:"30%", borderRadius:"50%", marginRight:"5%"}}/>
          <div className='text' style={{display:"flex", flexDirection:"column"}}> 
            <span style={{fontSize:"2.5vh",fontWeight:"100", marginBottom:"5%"}}>{emp.name}</span>
            <span style={{fontSize:"2vh", fontWeight:"100"}}>{emp.email}</span>
          </div>
         
        </div>
   </div>
       
    </SwipeableListItem>
    })
    }
  
</SwipeableList>
</div>):
(
<table className='table table-hover'>
<thead>
  <tr >
  <th scope="col">Emp Name</th>
  <th scope="col">Email</th>
  <th scope="col"> Profile Picture</th>
  <th scope="col"> Update/Delete</th>
  </tr>

</thead>
<tbody >
  {employees.map((emp,key) => {
    return (
      <tr className='table-primary' key={key}>
        <td>{emp.name}</td>
        <td>{emp.email}</td>
        <td>
          <img
            style={{
              width:"80px",
              height:"80px",
              borderRadius: "50%"
            }}
            src={emp.photoUrl}
            alt="Emp"
            
          ></img>
        </td>
        <td>
          <button  type='button' className='btn btn-info' style={{margin:"5px", borderRadius:"10px"}} onClick={()=>{handleUpdate(emp._id)}}>&#x270E;</button>
          <button type='button' className="btn btn-info" style={{margin:"5px", borderRadius:"10px"}} onClick={()=>{handleDelete(emp._id)}}>🗑</button>
        </td>
      </tr>
    );
  })}
</tbody>
</table>

     
    
)}
     









  <button type='button'  className="btn btn-secondary  m-5" style={{borderRadius:"10px"}} onClick={()=>{navigate("/form")}}>Add profile</button></div>
  </div>
  )
}
