import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const putDriver = async (formData, id) => {
	try {
		const response = await webSiteAxios.put(routes.driver + `?userId=${id}`, formData);

		return response.data;
	} catch (e) {
		console.log({ e });
	}
};
export default putDriver;
