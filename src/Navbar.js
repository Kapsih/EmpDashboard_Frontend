import React from "react";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
  };

  const createBlogPage = ()=>{
    navigate("/CreateBlog")
  }
  return (
    <nav className="navbar navbar-expand bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/Home">
          EMP Dashboard
        </a>

        {user && (
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" onClick={createBlogPage}>
                Create Blog
              </a>
            </li>
          </ul>
        )}

        {user && (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <span className="nav-link">{user.user.name}</span>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        )}

        {!user && (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/SignUp">
                Sign-up
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
