import React, { memo } from "react";
import DropDown2 from "../DropDown2";
import "./index.scss";

const SearchInputForInvoices = ({
  badgeText,
  icon,
  label,
  placeHolder,
  value,
  SearchOnChange,
  labelName,
  onSelectedSearchBase,
  searchFildName,
  UserName,
  codeName,
}) => {
  let newLabel;

  const searchDropDown = [
    {
      label: "نام",
      value: "NAME",
    },
    {
      label: "شماره تلفن",
      value: "PHONE_NUMBER",
    },
    {
      label: "شناسه فیش",
      value: `TRACKING_CODE`,
    },
  ];

  return (
    <section id="custom-input-1-container">
      <label htmlFor={labelName}>{label}</label>
      <div className="input-wrapper">
        {badgeText ? <span className="badge">{badgeText}</span> : null}
        <input type="text" placeholder={placeHolder} onChange={SearchOnChange} value={value} name={labelName} />
        <div style={{ width: "120px", display: "flex", alignItems: "center" }}>
          <DropDown2 data={searchDropDown} onSelected={onSelectedSearchBase} />
        </div>
      </div>
    </section>
  );
};

export default memo(SearchInputForInvoices);
