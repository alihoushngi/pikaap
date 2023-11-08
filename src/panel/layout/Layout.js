import React from "react";
import { Navbar, SideBar } from "../components";

const Layout = ({ children }) => {
	return (
		<div className='app-container'>
			<div className='header-container'>
				<SideBar />
			</div>
			<div className='main-container'>
				<Navbar />

				<div className='layout Container'>
					<div className='main-layout'>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
