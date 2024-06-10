import React from "react";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function Navbar1() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
  };
  const handleBlogReq = () =>{
    navigate("/Blogs")
  }
 

  // const createBlogPage = ()=>{
  //   navigate("/CreateBlog")
  // }
  return (
 
   <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="/Home">Emp Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"  >
          {user && <Nav className="me-auto">
            <Nav.Link href="/Home">Home</Nav.Link>
            <Nav.Link onClick={handleBlogReq}>Blogs</Nav.Link>
          </Nav>
          }
          {user &&  <Nav className="justify-content-end">
          <Nav.Link href="/" className="justify-content-end" onClick={handleLogout}>Logout</Nav.Link>
      </Nav>}
         {
          !user && 
          <Nav className="ms-auto">
               <Nav.Link href="/">Login</Nav.Link>
              <Nav.Link  href="/SignUp">Sign up</Nav.Link>
          </Nav>
         }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
