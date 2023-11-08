import { Toastify } from "../components";

const validVehicleInfo = (data) => {
	const {
		carBrand = "",
		carColor = "",
		carModel = "",
		insuranceExpiryDate = "",
		vin = "",
		driverLicenseNumber = "",
		insuranceNumber = "",
		uniqueCodeThirdPartyInsurance = "",
		plateNumber = {
			twoDigit: "",
			letter: "",
			threeDigit: "",
			iran: "",
		},
	} = data;
	if (carBrand.length < 1) Toastify("error", "شرکت سازنده خودرو وارد نشده است");
	if (carColor.length < 1) Toastify("error", "رنگ ماشین وارد نشده است");
	if (carModel.length !== 4) Toastify("error", "مدل ماشین وارد نشده است");
	if (insuranceExpiryDate.length < 1) Toastify("error", "تاریخ بیمه ماشین وارد نشده است");
	if (vin.length !== 17) Toastify("error", "کد بارکد کارت ماشین اشتباه است");
	if (vin.length < 1) Toastify("error", "بارکد کارت ماشین وارد نشده است");
	if (driverLicenseNumber.length !== 10) Toastify("error", "شماره گواهینامه درست وارد نشده");
	if (insuranceNumber.length < 1) Toastify("error", "شماره بیمه نامه ماشین وارد نشده است");
	if (
		plateNumber.twoDigit.length < 1 ||
		plateNumber.letter.length < 1 ||
		plateNumber.threeDigit.length < 1 ||
		plateNumber.iran.length < 1
	)
		Toastify("error", "پلاک ماشین وارد نشده است");
	if (uniqueCodeThirdPartyInsurance.length < 1)
		Toastify("error", "شماره بیمه شخص ثالث وارد نشده است");
	return true;
};

export default validVehicleInfo;
