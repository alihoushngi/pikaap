import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const agentPatch = async (formData) => {
	const response = await webSiteAxios.patch(routes.patchAgent, formData);
	return response.data;
};
export default agentPatch;
