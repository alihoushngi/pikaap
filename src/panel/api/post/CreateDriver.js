import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const CreateDriver = async (formData) => {
	try {
		const response = await webSiteAxios.post(routes.createDriver, formData);
		return response.data;
	} catch (e) {
		console.log({ e });
	}
};
export default CreateDriver;
