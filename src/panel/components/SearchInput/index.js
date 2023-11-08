import React, { memo } from "react";
import DropDown2 from "../DropDown2";
import "./index.scss";

const SearchInput = ({
	badgeText,
	icon,
	label,
	placeHolder,
	value,
	SearchOnChange,
	labelName,
	onSelectedSearchBase,
	searchFildName,
	UserName,
	codeName,
}) => {
	let newLabel;
	if (searchFildName === "آژانس ها") newLabel = "کد آژانس";
	if (searchFildName === "اتحادیه") newLabel = "کد اتحادیه";
	if (searchFildName === "فیش") newLabel = "شناسه فیش";
	if (searchFildName === "رانندگان") newLabel = "کد ملی";

	const searchDropDown = [
		{
			label: `نام ${searchFildName === "فیش" ? "پرداخت کننده" : searchFildName}`,
			value: `${UserName}`,
		},
		{
			label: "شماره تلفن",
			value: "PHONE_NUMBER",
		},
		{
			label: newLabel,
			value: `${codeName}`,
		},
	];

	return (
		<section id='custom-input-1-container'>
			<label htmlFor={labelName}>{label}</label>
			<div className='input-wrapper'>
				{badgeText ? <span className='badge'>{badgeText}</span> : null}
				<input
					type='text'
					placeholder={placeHolder}
					onChange={SearchOnChange}
					value={value}
					name={labelName}
				/>
				{onSelectedSearchBase && (
					<div style={{ width: "120px", display: "flex", alignItems: "center" }}>
						<DropDown2 data={searchDropDown} onSelected={onSelectedSearchBase} />
					</div>
				)}
			</div>
		</section>
	);
};

export default memo(SearchInput);
