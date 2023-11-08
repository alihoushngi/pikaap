import webSiteAxios from "../webSiteAxios";
const findAgent = async ({ baseSearch, value }) => {
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
    case "AGENT_NAME":
      body = {
        query: {
          "agentInformation.agentName": {
            $regex: value,
          },
        },
      };

      break;
    case "AGENT_CODE":
      body = {
        query: {
          "agentInformation.code": {
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
    "https://ajansro.com/api/v1/user/find?page=1&limit=15&selects=userTypes agentInformation.agentName agentInformation.code agentInformation.city avatar";

  try {
    const response = await webSiteAxios.post(url, body);
    return response.data.result;
  } catch (e) {
    console.log({ e });
  }
};
export default findAgent;
