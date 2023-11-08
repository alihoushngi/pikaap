import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const deleteSuperAgentById = async (data) => {
	try {
		const response = await webSiteAxios.delete(routes.deleteSuperAgent, data);
		return response.data;
	} catch (e) {
		console.log({ e });
	}
};
export default deleteSuperAgentById;
