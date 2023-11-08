import React, { useEffect, useState } from "react";
import api from "../api";
import { TableButtons, ProgressBar, TableAssets, CreateModal } from "../components";
const FinancialGroups = () => {
	const userType = ["مدیر", "اتحادیه", "آژانس", "راننده", "مالیات"];
	const [data, setData] = useState();
	const [financialUpdated, setFinancialUpdated] = useState({});
	const TableButtonsIsShow = true;

	useEffect(() => {
		api.get.getFinancialGroups().then((res) => {
			setData(res.result);
		});
	}, []);

	const FinancialGroupsDelete = (id) => {
		api.Delete.DeleteFinancialGroup(id).then((res) => {
			api.get.getFinancialGroups().then((res) => {
				setData(res.result);
			});
		});
	};

	const financialGroupUpdate = (id) => {
		api.put.financialGroup(financialUpdated, id).then((res) => {
			window.location.reload();
		});
	};

	return (
		<div className='unioninformation minWidth50'>
			<TableAssets
				haveSearch={false}
				haveFilter={false}
				childern={
					<CreateModal
						type='FinancialGroups'
						buttonType='button'
						openButtonClass='button addButton'
						openButtonContent='افزودن'
						modalTitle='گروه مالی'
						exitButtonContent='X'
					></CreateModal>
				}
			/>
			{data ? (
				<div className='Table_wrapper'>
					{data.map((item, index) => {
						return (
							<div key={index} style={{ marginTop: "1rem" }}>
								<table className='table'>
									<thead className='thead'>
										<tr className='thead_row'>
											<th className='thead_cels'> کاربر</th>
											<th className='thead_cels'>سهم اشتراک {"(تومان)"}</th>
											<th className='thead_cels'>سهم سفر</th>
											<th className='thead_cels left'>
												نام گروه مالی : {item.name}
											</th>
										</tr>
									</thead>
									<tbody className='tbody'>
										<tr className='table_body_row'>
											<td className='table_body_d'>
												<div className='tbodyWrapper'>{userType[0]}</div>
											</td>
											<td className='table_body_d center'>
												<span>
													{item.subscription.share.admin.toLocaleString()}
												</span>
											</td>
											<td
												className='table_body_d'
												style={{
													textAlign: "initial",
												}}
											>
												% {item.travelShare.admin}
												<ProgressBar
													style={{ width: `${item.travelShare.admin}%` }}
												/>
											</td>
										</tr>
										<tr className='table_body_row'>
											<td className='table_body_d'>
												<div className='tbodyWrapper'>{userType[1]}</div>
											</td>
											<td className='table_body_d center'>
												<span>
													{item.subscription.share.superAgent.toLocaleString()}
												</span>
											</td>
											<td
												className='table_body_d'
												style={{
													textAlign: "initial",
												}}
											>
												% {item.travelShare.superAgent}
												<ProgressBar
													style={{
														width: `${item.travelShare.superAgent}%`,
													}}
												/>
											</td>
										</tr>
										<tr className='table_body_row'>
											<td className='table_body_d'>
												<div className='tbodyWrapper'>{userType[2]}</div>
											</td>
											<td className='table_body_d center'>
												<span>
													{item.subscription.share.agent.toLocaleString()}
												</span>
											</td>
											<td
												className='table_body_d'
												style={{
													textAlign: "initial",
												}}
											>
												% {item.travelShare.agent}
												<ProgressBar
													style={{ width: `${item.travelShare.agent}%` }}
												/>
											</td>
										</tr>
										<tr className='table_body_row'>
											<td className='table_body_d'>
												<div className='tbodyWrapper'>{userType[3]}</div>
											</td>
											<td className='table_body_d center'>
												<span>-</span>
											</td>
											<td
												className='table_body_d'
												style={{
													textAlign: "initial",
												}}
											>
												% {item.travelShare.driver}
												<ProgressBar
													style={{ width: `${item.travelShare.driver}%` }}
												/>
											</td>
										</tr>
										<tr
											className='table_body_row'
											style={{ borderBottom: "unset" }}
										>
											<td className='table_body_d'>
												<div className='tbodyWrapper'>{userType[4]}</div>
											</td>
											<td className='table_body_d center'>
												<span>
													{item.subscription.share.tax.toLocaleString()}
												</span>
											</td>
											<td
												className='table_body_d'
												style={{
													textAlign: "initial",
												}}
											>
												% {item.travelShare.tax}
												<ProgressBar
													style={{ width: `${item.travelShare.tax}%` }}
												/>
											</td>
										</tr>
									</tbody>
								</table>
								<div className='flexBC1'>
									<div className='ModalFooterWrapper'>
										<div className='TextWrapper '>
											<div className='SvgWrapper'>
												<div className='Svg'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														viewBox='0 0 448 512'
														fill='none'
													>
														<defs>
															<style>{`.fa-secondary{opacity:.4}`}</style>
														</defs>
														<path
															className='fa-primary'
															d='M400 64H352V31.1C352 14.33 337.7 0 320 0S288 14.33 288 31.1V64H160V31.1C160 14.33 145.7 0 128 0S96 14.33 96 31.1V64H48C21.49 64 0 85.49 0 112V192h448V112C448 85.49 426.5 64 400 64z'
															fill='currentColor'
														/>
														<path
															className='fa-secondary'
															d='M0 192v272C0 490.5 21.5 512 48 512h352c26.5 0 48-21.5 48-48V192H0zM128 432C128 440.8 120.8 448 112 448h-32C71.16 448 64 440.8 64 432v-32C64 391.2 71.16 384 80 384h32C120.8 384 128 391.2 128 400V432zM128 304C128 312.8 120.8 320 112 320h-32C71.16 320 64 312.8 64 304v-32C64 263.2 71.16 256 80 256h32C120.8 256 128 263.2 128 272V304zM256 432c0 8.836-7.162 16-16 16h-32C199.2 448 192 440.8 192 432v-32C192 391.2 199.2 384 208 384h32c8.838 0 16 7.164 16 16V432zM256 304c0 8.836-7.162 16-16 16h-32C199.2 320 192 312.8 192 304v-32C192 263.2 199.2 256 208 256h32C248.8 256 256 263.2 256 272V304zM384 432c0 8.836-7.162 16-16 16h-32c-8.836 0-16-7.164-16-16v-32c0-8.836 7.164-16 16-16h32c8.838 0 16 7.164 16 16V432zM384 304c0 8.836-7.162 16-16 16h-32C327.2 320 320 312.8 320 304v-32C320 263.2 327.2 256 336 256h32C376.8 256 384 263.2 384 272V304z'
															fill='currentColor'
														/>
													</svg>
												</div>
											</div>
											<div className='Side'>
												<span className='Up'>
													{item.subscription.cycle} روز
												</span>
												<span className='Down'>تعداد روزهای عضویت</span>
											</div>
										</div>
										<div className='TextWrapper me-1'>
											<div className='SvgWrapper2'>
												<div className='Svg2'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														viewBox='0 0 576 512'
													>
														<defs>
															<style>{`.fa-secondary{opacity:.4}`}</style>
														</defs>
														<path
															className='fa-primary'
															d='M316.4 281.6h-9.242V201.1C307.2 196.5 302.7 192 297.2 192h-28.44C265.1 192 262.3 194.2 260.6 197.4L250.7 215.9c-1.555 3.109-1.398 6.844 .4629 9.801c1.713 2.801 4.982 4.666 8.4 4.666h9.275v51.2H259.6c-5.443 0-9.957 4.514-9.957 9.957v18.49C249.6 315.5 254.1 320 259.6 320h56.89c5.445 0 9.957-4.512 9.957-9.957V291.6C326.4 286.1 321.9 281.6 316.4 281.6zM559 54.5C524.1 38.25 489.2 32 454.3 32C343.5 32 232.5 94.38 121.7 94.38c-27.79 0-55.57-4-83.36-13.75C35.21 79.5 32.06 79 29.03 79C13.5 79 0 92.38 0 110.8v317.4c0 12.62 6.525 24.5 16.99 29.38C51.86 473.8 86.85 480 121.7 480c110.8 0 221.7-62.38 332.6-62.38c27.79 0 55.57 4 83.36 13.75c3.15 1.125 6.301 1.625 9.338 1.625C562.5 433 576 419.6 576 401.1V83.88C576 71.25 569.5 59.38 559 54.5zM528 320c-30.62 0-56.15 21.54-62.44 50.28c-3.799-.1289-7.42-.6543-11.28-.6543c-62.03 0-121.6 16.77-179.3 32.98C221.3 417.7 170.5 432 121.7 432c-6.389 0-12.27-1.089-18.4-1.597C103.5 428.3 104 426.2 104 424c0-32.61-24.47-59.22-56-63.19V192c30.62 0 56.15-21.54 62.44-50.28C114.2 141.8 117.9 142.4 121.7 142.4c62.03 0 121.6-16.77 179.3-32.98C354.7 94.28 405.5 80 454.3 80c6.389 0 12.27 1.089 18.4 1.597C472.5 83.73 472 85.8 472 88c0 32.61 24.47 59.22 56 63.19V320z'
															fill='currentColor'
														/>
														<path
															className='fa-secondary'
															d='M472 88c0-2.195 .4505-4.268 .6751-6.403C466.5 81.09 460.7 80 454.3 80c-48.78 0-99.54 14.28-153.3 29.39C243.4 125.6 183.8 142.4 121.7 142.4c-3.863 0-7.482-.5254-11.28-.6543C104.2 170.5 78.63 192 48 192v168.8C79.53 364.8 104 391.4 104 424c0 2.195-.4505 4.268-.6751 6.403C109.5 430.9 115.3 432 121.7 432c48.78 0 99.54-14.28 153.3-29.39c57.64-16.21 117.2-32.98 179.3-32.98c3.861 0 7.482 .5254 11.28 .6543C471.8 341.5 497.4 320 528 320V151.2C496.5 147.2 472 120.6 472 88zM288 371.2c-53.02 0-96-51.58-96-115.2c0-63.62 42.98-115.2 96-115.2c53.02 0 96 51.58 96 115.2C384 319.6 341 371.2 288 371.2z'
															fill='currentColor'
														/>
													</svg>
												</div>
											</div>
											<div className='Side'>
												<span className='Up'>
													{item.subscription.fee.toLocaleString()} تومان
												</span>
												<span className='Down'>حق عضویت ماهانه</span>
											</div>
										</div>
									</div>
									<div>
										{TableButtonsIsShow ? (
											<TableButtons
												editModal={true}
												deleteButtonClick={() =>
													FinancialGroupsDelete(item._id)
												}
												putUser={() => financialGroupUpdate(item._id)}
												userName={item.name}
												editChildren={
													<div className='form edit-form'>
														<div className='inputWrapper'>
															<label
																htmlFor='FgName'
																className='label'
															>
																<span className='required'>
																	نام گروه مالی
																</span>
															</label>
															<input
																className='form-input'
																style={{ direction: "ltr" }}
																name='FgName'
																type='text'
																autoComplete='off'
																value={financialUpdated.name}
																placeholder={item.name}
																onChange={(e) =>
																	e.target.value.length <= 11 &&
																	setFinancialUpdated({
																		...financialUpdated,
																		name: e.target.value,
																	})
																}
															/>
														</div>
														<div className='inputWrapper'>
															<label
																htmlFor='modir'
																className='label'
															>
																<span className='required'>
																	سهم اشتراک مدیر {"(درصد)"}
																</span>
															</label>
															<input
																className='form-input'
																name='modir'
																type='number'
																maxLength={10}
																autoComplete='off'
																placeholder={item.travelShare.admin}
																onChange={(e) =>
																	setFinancialUpdated({
																		...financialUpdated,
																		travelShareAdmin:
																			e.target.value,
																	})
																}
															/>
														</div>
														<div className='inputWrapper'>
															<label
																htmlFor='modir'
																className='label'
															>
																<span className='required'>
																	سهم اشتراک اتحادیه {"(درصد)"}
																</span>
															</label>
															<input
																className='form-input'
																name='modir'
																type='number'
																maxLength={10}
																autoComplete='off'
																placeholder={
																	item.travelShare.superAgent
																}
																onChange={(e) =>
																	setFinancialUpdated({
																		...financialUpdated,
																		travelShareSuperAgent:
																			e.target.value,
																	})
																}
															/>
														</div>
														<div className='inputWrapper'>
															<label
																htmlFor='modir'
																className='label'
															>
																<span className='required'>
																	سهم اشتراک آژانس {"(درصد)"}
																</span>
															</label>
															<input
																className='form-input'
																name='modir'
																type='number'
																maxLength={10}
																autoComplete='off'
																placeholder={item.travelShare.agent}
																onChange={(e) =>
																	setFinancialUpdated({
																		...financialUpdated,
																		travelShareAgent:
																			e.target.value,
																	})
																}
															/>
														</div>
														<div className='inputWrapper'>
															<label
																htmlFor='modir'
																className='label'
															>
																<span className='required'>
																	سهم سفر راننده {"(تومان)"}
																</span>
															</label>
															<input
																className='form-input'
																name='modir'
																type='number'
																maxLength={10}
																autoComplete='off'
																placeholder={
																	item.travelShare.driver
																}
																onChange={(e) =>
																	setFinancialUpdated({
																		...financialUpdated,
																		travelShareDriver:
																			e.target.value,
																	})
																}
															/>
														</div>
														<div className='inputWrapper'>
															<label
																htmlFor='modir'
																className='label'
															>
																<span className='required'>
																	سهم اشتراک مالیات {"(درصد)"}
																</span>
															</label>
															<input
																className='form-input'
																name='modir'
																type='number'
																maxLength={10}
																autoComplete='off'
																placeholder={item.travelShare.tax}
																onChange={(e) =>
																	setFinancialUpdated({
																		...financialUpdated,
																		travelShareTax:
																			e.target.value,
																	})
																}
															/>
														</div>
														<div className='inputWrapper'>
															<label
																htmlFor='modir'
																className='label'
															>
																<span className='required'>
																	سهم سفر مدیر {"(تومان)"}
																</span>
															</label>
															<input
																className='form-input'
																name='modir'
																type='number'
																maxLength={10}
																autoComplete='off'
																placeholder={
																	item.subscription.share.admin
																}
																onChange={(e) =>
																	setFinancialUpdated({
																		...financialUpdated,
																		subscriptionShareAdmin:
																			e.target.value,
																	})
																}
															/>
														</div>
														<div className='inputWrapper'>
															<label
																htmlFor='modir'
																className='label'
															>
																<span className='required'>
																	سهم سفر اتحادیه {"(تومان)"}
																</span>
															</label>
															<input
																className='form-input'
																name='modir'
																type='number'
																maxLength={10}
																autoComplete='off'
																placeholder={
																	item.subscription.share
																		.superAgent
																}
																onChange={(e) =>
																	setFinancialUpdated({
																		...financialUpdated,
																		subscriptionShareSuperAgent:
																			e.target.value,
																	})
																}
															/>
														</div>
														<div className='inputWrapper'>
															<label
																htmlFor='modir'
																className='label'
															>
																<span className='required'>
																	سهم سفر آژانس {"(تومان)"}
																</span>
															</label>
															<input
																className='form-input'
																name='modir'
																type='number'
																maxLength={10}
																autoComplete='off'
																placeholder={
																	item.subscription.share.agent
																}
																onChange={(e) =>
																	setFinancialUpdated({
																		...financialUpdated,
																		subscriptionShareAgent:
																			e.target.value,
																	})
																}
															/>
														</div>
														<div className='inputWrapper'>
															<label
																htmlFor='modir'
																className='label'
															>
																<span className='required'>
																	سهم سفر مالیات {"(تومان)"}
																</span>
															</label>
															<input
																className='form-input'
																name='modir'
																type='number'
																maxLength={10}
																autoComplete='off'
																placeholder={
																	item.subscription.share.tax
																}
																onChange={(e) =>
																	setFinancialUpdated({
																		...financialUpdated,
																		subscriptionSharetax:
																			e.target.value,
																	})
																}
															/>
														</div>
														<div className='inputWrapper'>
															<label
																htmlFor='modir'
																className='label'
															>
																<span className='required'>
																	تعداد روز های عضویت
																</span>
															</label>
															<input
																className='form-input'
																name='modir'
																type='number'
																maxLength={10}
																autoComplete='off'
																placeholder={
																	item.subscription.cycle
																}
																onChange={(e) =>
																	setFinancialUpdated({
																		...financialUpdated,
																		subscriptionCycle:
																			e.target.value,
																	})
																}
															/>
														</div>
														<div className='inputWrapper'>
															<label
																htmlFor='modir'
																className='label'
															>
																<span className='required'>
																	حق عضویت ماهانه {"(تومان)"}
																</span>
															</label>
															<input
																className='form-input'
																name='modir'
																type='number'
																maxLength={10}
																autoComplete='off'
																placeholder={item.subscription.fee}
																onChange={(e) =>
																	setFinancialUpdated({
																		...financialUpdated,
																		subscriptionFee:
																			e.target.value,
																	})
																}
															/>
														</div>
													</div>
												}
											/>
										) : null}
									</div>
								</div>
								<div
									style={{
										width: "100%",
										height: "5px",
										backgroundColor: "#323248",
										alignItems: "center",
										marginBottom: "1rem",
										marginLeft: "auto",
										marginRight: "auto",
									}}
								></div>
							</div>
						);
					})}
				</div>
			) : (
				"Loding ..."
			)}
		</div>
	);
};

export default FinancialGroups;
