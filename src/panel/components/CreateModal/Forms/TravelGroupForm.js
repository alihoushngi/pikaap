import React, { memo, useEffect } from "react";
import api from "../../../api";

const TravelGroupForm = ({
	step,
	setStep,
	TravelGroupFormData,
	setTravelGroupFormData,
	setData,
}) => {
	useEffect(() => {}, []);
	const submitHandler = () => {
		api.post.CreateTravelGroup(TravelGroupFormData).then(() => {
			api.get.getTravelGroup().then((res) => {
				window.location.reload();
			});
		});
	};
	// ! post data to server

	return (
		<>
			{step === 1 && (
				<div className='form first-form'>
					<div className='inputWrapper'>
						<label htmlFor='FgName' className='label'>
							<span className='required'>نام گروه سفر</span>
						</label>
						<input
							className='form-input'
							style={{ direction: "ltr" }}
							name='FgName'
							type='text'
							autoComplete='off'
							value={TravelGroupFormData.name}
							onChange={(e) =>
								setTravelGroupFormData({
									...TravelGroupFormData,
									name: e.target.value,
								})
							}
						/>
					</div>
					<div className='buttonWrapper'>
						<button className='NextButton' onClick={() => setStep((prev) => prev + 1)}>
							بعدی
							<div className='svg-icon'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 448 512'
									fill='#cdcdde'
								>
									<defs>
										<style>{`.fa-secondary{opacity:.4}`}</style>
									</defs>
									<path
										className='fa-primary'
										d='M224 416c0 12.94-7.797 24.61-19.75 29.56c-11.97 4.953-25.72 2.219-34.88-6.938l-160-160C3.125 272.4 0 264.2 0 256s3.125-16.38 9.375-22.62l160-160c9.156-9.156 22.91-11.89 34.88-6.938C216.2 71.39 224 83.06 224 96V416z'
									/>
									<path
										className='fa-secondary'
										d='M448 224v64c0 17.67-14.33 32-32 32h-192V192h192C433.7 192 448 206.3 448 224z'
									/>
								</svg>
							</div>
						</button>
					</div>
				</div>
			)}
			{step === 2 && (
				<>
					<div className='form seconde-form'>
						<div className='inputWrapper'>
							<label htmlFor='kmMasaft' className='label'>
								<span className='required'>کمترین مسافت{"(کیلومتر)"}</span>
							</label>
							<input
								className='form-input'
								name='kmMasaft'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={TravelGroupFormData.leastDist}
								onChange={(e) =>
									e.target.value.length <= 11 &&
									setTravelGroupFormData({
										...TravelGroupFormData,
										leastDist: parseInt(e.target.value),
									})
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='price' className='label'>
								<span className='required'>شروع قیمت{"(تومان)"}</span>
							</label>
							<input
								className='form-input'
								name='price'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={TravelGroupFormData.startCost}
								onChange={(e) =>
									e.target.value.length <= 11 &&
									setTravelGroupFormData({
										...TravelGroupFormData,
										startCost: parseInt(e.target.value),
									})
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='preeMinute' className='label'>
								<span className='required'>دقیقه اضافه{"(تومان)"}</span>
							</label>
							<input
								className='form-input'
								name='preeMinute'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={TravelGroupFormData.perExtraMin}
								onChange={(e) =>
									e.target.value.length <= 11 &&
									setTravelGroupFormData({
										...TravelGroupFormData,
										perExtraMin: parseInt(e.target.value),
									})
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='yearsPersent' className='label'>
								<span className='required'>ضریب سال</span>
							</label>
							<input
								className='form-input'
								name='yearsPersent'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={TravelGroupFormData.formulaRatio}
								onChange={(e) =>
									e.target.value.length <= 11 &&
									setTravelGroupFormData({
										...TravelGroupFormData,
										formulaRatio: parseInt(e.target.value),
									})
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='modir' className='label'>
								<span className='required'>نسبت ترافیک</span>
							</label>
							<input
								className='form-input'
								name='modir'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={TravelGroupFormData.ratioConstant}
								onChange={(e) =>
									e.target.value.length <= 11 &&
									setTravelGroupFormData({
										...TravelGroupFormData,
										ratioConstant: parseInt(e.target.value),
									})
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='preKilometers' className='label'>
								<span className='required'>هزینه توقف{"(تومان)"}</span>
							</label>
							<input
								className='form-input'
								name='preKilometers'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={TravelGroupFormData.pauseInTripPerMinute}
								onChange={(e) =>
									e.target.value.length <= 11 &&
									setTravelGroupFormData({
										...TravelGroupFormData,
										pauseInTripPerMinute: parseInt(e.target.value),
									})
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='preKilometers' className='label'>
								<span className='required'>درصد سفر شب</span>
							</label>
							<input
								className='form-input'
								name='preKilometers'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={TravelGroupFormData.percentForNight}
								onChange={(e) =>
									e.target.value.length <= 11 &&
									setTravelGroupFormData({
										...TravelGroupFormData,
										percentForNight: parseInt(e.target.value),
									})
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='preKilometers' className='label'>
								<span className='required'>درصد رفت و برگشت</span>
							</label>
							<input
								className='form-input'
								name='preKilometers'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={TravelGroupFormData.percentRoundTrip}
								onChange={(e) =>
									e.target.value.length <= 11 &&
									setTravelGroupFormData({
										...TravelGroupFormData,
										percentRoundTrip: parseInt(e.target.value),
									})
								}
							/>
						</div>

						<div className='inputWrapper'>
							<label htmlFor='preKilometers' className='label'>
								<span className='required'>کیلومتر اضافه{"(تومان)"}</span>
							</label>
							<input
								className='form-input'
								name='preKilometers'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={TravelGroupFormData.costForExtraKm}
								onChange={(e) =>
									e.target.value.length <= 11 &&
									setTravelGroupFormData({
										...TravelGroupFormData,
										costForExtraKm: parseInt(e.target.value),
									})
								}
							/>
						</div>
					</div>

					<div className='buttonWrapper'>
						<button className='NextButton' onClick={() => submitHandler()}>
							تایید
						</button>
						<button className='PrevButton' onClick={() => setStep((prev) => prev - 1)}>
							<div className='svg-icon back'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 448 512'
									fill='#cdcdde'
								>
									<defs>
										<style>{`.fa-secondary{opacity:.4}`}</style>
									</defs>
									<path
										className='fa-primary'
										d='M224 416c0 12.94-7.797 24.61-19.75 29.56c-11.97 4.953-25.72 2.219-34.88-6.938l-160-160C3.125 272.4 0 264.2 0 256s3.125-16.38 9.375-22.62l160-160c9.156-9.156 22.91-11.89 34.88-6.938C216.2 71.39 224 83.06 224 96V416z'
									/>
									<path
										className='fa-secondary'
										d='M448 224v64c0 17.67-14.33 32-32 32h-192V192h192C433.7 192 448 206.3 448 224z'
									/>
								</svg>
							</div>
							قبلی
						</button>
					</div>
				</>
			)}
		</>
	);
};

export default memo(TravelGroupForm);
