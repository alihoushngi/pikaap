import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const loginIsExitsChecker = async ({ phoneNumber, userType }) => {
	try {
		const response = await webSiteAxios.get(
			routes.checkLogin + `?phoneNumber=${phoneNumber}&userType=${userType}`
		);
		return response.data;
	} catch (e) {
		console.log({ e });
	}
};

export default loginIsExitsChecker;
