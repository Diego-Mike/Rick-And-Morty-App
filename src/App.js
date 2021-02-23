import React, { useState } from "react";

import "./App.css";

import icon from "./Images/icon.png";

import Cards from "./components/Cards";

const App = () => {
  // Changing Styles

  const [styles, setStyles] = useState(false);

  const handleStyles = () => {
    setStyles(!styles);
  };

  //
  return (
    <>
      {/* Header */}
      <header className={styles ? "Header-black" : "Header"}>
        <div className="Header-container">
          <img src={icon} alt="" />
          <span
            className={styles ? "ChangeColor-black" : "ChangeColor"}
            onClick={handleStyles}
          ></span>
        </div>
      </header>
      {/* Cards - Fetch API */}
      <Cards styles={styles} />
    </>
  );
};

export default App;
