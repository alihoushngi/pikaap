import React, { useEffect, useState } from "react";
import Body from "./Body";
import api from "../../../api";
import Pagination from "../../../components/Pagination";
import { Loading } from "../../../components";
import TravelHeader from "./TravelHeader";
const TravelTable = () => {
	const [travels, setTravels] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const getTravels = async (_page) => {
		const _travels = await api.get.getTravels({ page: _page });
		setTravels(_travels.docs);
		setTotalPages(_travels.totalPages);
		setIsLoading(false);
	};

	useEffect(() => {
		setIsLoading(true);
		getTravels(page);
	}, [page]);

	return (
		<div className='Table_wrapper'>
			{isLoading ? (
				<div className='loading-container'>
					<Loading />
				</div>
			) : (
				<>
					<table className='table'>
						<TravelHeader />
						<Body data={travels} />
					</table>
					<Pagination
						data={{ page, totalPages }}
						onPaginateClick={(page) => setPage(page)}
					/>
				</>
			)}
		</div>
	);
};

export default TravelTable;
