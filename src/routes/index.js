import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../panel/screens";
import LoginWebsite from "../website/screens/LoginWebsite";
import PanelRoutes from "./PanelRoutes";
import WebsiteRoutes from "./WebsiteRoutes";

function Navigation() {
	return (
		<Routes>
			<Route path='/administrator/login' element={<Login />} />
			<Route path='/login' element={<LoginWebsite />} />
			<Route path='/administrator/*' element={<PanelRoutes />} />
			<Route path='/*' element={<WebsiteRoutes />} />
		</Routes>
	);
}

export default Navigation;
