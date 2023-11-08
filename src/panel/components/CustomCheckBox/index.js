import React from "react";
import "./index.scss";
function CustomCheckBox({
  inputName,
  title,
  inputValue,
  isChecked,
  onCheckedChange,
}) {
  return (
    <div>
      <section id="custom-checkBox-1-container">
        <label htmlFor={inputName}>{title}</label>
        <input
          id={inputName}
          type="checkBox"
          name={inputName}
          onChange={(e) => onCheckedChange(e.target.checked)}
          value={inputValue}
          checked={isChecked ? true : false}
        />
      </section>
    </div>
  );
}

export default CustomCheckBox;
