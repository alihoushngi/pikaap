import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const phoneNumberChecker = async ({ phoneNumber, userType }) => {
	try {
		const response = await webSiteAxios.get(
			routes.getPhoneNumberChecker + `?phoneNumber=${phoneNumber}&userType=${userType}`
		);
		return response.data;
	} catch (e) {
		console.log({ e });
	}
};

export default phoneNumberChecker;
