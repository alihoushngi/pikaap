import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import api from "../../api";
import avatar from "../../assets/Images/avatar.png";
import "./index.scss";

const CustomSearchAgent = ({ onSelectUser, selectedAgent }) => {
  const [selectedBase, setSelectedBase] = useState("NAME");
  const [selectedOption, setSelectedOption] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    users && console.log({ re: users.filter((user) => user._id === selectedAgent) });
  }, []);
  const formatOptionLabel = (data) => {
    return (
      <div className="option-item" onClick={() => setSelectedOption(data)}>
        <img src={data.avatar ? data.avatar : avatar} alt="avatar" />
        <div className="info">
          <span>
            {data.firstName} {data.lastName}
          </span>
          <span>{data.phoneNumber}</span>
          <span> نام آژانس:{data.agentInformation.agentName}</span>
          <span> کد آژانس:{data.agentInformation.code}</span>
          <span> شهر:{data.agentInformation.city}</span>
        </div>
      </div>
    );
  };

  const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

  const getUsers = async (value) => {
    const foundedUsers = await api.post.findAgent({ baseSearch: selectedBase, value: p2e(value) });
    setUsers(foundedUsers.docs);
    return [
      {
        label: "آژانس",
        options: foundedUsers.docs.filter((user) => {
          return user.userTypes.includes("AGENT");
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
    <div id="custom-search-agent">
      <div className="btn-group">
        <button
          onClick={() => setSelectedBase("AGENT_NAME")}
          className={selectedBase === "AGENT_NAME" ? "btn-group__item selected" : "btn-group__item"}
        >
          {"نام آژانس"}
        </button>
        <button
          onClick={() => setSelectedBase("AGENT_CODE")}
          className={selectedBase === "AGENT_CODE" ? "btn-group__item selected" : "btn-group__item"}
        >
          {"کد آژانس"}
        </button>
        <button
          onClick={() => setSelectedBase("NAME")}
          className={selectedBase === "NAME" ? "btn-group__item selected" : "btn-group__item"}
        >
          {"نام خانوادگی"}
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
        value={selectedOption}
        loadOptions={getUsers}
        formatGroupLabel={formatGroupLabel}
        formatOptionLabel={formatOptionLabel}
        onChange={(e) => onSelectUser({ id: e._id })}
      />
    </div>
  );
};

export default CustomSearchAgent;
