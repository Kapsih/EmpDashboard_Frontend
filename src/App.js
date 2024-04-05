import React from "react";
import Home from "./Pages/Home";
import UpdateForm from "./Pages/UpdateForm";
import {Routes, Route} from "react-router-dom";
import Form from "./Pages/Form";
import "./Styles/form.css"
import "./Styles/home.css"

export default function App() {
    
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="form" element={<Form/>}/>
        <Route path="/updateForm/:id" element={<UpdateForm/>}/>
      </Routes>
    </div>
  );
}
