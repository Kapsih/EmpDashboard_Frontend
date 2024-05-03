import React from "react";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";


export default function Navbar() {
  const {logout} = useLogout()
  const {user} = useAuthContext()
  
  const handleLogout = () => {
    
    logout()
  };
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        
            <a className="navbar-brand" href="/home">
              EMP Dashboard
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarColor01"
              aria-controls="navbarColor01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
        
            
             
                {user && (  <ul className="navbar-nav ms-auto">
                
                <li className="nav-item">
                   <span className="nav-link">{user.user.name}</span>
                </li>
                   
              
                <li className="nav-item">
                  <a className="nav-link" href="/" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
                </ul>)}

                {!user && (  
                <ul className="navbar-nav ms-auto">
                   <li className="nav-item">
                  <a className="nav-link" href="/" >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/SignUp" >
                    Sign-up
                  </a>
                </li>
                </ul>)}
               
              
          
          </div>
        
    </nav>
  );
}
