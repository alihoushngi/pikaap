import Cookies from "js-cookie";
import { constants } from "../../values";
import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const getAgent = async ({ page }) => {
	let route;

	if (Cookies.get(constants.USER_TYPE) === "ADMIN") route = routes.agent;
	else route = routes.getAgentBySuperAgent;

	const response = await webSiteAxios.get(route + `?page=${page}`);
	return response.data;
};

export default getAgent;
