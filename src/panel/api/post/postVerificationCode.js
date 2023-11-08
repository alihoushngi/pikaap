import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
import { Toastify } from "../../components";
const postVerificationCode = async ({ phoneNumber, currency, countryCode, language, userType }) => {
	try {
		const response = await webSiteAxios.post(routes.sendVerificationCode, {
			phoneNumber,
			currency,
			countryCode,
			language,
			userType,
		});
		return response.data;
	} catch (error) {
		if (error.response.data.CODE === 5015) return error;
	}
};
export default postVerificationCode;
