import React, { useEffect, useState } from "react";
import CustomButtonGroup from "../../../components/CustomButtonGroup";
import "./index.scss";
import roles from "../../../values/roles.json";

function AddAccessScreen() {
	const [availabelRoles, setAvailabelRoles] = useState([]);
	const [selectedRole, setSelectedRole] = useState(availabelRoles[0]);
	useEffect(() => {
		setAvailabelRoles(["مدیر اتحادیه", "ادمین مالی اتحادیه", "ادمین اتحادیه", "مدیر آژانس"]);
	}, []);
	const onSelectAvailabelRoles = (role) => {
		setSelectedRole(role);
	};
	return (
		<div id='add-access-screen'>
			<h1>{"افزودن سطح دسترسی"}</h1>
			<div className='choose-role-container'>
				<CustomButtonGroup
					selected={selectedRole}
					header={"نقش کاربر"}
					items={availabelRoles}
					onClick={onSelectAvailabelRoles}
				/>
			</div>
			<div className='choose-access-container'>
				<h2>{"انتخاب دسترسی های نقش"}</h2>
				<div className='choose-access-holder'>
					<h3>{"دسترسی های اتحادیه"}</h3>
				</div>
			</div>
		</div>
	);
}

export default AddAccessScreen;
