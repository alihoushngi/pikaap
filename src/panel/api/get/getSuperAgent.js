import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const getSuperAgent = async ({ page }) => {
	const response = await webSiteAxios.get(routes.superAgentRoute + `?page=${page}`);
	return response.data;
};

export default getSuperAgent;
