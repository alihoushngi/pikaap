import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const getSuperAgentNoLimit = async () => {
  const response = await webSiteAxios.post(
    "http://188.121.108.199:8451/api/v1/user/find?selects=superAgentInformation.superAgentName",
    {
      query: {
        userTypes: ["SUPER_AGENT"],
      },
    }
  );
  return response.data;
};

export default getSuperAgentNoLimit;
