import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/signUp";
import Home from "./Pages/Home";
import Navbar from "./Navbar";
import UpdateForm from "./Pages/UpdateForm";
import Form from "./Pages/Form";
import "bootswatch/dist/flatly/bootstrap.min.css";
import { useAuthContext } from "./hooks/useAuthContext";
import Breadcrumbs from "./Breadcrumbs";
import { useMediaQuery } from "react-responsive";
import { Blogs } from "./Pages/Blogs";


export default function App() {
  const { user } = useAuthContext();
  const isMobileScreen = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <div>
      <Navbar currentUser />
      {user && isMobileScreen && <Breadcrumbs/>}
      <Routes>
        <Route path="/" element={!user? <Login/>: <Navigate to="/Home"/>} />
        <Route path="/SignUp" element={!user? <SignUp />:<Navigate to="/Home"/>} />
        {/* <Route path="/CreateBlog" element={user ? <CreateBlogs/>: <Navigate to="/"/>} /> */}
        <Route path="/Blogs" element={user ? <Blogs/>: <Navigate to="/Home"/>}/>
        <Route path="/Home" element={user? <Home />:<Navigate to="/"/>} />
        <Route path="/UpdateForm/:id" element={user?<UpdateForm />:<Navigate to="/"/>} />
        <Route path="Form" element={ user? <Form />: <Navigate to="/"/>} />
        
      </Routes>
    </div>
  );
}