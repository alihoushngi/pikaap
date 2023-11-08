import { Toastify } from "../components";
const validSubmitPersonalInformation = (data) => {
	const {
		firstName = "",
		lastName = "",
		phoneNumber = "",
		shabaNumber = "",
		kartNumber = "",
		nationalCode = "",
		address = "",
		gender = "",
	} = data;

	if (firstName.length < 1) Toastify("error", "نام وارد نشده است");
	else if (lastName.length < 1) Toastify("error", "نام خانوادگی وارد نشده است");
	else if (phoneNumber.length < 11) return "شماره تلفن وارد نشده است";
	else if (shabaNumber.length < 1) Toastify("error", "شماره شبا وارد نشده است");
	else if (shabaNumber.length < 24) Toastify("error", "شماره شبا درست وارد نشده");
	else if (shabaNumber.length > 24) Toastify("error", "شماره شبا بیشتر از حد مجاز وارد شده");
	else if (kartNumber.length !== 19) Toastify("error", "شماره کارت درست وارد نشده است");
	else if (nationalCode.length !== 10) Toastify("error", "کد ملی وارد درست نشده است");
	else if (address.length < 1) Toastify("error", "آدرس وارد نشده است");
	else if (gender.length < 1) Toastify("error", "جنسیت انتخاب نشده است");
	else return true;
};

export default validSubmitPersonalInformation;
