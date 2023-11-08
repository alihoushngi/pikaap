import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
import Cookies from "js-cookie";
import { constants } from "../../values";
import { Toastify } from "../../components";
const adminCreateAgent = async (formData, setLoading) => {
	try {
		await webSiteAxios.post(routes.adminCreateAgent, formData);
		return true;
	} catch (e) {
		console.log({ e });
		setLoading(false);
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
	}
};
export default adminCreateAgent;
