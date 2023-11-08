import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const CreateTravelGroup = async (formData) => {
	const response = await webSiteAxios.post(routes.travelGroups, formData);
	return response.data;
};
export default CreateTravelGroup;
