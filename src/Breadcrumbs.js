import { useLocation, Link } from "react-router-dom";
import { home } from "react-icons-kit/icomoon/home";
import { Icon } from "react-icons-kit";
import Home from "./Pages/Home";

export default function Breadcrumbs() {
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter((x) => x);
  console.log(pathnames);
  let breadcrumbsPath = "";
  return (
    <div
      style={{
    
        margin: "3% 3% 0 10%",
        
        
      }}
    >
      {pathnames.length > 0 && (
        <Link to="/Home">
          <Icon size={18} icon={home} />
        </Link>
      )}
      {pathnames.map((name, index) => {
        breadcrumbsPath += `${name}`;
        if (breadcrumbsPath === "Home") {
          return;
        } else {
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <span key={breadcrumbsPath} style={{ fontSize: "12px"}}>
              / {name}
            </span>
          ) : (
            <span key={breadcrumbsPath} >
              
              <Link key={breadcrumbsPath} to={breadcrumbsPath} style={{ fontSize: "14px", fontWeight:"100" }}>
                / {name}
              </Link>
            </span>
          );
        }
      })}
    </div>
  );
}
