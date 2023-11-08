import React, { useState } from "react";
import { Buttons, DropDown } from "../../components";
import "./index.scss";

const FilterDropDown = ({ main, inputSelections, filterTitle, footer, customClassForFilter }) => {
	return (
		<div className={`${customClassForFilter} filterDropDown_Wrapper`}>
			<div className='DropDownHeader'>
				<div className='DropDownHeader_title'>
					<h5>{filterTitle}</h5>
				</div>
				{inputSelections}
			</div>
			<div className='DropDownMain'>{main}</div>
			<div className='DropDownFooter'>{footer}</div>
		</div>
	);
};

export default FilterDropDown;

// <Buttons
// ButtonUrl='/'
// ButtonContent='تایید'
// buttonsWrapper='Filterbutton submit'
// style={{ textDecoration: "none", color: "#0c0c0c" }}
// onClick={acceptOnClick}
// />
// <Buttons
// ButtonUrl='/'
// ButtonContent='تنطیم مجدد'
// buttonsWrapper='Filterbutton reset'
// style={{ textDecoration: "none", color: "#0c0c0c" }}
// onClick={resetOnClick}
// />
