import Cookies from "js-cookie";
import { constants } from "../values";
const useAuth = () => {
	// return Cookies.get(constants.TOKEN) ? true : false;
	return true;
};

export { useAuth };
