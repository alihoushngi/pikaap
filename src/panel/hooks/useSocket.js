import SocketIOClient from "socket.io-client/dist/socket.io.js";
import Cookies from "js-cookie";
import { constants } from "../values";
const SOCKET_URL = "http://188.121.108.199:3000";
const token = Cookies.get(constants.TOKEN);

const useSocket = () => {
	const socket = SocketIOClient(SOCKET_URL, {
		extraHeaders: {
			type: Cookies.get(constants.USER_TYPE),
		},
		auth: {
			token,
		},
	});
	// socket.on("connect", () => {
	//   ("connected");
	// });

	socket.on("connect_error", (err) => {});
	return socket;
};
export default useSocket;
