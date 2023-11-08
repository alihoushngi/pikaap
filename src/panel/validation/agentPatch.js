import { Toastify } from "../components";

const agentPatchValidation = (data) => {
	let isFormValid = false;
	const { agentName, address, kartNumber, nationalCode, shabaNumber } = data;
	if (!agentName.length) Toastify("error", "نام آژانس وارد نشده");
	if (!nationalCode.length) Toastify("error", "کد ملی وارد نشده");
	if (!address.length) Toastify("error", "آدرس وارد نشده");
	if (!shabaNumber.length) Toastify("error", "شماره شبا وارد نشده");
	if (!kartNumber.length) Toastify("error", "شماره کارت وارد نشده");

	if (!agentName || !nationalCode || !address || !shabaNumber || !kartNumber) {
		isFormValid = false;
	} else {
		isFormValid = true;
	}

	return isFormValid;
};

export default agentPatchValidation;
