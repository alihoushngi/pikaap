import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
import { Toastify } from "../../components";
const deleteAgentById = async (id) => {
  const formData = {
    id,
  };
  try {
    const response = await webSiteAxios.delete(routes.deleteAgent + `?id=${id}`, { data: formData });
    return response.data;
  } catch (e) {
    console.log({ e });
    switch (e.response.data.CODE) {
      case 5043:
        Toastify("error", "آژانس مورد نظر دارای زیرمجموعه می باشد");
        break;
      default:
        break;
    }
  }
};
export default deleteAgentById;
