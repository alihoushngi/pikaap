import React, { useState } from "react";
import "./index.scss";

const CustomDropDown = (props) => {
	const {
		data,
		label,
		selectedData,
		placeholder,
		searchBaseItems,
		selectedBaseSearch,
		onBaseSearchChange,
	} = props;

	const [showBaseSearch, setShowBaseSearch] = useState(false);
	const [showDropDown, setShowDropDown] = useState(false);
	const onDropDownOpen = () => setShowDropDown(!showDropDown);
	return (
		<div id='custom-drop-down'>
			{label && (
				<div className='cdd-input'>
					<label>{label}</label>
					<div>
						<span onClick={onDropDownOpen}>
							{selectedData ? selectedData : placeholder}
						</span>

						<i onClick={onDropDownOpen} className='fas fa-chevron-down' />
					</div>
				</div>
			)}

			<div className='cdd-body'>
				<div className='cdd-body-search'>
					<input />
					{searchBaseItems && (
						<section className='cdd-search-base'>
							<div className='cdd-search-base-header'>
								<span>
									{selectedBaseSearch ? selectedBaseSearch : searchBaseItems[0]}
									<i
										className='fad fa-chevron-down'
										onClick={() => setShowBaseSearch(!showBaseSearch)}
									/>
								</span>
								<div
									className={`cdd-search-base-body ${!showBaseSearch && "none"}`}
								>
									{searchBaseItems.map((item, index) => (
										<p
											onClick={() => {
												onBaseSearchChange(item);
												setShowBaseSearch(!showBaseSearch);
											}}
											key={item + "-" + index}
										>
											{item}
										</p>
									))}
								</div>
							</div>
						</section>
					)}
				</div>
				<div className='cdd-body-data '></div>
			</div>
		</div>
	);
};

export default CustomDropDown;
