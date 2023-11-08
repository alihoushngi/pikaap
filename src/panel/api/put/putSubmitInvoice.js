import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const putSubmitInvoice = async (submit) => {
	try {
		const response = await webSiteAxios.put(routes.submitInvoice, submit);

		return response.data;
	} catch (e) {
		console.log({ e });
	}
};
export default putSubmitInvoice;
