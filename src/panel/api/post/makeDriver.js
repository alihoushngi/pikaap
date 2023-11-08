import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
import Cookies from "js-cookie";
import { constants } from "../../values";
import { Toastify } from "../../components";
const makeDriver = async (formData) => {
	const toastConfig = {
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false,
		progress: undefined,
	};
	try {
		const type = Cookies.get(constants.USER_TYPE);
		let route;
		if (type === "ADMIN") {
			route = routes.adminCreateDriver;
		} else if (type === "SUPER_AGENT") {
			route = routes.superAgentCreateDriver;
		} else if (type === "AGENT") {
			route = routes.agentCreateDriver;
		}

		const response = await webSiteAxios.post(route, formData);
		if (response.data.CODE === 2035) {
			Toastify("success", "راننده ساخته شد");
			// window.location.reload();
		} else return false;
	} catch (e) {
		console.log({ e });
		const error = e.response.data.CODE;
		switch (error) {
			case 5031:
				return Toastify("error", "این راننده قبلا وجود داشته است");
			default:
				return Toastify("error", "راننده ساخته نشد");
		}
	}
};
export default makeDriver;
