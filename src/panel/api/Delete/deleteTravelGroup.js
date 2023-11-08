import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const deleteTravelGroup = async (id) => {
	try {
		const response = await webSiteAxios.delete(routes.travelGroups + `/${id}`);
		return response.data;
	} catch (e) {
		console.log({ e });
	}
};
export default deleteTravelGroup;
