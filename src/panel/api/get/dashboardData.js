import { logOuthandler } from "../../../helpers/function";
import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const dashboardData = async () => {
	try {
		const response = await webSiteAxios.get(routes.getDashboardData);
		return response.data.result;
	} catch (e) {
		if (e.response.data.CODE === 5098) {
			window.location.href = "/administrator/login";
			logOuthandler();
		}
	}
};

export default dashboardData;
