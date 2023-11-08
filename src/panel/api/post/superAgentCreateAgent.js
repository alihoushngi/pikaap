import routes from "../routes";
import webSiteAxios from "../webSiteAxios";
import { Toastify } from "../../components";
const superAgentCreateAgent = async (formData) => {
  try {
    await webSiteAxios.post(routes.superAgentCreateAgent, formData);
    return true;
  } catch (e) {
    console.warn({ MEHRAD: e });
    const error = e.response.data.CODE;
    switch (error) {
      case 5038:
        Toastify("error", "آژانس از قبل وجود داشته است");
        break;
      default:
        Toastify("error", "آژانس ساخته نشد");
        break;
    }
    return false;
  }
};
export default superAgentCreateAgent;
