import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
import Cookies from "js-cookie";
import { constants } from "../../values";
const postFilterInvoces = async (page = 1) => {
	let newBody;
	if (Cookies.get(constants.USER_TYPE) === "SUPER_AGENT") {
		newBody = {
			filteredFields: ["SUPER_AGENT"],
			filteredValues: [Cookies.get(constants.USER_ID)],
		};
	}

	try {
		const response = await webSiteAxios.post(`${routes.FilterInvoice}?page=${page}`, newBody);

		return response.data.result;
	} catch (e) {
		console.log({ e });
	}
};
export default postFilterInvoces;
