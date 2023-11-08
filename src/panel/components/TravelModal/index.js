import React, { memo } from "react";
import TableButtons from "../TableButtons";
import "./index.scss";

const TravelModal = ({ data, TableButtonsIsShow }) => {
	return (
		<div className='Travelmodal'>
			<div className='Modal_background'>
				<div className='Table_wrapper'>
					<table className='table'>
						<thead className='thead'>
							<tr className='thead_row'>
								<th className='Travelthead_cels'>کمترین مسافت</th>
								<th className='Travelthead_cels'>شروع قیمت {"(تومان)"}</th>
								<th className='Travelthead_cels'>دقیقه اضافه</th>
								<th className='Travelthead_cels'>ضریب سال</th>
								<th className='Travelthead_cels'>نسبت ترافیک</th>
								<th className='Travelthead_cels'>کیلومتر اضافه {"(تومان)"}</th>
								<th className='Travelthead_cels'></th>
							</tr>
						</thead>
						<tbody className='tbody'>
							<tr className='table_body_row'>
								<td className='table_body_d center d-flex'>
									<div>{data.leastDist}</div>
								</td>
								<td className='table_body_d'>
									{data.startCost
										? parseInt(data.startCost).toLocaleString()
										: null}
								</td>
								<td className='table_body_d'>
									{data.perExtraMin
										? parseInt(data.perExtraMin).toLocaleString()
										: null}
								</td>
								<td className='table_body_d'>{data.formulaRatio}</td>
								<td className='table_body_d'>{data.ratioConstant}</td>
								<td className='table_body_d'>
									{data.costForExtraKm
										? parseInt(data.costForExtraKm).toLocaleString()
										: null}
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
	);
};

export default memo(TravelModal);
