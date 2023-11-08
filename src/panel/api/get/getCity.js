import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const getCity = async (ProvinceCode) => {
	const response = await webSiteAxios.get(routes.city + `?ProvinceCode=${ProvinceCode}`);
	return response.data;
};

export default getCity;
