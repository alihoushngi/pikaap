import { useEffect, useState } from "react";
import * as shamsi from "shamsi-date-converter";
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import api from "../../api";
import {
	CreateModal,
	TableAssets,
	DropDown,
	Modal2,
	SelectRadio,
	CustomSearch,
	SearchInput,
	CustomSearchSuperAgent,
	CustomSearchAgent,
	DropDown2,
	CustomSearchDropDown,
} from "../../components";
import Pagination from "../Pagination";
import "./index.scss";
import loading from "../../values/loading/loading.gif";
import Cookies from "js-cookie";
import { constants } from "../../values";
import { calcLength } from "framer-motion";
import { formatPhoneNumber } from "../../../helpers/function";
import moment from "moment";
import jMoment from "jalali-moment";

const baseOn = [
	{ name: "شماره همراه", value: "PHONE_NUMBER" },
	{ name: "نام آژانس", value: "AGENT_NAME" },
	{ name: "کد آژانس", value: "AGENT_CODE" },
];

const JalaliDate = {
	g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
};

JalaliDate.jalaliToGregorian = function (j_y, j_m, j_d) {
	j_y = parseInt(j_y);
	j_m = parseInt(j_m);
	j_d = parseInt(j_d);
	var jy = j_y - 979;
	var jm = j_m - 1;
	var jd = j_d - 1;

	var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt(((jy % 33) + 3) / 4);
	for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

	j_day_no += jd;

	var g_day_no = j_day_no + 79;

	var gy =
		1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
	g_day_no = g_day_no % 146097;

	var leap = true;
	if (g_day_no >= 36525) {
		/* 36525 = 365*100 + 100/4 */
		g_day_no--;
		gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
		g_day_no = g_day_no % 36524;

		if (g_day_no >= 365) g_day_no++;
		else leap = false;
	}

	gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
	g_day_no %= 1461;

	if (g_day_no >= 366) {
		leap = false;

		g_day_no--;
		gy += parseInt(g_day_no / 365);
		g_day_no = g_day_no % 365;
	}

	for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap); i++)
		g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
	var gm = i + 1;
	var gd = g_day_no + 1;

	gm = gm < 10 ? "0" + gm : gm;
	gd = gd < 10 ? "0" + gd : gd;

	return [gy, gm, gd];
};
const InvoiceDataTable = ({ name, groupName }) => {
	const [invoiceTime, setInvoiceTime] = useState({ gt: "", lt: "" });
	const [dataResponse, setDataResponse] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [searchI, setSearchI] = useState();
	const [totalPages, setTotalPages] = useState(0);
	const [searchedAgent, setSearchedAgent] = useState("09");
	const [lastAgent, setLastAgent] = useState([]);
	const [isError, setIsError] = useState(null);
	const [citise, setCitise] = useState();
	const [page, setPage] = useState(1);
	const [selectedCity, setSelectedCity] = useState();
	const [baseAgentSearch, setBaseAgentSearch] = useState(baseOn[0].value);
	const [userType, setUserType] = useState("all");
	const [status, setstatus] = useState();
	const [selectedSuperAgent, setSelectedSuperAgent] = useState();
	const [selectedDriver, setSelectedDriver] = useState();
	const [superAgentList, setSuperAgentList] = useState([]);
	const [selectedAgent, setSelectedAgent] = useState();
	const [invoiceStatus, setInvoiceStatus] = useState("");
	const [receiverType, setReceiverType] = useState("");
	const [defaultSuperAgent, setDefaultSuperAgent] = useState();
	const [agentList, setAgentList] = useState([]);
	const [showGtCalender, setShowGtCalender] = useState(false);
	const [selectedCalender, setselectedCalender] = useState(null);
	const [invoiceFilterDate, setInvoiceFilterDate] = useState({ startDate: "", endDate: "" });
	const newBody = {
		filters: {},
	};

	const submitHandler = ({ invoiceId }) => {
		const data = {
			invoiceId,
		};
		api.put
			.putSubmitInvoice(data)
			.then(() => {
				setIsLoading(true);
				return api.get.getListAndFindInvoice({ body: newBody, page });
			})
			.then((res) => {
				setDataResponse(res);
				setIsLoading(false);
			});
	};

	const rejectHandler = ({ invoiceId }) => {
		const data = {
			invoiceId,
		};
		api.put
			.putRejectInvoice(data)
			.then(() => {
				setIsLoading(true);
				return api.get.getListAndFindInvoice({ body: newBody, page });
			})
			.then((res) => {
				setDataResponse(res);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		api.get
			.findUserByPhoneNumber({ userType: "AGENT", searchValue: searchedAgent })
			.then((r) => setLastAgent(r.docs))
			.catch((e) => console.log({ e }));
	}, []);

	useEffect(() => {
		api.get.getSuperAgentNoLimit().then(async (res) => {
			let newSuperAgentList = [];
			for (let i = 0; i < res.result.length; i++) {
				newSuperAgentList.push({
					label: res.result[i].superAgentInformation.superAgentName,
					value: res.result[i]._id,
				});
			}
			setSuperAgentList(newSuperAgentList);
		});

		api.get.getAgent({ page }).then(async (res) => {
			let newAgentList = [];
			for (let i = 0; i < res.result.docs.length; i++) {
				newAgentList.push({
					label: res.result.docs[i].firstName,
					value: res.result.docs[i]._id,
				});
			}
			setAgentList(newAgentList);
		});
	}, []);
	useEffect(() => {
		filterData();
	}, [
		userType,
		page,
		status,
		selectedCity,
		selectedSuperAgent,
		selectedDriver,
		setAgentList,
		invoiceStatus,
		receiverType,
		selectedAgent,
		invoiceFilterDate,
		searchValue,
	]);

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

	const statusSort = [
		{
			label: "در انتظار تایید",
			value: "PENDING",
			id: "pending",
		},
		{
			label: "تایید شده",
			value: "ACCEPTED",
			id: "accepted",
		},
		{
			label: "رد شده",
			value: "REJECTED",
			id: "rejected",
		},
	];
	const receiverTypes = [
		{
			label: "راننده",
			value: "DRIVER",
			id: "DRIVER",
		},
		{
			label: "آژانس",
			value: "AGENT",
			id: "AGENT",
		},
		{
			label: "اتحادیه",
			value: "SUPER_AGENT",
			id: "SUPER_AGENT",
		},
	];

	const reasonHandler = (value) => {
		setUserType(value);
	};

	const onSuperAgentSelected = (value) => {
		setSelectedSuperAgent(value.value);
	};

	const onAgentSelected = (value) => {
		setAgentList(value.value);
	};

	const statusHandler = (value) => {
		setstatus(value);
	};

	const reset = () => {
		window.location.reload();
	};

	const onCitySelected = (value) => {
		setSelectedCity(value.label);
	};

	const onSelectedSearchBase = (selectedItem) => {
		setSearchI(selectedItem.value);
	};

	const searchUser = async () => {
		const resFoundedUser = await api.post.findUser({ baseSearch: searchI, value: searchValue });
	};

	useEffect(() => {
		searchUser();
	}, [searchI, searchValue]);

	const filterData = async () => {
		let newBody = { filters: {} };
		if (invoiceStatus) newBody = { filters: { ...newBody.filters, status: invoiceStatus } };
		if (selectedSuperAgent)
			newBody = { filters: { ...newBody.filters, superAgent: selectedSuperAgent } };
		if (selectedDriver) newBody = { filters: { ...newBody.filters, receiver: selectedDriver } };
		if (selectedAgent) newBody = { filters: { ...newBody.filters, agent: selectedAgent } };
		if (receiverType) newBody = { filters: { ...newBody.filters, receiverType: receiverType } };
		if (searchValue)
			newBody = {
				filters: {
					...newBody.filters,
					trackingCode: {
						$regex: searchValue,
					},
				},
			};
		api.get
			.getListAndFindInvoice({
				body: newBody,
				page,
				startDate: invoiceFilterDate.startDate,
				endDate: invoiceFilterDate.endDate,
			})
			.then((res) => {
				setDataResponse(res);
			});
	};
	const onSelectSuperAgent = ({ id }) => {
		setSelectedSuperAgent(id);
	};
	const onSelectDriver = ({ id }) => {
		setSelectedDriver(id);
	};
	const onSelectAgent = ({ id }) => {
		setSelectedAgent(id);
	};
	return (
		<div>
			<>
				<div className='invoiceDataTable'>
					<TableAssets
						haveSearch={true}
						haveFilter={true}
						filterTitleData='مرتب سازی بر اساس  : '
						inputSelections={
							<div className='DropDownInputs'>
								{/* <SelectRadio
									item={firstItemSort}
									onRadioChange={reasonHandler}
									// currentSelected={selectedReason}
									id={`reason-${firstItemSort.map((item) => item.id)}`}
									name={`reason-${firstItemSort.map((item) => item.id)}`}
								/> */}
							</div>
						}
						mainData={
							Cookies.get(constants.USER_TYPE) === "ADMIN" ? (
								<div className='main-filterDropDown'>
									<div className='inputWrapper'>
										<SelectRadio
											item={statusSort}
											onRadioChange={(stat) => setInvoiceStatus(stat)}
											id={`reason-${statusSort.map((item) => item.id)}`}
											name={`reason-${statusSort.map((item) => item.id)}`}
										/>
										<SelectRadio
											item={receiverTypes}
											onRadioChange={(stat) => setReceiverType(stat)}
											id={`receiver-${receiverTypes.map((item) => item.id)}`}
											name={`receiver-${receiverTypes.map(
												(item) => item.id
											)}`}
										/>
									</div>

									<div
										style={{ marginTop: 16, marginBottom: 16 }}
										className='inputWrapper'
									>
										<label style={{ width: "50%" }}>{"انتخاب راننده"}</label>
										<CustomSearch
											onSelectUser={onSelectDriver}
											type={"driver"}
										/>
									</div>
									<div
										style={{ marginTop: 16, marginBottom: 16 }}
										className='inputWrapper'
									>
										<label style={{ width: "50%" }}>
											{"انتخاب آژانس و زیر مجموعه"}
										</label>
										<CustomSearchAgent onSelectUser={onSelectAgent} />
									</div>
									<div
										style={{ marginTop: 16, marginBottom: 16 }}
										className='inputWrapper'
									>
										<label style={{ width: "50%" }}>
											{"انتخاب اتحادیه و زیر مجموعه"}
										</label>
										<CustomSearchSuperAgent onSelectUser={onSelectSuperAgent} />
									</div>

									<div
										className='inputWrapper'
										style={{ position: "relative", marginTop: 16 }}
									>
										<div style={{ display: "flex", flexDirection: "column" }}>
											<label style={{ marginBottom: 8, width: "50%" }}>
												{"از تاریخ"}
											</label>
											<input
												className='custom-input'
												onClick={() => {
													setselectedCalender(0);
													setShowGtCalender(!showGtCalender);
												}}
												value={invoiceTime.gt}
											/>
											<div
												style={{
													position: "absolute",
													display: showGtCalender ? "flex" : "none",
													top: "100%",
												}}
											>
												<Calendar calendar={persian} locale={persian_fa} />
											</div>
										</div>
										<div style={{ display: "flex", flexDirection: "column" }}>
											<label style={{ marginBottom: 8, width: "50%" }}>
												{"تا تاریخ"}
											</label>
											<input
												className='custom-input'
												onClick={() => {
													setselectedCalender(1);
													setShowGtCalender(!showGtCalender);
												}}
												value={invoiceTime.lt}
											/>
											<div
												style={{
													position: "absolute",
													display: showGtCalender ? "flex" : "none",
													top: "100%",
												}}
											>
												<Calendar
													calendar={persian}
													locale={persian_fa}
													onChange={(e) => {
														const p2e = (s) =>
															s.replace(/[۰-۹]/g, (d) =>
																"۰۱۲۳۴۵۶۷۸۹".indexOf(d)
															);

														var myDate = new DateObject(e).format(),
															dateSplitted = myDate.split("/");
														const jD = JalaliDate.jalaliToGregorian(
															p2e(dateSplitted[0]),
															p2e(dateSplitted[1]),
															p2e(dateSplitted[2])
														);
														const jResult =
															jD[0] + "-" + jD[1] + "-" + jD[2];
														const date = new DateObject(e);
														const momentDate = jMoment(
															"1392/06/03",
															"fa",
															"YYYY/M/D"
														).format("YYYY-M-D");
														if (selectedCalender === 0) {
															setInvoiceTime({
																...invoiceTime,
																gt: date.format(),
															});
															setInvoiceFilterDate({
																...invoiceFilterDate,
																startDate: jResult,
															});
														} else {
															setInvoiceFilterDate({
																...invoiceFilterDate,
																endDate: jResult,
															});
															setInvoiceTime({
																...invoiceTime,
																lt: date.format(),
															});
														}

														setShowGtCalender(!showGtCalender);
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div className='main-filterDropDown'>
									<div className='inputWrapper'>
										<SelectRadio
											item={statusSort}
											onRadioChange={(stat) => setInvoiceStatus(stat)}
											id={`reason-${statusSort.map((item) => item.id)}`}
											name={`reason-${statusSort.map((item) => item.id)}`}
										/>
										<SelectRadio
											item={receiverTypes}
											onRadioChange={(stat) => setReceiverType(stat)}
											id={`receiver-${receiverTypes.map((item) => item.id)}`}
											name={`receiver-${receiverTypes.map(
												(item) => item.id
											)}`}
										/>
									</div>
									<div
										className='inputWrapper'
										style={{ position: "relative", marginTop: 16 }}
									>
										<div style={{ display: "flex", flexDirection: "column" }}>
											<label style={{ marginBottom: 8, width: "50%" }}>
												{"از تاریخ"}
											</label>
											<input
												className='custom-input'
												onClick={() => {
													setselectedCalender(0);
													setShowGtCalender(!showGtCalender);
												}}
												value={invoiceTime.gt}
											/>
											<div
												style={{
													position: "absolute",
													display: showGtCalender ? "flex" : "none",
													top: "100%",
												}}
											>
												<Calendar calendar={persian} locale={persian_fa} />
											</div>
										</div>
										<div style={{ display: "flex", flexDirection: "column" }}>
											<label style={{ marginBottom: 8, width: "50%" }}>
												{"تا تاریخ"}
											</label>
											<input
												className='custom-input'
												onClick={() => {
													setselectedCalender(1);
													setShowGtCalender(!showGtCalender);
												}}
												value={invoiceTime.lt}
											/>
											<div
												style={{
													position: "absolute",
													display: showGtCalender ? "flex" : "none",
													top: "100%",
												}}
											>
												<Calendar
													calendar={persian}
													locale={persian_fa}
													onChange={(e) => {
														const p2e = (s) =>
															s.replace(/[۰-۹]/g, (d) =>
																"۰۱۲۳۴۵۶۷۸۹".indexOf(d)
															);

														var myDate = new DateObject(e).format(),
															dateSplitted = myDate.split("/");
														const jD = JalaliDate.jalaliToGregorian(
															p2e(dateSplitted[0]),
															p2e(dateSplitted[1]),
															p2e(dateSplitted[2])
														);
														const jResult =
															jD[0] + "-" + jD[1] + "-" + jD[2];
														const date = new DateObject(e);
														const momentDate = jMoment(
															"1392/06/03",
															"fa",
															"YYYY/M/D"
														).format("YYYY-M-D");
														if (selectedCalender === 0) {
															setInvoiceTime({
																...invoiceTime,
																gt: date.format(),
															});
															setInvoiceFilterDate({
																...invoiceFilterDate,
																startDate: jResult,
															});
														} else {
															setInvoiceFilterDate({
																...invoiceFilterDate,
																endDate: jResult,
															});
															setInvoiceTime({
																...invoiceTime,
																lt: date.format(),
															});
														}

														setShowGtCalender(!showGtCalender);
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							)
						}
						footerData={
							<button
								className='Filterbutton reset'
								style={{ textDecoration: "none", color: "#0c0c0c" }}
								onClick={reset}
							>
								تنطیم مجدد
							</button>
						}
						SearchSelection={
							<SearchInput
								placeHolder='جستجو ... '
								value={searchValue}
								searchFildName={groupName}
								UserName='INVOICE_NAME'
								codeName='INVOICE_CODE'
								SearchOnChange={(e) => setSearchValue(e.target.value)}
							/>
						}
						SearchTitleData={`جستجو بر اساس شناسه فیش : `}
					/>
					{isLoading && (
						<div className='loadingGif'>
							<img src={loading} alt='loading' />
						</div>
					)}
					{isError && "مشکلی پیش اومده"}
					{console.log({ dataResponse })}
					{dataResponse ? (
						<div className='Table_wrapper'>
							<>
								<table className='table'>
									<thead className='thead'>
										<tr className='thead_row'>
											<th className='thead_cels'>تاریخ</th>
											<th className='thead_cels'>واریز کننده</th>
											<th className='thead_cels'>دریافت کننده</th>
											<th className='thead_cels'>شهر</th>
											<th className='thead_cels'>مبلغ</th>
											<th className='thead_cels'>علت ثبت فیش</th>
											<th className='thead_cels'>شیوه پرداخت</th>
											<th className='thead_cels'>شناسه پرداخت</th>
											<th className='thead_cels'>وضعیت فیش</th>
											<th className='thead_cels'></th>
										</tr>
									</thead>
									<tbody className='tbody'>
										{dataResponse.docs.map((item, index) => {
											return (
												<tr className='table_body_row' key={index}>
													<td className=' table_body_d'>
														<div className='tbodyWrapper'>
															<div>
																{shamsi
																	.gregorianToJalali(
																		item.createdAt
																	)
																	.join("/")}
															</div>
														</div>
													</td>
													<td className=' table_body_d center'>
														{item.creatorType ? (
															<>
																<div className='mt'>
																	{item.creatorType ===
																		"ADMIN" && (
																		<>
																			<div>
																				{item.creator
																					? item.creator
																							.firstName +
																					  " " +
																					  item.creator
																							.lastName
																					: ""}
																			</div>
																			<div className='discription mt'>
																				{item.creator
																					? formatPhoneNumber(
																							item
																								.creator
																								.phoneNumber
																					  )
																					: ""}
																			</div>
																			<div className='discription'>
																				مدیر کل
																			</div>
																		</>
																	)}
																	{item.creatorType ===
																		"SUPER_AGENT" && (
																		<>
																			<div>
																				{item.creator
																					? item.creator
																							.superAgentInformation
																							.superAgentName
																					: ""}
																			</div>
																			<div className='discription mt'>
																				{item.creator
																					? formatPhoneNumber(
																							item
																								.creator
																								.phoneNumber
																					  )
																					: ""}
																			</div>
																			<div className='discription'>
																				اتحادیه
																			</div>
																		</>
																	)}
																	{item.creatorType ===
																		"AGENT" && (
																		<>
																			<div>
																				{item.creator
																					? item.creator
																							.agentInformation
																							.agentName
																					: ""}
																			</div>
																			<div className='discription mt'>
																				{item.creator
																					? formatPhoneNumber(
																							item
																								.creator
																								.phoneNumber
																					  )
																					: ""}
																			</div>
																			<div className='discription'>
																				آژانس
																			</div>
																		</>
																	)}
																</div>
																<span className='discription'>
																	{/* {item.createdBy.phoneNumber} */}
																</span>
															</>
														) : null}
													</td>
													<td className=' table_body_d center'>
														<>
															<div div className='mt'>
																{item.receiverType === "DRIVER" && (
																	<>
																		<div>
																			{item.receiver
																				? item.receiver
																						.firstName +
																				  " " +
																				  item.receiver
																						.lastName
																				: ""}
																		</div>
																		<div className='discription mt'>
																			{item.receiver
																				? formatPhoneNumber(
																						item
																							.receiver
																							.phoneNumber
																				  )
																				: ""}
																		</div>
																		<div className='discription'>
																			راننده
																		</div>
																	</>
																)}
																{item.receiverType ===
																	"SUPER_AGENT" && (
																	<>
																		<div>
																			{item.receiver
																				? item.receiver
																						.firstName +
																				  " " +
																				  item.receiver
																						.lastName
																				: ""}
																		</div>
																		<div className='discription mt'>
																			{item.receiver
																				? formatPhoneNumber(
																						item
																							.receiver
																							.phoneNumber
																				  )
																				: ""}
																		</div>
																		<div className='discription'>
																			اتحادیه
																		</div>
																	</>
																)}
																{item.receiverType === "AGENT" && (
																	<>
																		<div>
																			{item.receiver
																				? item.receiver
																						.agentInformation
																						.agentName
																				: ""}
																		</div>
																		<div className='discription mt'>
																			{item.receiver
																				? formatPhoneNumber(
																						item
																							.receiver
																							.phoneNumber
																				  )
																				: ""}
																		</div>
																		<div className='discription'>
																			آژانس
																		</div>
																	</>
																)}
															</div>
														</>
													</td>
													<td className=' table_body_d center'>
														<div>
															{item.city ? item.city : "شهر پیدا نشد"}
														</div>
													</td>
													<td className=' table_body_d center'>
														<div>
															{item.amount
																? item.amount.toLocaleString()
																: "موجودی پیدا نشد"}
														</div>
														<div className='discription'>تومان</div>
													</td>
													<td className=' table_body_d center'>
														{item.reason ? (
															<div>
																{item.reason === "CHARGE_WALLET" &&
																	"افزایش موجودی"}
																{item.reason === "SUBSCRIPTION" &&
																	"هزینه ماهیانه"}
																{item.reason === "PAY_DEBTS" &&
																	"پرداخت بدهی"}
															</div>
														) : (
															"دلیل فیش پیدا نشد"
														)}
													</td>
													<td className=' table_body_d center'>
														{item.payType ? (
															<div>
																{item.payType === "POS" &&
																	"دستگاه پوز"}
																{item.payType === "BANK_CARD" &&
																	"کارت به کارت"}
																{item.payType === "BANK_ACC" &&
																	"نقدی"}
															</div>
														) : (
															"شناسه پرداخت پیدا نشد"
														)}
													</td>
													<td className=' table_body_d center'>
														{item.trackingCode ? (
															<div>{item.trackingCode}</div>
														) : (
															"شناسه پرداخت پیدا نشد"
														)}
													</td>
													<td className=' table_body_d center'>
														{item.status ? (
															<div>
																{item.status === "PENDING" && (
																	<div className='pending'>
																		در انتظار تایید
																	</div>
																)}
																{item.status === "ACCEPTED" && (
																	<div className='accepted'>
																		تایید شده
																	</div>
																)}
																{item.status === "REJECTED" && (
																	<div className='rejected'>
																		رد شده
																	</div>
																)}
															</div>
														) : (
															"وضعیت فیش نامشخص است"
														)}
													</td>
													<td className=' table_body_d center'>
														{Cookies.get(constants.USER_TYPE) ===
														"ADMIN" ? (
															item.status === "PENDING" ? (
																<div className='wrapperForButtons'>
																	<button
																		className='acceptButton'
																		onClick={() =>
																			submitHandler({
																				invoiceId: item._id,
																			})
																		}
																	>
																		تایید کردن
																	</button>
																	<button
																		className='rejectButton'
																		onClick={() =>
																			rejectHandler({
																				invoiceId: item._id,
																			})
																		}
																	>
																		رد کردن
																	</button>
																</div>
															) : (
																<span className='discription'>
																	{item.status === "ACCEPTED" && (
																		<div className='accepted'></div>
																	)}
																	{item.status === "REJECTED" && (
																		<div className='rejected'></div>
																	)}
																	{item.status === "PENDING" && (
																		<div className='pending'></div>
																	)}
																</span>
															)
														) : (
															<span className='discription'>
																{item.status === "ACCEPTED" && (
																	<div className='accepted'></div>
																)}
																{item.status === "REJECTED" && (
																	<div className='rejected'></div>
																)}
															</span>
														)}
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
								<Pagination
									data={{ page, totalPages: dataResponse.totalPages }}
									onPaginateClick={(_page) => setPage(_page)}
								/>
							</>
						</div>
					) : (
						"اطلاعاتی یافت نشد"
					)}
				</div>
			</>
		</div>
	);
};

export default InvoiceDataTable;

// {/* <div className="inputWrapper" style={{ marginTop: "1rem" }}>
//               <DropDown2
//                 defaultItem={defaultSuperAgent}
//                 data={superAgentList}
//                 onSelected={onSuperAgentSelected}
//                 labelName="اتحادیه"
//               />
//             </div>
//             <div className="inputWrapper">
//               <label style={{ marginBottom: "8px" }}>{"انتخاب آژانس"}</label>
//               <CustomSearchDropDown
//                 options={lastAgent}
//                 baseOn={baseOn}
//                 onInputSearchChange={(e) => {
//                   setSearchedAgent(e.search);
//                   setBaseAgentSearch(e.base);
//                 }}
//                 onSelect={(option) => {
//                   setSelectedAgent(option._id);
//                   setSelectedSuperAgent(option.agentInformation.superAgent._id);
//                   const foundedSA = superAgentList.find((e) => (e.value = option.agentInformation.superAgent._id));
//                   setDefaultSuperAgent(foundedSA);
//                   // setDefaultSuperAgent()
//                 }}
//               />
//             </div> */}
