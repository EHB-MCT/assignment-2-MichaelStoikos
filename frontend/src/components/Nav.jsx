import { Link } from "react-router-dom";
import { Database, LayoutDashboard } from "lucide-react";

const Nav = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo">
          <Database />
          <span>GatherData</span>
        </div>
        <div className="nav-links">
          <Link to="/home" className="nav-link">
            <LayoutDashboard />
            Home
          </Link>
          <Link to="/visualisation" className="nav-link">
            <Database />
            Visualisatie
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
