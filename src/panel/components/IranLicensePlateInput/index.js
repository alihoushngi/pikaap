import React from "react";
import "./index.scss";

const IranLicensePlateInput = () => {
	return (
		<div className='licenseWrapper'>
			<div className='licenseWrapper_left'>
				<div className='Iran_flag'>
					<div className='Iran_flag-green'></div>
					<div className='Iran_flag-fa-white'></div>
					<div className='Iran_flag-red'></div>
				</div>
				<div className='flag_letter'>
					<span>IR</span>
					<span>IRAN</span>
				</div>
			</div>
			<div className='licenseWrapper_center'>
				<div className='car-number'>
					<input
						className='car-number__input car-number__input_numbers firtsNumbers'
						placeholder='37'
						pattern='\d*'
						maxlength='2'
						tabindex='7'
						type='number'
						name='p1'
					/>
					<input
						className='car-number__input car-number__input_letters'
						placeholder='ج'
						maxlength='1'
						tabindex='8'
						name='p2'
					/>
					<input
						className='car-number__input car-number__input_numbers secoundNumbers'
						placeholder='334'
						pattern='\d*'
						maxlength='3'
						tabindex='9'
						type='number'
						name='p3'
					/>
					<input
						className='car-number__input car-number__input_numbers last-child'
						placeholder='96'
						pattern='\d*'
						maxlength='2'
						tabindex='10'
						type='number'
						name='p4'
					/>
				</div>
			</div>
			<div className='licenseWrapper_right'>
				<div className='License_title'>
					<strong>ایــــــــــــران</strong>
				</div>
				<div className='License_city'></div>
			</div>
		</div>
	);
};

export default IranLicensePlateInput;
