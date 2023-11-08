import webSiteAxios from "../webSiteAxios";

const findUserAgentCode = async ({ searchValue }) => {
  const response = await webSiteAxios.post(
    `https://ajansro.com/api/v1/user/find?limit=3&selects=agentInformation.agentName agentInformation.code&populate=agentInformation.superAgent`,
    {
      query: {
        userTypes: {
          $in: ["AGENT"],
        },
        "agentInformation.code": {
          $regex: searchValue,
        },
      },
    }
  );
  return response.data.result;
};

export default findUserAgentCode;
