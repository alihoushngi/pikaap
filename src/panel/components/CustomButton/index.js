import React from "react";
import "./index.scss";

const CustomButton = ({ isDanger, text, leftIcon, rightIcon, isLoading = false, disabled, onClick }) => {
  return (
    <div
      id="cb-container"
      style={isDanger ? { backgroundColor: "#ff8888" } : null}
      onClick={() => {
        if (!disabled) onClick();
      }}
    >
      {(rightIcon && rightIcon.length > 0) & !isLoading ? <i className={`${rightIcon} ic-right`} /> : null}
      {isLoading && <i className={`fas fa-loader ic-right rotating`} />}
      <p>{text}</p>
      {leftIcon && <i className={`${leftIcon} ic-left`} />}
    </div>
  );
};

export default CustomButton;
