import React, { useEffect, useState } from "react";
import api from "../api";
import { CreateModal, TableAssets, TableButtons } from "../components";
const TravelGroups = () => {
	const [data, setData] = useState();
	const [travelUpdated, setTravelUpdated] = useState({});
	const TableButtonsIsShow = true;

	useEffect(() => {
		api.get.getTravelGroup().then((res) => {
			setData(res.result);
		});
	}, []);

	const TravelGroupsDelete = (id) => {
		api.Delete.deleteTravelGroup(id).then((res) => {
			api.get.getTravelGroup().then((res) => {
				setData(res.result);
			});
		});
	};

	const travelGroupsUpdate = (id) => {
		api.put.putTravelGroup(travelUpdated, id).then((res) => {
			window.location.reload();
		});
	};

	return (
		<div className='unioninformation minWidth90 travelGroupsT'>
			<TableAssets
				haveSearch={false}
				haveFilter={false}
				childern={
					<CreateModal
						setData={setData}
						type='TravelGroups'
						buttonType='button'
						openButtonClass='button addButton'
						openButtonContent='افزودن'
						modalTitle='گروه سفر'
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
											<th className='thead_cels'>کمترین مسافت</th>
											<th className='thead_cels'>شروع قیمت </th>
											<th className='thead_cels'>دقیقه اضافه</th>
											<th className='thead_cels'>ضریب سال</th>
											<th className='thead_cels'>نسبت ترافیک</th>
											<th className='thead_cels'>هزینه توقف</th>
											<th className='thead_cels'>درصد سفر شب</th>
											<th className='thead_cels'>درصد رفت و برگشت</th>
											<th className='thead_cels'>درصد سفر دوم</th>
											<th className='thead_cels'>کیلومتر اضافه</th>
											<th className='thead_cels'>{item.name}</th>
										</tr>
									</thead>
									<tbody className='tbody'>
										<tr
											className='table_body_row'
											style={{ borderBottom: "unset" }}
										>
											<td className='table_body_d center d-flex'>
												<div>{item.leastDist}</div>
											</td>
											<td className='table_body_d center'>
												{item.startCost
													? parseInt(item.startCost).toLocaleString()
													: null}
											</td>
											<td className='table_body_d center'>
												{item.perExtraMin
													? parseInt(item.perExtraMin).toLocaleString()
													: null}
											</td>
											<td className='table_body_d center'>
												{item.formulaRatio}
											</td>
											<td className='table_body_d center'>
												{item.ratioConstant}
											</td>
											<td className='table_body_d center'>
												{item.pauseInTripPerMinute
													? parseInt(
															item.pauseInTripPerMinute
													  ).toLocaleString()
													: null}
											</td>
											<td className='table_body_d center'>
												{item.percentForNight}
											</td>
											<td className='table_body_d center'>
												{item.percentRoundTrip}
											</td>
											<td className='table_body_d center'>
												{item.percentSecondTrip}
											</td>
											<td className='table_body_d center'>
												{item.costForExtraKm
													? parseInt(item.costForExtraKm).toLocaleString()
													: null}
											</td>
											<td className='table_body_d direction'>
												{TableButtonsIsShow ? (
													<TableButtons
														editModal={true}
														deleteButtonClick={() =>
															TravelGroupsDelete(item._id)
														}
														putUser={() => travelGroupsUpdate(item._id)}
														userName={item.name}
														editChildren={
															<div className='form edit-form'>
																<div className='inputWrapper'>
																	<label
																		htmlFor='TGName'
																		className='label'
																	>
																		<span className='required'>
																			نام گروه سفر
																		</span>
																	</label>
																	<input
																		className='form-input'
																		style={{ direction: "ltr" }}
																		name='TGName'
																		type='text'
																		autoComplete='off'
																		value={travelUpdated.name}
																		placeholder={item.name}
																		onChange={(e) =>
																			e.target.value.length <=
																				11 &&
																			setTravelUpdated({
																				...travelUpdated,
																				name: e.target
																					.value,
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
																			کمترین مسافت
																			{"(کیلومتر)"}
																		</span>
																	</label>
																	<input
																		className='form-input'
																		name='modir'
																		type='number'
																		maxLength={10}
																		autoComplete='off'
																		// placeholder={
																		// 	item.travelShare.admin
																		// }
																		onChange={(e) =>
																			setTravelUpdated({
																				...travelUpdated,
																				leastDist: parseInt(
																					e.target.value
																				),
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
																			شروع قیمت{"(تومان)"}
																		</span>
																	</label>
																	<input
																		className='form-input'
																		name='modir'
																		type='number'
																		maxLength={10}
																		autoComplete='off'
																		// placeholder={
																		// 	item.travelShare
																		// 		.superAgent
																		// }
																		onChange={(e) =>
																			setTravelUpdated({
																				...travelUpdated,
																				startCost: parseInt(
																					e.target.value
																				),
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
																			دقیقه اضافه{"(تومان)"}
																		</span>
																	</label>
																	<input
																		className='form-input'
																		name='modir'
																		type='number'
																		maxLength={10}
																		autoComplete='off'
																		// placeholder={
																		// 	item.travelShare.agent
																		// }
																		onChange={(e) =>
																			setTravelUpdated({
																				...travelUpdated,
																				perExtraMin:
																					parseInt(
																						e.target
																							.value
																					),
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
																			ضریب سال
																		</span>
																	</label>
																	<input
																		className='form-input'
																		name='modir'
																		type='number'
																		maxLength={10}
																		autoComplete='off'
																		// placeholder={
																		// 	item.travelShare.driver
																		// }
																		onChange={(e) =>
																			setTravelUpdated({
																				...travelUpdated,
																				formulaRatio:
																					parseInt(
																						e.target
																							.value
																					),
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
																			نسبت ترافیک
																		</span>
																	</label>
																	<input
																		className='form-input'
																		name='modir'
																		type='number'
																		maxLength={10}
																		autoComplete='off'
																		// placeholder={
																		// 	item.travelShare.tax
																		// }
																		onChange={(e) =>
																			setTravelUpdated({
																				...travelUpdated,
																				ratioConstant:
																					parseInt(
																						e.target
																							.value
																					),
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
																			هزینه توقف{"(تومان)"}
																		</span>
																	</label>
																	<input
																		className='form-input'
																		name='modir'
																		type='number'
																		maxLength={10}
																		autoComplete='off'
																		// placeholder={
																		// 	item.subscription.share
																		// 		.admin
																		// }
																		onChange={(e) =>
																			setTravelUpdated({
																				...travelUpdated,
																				pauseInTripPerMinute:
																					parseInt(
																						e.target
																							.value
																					),
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
																			درصد سفر شب
																		</span>
																	</label>
																	<input
																		className='form-input'
																		name='modir'
																		type='number'
																		maxLength={10}
																		autoComplete='off'
																		// placeholder={
																		// 	item.subscription.share
																		// 		.superAgent
																		// }
																		onChange={(e) =>
																			setTravelUpdated({
																				...travelUpdated,
																				percentForNight:
																					parseInt(
																						e.target
																							.value
																					),
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
																			درصد رفت و برگشت
																		</span>
																	</label>
																	<input
																		className='form-input'
																		name='modir'
																		type='number'
																		maxLength={10}
																		autoComplete='off'
																		// placeholder={
																		// 	item.subscription.share
																		// 		.agent
																		// }
																		onChange={(e) =>
																			setTravelUpdated({
																				...travelUpdated,
																				percentRoundTrip:
																					parseInt(
																						e.target
																							.value
																					),
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
																			کیلومتر اضافه{"(تومان)"}
																		</span>
																	</label>
																	<input
																		className='form-input'
																		name='modir'
																		type='number'
																		maxLength={10}
																		autoComplete='off'
																		// placeholder={
																		// 	item.subscription.share
																		// 		.tax
																		// }
																		onChange={(e) =>
																			setTravelUpdated({
																				...travelUpdated,
																				costForExtraKm:
																					parseInt(
																						e.target
																							.value
																					),
																			})
																		}
																	/>
																</div>
															</div>
														}
													/>
												) : null}
											</td>
										</tr>
									</tbody>
								</table>
								<div></div>
							</div>
						);
					})}
				</div>
			) : (
				"Loding ... "
			)}
		</div>
	);
};

export default TravelGroups;
