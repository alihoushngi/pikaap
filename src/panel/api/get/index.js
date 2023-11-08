import getSuperAgent from "./getSuperAgent";
import getAgent from "./getAgent";
import getDriver from "./getDriver";
import getPassengers from "./getPassengers";
import getProvince from "./getProvince";
import getCity from "./getCity";
import getFinancialGroups from "./getFinancialGroups";
import getTravelGroup from "./getTravelGroup";
import getSearchAndFilterDriver from "./getSearchAndFilterDriver";
import getTravels from "./getTravels";
import dashboardData from "./dashboardData";
import phoneNumberChecker from "./phoneNumberChecker";
import loginIsExitsChecker from "./loginIsExitsChecker";
import getListAndFindInvoice from "./getListAndFindInvoice";
import findUserByPhoneNumber from "./findUserByPhoneNumber";
import findUserAgentCode from "./findUserAgentCode";
import findUserByAgentName from "./findUserByAgentName";
import getSuperAgentNoLimit from "./getSuperAgentNoLimit";
import superAgentDashboardData from "./superAgentDashboardData";

const get = {
	getSuperAgentNoLimit,
	findUserByAgentName,
	findUserAgentCode,
	findUserByPhoneNumber,
	dashboardData,
	getTravels,
	getSuperAgent,
	getAgent,
	getDriver,
	getPassengers,
	getProvince,
	getCity,
	getFinancialGroups,
	getTravelGroup,
	getSearchAndFilterDriver,
	phoneNumberChecker,
	loginIsExitsChecker,
	getListAndFindInvoice,
	superAgentDashboardData,
};
export default get;
