import React from "react";

const CustomInput = ({ label, onChange, value, placeholder }) => {
  return (
    <div style={{ display: "flex", width: "100%", background: "red" }}>
      <label>{label}</label>
      <input value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};
const EditDriver = () => {
  return (
    <div>
      <CustomInput label={"label"} />
    </div>
  );
};

export default EditDriver;
