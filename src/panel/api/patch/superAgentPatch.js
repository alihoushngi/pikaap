import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const superAgentPatch = async (formData) => {
	const response = await webSiteAxios.patch(routes.patchSuperAgent, formData);
	return response.data;
};
export default superAgentPatch;
