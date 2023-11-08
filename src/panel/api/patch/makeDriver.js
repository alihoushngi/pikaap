import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
import { Toastify } from "../../components";
import Cookies from "js-cookie";
import { constants } from "../../values";
const makeDriver = async (formData, userId) => {
  try {
    const type = Cookies.get(constants.USER_TYPE);
    let route;
    if (type === "ADMIN") {
      route = routes.adminCreateDriver;
    } else if (type === "SUPER_AGENT") {
      route = routes.superAgentCreateDriver;
    } else if (type === "AGENT") {
      route = routes.agentCreateDriver;
    }

    const response = await webSiteAxios.patch(`${route}?userId=${userId}`, formData);
    if (response.data.CODE === 2035) {
      Toastify("success", "راننده ساخته شد");
      // window.location.reload();
    } else return false;
  } catch (e) {
    const error = e.response.data.CODE;
    switch (error) {
      case 5031:
        return Toastify("error", "راننده از قبل ساخته شده است");

      default:
        return Toastify("error", "راننده ساخته نشد");
    }
  }
};
export default makeDriver;
