import { useEffect, useState } from "react";
import { formatPhoneNumber } from "../../../helpers/function";
import api from "../../api";
import users from "../../assets/Images/users.png";
import { DeleteModal, DropDown2, SearchInput, SelectRadio, TableAssets } from "../../components";
import Pagination from "../Pagination";
import TableButtons from "../TableButtons";
import "./index.scss";

const PassengersDataTable = ({ groupName, name }) => {
	const [passengers, setPassengers] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(null);
	const [page, setPage] = useState(1);
	const [isAllChecked, setIsAllChecked] = useState(false);
	const [selected, setSelected] = useState([]);
	const [citise, setCitise] = useState();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [deletedIndex, setDeletedIndex] = useState();
	const [isBlock, setIsBlock] = useState();
	const [selectedCity, setSelectedCity] = useState(null);
	const [selectedSuperAgent, setSelectedSuperAgent] = useState(null);
	const [searchValue, setSearchValue] = useState("");
	const [bodyreq, setBodyReq] = useState({
		filteredFields: [],
		filteredValues: [],
	});
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

	useEffect(() => {
		setIsLoading(true);
		filterData();
	}, [page, selectedCity, isBlock, selectedSuperAgent, searchValue]);

	const passengersDeleteHandler = (id) => {
		api.Delete.deletePassengersById(id).then(() => {
			filterData();
			setIsDeleteModalOpen(false);
		});
	};

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

	const firstItemSort = [
		{
			label: "آقا",
			value: "MALE",
			id: "male",
		},
		{
			label: "خانم",
			value: "FEMALE",
			id: "female",
		},
	];

	const reasonHandler = (value) => {
		setIsBlock(value === "true");
	};

	const onCitySelected = (value) => {
		setSelectedCity(value.label);
	};

	const filterData = async () => {
		let newBody;
		if (isBlock !== null && selectedCity !== null) {
			newBody = {
				filteredFields: ["gender", "city"],
				filteredValues: [isBlock, selectedCity],
			};
		} else if (isBlock === null && selectedCity !== null) {
			newBody = {
				filteredFields: ["city"],
				filteredValues: [selectedCity],
			};
		} else if (isBlock !== null && selectedCity === null) {
			newBody = {
				filteredFields: [],
				filteredValues: [],
			};
		}
		// else if (){}
		else {
			newBody = {
				filteredFields: [],
				filteredValues: [],
			};
		}
		const filteredData = await api.post.postFilterPassengers({
			page,
			body: newBody,
			searchField: searchI,
			searchValue: searchValue,
		});
		setPassengers(filteredData);
		setBodyReq(newBody);
		setIsLoading(false);
	};

	const reset = () => {
		window.location.reload();
	};

	const [searchI, setSearchI] = useState();

	const onSelectedSearchBase = (selectedItem) => {
		setSearchI(selectedItem.value);
	};

	return (
		<>
			<div className='passengersinformation'>
				<TableAssets
					haveSearch={false}
					haveFilter={false}
					filterTitleData='مرتب سازی بر اساس  : '
					inputSelections={
						<div className='DropDownInputs'>
							<SelectRadio
								item={firstItemSort}
								onRadioChange={reasonHandler}
								// currentSelected={selectedReason}
								id={`reason-${firstItemSort.map((item) => item.id)}`}
								name={`reason-${firstItemSort.map((item) => item.id)}`}
							/>
						</div>
					}
					mainData={
						<div className='main-filterDropDown'>
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
									onSelected={onCitySelected}
									labelName='شهر'
								/>
							</div>
							{/* <div className='inputWrapper'>
								<DropDown2
									data={newSuperAgentList}
									onSelected={onSuperAgentSelected}
									labelName='نام اتحادیه'
								/>
							</div> */}
						</div>
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
							onSelectedSearchBase={onSelectedSearchBase}
							badgeText={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 512 512'
									fill='#92929f'
									width='22'
									height='22'
								>
									<defs>
										<style>{`.fa-secondary{opacity:.4}`}</style>
									</defs>
									<path
										className='fa-primary'
										d='M500.3 443.7l-119.7-119.7c-15.03 22.3-34.26 41.54-56.57 56.57l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7z'
									/>
									<path
										className='fa-secondary'
										d='M207.1 0C93.12 0-.0002 93.13-.0002 208S93.12 416 207.1 416s208-93.13 208-208S322.9 0 207.1 0zM207.1 336c-70.58 0-128-57.42-128-128c0-70.58 57.42-128 128-128s128 57.42 128 128C335.1 278.6 278.6 336 207.1 336z'
									/>
								</svg>
							}
							placeHolder='جستجو ... '
							value={searchValue}
							searchFildName={groupName}
							UserName='LAST_NAME'
							SearchOnChange={(e) => setSearchValue(e.target.value)}
						/>
					}
					SearchTitleData={`جستجو ${groupName} : `}
				/>
				{isLoading && <span>Loading ...</span>}
				{isError && "مشکلی پیش اومده"}
				{console.log({ passengers })}
				{passengers && (
					<div className='Table_wrapper'>
						<>
							<table className='table'>
								<thead className='thead'>
									<tr className='thead_row'>
										<th className='thead_cels'>نام {groupName}</th>
										<th className='thead_cels'>استان</th>
										<th className='thead_cels'>شهر</th>
										<th className='thead_cels'>وضعیت</th>
										<th className='thead_cels'>موجودی {"(تومان)"}</th>
										<th className='thead_cels'></th>
									</tr>
								</thead>
								<tbody className='tbody'>
									{passengers.docs.map((item, index) => (
										<tr className='table_body_row' key={item._id}>
											<td className=' table_body_d'>
												<div className='tbodyWrapper'>
													<div className='tbody_imgWrapper'>
														<img
															src={
																item.passengerInformation.avatar
																	? item.passengerInformation
																			.avatar
																	: users
															}
															alt='avatar'
														/>
													</div>
													<div>
														<div className='name'>
															{item.firstName && item.lastName ? (
																<div>
																	{item.firstName} {item.lastName}
																</div>
															) : (
																<span className='pending'>
																	نام وارد نشده است
																</span>
															)}

															<div className='phoneNumber_row'>
																{item.phoneNumber ? (
																	formatPhoneNumber(
																		`0${item.phoneNumber}`
																	)
																) : (
																	<span className='pending'>
																		شماره تلفن وارد نشده است
																	</span>
																)}
															</div>
														</div>
													</div>
												</div>
											</td>
											<td className=' table_body_d center'>
												<div className='tbody_fWrapper'>
													{item.passengerInformation.province ? (
														item.passengerInformation.province
													) : (
														<span className='pending'>
															استان وارد نشده است
														</span>
													)}
												</div>
											</td>
											<td className=' table_body_d center'>
												<div className='tbody_fWrapper'>
													{item.passengerInformation.city ? (
														item.passengerInformation.city
													) : (
														<span className='pending'>
															شهر وارد نشده است
														</span>
													)}
												</div>
											</td>
											<td className=' table_body_d center'>
												<div className='tbody_fWrapper'>
													{item.passengerInformation
														.isCompleteRegistration ? (
														<span className='accepted'>فعال</span>
													) : (
														<span className='rejected'>غیرفعال</span>
													)}
												</div>
											</td>
											<td className=' table_body_d center'>
												{item.balance.toLocaleString()}
											</td>
											<td className=' table_body_d center direction'>
												<TableButtons
													item={item}
													deleteButtonClick={() =>
														passengersDeleteHandler(
															passengers.docs[deletedIndex]._id
														)
													}
													isDeleteModalOpen={isDeleteModalOpen}
													onDeleteCancelModal={() =>
														setIsDeleteModalOpen(false)
													}
													onDeleteModalOpen={() => {
														setDeletedIndex(index);
														setIsDeleteModalOpen(true);
													}}
													userName={`${item.firstName} ${item.lastName}`}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<Pagination
								data={{ page, totalPages: passengers.totalPages }}
								onPaginateClick={(_page) => setPage(_page)}
							/>
						</>

						<div style={{ width: "fit-content" }}>
							{isAllChecked ? (
								<DeleteModal modalTitle='آیا مطمئنید که تمامی داده ها حذف بشوند؟' />
							) : null}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default PassengersDataTable;
