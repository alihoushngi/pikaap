import { Toastify } from "../components";

const superAgentValidation = (data) => {
	let isFormValid = false;
	const {
		address,
		city,
		countryCode,
		firstName,
		kartNumber,
		lastName,
		nationalCode,
		shabaNumber,
		superAgentName,
	} = data;
	if (!superAgentName.length) return Toastify("error", "نام اتحادیه واردنشده", "superAgentName");
	if (!firstName.length) return Toastify("error", "نام واردنشده", "firstName");
	if (!lastName.length) return Toastify("error", "نام خانوادگی واردنشده", "lastName");
	if (!countryCode.length) return Toastify("error", "استان واردنشده", "countryCode");
	if (!city.length) return Toastify("error", "شهر واردنشده", "city");
	if (!shabaNumber.length) return Toastify("error", "شماره شبا واردنشده", "shabaNumber");
	if (!kartNumber.length) return Toastify("error", "شماره کارت واردنشده", "kartNumber");
	if (!nationalCode.length) return Toastify("error", "کد ملی واردنشده", "nationalCode");
	if (!address.length) return Toastify("error", "ادرس واردنشده", "address");
	if (
		!address ||
		!city ||
		!countryCode ||
		!firstName ||
		!kartNumber ||
		!lastName ||
		!nationalCode ||
		!shabaNumber ||
		!superAgentName
	) {
		isFormValid = false;
	} else {
		isFormValid = true;
	}

	return isFormValid;
};

export default superAgentValidation;
