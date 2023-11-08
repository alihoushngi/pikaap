import webSiteAxios from "../webSiteAxios";

const findUserByPhoneNumber = async ({ userType, searchValue }) => {
	const response = await webSiteAxios.post(
		`https://ajansro.com/api/v1/user/find?limit=3&selects=agentInformation.agentName agentInformation.code&populate=agentInformation.superAgent`,
		{
			query: {
				userTypes: {
					$in: [userType],
				},
				phoneNumber: searchValue,
			},
		}
	);
	return response.data.result;
};

export default findUserByPhoneNumber;
