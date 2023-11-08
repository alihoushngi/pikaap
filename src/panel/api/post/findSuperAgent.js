import webSiteAxios from "../webSiteAxios";
const findSuperAgent = async ({ baseSearch, value }) => {
  let body = null;
  switch (baseSearch) {
    case "NAME":
      body = {
        query: {
          lastName: value,
        },
      };
      break;
    case "PHONE_NUMBER":
      body = {
        query: {
          phoneNumber: value,
        },
      };
      break;
    case "NATIONAL_CODE":
      body = {
        query: {
          phoneNumber: value,
        },
      };
      break;
    case "SUPER_AGENT_NAME":
      body = {
        query: {
          "superAgentInformation.superAgentName": {
            $regex: value,
          },
        },
      };
      break;
    default:
      body = {
        query: {},
      };
      break;
  }
  const url =
    "https://ajansro.com/api/v1/user/find?page=1&limit=15&selects=userTypes superAgentInformation.superAgentName avatar";

  try {
    const response = await webSiteAxios.post(url, body);
    return response.data.result;
  } catch (e) {
    console.log({ e });
  }
};
export default findSuperAgent;
