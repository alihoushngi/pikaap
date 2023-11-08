import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
import Cookies from "js-cookie";
import { constants } from "../../values";
const getListAndFindInvoice = async ({ body, page, startDate, endDate, searchField, searchValue }) => {
  let url;
  if (startDate && endDate)
    url =
      routes.listAndFindInvoices + `?startDate=${startDate}&endDate=${endDate}&populate=receiver creator&page=${page}`;
  else url = routes.listAndFindInvoices + `?populate=receiver creator&page=${page}`;
  try {
    const response = await webSiteAxios.post(url, body);
    return response.data.result;
  } catch (e) {
    console.log({ e });
  }
};
export default getListAndFindInvoice;
