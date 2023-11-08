import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const deletePassengersById = async (id) => {
	try {
		const response = await webSiteAxios.delete(routes.deletePassengers + `?id=${id}`);
		return response.data;
	} catch (e) {
		console.log({ e });
	}
};
export default deletePassengersById;
