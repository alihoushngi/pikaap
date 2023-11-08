import { logOuthandler } from "../../../helpers/function";
import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const superAgentDashboardData = async () => {
	try {
		const response = await webSiteAxios.get(routes.getSuperAgentDashboardData);
		return response.data.result;
	} catch (e) {
		console.log({ e });
		if (e.response.data.CODE === 5098) {
			window.location.href = "/administrator/login";
			logOuthandler();
		}
	}
};

export default superAgentDashboardData;
