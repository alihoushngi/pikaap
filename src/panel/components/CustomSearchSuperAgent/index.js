import { useState } from "react";
import AsyncSelect from "react-select/async";
import api from "../../api";
import avatar from "../../assets/Images/avatar.png";
import "./index.scss";

const CustomSearchSuperAgent = ({ onSelectUser, type }) => {
  const [selectedBase, setSelectedBase] = useState("NAME");
  const [selectedOption, setSelectedOption] = useState();

  const formatOptionLabel = (data) => {
    return (
      <div className="option-item" onClick={() => setSelectedOption(data)}>
        <img src={data.avatar ? data.avatar : avatar} alt="avatar" />
        <div className="info">
          <span>
            {data.firstName} {data.lastName}
          </span>
          <span>{data.phoneNumber}</span>
          <span> نام اتحادیه:{data.superAgentInformation.superAgentName}</span>
        </div>
      </div>
    );
  };

  const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

  const getUsers = async (value) => {
    const foundedUsers = await api.post.findSuperAgent({ baseSearch: selectedBase, value: p2e(value) });
    return [
      {
        label: "اتحادیه",
        options: foundedUsers.docs.filter((user) => {
          return user.userTypes.includes("SUPER_AGENT");
        }),
      },
    ];
  };

  const formatGroupLabel = (data) => {
    return (
      <div>
        <div className="option-label">
          <span>{data.label}</span>
        </div>
      </div>
    );
  };

  return (
    <div id="custom-search-super-agent">
      <div className="btn-group">
        <button
          onClick={() => setSelectedBase("NAME")}
          className={selectedBase === "NAME" ? "btn-group__item selected" : "btn-group__item"}
        >
          {"نام"}
        </button>
        <button
          onClick={() => setSelectedBase("NATIONAL_CODE")}
          className={selectedBase === "NATIONAL_CODE" ? "btn-group__item selected" : "btn-group__item"}
        >
          {"کد ملی"}
        </button>
        <button
          onClick={() => setSelectedBase("PHONE_NUMBER")}
          className={selectedBase === "PHONE_NUMBER" ? "btn-group__item selected" : "btn-group__item"}
        >
          {"تلفن همراه"}
        </button>
        <button
          onClick={() => setSelectedBase("SUPER_AGENT_NAME")}
          className={selectedBase === "SUPER_AGENT_NAME" ? "btn-group__item selected" : "btn-group__item"}
        >
          {"نام اتحادیه"}
        </button>
      </div>
      <AsyncSelect
        loadOptions={getUsers}
        formatGroupLabel={formatGroupLabel}
        formatOptionLabel={formatOptionLabel}
        onChange={(e) => onSelectUser({ id: e._id })}
      />
    </div>
  );
};

export default CustomSearchSuperAgent;
