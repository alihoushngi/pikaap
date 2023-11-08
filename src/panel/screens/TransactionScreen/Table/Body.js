import React from "react";
import { dateConverter } from "../../../utils";
import users from "../../../assets/Images/users.png";

const Body = ({ data }) => {
	const formatPhoneNumber = (phoneNumberString) => {
		var cleaned = phoneNumberString.replace(/\D/g, "");
		var match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);
		if (match) {
			return match[1] + "-" + match[2] + "-" + match[3];
		}
		return null;
	};

	const UserInformation = ({ user }) => {
		return (
			<div className='user-information-container'>
				<img
					style={{
						width: "50px",
						height: "50px",
						objectFit: "cover",
						borderRadius: "50%",
					}}
					src={user.user.avatar ? user.user.avatar : users}
					alt='avatar'
				/>
				<div
					className='name-holder'
					style={{
						marginRight: "20px",
						marginLeft: "20px",
					}}
				>
					{user.type === "ADMIN" && (
						<>
							<h1>ادمین</h1>
							<h1
								style={{
									marginTop: ".5rem",
									whiteSpace: "nowrap",
									width: "100px",
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{user.user.firstName ? (
									user.user.firstName
								) : (
									<span className='pending mb-1'>نامی وارد نشده است</span>
								)}
								{user.user.lastName}
							</h1>
						</>
					)}
					{user.type === "SUPER_AGENT" && (
						<>
							<h1
								style={{
									whiteSpace: "nowrap",
									width: "100px",
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{user.user.superAgentInformation.superAgentName}
							</h1>
							<span style={{ marginTop: ".3rem" }}>
								{user.user.superAgentInformation.city}
							</span>
						</>
					)}
					{user.type === "AGENT" && (
						<>
							<h1>آژانس </h1>
							<h1
								style={{
									marginTop: ".3rem",
									whiteSpace: "nowrap",
									width: "100px",
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{user.user.agentInformation.agentName}
							</h1>
							<span style={{ marginTop: ".3rem" }}>
								{user.user.agentInformation.city}
							</span>
						</>
					)}
					{user.type === "DRIVER" && (
						<>
							<h1>راننده</h1>
							<h1
								style={{
									marginTop: ".5rem",
									whiteSpace: "nowrap",
									width: "100px",
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{user.user.firstName ? (
									user.user.firstName
								) : (
									<span className='pending mb-1'>نامی وارد نشده است</span>
								)}{" "}
								{user.user.lastName}
							</h1>
							<span style={{ marginTop: ".3rem" }}>
								{user.user.driverInformation.city}
							</span>
						</>
					)}
					{user.type === "PASSENGER" && (
						<>
							<h1>مسافر</h1>
							<h1
								style={{
									marginTop: ".5rem",
									whiteSpace: "nowrap",
									width: "100px",
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{user.user.firstName ? (
									user.user.firstName
								) : (
									<span className='pending mb-1'>نامی وارد نشده است</span>
								)}{" "}
								{user.user.lastName}
							</h1>
						</>
					)}
					{user.type === "TAX" && (
						<>
							<h1 style={{ marginTop: ".5rem" }}>مالیات</h1>
						</>
					)}
					<h2>{formatPhoneNumber(`0${user.user.phoneNumber}`)}</h2>
				</div>
			</div>
		);
	};

	const IsDeposit = () => {
		return <div className='accepted'>به علت واریزی</div>;
	};

	const reasonDict = (reason) => {
		switch (reason) {
			case "SUBSCRIPTION":
				return <span className='primaryBadge'>{"عضویت ماهیانه"}</span>;
			case "SUBSCRIPTION_INTERNAL":
				return <span className='primaryBadge'>{"عضویت ماهیانه داخلی"}</span>;
			case "SUBSCRIPTION_INVOICE":
				return <span className='primaryBadge'>{" عضویت ماهیانه ثبت فیش"}</span>;
			case "SUBSCRIPTION_FROM_DRIVER_WALLET":
				return <span className='primaryBadge'>{"عضویت ماهیانه خودکار"}</span>;
			case "SUBSCRIPTION_COMMISSION":
				return <span className='primaryBadge'>{"کمیسیون عضویت ماهیانه"}</span>;
			case "TRAVEL_COST":
				return <span className='primaryBadge'>{"هزینه سفر"}</span>;
			case "TRAVEL_COST_COMMISSION":
				return <span className='primaryBadge'>{"کمیسیون هزینه سفر"}</span>;
			case "CHARGE_WALLET":
				return <span className='primaryBadge'>{"افزایش موجودی"}</span>;
			case "CHARGE_WALLET_INVOICE":
				return <span className='primaryBadge'>{"افزایش موجودی ثبت فیش"}</span>;
			case "WITHDRAWAL":
				return <span className='primaryBadge'>{"واریز به حساب"}</span>;
			case "PAY_DEBTS":
				return <span className='primaryBadge'>{"بدهی"}</span>;
			case "PAY_DEBTS_INVOICE":
				return <span className='primaryBadge'>{"بدهی ثبت فیش"}</span>;
			case "PAY_DEBTS_COMMISSION":
				return <span className='primaryBadge'>{"کمیسیون بدهی"}</span>;

			default:
				break;
		}
	};

	const IsOnline = ({ isOnline, description }) => {
		if (isOnline) {
			return <div className='is-online'>{"آنلاین"}</div>;
		}
		return <div className='is-offline'>{"آفلاین"}</div>;
	};

	const gateway = (name) => {
		return (
			<div className='is-online'>
				<p>{name}</p>
			</div>
		);
	};

	const isSuccess = (isSuccess) => {
		if (isSuccess === "SUCCESS") {
			return (
				<div className='success'>
					<p>{"موفق"}</p>
				</div>
			);
		}
		if (isSuccess === "FAILED") {
			return (
				<div className='failed'>
					<p>{"ناموفق"}</p>
				</div>
			);
		}
		if (isSuccess === "PENDING") {
			return (
				<div className='pending'>
					<p>{"در حال انجام"}</p>
				</div>
			);
		}
	};

	const isDeposit = (isDeposit) => {
		if (isDeposit) return <div className='accepted'>{"واریز"}</div>;
		else return <div className='rejected'>{"برداشت"}</div>;
	};
	if (data.length > 0) {
		return (
			<tbody className='tbody'>
				{data.map((row, index) => {
					return (
						<tr className='table_body_row' key={index}>
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>{dateConverter(row.createdAt)}</div>
							</td>
							{/* Payer */}
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>
									{row.payerId ? (
										<UserInformation
											user={{
												user: row.payerId,
												type: row.payerType,
											}}
										/>
									) : (
										<IsDeposit />
									)}
								</div>
							</td>

							{/* Payer */}
							{/* Receiver */}
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>
									{row.receiverId ? (
										<UserInformation
											user={{
												user: row.receiverId,
												type: row.receiverType,
											}}
										/>
									) : (
										<IsDeposit />
									)}
								</div>
							</td>
							{/* Receiver */}
							{/* Amount */}
							<td className=' table_body_d'>
								<div className='amount'>{row.amount.toLocaleString()}</div>
							</td>
							{/* Amount */}
							{/* Reason */}
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>{reasonDict(row.reason)}</div>
							</td>
							{/* Reason */}

							{/* IsDeposit */}
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>{isDeposit(row.isDeposit)}</div>
							</td>
							{/* IsDeposit */}

							{/* isOnline */}
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>
									<span>
										{
											<IsOnline
												isOnline={row.isOnline}
												description={row.description}
											/>
										}
										{row.isOnline && <p>{gateway(row.gateway)}</p>}
									</span>
								</div>
							</td>
							{/* isOnline */}
							{/* TrackingCode */}
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>{row.trackingCode}</div>
							</td>
							{/* TrackingCode */}
							{/* Status */}
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>
									{isSuccess(row.transactionStatus)}
								</div>
							</td>
							{/* Status */}
						</tr>
					);
				})}
			</tbody>
		);
	} else return null;
};

export default Body;
