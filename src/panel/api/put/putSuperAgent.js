import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const putSuperAgent = async (formData, id) => {
	try {
		const response = await webSiteAxios.put(
			routes.superAgentRoute + `?superAgentId=${id}`,
			formData
		);

		return response.data;
	} catch (e) {
		console.log({ e });
	}
};
export default putSuperAgent;
