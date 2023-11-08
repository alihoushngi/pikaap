import React, { memo } from "react";
import "./index.scss";
const Pagination = ({ data, onPaginateClick }) => {
	const { page, totalPages } = data;
	return (
		<React.Fragment>
			{totalPages > 1 && (
				<ul id='custom-pagination'>
					{parseInt(page) >= 3 && (
						<li className='first' onClick={() => onPaginateClick(1)}>
							{1}
						</li>
					)}
					{parseInt(page) >= 4 && (
						<li className='first' style={{ cursor: "not-allowed" }}>
							{"..."}
						</li>
					)}
					{parseInt(page) > 1 && (
						<li
							className='prev-page'
							onClick={() => onPaginateClick(parseInt(page) - 1)}
						>
							{parseInt(page) - 1}
						</li>
					)}
					<li
						className='current-page active'
						onClick={() => onPaginateClick(parseInt(page))}
					>
						{page}
					</li>
					{parseInt(page) < parseInt(totalPages) && (
						<li
							className='next-page'
							onClick={() => onPaginateClick(parseInt(page) + 1)}
						>
							{parseInt(page) + 1}
						</li>
					)}
					{parseInt(page) + 3 <= parseInt(totalPages) && (
						<li className='last-page' style={{ cursor: "not-allowed" }}>
							{"..."}
						</li>
					)}
					{parseInt(page) + 2 <= parseInt(totalPages) && (
						<li
							className='last-page'
							onClick={() => onPaginateClick(parseInt(totalPages))}
						>
							{totalPages}
						</li>
					)}
				</ul>
			)}
		</React.Fragment>
	);
};

export default memo(Pagination);
