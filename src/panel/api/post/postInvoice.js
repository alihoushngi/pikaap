import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const postInvoice = async ({ filteredFields, filteredValues }) => {
	const response = await webSiteAxios.post(routes.Invoice, {
		filteredFields,
		filteredValues,
	});
	return response.data;
};
export default postInvoice;
