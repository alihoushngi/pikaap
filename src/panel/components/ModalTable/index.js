import React, { memo, useEffect } from "react";
import { ProgressBar, TableButtons } from "../../components";
import "./index.scss";

const ModlaTable = ({ data, TableButtonsIsShow }) => {
	const userType = ["مدیر", "اتحادیه", "آژانس", "راننده", "مالیات"];
	return (
		<>
			{data ? (
				<div className='modal'>
					<div className='Modal_background'>
						<div className='Table_wrapper'>
							<table className='table'>
								<thead className='thead'>
									<tr className='thead_row'>
										<th className='thead_cels'> کاربر</th>
										<th className='thead_cels'>سهم اشتراک {"(تومان)"}</th>
										<th className='thead_cels'>سهم سفر</th>
										<th className='thead_cels'></th>
									</tr>
								</thead>
								<tbody className='tbody'>
									<tr className='table_body_row'>
										<td className='table_body_d'>
											<div className='tbodyWrapper'>{userType[0]}</div>
										</td>
										<td className='table_body_d'>
											<span>
												{data.subscription.share.admin.toLocaleString()}
											</span>
										</td>
										<td
											className='table_body_d'
											style={{
												textAlign: "initial",
											}}
										>
											% {data.travelShare.admin}
											<ProgressBar
												style={{ width: `${data.travelShare.admin}%` }}
											/>
										</td>
										<td className='table_body_d direction'>
											{TableButtonsIsShow ? <TableButtons /> : null}
										</td>
									</tr>
									<tr className='table_body_row'>
										<td className='table_body_d'>
											<div className='tbodyWrapper'>{userType[1]}</div>
										</td>
										<td className='table_body_d'>
											<span>
												{data.subscription.share.superAgent.toLocaleString()}
											</span>
										</td>
										<td
											className='table_body_d'
											style={{
												textAlign: "initial",
											}}
										>
											% {data.travelShare.superAgent}
											<ProgressBar
												style={{ width: `${data.travelShare.superAgent}%` }}
											/>
										</td>
										<td className='table_body_d direction'>
											{TableButtonsIsShow ? <TableButtons /> : null}
										</td>
									</tr>
									<tr className='table_body_row'>
										<td className='table_body_d'>
											<div className='tbodyWrapper'>{userType[2]}</div>
										</td>
										<td className='table_body_d'>
											<span>
												{data.subscription.share.agent.toLocaleString()}
											</span>
										</td>
										<td
											className='table_body_d'
											style={{
												textAlign: "initial",
											}}
										>
											% {data.travelShare.agent}
											<ProgressBar
												style={{ width: `${data.travelShare.agent}%` }}
											/>
										</td>
										<td className='table_body_d direction'>
											{TableButtonsIsShow ? <TableButtons /> : null}
										</td>
									</tr>
									<tr className='table_body_row'>
										<td className='table_body_d'>
											<div className='tbodyWrapper'>{userType[3]}</div>
										</td>
										<td className='table_body_d'>
											<span>-</span>
										</td>
										<td
											className='table_body_d'
											style={{
												textAlign: "initial",
											}}
										>
											% {data.travelShare.driver}
											<ProgressBar
												style={{ width: `${data.travelShare.driver}%` }}
											/>
										</td>
										<td className='table_body_d direction'>
											{TableButtonsIsShow ? <TableButtons /> : null}
										</td>
									</tr>
									<tr className='table_body_row'>
										<td className='table_body_d'>
											<div className='tbodyWrapper'>{userType[4]}</div>
										</td>
										<td className='table_body_d'>
											<span>
												{data.subscription.share.tax.toLocaleString()}
											</span>
										</td>
										<td
											className='table_body_d'
											style={{
												textAlign: "initial",
											}}
										>
											% {data.travelShare.tax}
											<ProgressBar
												style={{ width: `${data.travelShare.tax}%` }}
											/>
										</td>
										<td className='table_body_d direction'>
											{TableButtonsIsShow ? <TableButtons /> : null}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			) : (
				<h1>Loading...</h1>
			)}
		</>
	);
};

export default memo(ModlaTable);
