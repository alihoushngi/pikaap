import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const getAllTransactions = async ({ page = 1, body }) => {
	try {
		const response = await webSiteAxios.post(
			`${routes.getAllTransactions}?page=${page}&populate=receiverId payerId`,
			body
		);
		return response.data.result;
	} catch (e) {
		console.log({ e });
	}
};
export default getAllTransactions;
