import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const getFinancialGroups = async () => {
	const response = await webSiteAxios.get(routes.financialGroups);
	return response.data;
};

export default getFinancialGroups;
