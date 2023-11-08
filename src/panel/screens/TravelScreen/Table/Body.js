import React from "react";
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
				<img src={users} alt='avatar' />
				<div className='name-holder'>
					<h1>
						{user.firstName ? user.firstName : "نامی وارد نشده است"} {user.lastName}
					</h1>
					<h2>{formatPhoneNumber(`0${user.phoneNumber}`)}</h2>
				</div>
			</div>
		);
	};
	const AgentInformation = ({ user }) => {
		return (
			<div className='user-information-container'>
				<img src={users} alt='avatar' />
				<div className='name-holder'>
					<h1>
						{user.agentInformation
							? user.agentInformation.agentName
							: "نامی وارد نشده است"}
					</h1>
					<h2>{user.agentInformation.code}</h2>
				</div>
			</div>
		);
	};

	const travelStatusDict = (status) => {
		switch (status) {
			case "REQUESTED":
				return (
					<div className='failed'>
						<p>{"درخواست اولیه"}</p>
					</div>
				);
			case "FINISHED":
				return (
					<div className='failed'>
						<p>{"پایان سفر"}</p>
					</div>
				);
			case "PASSENGER_CANCELED":
				return (
					<div className='failed'>
						<p>{"لغو مسافر"}</p>
					</div>
				);
			case "DRIVER_CANCELED":
				return (
					<div className='failed'>
						<p>{"لغو راننده"}</p>
					</div>
				);
			default:
				return (
					<div className='failed'>
						<p>{status}</p>
					</div>
				);
		}
	};

	const travelTypeDict = (status) => {
		switch (status) {
			case "PASSENGER_REQUESTED":
				return (
					<div className='is-offline'>
						<p>{"مسافر"}</p>
					</div>
				);
			case "FINISHED":
				return (
					<div className='is-offline'>
						<p>{"پایان سفر"}</p>
					</div>
				);
			case "PASSENGER_CANCELED":
				return (
					<div className='is-offline'>
						<p>{"لغو مسافر"}</p>
					</div>
				);
			case "DRIVER_CANCELED":
				return (
					<div className='is-offline'>
						<p>{"لغو راننده"}</p>
					</div>
				);
			default:
				return (
					<div className='is-offline'>
						<p>{status}</p>
					</div>
				);
		}
	};

	if (data.length > 0) {
		return (
			<tbody className='tbody'>
				{data.map((row, index) => {
					return (
						<tr className='table_body_row'>
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>{row.persianDate}</div>
							</td>
							{/* City */}
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>{row.city}</div>
							</td>
							{/* City */}

							{/* Fee */}
							<td className=' table_body_d'>
								<div className='amount'>
									{row.fee ? row.fee.toLocaleString() : "تعیین نشده است"}
								</div>
							</td>
							{/* Fee */}

							{/* Passenger */}
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>
									{row.passengerId ? (
										<UserInformation user={row.passengerId} />
									) : (
										"تعیین نشده است"
									)}
								</div>
							</td>
							{/* Passenger */}

							{/* Driver */}
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>
									{row.driverId ? (
										<UserInformation user={row.driverId} />
									) : (
										"تعیین نشده است"
									)}
								</div>
							</td>
							{/* Driver */}

							{/* Agent */}
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>
									{row.agentId ? (
										<AgentInformation user={row.agentId} />
									) : (
										"تعیین نشده است"
									)}
								</div>
							</td>
							{/* Agent */}

							{/* Status */}
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>{travelStatusDict(row.status)}</div>
							</td>
							{/* Status */}

							{/* Requester */}
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>{travelTypeDict(row.travelType)}</div>
							</td>
							{/* Requester */}

							{/* Payment Type */}
							<td className=' table_body_d'>
								<div className='tbodyWrapper'>
									<div className='subs-holder'>
										{row.paymentType === "OFFLINE" ? "اعتباری" : "آنلاین"}
									</div>
								</div>
							</td>
							{/* Requester */}
						</tr>
					);
				})}
			</tbody>
		);
	} else return null;
};

export default Body;
