import webSiteAxios from "../webSiteAxios";

const findUserByAgentName = async ({ searchValue }) => {
  const response = await webSiteAxios.post(
    `https://ajansro.com/api/v1/user/find?limit=3&selects=agentInformation.agentName agentInformation.code&populate=agentInformation.superAgent`,
    {
      query: {
        userTypes: {
          $in: ["AGENT"],
        },
        "agentInformation.agentName": {
          $regex: searchValue,
        },
      },
    }
  );
  return response.data.result;
};

export default findUserByAgentName;
