import { useState } from "react";
import AsyncSelect from "react-select/async";
import api from "../../api";
import avatar from "../../assets/Images/avatar.png";
import "./index.scss";

const CustomSearch = ({ onSelectUser, type }) => {
  const [selectedBase, setSelectedBase] = useState("NAME");
  const [selectedOption, setSelectedOption] = useState();

  const formatOptionLabel = (data) => {
    const RoleName = () => {
      switch (type) {
        case "agent":
          return <span> نام آژانس: {data.agentInformation.agentName}</span>;
        case "superAgent":
          return <span> نام اتحادیه:{data.superAgentInformation.superAgentName}</span>;
        default:
          return null;
      }
    };
    return (
      <div className="option-item" onClick={() => setSelectedOption(data)}>
        <img src={data.avatar ? data.avatar : avatar} alt="avatar" />
        <div className="info">
          <span>
            {data.firstName} {data.lastName}
          </span>
          <span>{data.phoneNumber}</span>
          <RoleName />
        </div>
      </div>
    );
  };

  const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

  const getUsers = async (value) => {
    const foundedUsers = await api.post.findUser({ baseSearch: selectedBase, value: p2e(value) });
    switch (type) {
      case "driver":
        return [
          {
            label: "راننده",
            options: foundedUsers.docs.filter((user) => {
              return user.userTypes.includes("DRIVER");
            }),
          },
        ];
      case "superAgent":
        return [
          {
            label: "اتحادیه",
            options: foundedUsers.docs.filter((user) => {
              return user.userTypes.includes("SUPER_AGENT");
            }),
          },
        ];
      case "agent":
        return [
          {
            label: "آژانس",
            options: foundedUsers.docs.filter((user) => {
              return user.userTypes.includes("AGENT");
            }),
          },
        ];
      case "passenger":
        return [
          {
            label: "مسافر",
            options: foundedUsers.docs.filter((user) => {
              return user.userTypes.includes("PASSENGER");
            }),
          },
        ];
      default:
        return [
          {
            label: "اتحادیه",
            options: foundedUsers.docs.filter((user) => {
              return user.userTypes.includes("SUPER_AGENT");
            }),
          },
          {
            label: "آژانس",
            options: foundedUsers.docs.filter((user) => {
              return user.userTypes.includes("AGENT");
            }),
          },
          {
            label: "راننده",
            options: foundedUsers.docs.filter((user) => {
              return user.userTypes.includes("DRIVER");
            }),
          },
          {
            label: "مسافر",
            options: foundedUsers.docs.filter((user) => {
              return user.userTypes.includes("PASSENGER");
            }),
          },
        ];
    }
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
    <div id="custom-search">
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

export default CustomSearch;
