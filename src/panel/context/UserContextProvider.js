import React, { createContext, useEffect, useState } from "react";
import TaxiAvatar from "../assets/Images/TaxiAvatar.jpg";
import maneger from "../assets/Images/image-user.svg";
import unionPhoto from "../assets/Images/square-u.svg";
import taxiPhoto from "../assets/Images/square-t.svg";
import taxtionPhoto from "../assets/Images/square-dollar.svg";
import Driver from "../assets/Images/square-c.svg";
import travelImage from "../assets/Images/square-poll-vertical.svg";

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		let userData = {
			name: "",
			lastName: "",
			type: "",
		};
		const ls = localStorage.getItem("user");
		if (ls) {
			userData = JSON.parse(ls);
		}
		return userData;
	});

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(user));
	}, [user]);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
