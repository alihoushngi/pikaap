import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { SelectRadio } from "..";
import { constants } from "../../values";
import "./index.scss";

const AgentReceiptModal = ({ userName, driverId, receiverType, ownerType }) => {
  const reasonList = [
    {
      label: "افزایش موجودی",
      value: "CHARGE_WALLET",
      id: "ChargeWallet",
    },
  ];

  const pay = [
    {
      label: "کارت به کارت",
      value: "BANK_CARD",
      id: "card",
    },
    {
      label: "دستگاه پوز",
      value: "POS",
      id: "pos",
    },
    {
      label: "نقدی",
      value: "BANK_ACC",
      id: "acc",
    },
  ];
  const userId = Cookies.get(constants.USER_ID);
  const userType = Cookies.get(constants.USER_TYPE);
  const [selectedReason, setSelectedReason] = useState("CHARGE_WALLET");
  const [selectedPayType, setSelectedPayType] = useState("BANK_CARD");
  const [invoiceData, setInvoiceData] = useState({
    payType: "",
    trackingCode: "",
    creator: userId,
    creatorType: userType,
    receiver: driverId,
    receiverType: "AGENT",
    amount: "",
    reason: "CHARGE_WALLET",
    ownerType: ownerType,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const newInvoiceData = {
      ...invoiceData,
      payType: selectedPayType,
      reason: selectedReason,
    };
    const resSubmitInvoice = await api.post.postCreateInvoice(newInvoiceData);
    if (resSubmitInvoice) window.location.reload();
  };

  const reasonHandler = (value) => {
    setSelectedReason(value);
  };

  return (
    <React.Fragment>
      <h5 className="FormTitel">{userName}</h5>
      <form className="Form">
        <SelectRadio
          item={reasonList}
          onRadioChange={reasonHandler}
          currentSelected={selectedReason}
          id={`reason-${driverId}`}
          name={`reason-${driverId}`}
        />
        <div className="input-group">
          <input
            id="amount"
            className="Form_input"
            type="number"
            placeholder="مقدار و قیمت فیش"
            value={invoiceData.amount.toLocaleString()}
            onChange={(e) => {
              e.target.value.length <= 9 && setInvoiceData({ ...invoiceData, amount: e.target.value });
            }}
          />
          <label htmlFor="amount" className="Input-label">
            تومان
          </label>
        </div>

        <div className="input-group">
          <input
            className="Form_input"
            type="number"
            placeholder="شناسه فیش"
            onChange={(e) => {
              e.target.value.length <= 12 &&
                setInvoiceData({
                  ...invoiceData,
                  trackingCode: e.target.value,
                });
            }}
          />
        </div>
        <SelectRadio
          item={pay}
          currentSelected={selectedPayType}
          onRadioChange={setSelectedPayType}
          id={`pay-${driverId}`}
          name={`pay-${driverId}`}
        />
      </form>
      <button className="Form_submit" onClick={submitHandler}>
        ثبت فیش
      </button>
    </React.Fragment>
  );
};

export default AgentReceiptModal;
