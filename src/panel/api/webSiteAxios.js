import axios from "axios";
import Cookie from "js-cookie";
import { constants, config } from "../values";

export default axios.create({
	baseURL: config.BASE_URL,
	headers: {
		authorization: `Bearer ${Cookie.get(constants.TOKEN)}`,
		accept: `application/json`,
		type: `${Cookie.get(constants.USER_TYPE)}`,
	},
	crossDomain: true,
});
