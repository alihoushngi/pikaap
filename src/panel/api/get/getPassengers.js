import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const getPassengers = async ({ page }) => {
	const response = await webSiteAxios.get(routes.passengers + `?page=${page}`);
	return response.data;
};

export default getPassengers;
