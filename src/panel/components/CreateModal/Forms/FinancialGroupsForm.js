import React, { memo, useEffect } from "react";
import api from "../../../api";

const FinancialGroupsForm = ({
	step,
	setStep,
	FinancialGroupsFormData,
	setFinancialGroupsFormData,
}) => {
	useEffect(() => {}, []);
	const submitHandler = () => {
		api.post.CreateFinancialGroup(FinancialGroupsFormData).then(() => {
			window.location.reload();
		});
	};
	// ! post data to server

	return (
		<>
			{step === 1 && (
				<div className='form first-form'>
					<div className='inputWrapper'>
						<label htmlFor='FgName' className='label'>
							<span className='required'>نام گروه مالی</span>
						</label>
						<input
							className='form-input'
							style={{ direction: "ltr" }}
							name='FgName'
							type='text'
							autoComplete='off'
							value={FinancialGroupsFormData.name}
							onChange={(e) =>
								setFinancialGroupsFormData({
									...FinancialGroupsFormData,
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
							<label htmlFor='modir' className='label'>
								<span className='required'>سهم اشتراک مدیر {"(درصد)"}</span>
							</label>
							<input
								className='form-input'
								name='modir'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={FinancialGroupsFormData.travelShare.admin}
								onChange={(e) =>
									setFinancialGroupsFormData((prev) => ({
										...prev,
										travelShare: {
											...prev.travelShare,
											admin: parseInt(e.target.value),
										},
									}))
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='modir' className='label'>
								<span className='required'>سهم اشتراک اتحادیه {"(درصد)"}</span>
							</label>
							<input
								className='form-input'
								name='modir'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={FinancialGroupsFormData.travelShare.superAgent}
								onChange={(e) =>
									setFinancialGroupsFormData((prev) => ({
										...prev,
										travelShare: {
											...prev.travelShare,
											superAgent: parseInt(e.target.value),
										},
									}))
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='modir' className='label'>
								<span className='required'>سهم اشتراک آژانس {"(درصد)"}</span>
							</label>
							<input
								className='form-input'
								name='modir'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={FinancialGroupsFormData.travelShare.agent}
								onChange={(e) =>
									setFinancialGroupsFormData((prev) => ({
										...prev,
										travelShare: {
											...prev.travelShare,
											agent: parseInt(e.target.value),
										},
									}))
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='modir' className='label'>
								<span className='required'>سهم سفر راننده {"(تومان)"}</span>
							</label>
							<input
								className='form-input'
								name='modir'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={FinancialGroupsFormData.travelShare.driver}
								onChange={(e) =>
									setFinancialGroupsFormData((prev) => ({
										...prev,
										travelShare: {
											...prev.travelShare,
											driver: parseInt(e.target.value),
										},
									}))
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='modir' className='label'>
								<span className='required'>سهم اشتراک مالیات {"(درصد)"}</span>
							</label>
							<input
								className='form-input'
								name='modir'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={FinancialGroupsFormData.travelShare.tax}
								onChange={(e) =>
									setFinancialGroupsFormData((prev) => ({
										...prev,
										travelShare: {
											...prev.travelShare,
											tax: parseInt(e.target.value),
										},
									}))
								}
							/>
						</div>
					</div>

					<div className='buttonWrapper'>
						<button className='NextButton' onClick={() => setStep((prev) => prev + 1)}>
							بعدی
							<div className='svg-icon next'>
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
			{step === 3 && (
				<>
					<div className='third-form'>
						<div className='inputWrapper'>
							<label htmlFor='modir' className='label'>
								<span className='required'>سهم سفر مدیر {"(تومان)"}</span>
							</label>
							<input
								className='form-input'
								name='modir'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={FinancialGroupsFormData.subscription.admin}
								onChange={(e) =>
									setFinancialGroupsFormData((prev) => ({
										...prev,
										subscription: {
											...prev.subscription,
											share: {
												...prev.subscription.share,
												admin: parseInt(e.target.value),
											},
										},
									}))
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='modir' className='label'>
								<span className='required'>سهم سفر اتحادیه {"(تومان)"}</span>
							</label>
							<input
								className='form-input'
								name='modir'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={FinancialGroupsFormData.subscription.superAgent}
								onChange={(e) =>
									setFinancialGroupsFormData((prev) => ({
										...prev,
										subscription: {
											...prev.subscription,
											share: {
												...prev.subscription.share,
												superAgent: parseInt(e.target.value),
											},
										},
									}))
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='modir' className='label'>
								<span className='required'>سهم سفر آژانس {"(تومان)"}</span>
							</label>
							<input
								className='form-input'
								name='modir'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={FinancialGroupsFormData.subscription.agent}
								onChange={(e) =>
									setFinancialGroupsFormData((prev) => ({
										...prev,
										subscription: {
											...prev.subscription,
											share: {
												...prev.subscription.share,
												agent: parseInt(e.target.value),
											},
										},
									}))
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='modir' className='label'>
								<span className='required'>سهم سفر مالیات {"(تومان)"}</span>
							</label>
							<input
								className='form-input'
								name='modir'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={FinancialGroupsFormData.subscription.tax}
								onChange={(e) =>
									setFinancialGroupsFormData((prev) => ({
										...prev,
										subscription: {
											...prev.subscription,
											share: {
												...prev.subscription.share,
												tax: parseInt(e.target.value),
											},
										},
									}))
								}
							/>
						</div>
					</div>

					<div className='buttonWrapper'>
						<button className='NextButton' onClick={() => setStep((prev) => prev + 1)}>
							بعدی
							<div className='svg-icon next'>
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
			{step === 4 && (
				<>
					<div className='third-form'>
						<div className='inputWrapper'>
							<label htmlFor='modir' className='label'>
								<span className='required'>تعداد روز های عضویت</span>
							</label>
							<input
								className='form-input'
								name='modir'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={FinancialGroupsFormData.subscription.cycle}
								onChange={(e) =>
									setFinancialGroupsFormData((prev) => ({
										...prev,
										subscription: {
											...prev.subscription,
											cycle: parseInt(e.target.value),
										},
									}))
								}
							/>
						</div>
						<div className='inputWrapper'>
							<label htmlFor='modir' className='label'>
								<span className='required'>حق عضویت ماهانه {"(تومان)"}</span>
							</label>
							<input
								className='form-input'
								name='modir'
								type='number'
								maxLength={10}
								autoComplete='off'
								value={FinancialGroupsFormData.subscription.superAgent}
								onChange={(e) =>
									setFinancialGroupsFormData((prev) => ({
										...prev,
										subscription: {
											...prev.subscription,
											fee: parseInt(e.target.value),
										},
									}))
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

export default memo(FinancialGroupsForm);
