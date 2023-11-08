import routes from "../routes";
import webSiteAxios from "../webSiteAxios";

const getSearchAndFilterDriver = async (searchField, searchValue, bodyData) => {
	const response = await webSiteAxios.get(
		routes.DriverSandF + `?searchField=${searchField}&searchValue=${searchValue}`,
		bodyData
	);
	return response.data;
};

export default getSearchAndFilterDriver;
