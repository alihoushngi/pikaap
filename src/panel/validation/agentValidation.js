import { Toastify } from "../components";

const agentValidation = (data) => {
	let isFormValid = false;
	const { agentName, firstName, lastName, nationalCode, address, shabaNumber, kartNumber } = data;
	if (!agentName.length) Toastify("error", "نام آژانس وارد نشده");
	if (!firstName.length) Toastify("error", "نام وارد نشده");
	if (!lastName.length) Toastify("error", "نام خانوادگی وارد نشده");
	if (!nationalCode.length) Toastify("error", "کد ملی وارد نشده");
	if (!address.length) Toastify("error", "آدرس وارد نشده");
	if (!shabaNumber.length) Toastify("error", "شماره شبا وارد نشده");
	if (!kartNumber.length) Toastify("error", "شماره کارت وارد نشده");

	if (
		!agentName ||
		!firstName ||
		!lastName ||
		!nationalCode ||
		!address ||
		!shabaNumber ||
		!kartNumber
	) {
		isFormValid = false;
	} else {
		isFormValid = true;
	}

	return isFormValid;
};

export default agentValidation;
