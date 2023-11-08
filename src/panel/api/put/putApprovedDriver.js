import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const putApprovedDriver = async ({ id }) => {
	try {
		const response = await webSiteAxios.put(routes.approvedDriver + `?driverId=${id}`);

		return response.data;
	} catch (e) {
		console.log({ e });
	}
};
export default putApprovedDriver;
