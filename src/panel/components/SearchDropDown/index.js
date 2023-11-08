import React from "react";

const SearchDropDown = ({ filterTitle, inputSelections, main, footer, customClassForFilter }) => {
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

export default SearchDropDown;
