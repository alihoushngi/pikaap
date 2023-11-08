import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
import Cookies from "js-cookie";
import { constants, strings } from "../../values";
import { Toastify } from "../../components";
const putAgent = async (formData, id) => {
	// const newFormData = formData.push(id);
	Object.assign(formData, { userId: id });
	let url;
	console.log({ WE: constants.USER_TYPE });
	if (Cookies.get(constants.USER_TYPE) === "ADMIN") url = routes.agent;
	else if (Cookies.get(constants.USER_TYPE) === "SUPER_AGENT") url = routes.superAgentEditAgent;
	console.log({ url });
	try {
		const response = await webSiteAxios.put(url, formData);
		return response.data;
	} catch (e) {
		switch (e.response.data.CODE) {
			case 5042:
				Toastify("error", "شماره قبلا ثبت شده است", "5042");
				break;
			case 5038:
				Toastify("error", "کد آژانس قبلا ثبت شده است", "5038");
				break;

			default:
				break;
		}
		console.log({ e });
	}
};
export default putAgent;
