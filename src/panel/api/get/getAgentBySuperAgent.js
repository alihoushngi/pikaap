import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const getAgentBySuperAgent = async ({ page }) => {
	const response = await webSiteAxios.get(routes.getAgentBySuperAgent + `?page=${page}`);
	return response.data;
};

export default getAgentBySuperAgent;
