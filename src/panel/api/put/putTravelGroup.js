import webSiteAxios from "../webSiteAxios";
import routes from "../routes";
const putTravelGroup = async (formData, id) => {
  try {
    const response = await webSiteAxios.put(routes.travelGroups + `/${id}`, formData);
    return response.data;
  } catch (e) {
    console.log({ e });
  }
};
export default putTravelGroup;
