import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const getTravelGroup = async () => {
	const response = await webSiteAxios.get(routes.travelGroups);
	return response.data;
};

export default getTravelGroup;
