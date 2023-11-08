import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const postSubmitVerficationCode = async ({ phoneNumber, verificationCode }) => {
	const response = await webSiteAxios.post(routes.VerificationCode, {
		phoneNumber,
		verificationCode,
	});
	return response.data;
};
export default postSubmitVerficationCode;
