import React from "react";

const TransactionHeader = () => {
	const headers = [
		"تاریخ",
		"پرداخت کننده",
		"دریافت کننده",
		"مقدار ( تومان)",
		"علت تراکنش",
		"ماهیت",
		"آنلاین",
		"کد رهگیری",
		"وضعیت تراکنش",
	];
	return (
		<thead className='thead'>
			<tr className='thead_row'>
				{headers.map((head, index) => {
					return (
						<th key={`${head}--${index}`} className='thead_cels'>
							{head}
						</th>
					);
				})}
			</tr>
		</thead>
	);
};

export default TransactionHeader;
