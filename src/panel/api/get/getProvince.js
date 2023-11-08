import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const getProvince = async () => {
	const response = await webSiteAxios.get(routes.province);
	return response.data;
};

export default getProvince;
