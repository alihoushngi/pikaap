import React, { memo, useEffect, useState } from "react";
import { formatPhoneNumber } from "../../../helpers/function";
import regexes from "../../validation/regexes";
import persianRex from "persian-rex";

import api from "../../api";
import {
  CreateModal,
  DeleteModal,
  DropDown2,
  ModalTable,
  SearchInput,
  SelectRadio,
  TableAssets,
  SuperAgentReceiptModal,
  Toastify,
} from "../../components";
import Modal from "../Modal";
import Pagination from "../Pagination";
import TableButtons from "../TableButtons";
import TravelModal from "../TravelModal";
import "./index.scss";

const SuperAgentDataTabel = ({ groupName, name }) => {
  const [superAgent, setSuperAgent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const [citise, setCitise] = useState();
  const [isBlock, setIsBlock] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletedIndex, setDeletedIndex] = useState();
  const [superAgentPut, setSuperAgentPut] = useState({});
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

  const [financialGroup, setFinancialGroup] = useState();
  const [travelGroup, setTravelGroup] = useState();

  useEffect(() => {
    setIsLoading(true);
    filterData();
    // ! financial Group
    api.get.getFinancialGroups().then((res) => {
      setFinancialGroup(
        res.result.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        })
      );
    });
    // ! financial Group

    // ! travel Group
    api.get.getTravelGroup().then((res) => {
      setTravelGroup(
        res.result.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        })
      );
    });

    // ! travel Group
  }, [page, selectedCity, isBlock, searchValue]);

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

  const handleAllChecked = (event) => {
    if (event.target.checked) {
      const allItems = [];
      superAgent.docs.map((all) => allItems.push(all._id));
      setIsAllChecked(true);
      setSelected(allItems);
    } else {
      setIsAllChecked(false);
      setSelected([]);
    }
  };

  const superAgentDeleteHandler = (id) => {
    const data = {
      id,
    };
    api.Delete.deleteSuperAgentById({ data }).then(() => {
      window.location.reload();
    });
  };

  const superAgentUpdateHandler = (id) => {
    api.put.putSuperAgent(superAgentPut, id).then((res) => {
      console.log({ res });
      window.location.reload();
    });
  };

  const handleChecked = (id, e) => {
    if (e.target.checked) {
      setSelected((prev) => [...prev, id]);
    } else {
      setSelected((prev) => prev.filter((item) => item !== id));
      setIsAllChecked(false);
    }
  };

  const OpenIcone = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="10px" height="10px">
        <path d="M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM502.6 9.367C496.8 3.578 488.8 0 480 0h-160c-17.67 0-31.1 14.32-31.1 31.1c0 17.67 14.32 31.1 31.99 31.1h82.75L178.7 290.7c-12.5 12.5-12.5 32.76 0 45.26C191.2 348.5 211.5 348.5 224 336l224-226.8V192c0 17.67 14.33 31.1 31.1 31.1S512 209.7 512 192V31.1C512 23.16 508.4 15.16 502.6 9.367z" />
      </svg>
    );
  };
  const CloseIcone = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
      </svg>
    );
  };

  const firstItemSort = [
    {
      label: "فعال",
      value: false,
      id: "active",
    },
    {
      label: "غیر فعال",
      value: true,
      id: "deactive",
    },
  ];

  const reasonHandler = (value) => {
    setIsBlock(value === "true");
  };

  const onCitySelected = (value) => {
    setSelectedCity(value.label);
  };

  const isBlockFields = () => (isBlock ? "IS_BLOCK" : null);
  const isBlockValue = () => (isBlock ? true : false);

  const isCityFields = () => (selectedCity ? "CITY" : null);
  const isCityValue = () => (selectedCity ? selectedCity : null);

  const filterData = async () => {
    let newBody;
    newBody = {
      filteredFields: [isBlockFields(), isCityFields()],
      filteredValues: [isBlockValue(), isCityValue()],
    };
    const filteredData = await api.post.postFilterSuperAgent({
      page,
      body: newBody,
      searchField: searchI,
      searchValue: searchValue,
    });
    setSuperAgent(filteredData);
    setBodyReq(newBody);
    setIsLoading(false);
    setTotalPages(filteredData.totalPages);
  };

  const reset = () => {
    window.location.reload();
  };

  const [searchI, setSearchI] = useState();

  const onSelectedSearchBase = (selectedItem) => {
    setSearchI(selectedItem.value);
  };
  console.log(superAgent);

  return (
    <>
      <div className="unioninformation">
        <TableAssets
          haveSearch={true}
          haveFilter={true}
          filterTitleData="مرتب سازی بر اساس  : "
          inputSelections={
            <div className="DropDownInputs">
              <SelectRadio
                item={firstItemSort}
                onRadioChange={reasonHandler}
                // currentSelected={selectedReason}
                id={`reason-${firstItemSort.map((item) => item.id)}`}
                name={`reason-${firstItemSort.map((item) => item.id)}`}
              />
            </div>
          }
          SearchSelection={
            <SearchInput
              onSelectedSearchBase={onSelectedSearchBase}
              badgeText={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#92929f" width="22" height="22">
                  <defs>
                    <style>{`.fa-secondary{opacity:.4}`}</style>
                  </defs>
                  <path
                    className="fa-primary"
                    d="M500.3 443.7l-119.7-119.7c-15.03 22.3-34.26 41.54-56.57 56.57l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7z"
                  />
                  <path
                    className="fa-secondary"
                    d="M207.1 0C93.12 0-.0002 93.13-.0002 208S93.12 416 207.1 416s208-93.13 208-208S322.9 0 207.1 0zM207.1 336c-70.58 0-128-57.42-128-128c0-70.58 57.42-128 128-128s128 57.42 128 128C335.1 278.6 278.6 336 207.1 336z"
                  />
                </svg>
              }
              placeHolder="جستجو ... "
              value={searchValue}
              searchFildName={groupName}
              UserName="SUPER_AGENT_NAME"
              codeName="SUPER_AGENT_CODE"
              SearchOnChange={(e) => setSearchValue(e.target.value)}
            />
          }
          SearchTitleData={`جستجو ${groupName} : `}
          mainData={
            <div className="main-filterDropDown">
              <div className="inputWrapper">
                <DropDown2
                  data={province}
                  onSelected={(val) => {
                    getCityHandler(val);
                  }}
                  labelName="استان"
                />
              </div>
              <div className="inputWrapper">
                <DropDown2 data={citise} onSelected={onCitySelected} labelName="شهر" />
              </div>
            </div>
          }
          footerData={
            <button className="Filterbutton reset" style={{ textDecoration: "none", color: "#0c0c0c" }} onClick={reset}>
              تنطیم مجدد
            </button>
          }
          childern={
            <CreateModal
              type="SuperAgent"
              buttonType="button"
              openButtonClass="button addButton"
              openButtonContent="افزودن"
              modalTitle={name}
              exitButtonContent="X"
            ></CreateModal>
          }
        />
        {isLoading && <span>Loading</span>}
        {isError && "مشکلی پیش اومده"}
        {superAgent && (
          <div className="Table_wrapper">
            <>
              <table className="table">
                <thead className="thead">
                  <tr className="thead_row">
                    <th className="thead_cels">نام {groupName}</th>
                    <th className="thead_cels">شماره تلفن</th>
                    <th className="thead_cels">گروه مالی</th>
                    <th className="thead_cels">گروه سفر</th>
                    <th className="thead_cels">استان</th>
                    <th className="thead_cels">شهر</th>
                    <th className="thead_cels">موجودی {"(تومان)"}</th>
                    <th className="thead_cels">ثبت فیش</th>
                    <th className="thead_cels"></th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {superAgent.docs.map((item, index) => {
                    return (
                      <tr className="table_body_row" key={item._id}>
                        <td className=" table_body_d center">
                          <div className="tbodyWrapper">
                            {/* <div className='tbody_imgWrapper'>
														<img src={image} alt='avatar' />
													</div> */}
                            <div>
                              <div>
                                {item.superAgentInformation.superAgentName ? (
                                  item.superAgentInformation.superAgentName
                                ) : (
                                  <span className="pending">نام اتحادیه وارد نشده</span>
                                )}
                              </div>
                              <div className="discription">
                                {item.superAgentInformation.code ? (
                                  item.superAgentInformation.code
                                ) : (
                                  <span className="pending">کد اتحادیه وارد نشده</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className=" table_body_d center">
                          {item.phoneNumber ? (
                            formatPhoneNumber(item.phoneNumber)
                          ) : (
                            <span className="pending">شماره تلفن وارد نشده</span>
                          )}
                        </td>
                        <td className=" table_body_d center">
                          <div className="tbodyfWrapper">
                            {item.superAgentInformation.financialGroup ? (
                              item.superAgentInformation.financialGroup.name
                            ) : (
                              <span className="pending">گروه مالی انتخاب نشده است</span>
                            )}
                            {item.superAgentInformation.financialGroup ? (
                              <Modal
                                openButtonClass="openButton"
                                buttonType="button"
                                modalId={`editModal${index}`}
                                openButtonContent={<OpenIcone />}
                                modalTitle={item.superAgentInformation.financialGroup.name}
                                exitButtonContent={<CloseIcone />}
                                modalFooter={
                                  <React.Fragment>
                                    <div
                                      style={{
                                        width: "90%",
                                        height: "0.1px",
                                        backgroundColor: "#323248",
                                        alignItems: "center",
                                        marginBottom: "1rem",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                      }}
                                    ></div>
                                    <div className="ModalFooterWrapper">
                                      <div className="TextWrapper">
                                        <div className="SvgWrapper">
                                          <div className="Svg">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="none">
                                              <defs>
                                                <style>{`.fa-secondary{opacity:.4}`}</style>
                                              </defs>
                                              <path
                                                className="fa-primary"
                                                d="M400 64H352V31.1C352 14.33 337.7 0 320 0S288 14.33 288 31.1V64H160V31.1C160 14.33 145.7 0 128 0S96 14.33 96 31.1V64H48C21.49 64 0 85.49 0 112V192h448V112C448 85.49 426.5 64 400 64z"
                                                fill="currentColor"
                                              />
                                              <path
                                                className="fa-secondary"
                                                d="M0 192v272C0 490.5 21.5 512 48 512h352c26.5 0 48-21.5 48-48V192H0zM128 432C128 440.8 120.8 448 112 448h-32C71.16 448 64 440.8 64 432v-32C64 391.2 71.16 384 80 384h32C120.8 384 128 391.2 128 400V432zM128 304C128 312.8 120.8 320 112 320h-32C71.16 320 64 312.8 64 304v-32C64 263.2 71.16 256 80 256h32C120.8 256 128 263.2 128 272V304zM256 432c0 8.836-7.162 16-16 16h-32C199.2 448 192 440.8 192 432v-32C192 391.2 199.2 384 208 384h32c8.838 0 16 7.164 16 16V432zM256 304c0 8.836-7.162 16-16 16h-32C199.2 320 192 312.8 192 304v-32C192 263.2 199.2 256 208 256h32C248.8 256 256 263.2 256 272V304zM384 432c0 8.836-7.162 16-16 16h-32c-8.836 0-16-7.164-16-16v-32c0-8.836 7.164-16 16-16h32c8.838 0 16 7.164 16 16V432zM384 304c0 8.836-7.162 16-16 16h-32C327.2 320 320 312.8 320 304v-32C320 263.2 327.2 256 336 256h32C376.8 256 384 263.2 384 272V304z"
                                                fill="currentColor"
                                              />
                                            </svg>
                                          </div>
                                        </div>
                                        <div className="Side">
                                          <span className="Up">
                                            {item.superAgentInformation.financialGroup.subscription.cycle} روز
                                          </span>
                                          <span className="Down">تعداد روزهای عضویت</span>
                                        </div>
                                      </div>
                                      <div className="TextWrapper">
                                        <div className="SvgWrapper2">
                                          <div className="Svg2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                              <defs>
                                                <style>{`.fa-secondary{opacity:.4}`}</style>
                                              </defs>
                                              <path
                                                className="fa-primary"
                                                d="M316.4 281.6h-9.242V201.1C307.2 196.5 302.7 192 297.2 192h-28.44C265.1 192 262.3 194.2 260.6 197.4L250.7 215.9c-1.555 3.109-1.398 6.844 .4629 9.801c1.713 2.801 4.982 4.666 8.4 4.666h9.275v51.2H259.6c-5.443 0-9.957 4.514-9.957 9.957v18.49C249.6 315.5 254.1 320 259.6 320h56.89c5.445 0 9.957-4.512 9.957-9.957V291.6C326.4 286.1 321.9 281.6 316.4 281.6zM559 54.5C524.1 38.25 489.2 32 454.3 32C343.5 32 232.5 94.38 121.7 94.38c-27.79 0-55.57-4-83.36-13.75C35.21 79.5 32.06 79 29.03 79C13.5 79 0 92.38 0 110.8v317.4c0 12.62 6.525 24.5 16.99 29.38C51.86 473.8 86.85 480 121.7 480c110.8 0 221.7-62.38 332.6-62.38c27.79 0 55.57 4 83.36 13.75c3.15 1.125 6.301 1.625 9.338 1.625C562.5 433 576 419.6 576 401.1V83.88C576 71.25 569.5 59.38 559 54.5zM528 320c-30.62 0-56.15 21.54-62.44 50.28c-3.799-.1289-7.42-.6543-11.28-.6543c-62.03 0-121.6 16.77-179.3 32.98C221.3 417.7 170.5 432 121.7 432c-6.389 0-12.27-1.089-18.4-1.597C103.5 428.3 104 426.2 104 424c0-32.61-24.47-59.22-56-63.19V192c30.62 0 56.15-21.54 62.44-50.28C114.2 141.8 117.9 142.4 121.7 142.4c62.03 0 121.6-16.77 179.3-32.98C354.7 94.28 405.5 80 454.3 80c6.389 0 12.27 1.089 18.4 1.597C472.5 83.73 472 85.8 472 88c0 32.61 24.47 59.22 56 63.19V320z"
                                                fill="currentColor"
                                              />
                                              <path
                                                className="fa-secondary"
                                                d="M472 88c0-2.195 .4505-4.268 .6751-6.403C466.5 81.09 460.7 80 454.3 80c-48.78 0-99.54 14.28-153.3 29.39C243.4 125.6 183.8 142.4 121.7 142.4c-3.863 0-7.482-.5254-11.28-.6543C104.2 170.5 78.63 192 48 192v168.8C79.53 364.8 104 391.4 104 424c0 2.195-.4505 4.268-.6751 6.403C109.5 430.9 115.3 432 121.7 432c48.78 0 99.54-14.28 153.3-29.39c57.64-16.21 117.2-32.98 179.3-32.98c3.861 0 7.482 .5254 11.28 .6543C471.8 341.5 497.4 320 528 320V151.2C496.5 147.2 472 120.6 472 88zM288 371.2c-53.02 0-96-51.58-96-115.2c0-63.62 42.98-115.2 96-115.2c53.02 0 96 51.58 96 115.2C384 319.6 341 371.2 288 371.2z"
                                                fill="currentColor"
                                              />
                                            </svg>
                                          </div>
                                        </div>
                                        <div className="Side">
                                          <span className="Up">
                                            {item.superAgentInformation.financialGroup.subscription.fee.toLocaleString()}{" "}
                                            تومان
                                          </span>
                                          <span className="Down">حق عضویت ماهانه</span>
                                        </div>
                                      </div>
                                    </div>
                                  </React.Fragment>
                                }
                              >
                                <ModalTable data={item.superAgentInformation.financialGroup} />
                              </Modal>
                            ) : null}
                          </div>
                        </td>
                        <td className=" table_body_d center">
                          <div className="tbodyfWrapper">
                            {item.superAgentInformation.travelGroup ? (
                              item.superAgentInformation.travelGroup.name
                            ) : (
                              <span className="pending">گروه سفر وارد نشده است</span>
                            )}
                            {item.superAgentInformation.travelGroup ? (
                              <Modal
                                openButtonClass="openButton"
                                buttonType="button"
                                modalId={`editModal${index}`}
                                openButtonContent={<OpenIcone />}
                                modalTitle={item.superAgentInformation.travelGroup.name}
                                exitButtonContent={<CloseIcone />}
                              >
                                <TravelModal data={item.superAgentInformation.travelGroup} />
                              </Modal>
                            ) : null}
                          </div>
                        </td>
                        <td className=" table_body_d center">
                          <div className="tbodyfWrapper">
                            {item.superAgentInformation.province ? (
                              item.superAgentInformation.province
                            ) : (
                              <span className="pending">استان ثبت نشده است</span>
                            )}
                          </div>
                        </td>
                        <td className=" table_body_d center">
                          <div className="tbodyfWrapper">
                            {item.superAgentInformation.city ? (
                              item.superAgentInformation.city
                            ) : (
                              <span className="pending">شهر ثبت نشده است</span>
                            )}
                          </div>
                        </td>
                        <td className=" table_body_d center">{item.balance.toLocaleString()}</td>
                        <td className=" table_body_d center">
                          <div className="tbody_fWrapper" style={{ position: "unset" }}>
                            {/* {item.driverInformation.travelGroup.name} */}
                            <Modal
                              openButtonClass="openButton"
                              buttonType="button"
                              modalId={`editModal${index}`}
                              openButtonContent={<OpenIcone />}
                              modalTitle="ثبت فیش"
                            >
                              <SuperAgentReceiptModal
                                userName={item.agentInformation.agentName}
                                driverId={item._id}
                                ownerType="SUPER_AGENT"
                              />
                            </Modal>
                          </div>
                        </td>
                        <td className=" table_body_d center direction">
                          <TableButtons
                            editModal={true}
                            item={item}
                            deleteButtonClick={(it) => {
                              superAgentDeleteHandler(superAgent.docs[deletedIndex]._id);
                            }}
                            putUser={() => {
                              superAgentUpdateHandler(superAgent.docs[deletedIndex]._id);
                            }}
                            isDeleteModalOpen={isDeleteModalOpen}
                            onDeleteCancelModal={() => setIsDeleteModalOpen(false)}
                            onDeleteModalOpen={() => {
                              setDeletedIndex(index);
                              setIsDeleteModalOpen(true);
                            }}
                            isEditModalOpen={isEditModalOpen}
                            onCancelModal={() => setIsEditModalOpen(false)}
                            onModalOpen={() => {
                              setDeletedIndex(index);
                              setIsEditModalOpen(true);
                              setSuperAgentPut({
                                ...superAgentPut,
                                phoneNumber: superAgent.docs[index].phoneNumber,
                                agentName: superAgent.docs[index].agentInformation.agentName,
                                firstName: superAgent.docs[index].firstName,
                                lastName: superAgent.docs[index].lastName,
                                nationalCode: superAgent.docs[index].superAgentInformation.nationalCode,
                                code: superAgent.docs[index].superAgentInformation.code,
                                shabaNumber: superAgent.docs[index].financial.shabaNumber,
                                kartNumber: superAgent.docs[index].financial.kartNumber,
                                address: superAgent.docs[index].superAgentInformation.address,
                                superAgentName: superAgent.docs[index].superAgentInformation.superAgentName,
                                city: superAgent.docs[index].superAgentInformation.city,
                                province: superAgent.docs[index].superAgentInformation.province,
                                financialGroup: superAgent.docs[index].superAgentInformation.financialGroup._id,
                                travelGroup: superAgent.docs[index].superAgentInformation.travelGroup._id,
                              });
                            }}
                            userName={item.superAgentInformation.superAgentName}
                            editChildren={
                              <div className="form edit-form">
                                <div className="inputWrapper">
                                  <label htmlFor="PhoneNumber" className="label">
                                    <span className="">شماره همراه</span>
                                  </label>
                                  <input
                                    className="form-input"
                                    style={{ direction: "ltr" }}
                                    name="PhoneNumber"
                                    minLength={11}
                                    maxLength={11}
                                    autoComplete="off"
                                    value={superAgentPut.phoneNumber}
                                    placeholder={item.phoneNumber}
                                    onChange={(e) => {
                                      if (e.target.value.match(regexes.numberRegex) || e.target.value === "") {
                                        e.target.value.length <= 11 &&
                                          setSuperAgentPut({
                                            ...superAgentPut,
                                            phoneNumber: e.target.value,
                                          });
                                      } else {
                                        Toastify("error", "فقط عدد وارد کنید", "phone-numbersd");
                                      }
                                    }}
                                  />
                                </div>
                                <div className="inputWrapper">
                                  <label htmlFor="superAgentName" className="label">
                                    <span className="">نام اتحادیه</span>
                                  </label>
                                  <input
                                    className="form-input"
                                    name="superAgentName"
                                    type="text"
                                    maxLength={20}
                                    autoComplete="off"
                                    value={superAgentPut.superAgentName}
                                    placeholder={item.superAgentInformation.superAgentName}
                                    onChange={(e) => {
                                      if (persianRex.text.test(e.target.value) || e.target.value === "") {
                                        setSuperAgentPut({
                                          ...superAgentPut,
                                          superAgentName: e.target.value,
                                        });
                                      } else {
                                        Toastify("error", "فقط حروف فارسی مجاز هستند", "sua-name");
                                      }
                                    }}
                                  />
                                </div>

                                <div className="inputWrapper">
                                  <label htmlFor="Name" className="label">
                                    <span className="">نام</span>
                                  </label>
                                  <input
                                    className="form-input"
                                    name="Name"
                                    type="text"
                                    maxLength={20}
                                    autoComplete="off"
                                    value={superAgentPut.firstName}
                                    placeholder={item.firstName}
                                    onChange={(e) => {
                                      if (persianRex.text.test(e.target.value) || e.target.value === "") {
                                        setSuperAgentPut({
                                          ...superAgentPut,
                                          firstName: e.target.value,
                                        });
                                      } else {
                                        Toastify("error", "فقط حروف فارسی مجاز هستند", "name");
                                      }
                                    }}
                                  />
                                </div>
                                <div className="inputWrapper">
                                  <label htmlFor="familyName" className="label">
                                    <span className="">نام خانوادگی</span>
                                  </label>
                                  <input
                                    className="form-input"
                                    name="familyName"
                                    type="text"
                                    maxLength={20}
                                    autoComplete="off"
                                    value={superAgentPut.lastName}
                                    placeholder={item.lastName}
                                    onChange={(e) => {
                                      if (persianRex.text.test(e.target.value) || e.target.value === "") {
                                        setSuperAgentPut({
                                          ...superAgentPut,
                                          lastName: e.target.value,
                                        });
                                      } else {
                                        Toastify("error", "فقط حروف فارسی مجاز هستند", "lname");
                                      }
                                    }}
                                  />
                                </div>
                                <div className="inputWrapper">
                                  <DropDown2
                                    data={province}
                                    defaultItem={{
                                      label: superAgentPut.province,
                                      value: superAgentPut.province,
                                    }}
                                    onSelected={(val) => {
                                      getCityHandler(val);
                                    }}
                                    labelName="استان"
                                  />
                                </div>
                                <div className="inputWrapper">
                                  <DropDown2
                                    data={citise}
                                    labelName="شهر"
                                    defaultItem={{
                                      label: superAgentPut.city,
                                      value: superAgentPut.city,
                                    }}
                                    onSelected={(val) =>
                                      setSuperAgentPut({
                                        ...superAgentPut,
                                        city: val.label,
                                      })
                                    }
                                  />
                                </div>
                                <div className="inputWrapper">
                                  <DropDown2
                                    data={financialGroup}
                                    defaultItem={{
                                      label: superAgentPut.financialGroup,
                                      value: superAgentPut.financialGroup,
                                    }}
                                    onSelected={(val) => {
                                      setSuperAgentPut({
                                        ...superAgentPut,
                                        financialGroup: val.value,
                                      });
                                    }}
                                    labelName="گروه مالی"
                                  />
                                </div>
                                <div className="inputWrapper">
                                  <DropDown2
                                    data={travelGroup}
                                    defaultItem={{
                                      label: superAgentPut.travelGroup,
                                      value: superAgentPut.travelGroup,
                                    }}
                                    onSelected={(val) => {
                                      setSuperAgentPut({
                                        ...superAgentPut,
                                        travelGroup: val.value,
                                      });
                                    }}
                                    labelName="گروه سفر"
                                  />
                                </div>

                                <div className="inputWrapper">
                                  <label htmlFor="cart" className="label">
                                    <span className="">کد ملی</span>
                                  </label>
                                  <input
                                    className="form-input"
                                    name="cart"
                                    type="number"
                                    maxLength={26}
                                    autoComplete="off"
                                    value={superAgentPut.nationalCode}
                                    placeholder={item.superAgentInformation.nationalCode}
                                    onChange={(e) => {
                                      if (regexes.numberRegex.test(e.target.value) || e.target.value === "") {
                                        e.target.value.length <= 10 &&
                                          setSuperAgentPut({
                                            ...superAgentPut,
                                            nationalCode: e.target.value,
                                          });
                                      } else {
                                        Toastify("error", "فقط اعداد مجاز هستند", "code-meli");
                                      }
                                    }}
                                  />
                                </div>
                                <div className="inputWrapper">
                                  <label htmlFor="cart" className="label">
                                    <span className="">کد اتحادیه</span>
                                  </label>
                                  <input
                                    className="form-input"
                                    name="cart"
                                    type="number"
                                    autoComplete="off"
                                    value={superAgentPut.code}
                                    onChange={(e) =>
                                      e.target.value.length <= 6 &&
                                      setSuperAgentPut({
                                        ...superAgentPut,
                                        code: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="inputWrapper">
                                  <label htmlFor="shaba" className="label">
                                    <span className="">شماره شبا </span>
                                  </label>
                                  <input
                                    className="form-input"
                                    type="number"
                                    name="shaba"
                                    autoComplete="off"
                                    placeholder={item.financial.shabaNumber}
                                    value={superAgentPut.shabaNumber}
                                    onChange={(e) =>
                                      e.target.value.length <= 24 &&
                                      setSuperAgentPut({
                                        ...superAgentPut,
                                        shabaNumber: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="inputWrapper">
                                  <label htmlFor="cart" className="label">
                                    <span className="">شماره کارت </span>
                                  </label>
                                  <input
                                    className="form-input"
                                    name="cart"
                                    type="number"
                                    autoComplete="off"
                                    value={superAgentPut.kartNumber}
                                    placeholder={item.financial.kartNumber}
                                    onChange={(e) =>
                                      e.target.value.length <= 16 &&
                                      setSuperAgentPut({
                                        ...superAgentPut,
                                        kartNumber: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="inputWrapper">
                                  <label htmlFor="cart" className="label">
                                    <span className="">آدرس</span>
                                  </label>
                                  <input
                                    className="form-input"
                                    name="cart"
                                    type="text"
                                    maxLength={35}
                                    autoComplete="off"
                                    value={superAgentPut.address}
                                    placeholder={item.superAgentInformation.address}
                                    onChange={(val) => {
                                      setSuperAgentPut({
                                        ...superAgentPut,
                                        address: val.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                data={{ page, totalPages: superAgent.totalPages }}
                onPaginateClick={(_page) => setPage(_page)}
              />
            </>

            <div style={{ width: "fit-content" }}>
              {isAllChecked ? <DeleteModal modalTitle="آیا مطمئنید که تمامی داده ها حذف بشوند؟" /> : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(SuperAgentDataTabel);
