import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
import Cookies from "js-cookie";
import { constants } from "../../values";
const CreateAgent = async (formData) => {
	const route =
		Cookies.get(constants.USER_TYPE) === "SUPER_AGENT"
			? routes.superAgentCreateAgent
			: routes.adminCreateAgent;
	try {
		const response = await webSiteAxios.post(route, formData);
		return response.data;
	} catch (e) {
		console.log({ e });
	}
};
export default CreateAgent;
