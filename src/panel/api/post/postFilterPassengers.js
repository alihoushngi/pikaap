import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const postFilterPassengers = async ({ searchField, searchValue, body, page }) => {
	try {
		const response = await webSiteAxios.post(
			routes.FilterPassengers +
				`?searchField=${searchField}&searchValue=${searchValue}&page=${page}`,
			body
		);

		return response.data.result;
	} catch (e) {
		console.log({ e });
	}
};
export default postFilterPassengers;
