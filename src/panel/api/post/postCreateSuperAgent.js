import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const postCreateSuperAgent = async (formData) => {
	const response = await webSiteAxios.post(routes.createSuperAgent, formData);
	return response.data;
};
export default postCreateSuperAgent;
