import React, { memo, useEffect, useState } from "react";
import DropDown2 from "../../DropDown2";
import api from "../../../api";
import { toast } from "react-toastify";
import Toastify from "../../Toastify";
import regexes from "../../../validation/regexes";
import persianRex from "persian-rex";
import { cc_format } from "../../../../helpers/function";
import superAgentValidation from "../../../validation/superAgentValidation";
import Cookies from "js-cookie";
import { constants } from "../../../values";

const SuperAgentForm = ({
	step,
	setStep,
	SuperAgentFormData,
	setSuperAgentFormData,
	SuperAgentFormPatchData,
	setSuperAgentFormPatchData,
}) => {
	const [province, setProvince] = useState([
		{
			value: 300,
			label: "مازندران",
		},
		{
			value: 299,
			label: "گیلان",
		},
	]);
	const [citise, setCitise] = useState();
	const [financialGroup, setFinancialGroup] = useState();
	const [travelGroup, setTravelGroup] = useState();

	useEffect(() => {
		// ! financial Group
		api.get.getFinancialGroups().then((res) => {
			setFinancialGroup(
				res.result.map((item) => {
					return {
						label: item.name,
						value: item._id,
					};
				})
			);
		});

		// ! travel Group
		api.get.getTravelGroup().then((res) => {
			setTravelGroup(
				res.result.map((item) => {
					return {
						label: item.name,
						value: item._id,
					};
				})
			);
		});

		// ! travel Group
	}, []);
	const getCityHandler = (id) => {
		// ** get city from api
		api.get.getCity(id.value).then((res) => {
			setCitise(
				res.result.map((item) => {
					return {
						label: item.Name,
						value: item.CityCode,
					};
				})
			);
		});
		// ** get city from api
	};

	// ! post data to server
	const submitHandler = () => {
		const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
		function toString(o) {
			Object.keys(o).forEach((k) => {
				if (typeof o[k] !== "object") {
					o[k] = p2e(o[k]);
				}
			});

			return o;
		}
		if (patchUser) {
			api.patch.superAgentPatch(toString(SuperAgentFormPatchData)).then(() => {
				window.location.reload();
			});
		} else if (patchUser === false) {
			api.post.postCreateSuperAgent(toString(SuperAgentFormData)).then(() => {
				window.location.reload();
			});
		}
	};
	// ! post data to server

	const [patchUser, setPatchUser] = useState(false);

	const checkNumber = (phoneNumber, userType) => {
		if (!phoneNumber.length) return Toastify("error", "شماره تلفن رو وارد کنید", "empty-phone");
		if (phoneNumber.charAt(0) !== "0" && phoneNumber.charAt(0) !== "۰")
			return Toastify("error", "شماره تلفن را با صفر وارد کنید", "enter-with-zero");
		if (phoneNumber.length !== 11)
			return Toastify("error", "شماره وارد شده اشتباه است", "invalid-phone");

		api.get.phoneNumberChecker({ phoneNumber, userType }).then((res) => {
			if (res.result.isUserExist && res.result.isUserTypeExist) {
				toast.error("شماره تلفن با این نقش قبلاایجاد شده است");
			}
			if (res.result.isUserExist && !res.result.isUserTypeExist) {
				setStep((prev) => prev + 1);
				setPatchUser(true);
				setSuperAgentFormPatchData({
					...SuperAgentFormPatchData,
					userId: res.result.user._id,
				});
			}
			if (!res.result.isUserExist && !res.result.isUserTypeExist) {
				setStep((prev) => prev + 1);
			}
		});
	};

	// () => setStep((prev) => prev + 1)

	return (
		<>
			{step === 1 && (
				<div className='form first-form'>
					<div className='inputWrapper'>
						<label htmlFor='PhoneNumber' className='label'>
							<span className='required'>شماره همراه</span>
						</label>
						<input
							className='form-input'
							style={{ direction: "ltr" }}
							name='PhoneNumber'
							type='text'
							minLength={11}
							maxLength={11}
							autoComplete='off'
							value={SuperAgentFormData.phoneNumber}
							onChange={(e) => {
								if (
									e.target.value.match(regexes.numberRegex) ||
									e.target.value === ""
								) {
									e.target.value.length <= 11 &&
										setSuperAgentFormData({
											...SuperAgentFormData,
											phoneNumber: e.target.value,
										});
								} else {
									Toastify("error", "فقط عدد وارد کنید", "phone-numbersd");
								}
							}}
						/>
					</div>
					<div className='buttonWrapper'>
						<button
							className='NextButton'
							onClick={() =>
								checkNumber(SuperAgentFormData.phoneNumber, "SUPER_AGENT")
							}
						>
							بررسی شماره
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
					{!patchUser ? (
						<div className='form seconde-form'>
							<div className='inputWrapper'>
								<label htmlFor='superAgentName' className='label'>
									<span className='required'>نام اتحادیه</span>
								</label>
								<input
									className='form-input'
									name='superAgentName'
									type='text'
									maxLength={20}
									autoComplete='off'
									value={SuperAgentFormData.superAgentName}
									onChange={(e) => {
										if (
											persianRex.text.test(e.target.value) ||
											e.target.value === ""
										) {
											setSuperAgentFormData({
												...SuperAgentFormData,
												superAgentName: e.target.value,
											});
										} else {
											Toastify(
												"error",
												"فقط حروف فارسی مجاز هستند",
												"sua-name"
											);
										}
									}}
								/>
							</div>
							<div className='inputWrapper'>
								<label htmlFor='Name' className='label'>
									<span className='required'>نام</span>
								</label>
								<input
									className='form-input'
									name='Name'
									type='text'
									maxLength={20}
									autoComplete='off'
									value={SuperAgentFormData.firstName}
									onChange={(e) => {
										if (
											persianRex.text.test(e.target.value) ||
											e.target.value === ""
										) {
											setSuperAgentFormData({
												...SuperAgentFormData,
												firstName: e.target.value,
											});
										} else {
											Toastify("error", "فقط حروف فارسی مجاز هستند", "name");
										}
									}}
								/>
							</div>
							<div className='inputWrapper'>
								<label htmlFor='familyName' className='label'>
									<span className='required'>نام خانوادگی</span>
								</label>
								<input
									className='form-input'
									name='familyName'
									type='text'
									maxLength={20}
									autoComplete='off'
									value={SuperAgentFormData.lastName}
									onChange={(e) => {
										if (
											persianRex.text.test(e.target.value) ||
											e.target.value === ""
										) {
											setSuperAgentFormData({
												...SuperAgentFormData,
												lastName: e.target.value,
											});
										} else {
											Toastify("error", "فقط حروف فارسی مجاز هستند", "lname");
										}
									}}
								/>
							</div>
							<div className='inputWrapper'>
								<label htmlFor='mobileNumber' className='label'>
									<span className='required'>شماره موبایل</span>
								</label>
								<input
									className='form-input'
									name='mobileNumber'
									type='text'
									maxLength={11}
									minLength={11}
									autoComplete='off'
									value={SuperAgentFormData.phoneNumber}
									readOnly
								/>
							</div>
							<div className='inputWrapper'>
								<DropDown2
									data={province}
									onSelected={(val) => {
										getCityHandler(val);
									}}
									labelName='استان'
								/>
							</div>
							<div className='inputWrapper'>
								<DropDown2
									data={citise}
									labelName='شهر'
									onSelected={(val) =>
										setSuperAgentFormData({
											...SuperAgentFormData,
											city: val.label,
										})
									}
								/>
							</div>
							<div className='inputWrapper shaba'>
								<label htmlFor='shaba' className='label'>
									<span className='required'>شماره شبا </span>
								</label>
								<input
									className='form-input'
									type='text'
									name='shaba'
									autoComplete='off'
									placeholder='وارد کنید IR بدون'
									value={SuperAgentFormData.shabaNumber}
									onChange={(e) => {
										if (
											regexes.numberRegex.test(e.target.value) ||
											e.target.value === ""
										) {
											e.target.value.length <= 24 &&
												setSuperAgentFormData({
													...SuperAgentFormData,
													shabaNumber: e.target.value,
												});
										} else {
											Toastify("error", "فقط اعداد مجاز هستند", "shaba");
										}
									}}
								/>
							</div>
							<div className='inputWrapper'>
								<label htmlFor='cart' className='label'>
									<span className='required'>شماره کارت </span>
								</label>
								<input
									className='form-input'
									name='cart'
									type='text'
									autoComplete='off'
									value={
										SuperAgentFormData.kartNumber
											? cc_format(SuperAgentFormData.kartNumber)
											: ""
									}
									onChange={(e) => {
										if (
											regexes.kartNumberRegex.test(e.target.value) ||
											e.target.value === ""
										) {
											e.target.value.length <= 19 &&
												setSuperAgentFormData({
													...SuperAgentFormData,
													kartNumber: e.target.value,
												});
										} else {
											Toastify("error", "فقط اعداد مجاز هستند", "kartnumber");
										}
									}}
								/>
							</div>
							<div className='inputWrapper'>
								<label htmlFor='cart' className='label'>
									<span className='required'>کد ملی</span>
								</label>
								<input
									className='form-input'
									name='cart'
									type='text'
									maxLength={26}
									autoComplete='off'
									value={SuperAgentFormData.nationalCode}
									onChange={(e) => {
										if (
											regexes.numberRegex.test(e.target.value) ||
											e.target.value === ""
										) {
											e.target.value.length <= 10 &&
												setSuperAgentFormData({
													...SuperAgentFormData,
													nationalCode: e.target.value,
												});
										} else {
											Toastify("error", "فقط اعداد مجاز هستند", "code-meli");
										}
									}}
								/>
							</div>
							<div className='inputWrapper'>
								<label htmlFor='cart' className='label'>
									<span className='required'>آدرس</span>
								</label>
								<input
									className='form-input'
									name='cart'
									type='text'
									maxLength={35}
									autoComplete='off'
									value={SuperAgentFormData.address}
									onChange={(e) => {
										if (
											persianRex.text.test(e.target.value) ||
											e.target.value === ""
										) {
											setSuperAgentFormData({
												...SuperAgentFormData,
												address: e.target.value,
											});
										} else {
											Toastify("error", "فقط حروف فارسی مجاز هستند", "name");
										}
									}}
								/>
							</div>
						</div>
					) : (
						<div className='form seconde-form'>
							<div className='inputWrapper'>
								<label htmlFor='superAgentName' className='label'>
									<span className='required'>نام اتحادیه</span>
								</label>
								<input
									className='form-input'
									name='superAgentName'
									type='text'
									maxLength={20}
									autoComplete='off'
									value={SuperAgentFormPatchData.superAgentName}
									onChange={(e) => {
										if (
											persianRex.text.test(e.target.value) ||
											e.target.value === ""
										) {
											setSuperAgentFormPatchData({
												...SuperAgentFormPatchData,
												superAgentName: e.target.value,
											});
										} else {
											Toastify(
												"error",
												"فقط حروف فارسی مجاز هستند",
												"sua-name"
											);
										}
									}}
								/>
							</div>
							<div className='inputWrapper'>
								<DropDown2
									data={province}
									onSelected={(val) => {
										getCityHandler(val);
									}}
									labelName='استان'
								/>
							</div>
							<div className='inputWrapper'>
								<DropDown2
									data={citise}
									labelName='شهر'
									onSelected={(val) =>
										setSuperAgentFormPatchData({
											...SuperAgentFormPatchData,
											city: val.label,
										})
									}
								/>
							</div>
							<div className='inputWrapper shaba'>
								<label htmlFor='shaba' className='label'>
									<span className='required'>شماره شبا </span>
								</label>
								<input
									className='form-input'
									type='text'
									name='shaba'
									autoComplete='off'
									placeholder='وارد کنید IR بدون'
									value={SuperAgentFormPatchData.shabaNumber}
									onChange={(e) => {
										if (
											regexes.numberRegex.test(e.target.value) ||
											e.target.value === ""
										) {
											e.target.value.length <= 24 &&
												setSuperAgentFormPatchData({
													...SuperAgentFormPatchData,
													shabaNumber: e.target.value,
												});
										} else {
											Toastify("error", "فقط اعداد مجاز هستند", "shaba");
										}
									}}
								/>
							</div>
							<div className='inputWrapper'>
								<label htmlFor='cart' className='label'>
									<span className='required'>شماره کارت </span>
								</label>
								<input
									className='form-input'
									name='cart'
									type='text'
									autoComplete='off'
									value={
										SuperAgentFormPatchData.kartNumber
											? cc_format(SuperAgentFormPatchData.kartNumber)
											: ""
									}
									onChange={(e) => {
										if (
											regexes.kartNumberRegex.test(e.target.value) ||
											e.target.value === ""
										) {
											e.target.value.length <= 19 &&
												setSuperAgentFormPatchData({
													...SuperAgentFormPatchData,
													kartNumber: e.target.value,
												});
										} else {
											Toastify("error", "فقط اعداد مجاز هستند", "kartnumber");
										}
									}}
								/>
							</div>
							<div className='inputWrapper'>
								<label htmlFor='cart' className='label'>
									<span className='required'>کد ملی</span>
								</label>
								<input
									className='form-input'
									name='cart'
									type='text'
									maxLength={26}
									autoComplete='off'
									value={SuperAgentFormPatchData.nationalCode}
									onChange={(e) => {
										if (
											regexes.numberRegex.test(e.target.value) ||
											e.target.value === ""
										) {
											e.target.value.length <= 10 &&
												setSuperAgentFormPatchData({
													...SuperAgentFormPatchData,
													nationalCode: e.target.value,
												});
										} else {
											Toastify(
												"error",
												"فقط اعداد مجاز هستند",
												"national-codes"
											);
										}
									}}
								/>
							</div>
							<div className='inputWrapper'>
								<label htmlFor='cart' className='label'>
									<span className='required'>آدرس</span>
								</label>
								<input
									className='form-input'
									name='cart'
									type='text'
									maxLength={35}
									autoComplete='off'
									value={SuperAgentFormPatchData.address}
									onChange={(val) => {
										setSuperAgentFormPatchData({
											...SuperAgentFormPatchData,
											address: val.target.value,
										});
									}}
								/>
							</div>
						</div>
					)}

					<div className='buttonWrapper'>
						<button
							className='NextButton'
							onClick={() => {
								if (!patchUser) {
									const isFormValid = superAgentValidation(SuperAgentFormData);
									if (isFormValid) {
										setStep(3);
									}
								}
								// const isFormValid = superAgentPatchValidation();
							}}
						>
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
					{patchUser !== true ? (
						<div className='third-form'>
							<div className='inputWrapper'>
								<DropDown2
									data={financialGroup}
									onSelected={(val) => {
										setSuperAgentFormData({
											...SuperAgentFormData,
											financialGroup: val.value,
										});
									}}
									labelName='گروه مالی'
								/>
							</div>
							<div className='inputWrapper'>
								<DropDown2
									data={travelGroup}
									onSelected={(val) => {
										setSuperAgentFormData({
											...SuperAgentFormData,
											travelGroup: val.value,
										});
									}}
									labelName='گروه سفر'
								/>
							</div>
							<div className='inputWrapper'>
								<label htmlFor='cart' className='label'>
									<span className='required'>کد اتحادیه</span>
								</label>
								<input
									className='form-input'
									name='cart'
									type='text'
									autoComplete='off'
									value={SuperAgentFormData.code}
									onChange={(e) =>
										e.target.value.length <= 11 &&
										setSuperAgentFormData({
											...SuperAgentFormData,
											code: e.target.value,
										})
									}
								/>
							</div>
						</div>
					) : (
						<div className='third-form'>
							<div className='inputWrapper'>
								<DropDown2
									data={financialGroup}
									onSelected={(val) => {
										setSuperAgentFormPatchData({
											...SuperAgentFormPatchData,
											financialGroup: val.value,
										});
									}}
									labelName='گروه مالی'
								/>
							</div>
							<div className='inputWrapper'>
								<DropDown2
									data={travelGroup}
									onSelected={(val) => {
										setSuperAgentFormPatchData({
											...SuperAgentFormPatchData,
											travelGroup: val.value,
										});
									}}
									labelName='گروه سفر'
								/>
							</div>
							<div className='inputWrapper'>
								<label htmlFor='cart' className='label'>
									<span className='required'>کد اتحادیه</span>
								</label>
								<input
									className='form-input'
									name='cart'
									type='text'
									autoComplete='off'
									value={SuperAgentFormPatchData.code}
									onChange={(e) =>
										e.target.value.length <= 6 &&
										setSuperAgentFormPatchData({
											...SuperAgentFormPatchData,
											code: e.target.value,
										})
									}
								/>
							</div>
						</div>
					)}

					<div className='buttonWrapper'>
						<button
							className='NextButton'
							onClick={() => {
								if (Cookies.get(constants.USER_TYPE) !== "SUPER_AGENT") {
									if (patchUser) {
										if (!SuperAgentFormPatchData.financialGroup.length)
											return Toastify(
												"error",
												"گروه مالی انتخاب نشده",
												"financialGroup"
											);
										if (!SuperAgentFormPatchData.travelGroup.length)
											return Toastify(
												"error",
												"گروه سفر انتخاب نشده",
												"travelGroup"
											);
										if (!SuperAgentFormPatchData.code.length)
											return Toastify(
												"error",
												"کد اتحادیه وارد نشده",
												"code"
											);

										submitHandler();
									}
									if (!patchUser) {
										if (!SuperAgentFormData.financialGroup.length)
											return Toastify(
												"error",
												"گروه مالی انتخاب نشده",
												"financialGroup"
											);
										if (!SuperAgentFormData.travelGroup.length)
											return Toastify(
												"error",
												"گروه سفر انتخاب نشده",
												"travelGroup"
											);
										if (!SuperAgentFormData.code.length)
											return Toastify(
												"error",
												"کد اتحادیه وارد نشده",
												"code"
											);
									}
								}
								submitHandler();
							}}
						>
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

export default memo(SuperAgentForm);
