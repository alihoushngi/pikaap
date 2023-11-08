import React, { useEffect, useState } from "react";
import Body from "./Body";
import TransactionHeader from "./TransactionHeader";
import api from "../../../api";
import Pagination from "../../../components/Pagination";
import {
	CustomSearch,
	CustomSearchAgent,
	CustomSearchSuperAgent,
	Loading,
	SelectRadio,
	TableAssets,
} from "../../../components";
import Cookies from "js-cookie";
import { constants } from "../../../values";
const TransactionTable = () => {
	const [isAllChecked, setIsAllChecked] = useState(false);
	const [transactions, setTransactions] = useState();
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [filtersCondition, setFiltersCondition] = useState({
		role: null,
		reason: null,
		status: null,
		isDeposit: null,
		isOnline: null,
		payerId: null,
		superAgent:
			Cookies.get(constants.USER_TYPE) === "SUPER_AGENT"
				? Cookies.get(constants.USER_ID)
				: null,
	});

	const getTransactions = async () => {
		let body = {
			filters: {},
		};
		if (filtersCondition.role) {
			body = {
				filters: {
					$or: body.filters.$or
						? [
								...body.filters?.$or,
								{ receiverType: filtersCondition.role },
								{ payerType: filtersCondition.role },
						  ]
						: [
								{ receiverType: filtersCondition.role },
								{ payerType: filtersCondition.role },
						  ],
				},
			};
		}
		if (filtersCondition.reason) {
			if (filtersCondition.reason === "SUBSCRIPTION") {
				body = {
					filters: {
						$or: body.filters.$or
							? [
									...body.filters?.$or,
									{ reason: "SUBSCRIPTION" },
									{ reason: "SUBSCRIPTION_INVOICE" },
									{ reason: "SUBSCRIPTION_INTERNAL" },
									{ reason: "SUBSCRIPTION_FROM_DRIVER_WALLET" },
							  ]
							: [
									{ reason: "SUBSCRIPTION" },
									{ reason: "SUBSCRIPTION_INVOICE" },
									{ reason: "SUBSCRIPTION_INTERNAL" },
									{ reason: "SUBSCRIPTION_FROM_DRIVER_WALLET" },
							  ],
					},
				};
			}
			if (filtersCondition.reason === "COMMISSION") {
				body = {
					filters: {
						$or: body.filters.$or
							? [
									...body.filters?.$or,
									{ reason: "SUBSCRIPTION_COMMISSION" },
									{ reason: "TRAVEL_COST_COMMISSION" },
									{ reason: "PAY_DEBTS_COMMISSION" },
							  ]
							: [
									{ reason: "SUBSCRIPTION_COMMISSION" },
									{ reason: "TRAVEL_COST_COMMISSION" },
									{ reason: "PAY_DEBTS_COMMISSION" },
							  ],
					},
				};
			}
			if (filtersCondition.reason === "TRAVEL_COST") {
				body = {
					filters: {
						$or: body.filters.$or
							? [...body.filters?.$or, { reason: "TRAVEL_COST" }]
							: [{ reason: "TRAVEL_COST" }],
					},
				};
			}
			if (filtersCondition.reason === "CHARGE_WALLET") {
				body = {
					filters: {
						$or: body.filters.$or
							? [
									...body.filters?.$or,
									{ reason: "CHARGE_WALLET" },
									{ reason: "CHARGE_WALLET_INVOICE" },
							  ]
							: [{ reason: "CHARGE_WALLET" }, { reason: "CHARGE_WALLET_INVOICE" }],
					},
				};
			}
			if (filtersCondition.reason === "PAY_DEPT") {
				body = {
					filters: {
						$or: body.filters.$or
							? [
									...body.filters?.$or,
									{ reason: "PAY_DEBTS" },
									{ reason: "PAY_DEBTS_INVOICE" },
							  ]
							: [{ reason: "PAY_DEBTS" }, { reason: "PAY_DEBTS_INVOICE" }],
					},
				};
			}
		}
		if (filtersCondition.status) {
			body = {
				filters: {
					...body.filters,
					transactionStatus: filtersCondition.status,
				},
			};
		}
		if (filtersCondition.isDeposit) {
			body = {
				filters: {
					...body.filters,
					isDeposit: filtersCondition.isDeposit,
				},
			};
		}
		if (filtersCondition.isOnline) {
			body = {
				filters: {
					...body.filters,
					isOnline: filtersCondition.isOnline,
				},
			};
		}
		if (filtersCondition.superAgent) {
			body = {
				filters: {
					...body.filters,
					superAgent: filtersCondition.superAgent,
				},
			};
		}
		if (filtersCondition.payerId) {
			body = {
				filters: {
					$or: body.filters.$or
						? [
								...body.filters?.$or,
								{ payerId: filtersCondition.payerId.id },
								{ receiverId: filtersCondition.payerId.id },
						  ]
						: [
								{ payerId: filtersCondition.payerId.id },
								{ receiverId: filtersCondition.payerId.id },
						  ],
				},
			};
		}

		try {
			const _transactions = await api.post.getAllTransactions({ body, page });
			setTransactions(_transactions.docs);
			setTotalPages(_transactions.totalPages);
			setIsLoading(false);
		} catch (e) {
			console.log({ e });
		}
		//
	};

	const transReasonFilters = [
		{
			label: "هزینه ماهیانه",
			value: "SUBSCRIPTION",
			id: "SUBSCRIPTION",
		},
		{
			label: "کمیسیون ها",
			value: "COMMISSION",
			id: "COMMISSION",
		},
		{
			label: "پرداختی سفر",
			value: "TRAVEL_COST",
			id: "TRAVEL_COST",
		},
		{
			label: "افزایش موجودی",
			value: "CHARGE_WALLET",
			id: "CHARGE_WALLET",
		},
		{
			label: "پرداختی بدهی",
			value: "PAY_DEPT",
			id: "PAY_DEPT",
		},
	];

	const transReasonFiltersSuperAgent = [
		{
			label: "هزینه ماهیانه",
			value: "SUBSCRIPTION",
			id: "SUBSCRIPTION",
		},
		{
			label: "پرداختی سفر",
			value: "TRAVEL_COST",
			id: "TRAVEL_COST",
		},
		{
			label: "افزایش موجودی",
			value: "CHARGE_WALLET",
			id: "CHARGE_WALLET",
		},
		{
			label: "پرداختی بدهی",
			value: "PAY_DEPT",
			id: "PAY_DEPT",
		},
	];

	const transRoleFilters = [
		{
			label: "ادمین",
			value: "ADMIN",
			id: "ADMIN",
		},
		{
			label: "اتحادیه",
			value: "SUPER_AGENT",
			id: "SUPER_AGENT",
		},
		{
			label: "آژانس",
			value: "AGENT",
			id: "AGENT",
		},
		{
			label: "راننده",
			value: "DRIVER",
			id: "DRIVER",
		},
		{
			label: "مسافر",
			value: "PASSENGER",
			id: "PASSENGER",
		},
		{
			label: "مالیات",
			value: "TAX",
			id: "TAX",
		},
	];

	const transRoleFiltersSuperAgent = [
		{
			label: "آژانس",
			value: "AGENT",
			id: "AGENT",
		},
		{
			label: "راننده",
			value: "DRIVER",
			id: "DRIVER",
		},
		{
			label: "مسافر",
			value: "PASSENGER",
			id: "PASSENGER",
		},
	];

	const transStatusFilters = [
		{
			label: "موفق",
			value: "SUCCESS",
			id: "SUCCESS",
		},
		{
			label: "نا موفق",
			value: "FAILED",
			id: "FAILED",
		},
		{
			label: "در حال انجام",
			value: "PENDING",
			id: "PENDING",
		},
	];

	const transIsDeposit = [
		{
			label: "واریز",
			value: true,
			id: "DEPOSIT",
		},
		{
			label: "برداشت",
			value: false,
			id: "WITHDRAWAL",
		},
	];
	const isOnline = [
		{
			label: "آنلاین",
			value: true,
			id: "ONLINE",
		},
		{
			label: "آفلاین",
			value: false,
			id: "OFFLINE",
		},
	];

	const transReasonOnChange = (value) => {
		setFiltersCondition({ ...filtersCondition, reason: value });
	};
	const transRoleOnChange = (value) => {
		setFiltersCondition({ ...filtersCondition, role: value });
	};
	const transStatusOnChange = (value) => {
		setFiltersCondition({ ...filtersCondition, status: value });
	};
	const transIsDepositOnChange = (value) => {
		setFiltersCondition({ ...filtersCondition, isDeposit: value });
	};
	const transIsOnlineOnChange = (value) => {
		setFiltersCondition({ ...filtersCondition, isOnline: value });
	};
	const transOfUserOnChange = (value) => {
		setFiltersCondition({ ...filtersCondition, payerId: value });
	};

	useEffect(() => {
		setIsLoading(true);
		getTransactions();
	}, [page, filtersCondition]);
	return (
		<>
			<div className='Table_wrapper'>
				<div className='trans-filters'>
					<TableAssets
						haveFilter={true}
						filterTitleData='مرتب سازی بر اساس  : '
						mainData={
							<div className='main-filterDropDown'>
								<div className='inputWrapper'>
									<label>{"دریافت کننده"}</label>
									<SelectRadio
										currentSelected={filtersCondition.role}
										item={
											Cookies.get(constants.USER_TYPE) === "ADMIN"
												? transRoleFilters
												: transRoleFiltersSuperAgent
										}
										onRadioChange={transRoleOnChange}
										id={`reason-${transRoleFilters.map((item) => item.id)}`}
										name={`reason-${transRoleFilters.map((item) => item.id)}`}
									/>
								</div>
								<div className='inputWrapper'>
									<label>{"دلیل تراکنش"}</label>
									<SelectRadio
										item={
											Cookies.get(constants.USER_TYPE) === "ADMIN"
												? transReasonFilters
												: transReasonFiltersSuperAgent
										}
										onRadioChange={transReasonOnChange}
										id={`reason-${transReasonFilters.map((item) => item.id)}`}
										name={`reason-${transReasonFilters.map((item) => item.id)}`}
									/>
								</div>
								<div className='inputWrapper'>
									<label>{"وضعیت تراکنش"}</label>
									<SelectRadio
										item={transStatusFilters}
										onRadioChange={transStatusOnChange}
										id={`reason-${transStatusFilters.map((item) => item.id)}`}
										name={`reason-${transStatusFilters.map((item) => item.id)}`}
									/>
								</div>
								<div className='inputWrapper'>
									<label>{"نوع تراکنش"}</label>
									<SelectRadio
										item={transIsDeposit}
										onRadioChange={transIsDepositOnChange}
										id={`reason-${transIsDeposit.map((item) => item.id)}`}
										name={`reason-${transIsDeposit.map((item) => item.id)}`}
									/>
								</div>
								<div className='inputWrapper'>
									<label>{"شیوه تراکنش"}</label>
									<SelectRadio
										item={isOnline}
										onRadioChange={transIsOnlineOnChange}
										id={`reason-${isOnline.map((item) => item.id)}`}
										name={`reason-${isOnline.map((item) => item.id)}`}
									/>
								</div>
								<div
									style={{ marginTop: 16, marginBottom: 16 }}
									className='inputWrapper'
								>
									<label style={{ width: "50%" }}>{"انتخاب راننده"}</label>
									<CustomSearch
										onSelectUser={(e) => {
											transOfUserOnChange(e);
										}}
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
									<CustomSearchAgent
										onSelectUser={(e) => {
											transOfUserOnChange(e);
										}}
									/>
								</div>
								{Cookies.get(constants.USER_TYPE) === "ADMIN" && (
									<div
										style={{ marginTop: 16, marginBottom: 16 }}
										className='inputWrapper'
									>
										<label style={{ width: "50%" }}>
											{"انتخاب اتحادیه و زیر مجموعه"}
										</label>
										<CustomSearchSuperAgent
											onSelectUser={(e) => {
												transOfUserOnChange(e);
											}}
										/>
									</div>
								)}
								<div style={{ width: "25%", marginTop: ".5rem" }}>
									<button
										className='Filterbutton reset '
										style={{ textDecoration: "none", color: "#0c0c0c" }}
										onClick={() => {
											window.location.reload();
										}}
									>
										تنطیم مجدد
									</button>
								</div>
							</div>
						}
					/>
				</div>
				{isLoading ? (
					<table className='table'>loading...</table>
				) : (
					<>
						<table className='table'>
							<TransactionHeader />
							<Body data={transactions} />
						</table>
						<Pagination
							data={{ page, totalPages }}
							onPaginateClick={(page) => setPage(page)}
						/>
					</>
				)}
			</div>
		</>
	);
};

export default TransactionTable;
