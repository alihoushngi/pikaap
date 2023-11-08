import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const getTravels = async ({ page }) => {
  const response = await webSiteAxios.get(
    `https://ajansro.com/api/v1/travel/find?page=${page}&populate=passengerId driverId agentId`
  );
  return response.data.result;
};

export default getTravels;
