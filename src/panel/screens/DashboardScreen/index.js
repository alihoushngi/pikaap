import moment from "jalali-moment";
import Cookies from "js-cookie";
import Leaflet from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import api from "../../api";
import { BoxChartWithNumber, UserInformation } from "../../components";
import Column from "../../components/charts/Column";
import useSocket from "../../hooks/useSocket";
import { constants } from "../../values";
import "./index.scss";

const DashboardScreen = () => {
	const [dashboardData, setDashboardData] = useState();
	const [userSeries, setUserSeries] = useState({
		passengers: [],
		drivers: [],
		agents: [],
		superAgents: [],
	});
	const [isLoading, setIsLoading] = useState(true);
	const [passengerLastMonth, setPassengerLastMonth] = useState({
		series: [],
		cats: [],
	});
	const [driverLastMonth, setDriverLastMonth] = useState({
		series: [],
		cats: [],
	});
	const [driverPercentSeries, setDriverPercentSeries] = useState([]);
	const [driverPercentCats, setDriverPercentCats] = useState([]);
	const [travelsCats, setTravelCats] = useState([]);
	const [travelsSeries, setTravelSeries] = useState([]);
	const [map, setMap] = useState(null);
	const [socket, setSocket] = useState(null);
	const [center, setCenter] = useState(null);
	const [closeDrivers, setCloseDrivers] = useState([]);
	const [closeInTripDrivers, setCloseInTripDrivers] = useState([]);
	// const getDashboardData = async () => {
	// 	// const resDashboardData = await api.get.dashboardData();
	// 	// const resSuperAgentDashboard = await api.get.superAgentDashboardData();
	// 	// if (Cookies.get(constants.USER_TYPE) === "SUPER_AGENT") {
	// 	// 	setDashboardData(resSuperAgentDashboard);
	// 	// } else if (Cookies.get(constants.USER_TYPE) === "ADMIN") {
	// 	// 	setDashboardData(resDashboardData);
	// 	// }
	// 	let newPassengersSeries = [];
	// 	let newDriversSeries = [];
	// 	let newAgentsSeries = [];
	// 	let newSuperAgentsSeries = [];
	// 	let newPassengerLastMonthSeries = [];
	// 	let newPassengerLastMonthCats = [];

	// 	let newDriverLastMonthSeries = [];
	// 	let newDriverLastMonthCats = [];
	// 	resDashboardData.passengerSignupLastMonth.map((p) => newPassengersSeries.push(p.count));
	// 	resDashboardData.driverSignupLastMonth.map((p) => newDriversSeries.push(p.count));
	// 	resDashboardData.driverSignupLastMonth.map((p) => newAgentsSeries.push(p.count));
	// 	resDashboardData.passengerSignupLastMonth.map((p) => newSuperAgentsSeries.push(p.count));
	// 	resDashboardData.travelsLastMonth.map((p) => {
	// 		travelsSeries.push(p.count);
	// 		travelsCats.push(p.Date);
	// 	});

	// 	resDashboardData.driverPersentStats.map((p, index) => {
	// 		setDriverPercentSeries((prev) => [...prev, (index + 1) * 10]);
	// 		setDriverPercentCats([...driverPercentCats, p.name + index]);
	// 		return null;
	// 	});
	// 	resDashboardData.passengerSignupLastMonth.map((p) => {
	// 		newPassengerLastMonthSeries.push(p.count);
	// 		newPassengerLastMonthCats.push(moment(p.Date).format("jYYYY-jMM-jDD"));
	// 	});
	// 	resDashboardData.driverSignupLastMonth.map((p) => {
	// 		newDriverLastMonthSeries.push(p.count);
	// 		newDriverLastMonthCats.push(moment(p.Date).format("jYYYY-jMM-jDD"));
	// 	});
	// 	setUserSeries({
	// 		passengers: newPassengersSeries,
	// 		drivers: newDriversSeries,
	// 		agents: newAgentsSeries,
	// 		superAgents: newSuperAgentsSeries,
	// 	});
	// 	setPassengerLastMonth({
	// 		series: newPassengerLastMonthSeries,
	// 		cats: newPassengerLastMonthCats,
	// 	});
	// 	setDriverLastMonth({
	// 		series: newDriverLastMonthSeries,
	// 		cats: newDriverLastMonthCats,
	// 	});
	// 	setIsLoading(false);
	// };

	const ConnectSocket = () => {
		setSocket(useSocket());
	};

	const getCloseDriver = (_center) => {
		if (_center) {
			const loc = {
				lat: _center.lat,
				long: _center.lng,
			};

			socket &&
				socket.emit("getMyCloseDrivers", loc, async (arg1, arg2) => {
					if (arg2) {
						setCloseDrivers(arg2.result.drivers);
					}
				});
		}
	};

	const type = Cookies.get(constants.USER_TYPE);

	useEffect(() => {
		ConnectSocket();
		// getDashboardData();
	}, []);

	map && map.on("moveend", (e) => setCenter(map.getCenter()));

	useEffect(() => {
		getCloseDriver(map && map.getCenter());
	}, [center]);

	useEffect(() => {
		map && setCenter(map.getCenter());
	}, [map]);
	const iconDriver = new Leaflet.Icon({
		iconUrl: require("../../assets/Images/map-pin.png"),
		iconRetinaUrl: require("../../assets/Images/map-pin.png"),
		iconSize: [24, 24],
		iconAnchor: [12, 24],
		className: "icon-marker",
	});
	const inServiceDriverIcon = new Leaflet.Icon({
		iconUrl: require("../../assets/Images/car-pin8.png"),
		iconRetinaUrl: require("../../assets/Images/car-pin8.png"),
		iconSize: [24, 24],
		iconAnchor: [12, 24],
		className: "icon-marker",
	});
	const freeDriverIcon = new Leaflet.Icon({
		iconUrl: require("../../assets/Images/car-pin4.png"),
		iconRetinaUrl: require("../../assets/Images/car-pin4.png"),
		iconSize: [24, 24],
		iconAnchor: [12, 24],
		className: "icon-marker",
	});

	return (
		<div className='container'>
			<div id='dashboard-container'>
				{type === "ADMIN" && (
					<section className='top-chart-container'>
						<div
							className='row'
							style={{ display: "flex", justifyContent: "space-evenly" }}
						>
							<div className='col-11 col-md-5 col-lg-3 center-all'>
								<div className='box-chart-holder'>
									{/* <BoxChartWithNumber
                    name={"مسافران"}
                    counter={dashboardData?.usersCount?.countPassenger}
                    isLoading={isLoading}
                    series={userSeries?.passengers}
                    backgroundColor={["#0396ff", "#abdcff"]}
                  /> */}
								</div>
							</div>
							<div className='col-11 col-md-5 col-lg-3 center-all'>
								<div className='box-chart-holder'>
									{/* <BoxChartWithNumber
                    name={"رانندگان"}
                    isLoading={isLoading}
                    counter={dashboardData?.usersCount?.countDriver}
                    series={userSeries.drivers}
                    backgroundColor={["#FD6585", "#FFD3A5"]}
                  /> */}
								</div>
							</div>

							<div className='col-11 col-md-5 col-lg-3 center-all'>
								<div className='box-chart-holder'>
									{/* <BoxChartWithNumber
                    isLoading={isLoading}
                    name={"آژانس ها"}
                    counter={dashboardData?.usersCount?.countAgent}
                    series={userSeries.agents}
                    backgroundColor={["#4C83FF", "#2AFADF"]}
                  /> */}
								</div>
							</div>
							<div className='col-11 col-md-5 col-lg-3 center-all'>
								<div className='box-chart-holder'>
									{/* <BoxChartWithNumber
                    isLoading={isLoading}
                    name={"اتحادیه ها"}
                    counter={dashboardData?.usersCount?.countSuperAgent}
                    series={userSeries.superAgents}
                    backgroundColor={["#5961F9", "#EE9AE5"]}
                  /> */}
								</div>
							</div>
						</div>
					</section>
				)}
				{type === "SUPER_AGENT" && (
					<section className='top-chart-container'>
						<div
							className='row'
							style={{ display: "flex", justifyContent: "space-evenly" }}
						>
							<div className='col-11 col-md-5 col-lg-3 center-all'>
								<div className='box-chart-holder'>
									{/* <BoxChartWithNumber
                    name={"رانندگان"}
                    isLoading={isLoading}
                    counter={dashboardData?.usersCount?.countDriver}
                    series={userSeries.drivers}
                    backgroundColor={["#FD6585", "#FFD3A5"]}
                  /> */}
								</div>
							</div>

							<div className='col-11 col-md-5 col-lg-3 center-all'>
								<div className='box-chart-holder'>
									{/* <BoxChartWithNumber
                    isLoading={isLoading}
                    name={"آژانس ها"}
                    counter={dashboardData?.usersCount?.countAgent}
                    series={userSeries.agents}
                    backgroundColor={["#4C83FF", "#2AFADF"]}
                  /> */}
								</div>
							</div>
						</div>
					</section>
				)}
				<div className='container'>
					<section className='map-driver-container '>
						{console.log({
							1: Cookies.get(constants.USER_TYPE) === "SUPER_AGENT",
							2: Cookies.get(constants.USER_COORDINATES_LATITUDE) !== "",
						})}
						<MapContainer
							ref={setMap}
							center={
								Cookies.get(constants.USER_TYPE) === "SUPER_AGENT" &&
								Cookies.get(constants.USER_COORDINATES_LATITUDE) !== ""
									? [
											Cookies.get(constants.USER_COORDINATES_LATITUDE),
											Cookies.get(constants.USER_COORDINATES_LONGITUDE),
									  ]
									: [36.92448, 50.641372]
							}
							zoom={14}
							scrollWheelZoom={false}
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
							/>
							{closeDrivers.map(({ coordinates, member }) => {
								console.log({ member });
								return (
									<Marker
										position={{
											lat: coordinates.latitude,
											lng: coordinates.longitude,
										}}
										icon={member.inTrip ? inServiceDriverIcon : freeDriverIcon}
									>
										<Popup>
											<UserInformation
												avatar={member.avatar}
												firstName={member.firstName}
												lastName={member.lastName}
												phoneNumber={member.phoneNumber}
												agentName={member.agentName}
											/>
										</Popup>
									</Marker>
								);
							})}
						</MapContainer>
					</section>
				</div>
				<div className='column-last-sign-up-users row  '>
					<div className='col-11 col-md-11 col-lg-6'>
						<Column
							isLoading={isLoading}
							chartHeader={"نمودار رانندگان ثبت نامی یک ماه گذشته"}
							series={driverLastMonth.series}
							cats={driverLastMonth.cats}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardScreen;
