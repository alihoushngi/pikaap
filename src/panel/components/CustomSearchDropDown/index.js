import React, { useEffect, useRef, useState } from "react";
import SelectSearch from "react-select-search";
import UserInformation from "../UserInformation";
import "./index.scss";

const CustomSearchDropDown = ({ placeholder, options, baseOn, onInputSearchChange, onSelect }) => {
  const [selectedUser, setSelectedUser] = useState();
  const [selectedBase, setSelectedBase] = useState(baseOn[0].value);
  const modal = useRef();

  function renderUser(props, option) {
    return (
      <button
        onClick={() => {
          setSelectedUser(option.agentInformation.agentName);
          onInputSearchChange({
            search: option.agentInformation.agentName,
            base: selectedBase,
            opt: option,
          });
          onSelect(option);
        }}
        value={option.id}
        style={{
          width: "100%",
          cursor: "pointer",
          backgroundColor: "#151521",
          marginTop: 4,
          border: "none",
          display: "flex",
          color: "white",
          fontFamily: "iranSans",
        }}
      >
        <UserInformation
          firstName={option.agentInformation.agentName}
          lastName={""}
          phoneNumber={option.phoneNumber}
          code={option.agentInformation.code}
        />
      </button>
    );
  }

  useEffect(() => {
    if (selectedBase && selectedUser) onInputSearchChange({ search: selectedUser, base: selectedBase });
  }, [selectedUser]);
  function renderFontValue(valueProps, snapshot, className) {
    const { option } = snapshot;
    const style = {
      fontFamily: !snapshot.focus && option && "stack" in option ? option.stack : null,
    };

    return (
      <div>
        <input
          {...valueProps}
          className={className}
          style={style}
          value={selectedUser}
          onChange={(e) => {
            setSelectedUser(e.currentTarget.value);
          }}
        />
      </div>
    );
  }

  return (
    <div id="csdd-container" ref={modal}>
      <div className="base-on">
        <SelectSearch
          className="base"
          value={selectedBase}
          options={baseOn}
          search={false}
          onChange={(e) => {
            setSelectedBase(e);
            onInputSearchChange({ search: selectedUser, base: e });
          }}
        />
      </div>
      <div className="main">
        <SelectSearch
          renderOption={renderUser}
          renderValue={renderFontValue}
          className={"main"}
          options={options}
          search={true}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default CustomSearchDropDown;
