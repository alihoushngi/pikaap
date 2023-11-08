import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const getDriver = async ({ page }) => {
	const response = await webSiteAxios.get(routes.driver + `?page=${page}`);
	return response.data;
};

export default getDriver;
