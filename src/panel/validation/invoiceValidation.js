import { Toastify } from "../components";

const invoiceVAlidation = (data) => {
	const { payType, trackingCode, amount, reason } = data;
	let isInvoiceValid = false;
	if (!payType) Toastify("error", "نوع پرداخت وارد نشده");
	if (!trackingCode) Toastify("error", "شناسه فیش وارد نشده");
	if (!reason) Toastify("error", "نوع فیش وارد نشده");
	if (reason === "CHARGE_WALLET" || reason === "PAY_DEBTS") {
		if (!amount) {
			isInvoiceValid = false;
			return Toastify("error", "مبلغ فیش وارد نشده");
		}
	}

	if (!payType || !trackingCode || !reason) {
		isInvoiceValid = false;
	} else {
		isInvoiceValid = true;
	}
	return isInvoiceValid;
};

export default invoiceVAlidation;
