import React from "react";
import "./index.scss";

const SelectRadio = ({ item, onRadioChange, currentSelected, name, id }) => {
	const changeHandler = (e) => {
		onRadioChange(e.target.value);
	};

	return (
		<React.Fragment>
			<div className='radioWrapper'>
				{item.map((radio, index) => {
					return (
						<div key={index} className='radioButton-custom'>
							<input
								id={`${id}-${index}`}
								type='radio'
								value={radio.value}
								name={name}
								checked={radio.value === currentSelected ? true : false}
								className='radio-custom'
								onChange={changeHandler}
							/>
							<label htmlFor={`${id}-${index}`} className='radio-label'>
								{radio.label}
							</label>
						</div>
					);
				})}
			</div>
		</React.Fragment>
	);
};

export default SelectRadio;
