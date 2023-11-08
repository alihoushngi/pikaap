import React from "react";
import PassengersDataTable from "../components/PassengersDataTable";

const PassengersDataUsers = ({ children }) => {
	return (
		<div>
			<PassengersDataTable groupName='مسافران' name='مسافر' />
		</div>
	);
};

export default PassengersDataUsers;
