import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const putRejectInvoice = async (reject) => {
	try {
		const response = await webSiteAxios.put(routes.rejectInvoice, reject);
		return response.data;
	} catch (e) {
		console.log({ e });
	}
};
export default putRejectInvoice;
