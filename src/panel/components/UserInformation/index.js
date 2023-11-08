import users from "../../assets/Images/users.png";
import "./index.scss";
const UserInformation = ({ firstName, lastName, phoneNumber, code, avatar, agentName }) => {
  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = phoneNumberString.replace(/\D/g, "");
    var match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);
    if (match) {
      return match[1] + "-" + match[2] + "-" + match[3];
    }
    return null;
  };
  return (
    <div id="user-information-container">
      <div className="avatar" style={{ backgroundImage: `url(${avatar ? avatar : users})` }} />
      <div className="name-holder">
        <h1>
          {firstName ? firstName : "نامی وارد نشده است"} {lastName}
        </h1>
        <h2>{formatPhoneNumber(`0${parseInt(phoneNumber)}`)}</h2>
        {agentName && <h2>{agentName}</h2>}
        {code && <h2>{code}</h2>}
      </div>
    </div>
  );
};
export default UserInformation;
