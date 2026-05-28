import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useUser }from "../context/UserContext";

const GlobalContext = () => {
  const { theme, toggleTheme } = useTheme();
   const { username } = useUser();
  return (
    <div>
      <h3 className="text-warning">GLobal Context</h3>
      <p>Theme: {theme}</p>
            <p>User: {username}</p>

      <button className= {`btn btn-${theme} btm-sm`} onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
};

export default GlobalContext;


