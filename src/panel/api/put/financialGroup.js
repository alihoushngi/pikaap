import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const financialGroup = async (formData, id) => {
  try {
    const response = await webSiteAxios.put(routes.financialGroups + `/${id}`, formData);

    return response.data;
  } catch (e) {
    console.log({ e });
  }
};
export default financialGroup;
