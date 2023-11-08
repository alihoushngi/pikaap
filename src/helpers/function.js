import Cookies from "js-cookie";
import { constants } from "../panel/values";
export function formatPhoneNumber(phoneNumberString) {
	var cleaned = phoneNumberString.replace(/\D/g, "");
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
	if (match) {
		return match[1] + "-" + match[2] + "-" + match[3];
	}
	return null;
}
export function logOuthandler() {
	Cookies.remove(constants.TOKEN);
	Cookies.remove(constants.USER_TYPE);
	Cookies.remove(constants.USER_ID);
	localStorage.removeItem("user");
	window.location.reload();
}
export const log = (text, color) => {};

export function cc_format(value) {
	const v = value
		.replace(/\s+/g, "")
		.replace(/[^۰۱۲۳۴۵۶۷۸۹0-9]/gi, "")
		.substr(0, 16);
	const parts = [];

	for (let i = 0; i < v.length; i += 4) {
		parts.push(v.substr(i, 4));
	}

	return parts.length > 1 ? parts.join("-") : value;
}
