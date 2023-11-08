import React from "react";
import "./index.scss";

const NavBarButton = ({ ButtonContent }) => {
  return (
    <div className="Navbutton">
      <span className="NavbuttonData">{ButtonContent}</span>
    </div>
  );
};

export default NavBarButton;
