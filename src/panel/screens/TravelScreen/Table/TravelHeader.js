import React from "react";

const TravelHeader = () => {
  const headers = [
    "تاریخ",
    "شهر",
    "هزینه (تومان)",
    "مسافر",
    "راننده",
    "آژانس",
    "وضعیت سفر",
    "درخواست دهنده",
    "نوع پرداخت",
  ];
  return (
    <thead className="thead">
      <tr className="thead_row">
        {headers.map((head, index) => {
          return (
            <th key={`${head}--${index}`} className="thead_cels">
              <p> {head}</p>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TravelHeader;
