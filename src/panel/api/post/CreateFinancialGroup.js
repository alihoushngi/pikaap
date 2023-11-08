import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const CreateFinancialGroup = async (formData) => {
	const response = await webSiteAxios.post(routes.financialGroups, formData);
	return response.data;
};
export default CreateFinancialGroup;
