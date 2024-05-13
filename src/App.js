import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/signUp";
import Home from "./Pages/Home";
import Navbar from "./Navbar";
import UpdateForm from "./Pages/UpdateForm";
import Form from "./Pages/Form";
import "bootswatch/dist/flatly/bootstrap.min.css";
import { useAuthContext } from "./hooks/useAuthContext";

export default function App() {
  const { user } = useAuthContext();

  return (
    <div>
      <Navbar currentUser />

      <Routes>
        <Route path="/" element={!user? <Login/>: <Navigate to="/Home"/>} />
        <Route path="/SignUp" element={!user? <SignUp />:<Navigate to="/Home"/>} />
      
        <Route path="/home" element={user? <Home />:<Navigate to="/"/>} />
        <Route path="/UpdateForm/:id" element={user?<UpdateForm />:<Navigate to="/"/>} />
        <Route path="Form" element={ user? <Form />: <Navigate to="/"/>} />
        
      </Routes>
    </div>
  );
}