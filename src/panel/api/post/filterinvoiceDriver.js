import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
import Cookies from "js-cookie";
import { constants } from "../../values";
const filterinvoiceDriver = async ({ searchField, searchValue, body }) => {
	let newBody;
	if (Cookies.get(constants.USER_TYPE) === "SUPER_AGENT") {
		newBody = {
			filteredFields: [...body.filteredFields, "SUPER_AGENT"],
			filteredValues: [...body.filteredValues, Cookies.get(constants.USER_ID)],
		};
	} else {
		newBody = {
			filteredFields: [...body.filteredFields],
			filteredValues: [...body.filteredValues],
		};
	}
	try {
		const response = await webSiteAxios.post(
			routes.invoiceDriverFilter + `?searchField=${searchField}&searchValue=${searchValue}`,
			body
		);
		return response.data.result;
	} catch (e) {
		console.log({ e });
	}
};
export default filterinvoiceDriver;
