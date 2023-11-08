import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const DeleteFinancialGroup = async (id) => {
	try {
		const response = await webSiteAxios.delete(routes.financialGroups + `/${id}`);
		return response.data;
	} catch (e) {
		console.log({ e });
	}
};
export default DeleteFinancialGroup;
