import { Toastify } from "../../components";
import routes from "../routes";
import webSiteAxios from "../webSiteAxios";
const adminUpdateUserToAgent = async (formData, setLoading) => {
	try {
		await webSiteAxios.patch(routes.adminUpdateUserToAgent, formData);
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
export default adminUpdateUserToAgent;
