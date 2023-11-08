import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
import { Toastify } from "../../components";

const postCreateInvoice = async (invoiceData) => {
  try {
    const response = await webSiteAxios.post(routes.createInvoice, invoiceData);
    const code = response.data.CODE;
    if (code === 2215) Toastify("success", "فیش ثبت شد");
    return true;
  } catch (e) {
    console.log({ e });
    const error = e.response.data.statusCode;
    console.log({ error });
    switch (error) {
      case 6032:
        Toastify("error", "کاربر انتخابی شمافیش تایید نشده دارد");
        break;

      default:
        Toastify("error", "فیش تایید نشد");
        break;
    }
  }
};
export default postCreateInvoice;
