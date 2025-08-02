import { MdDarkMode } from "react-icons/md";
import { FiSun } from "react-icons/fi";
import "../../App.css";
import "./header.css";
import "../../index.css";  
import { useData } from "../../context/DataContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, toggleTheme } = useData();

  return (
    <div id="header" className={theme}>
      <h1 className="header-title">Where in the world?</h1>
      <Link className="header-theme" onClick={toggleTheme}>
        {theme === "light" ? <MdDarkMode className="icon" />  : <FiSun className="icon"/>}
        {theme === "light" ? "Dark Mode" : "Light Mode"}
       
      </Link>
    </div>
  );
};

export default Header;
