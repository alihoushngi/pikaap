import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const deleteDriverById = async (id) => {
	try {
		const response = await webSiteAxios.delete(routes.deleteDriver + `?userId=${id}`);
		return response.data;
	} catch (e) {
		console.log({ e });
	}
};
export default deleteDriverById;
