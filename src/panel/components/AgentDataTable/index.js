import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { cc_format, formatPhoneNumber } from "../../../helpers/function";
import api from "../../api";
import {
  CreateModal,
  DeleteModal,
  DropDown2,
  ModalTable,
  SearchInput,
  SelectRadio,
  AgentReceiptModal,
  TableAssets,
} from "../../components";
import { constants } from "../../values";
import Modal from "../Modal";
import Pagination from "../Pagination";
import TableButtons from "../TableButtons";
import TravelModal from "../TravelModal";

const AgentDataTable = ({ groupName, name }) => {
  const [agent, setAgent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletedIndex, setDeletedIndex] = useState();
  const [isError, setIsError] = useState(null);
  const [page, setPage] = useState(1);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const [citise, setCitise] = useState();
  const [isBlock, setIsBlock] = useState(null);
  const [isApproved, setIsApproved] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSuperAgent, setSelectedSuperAgent] = useState(null);
  const [superAgentList, setSuperAgentList] = useState([]);
  const [isSuperAgentLoading, setIsSuperAgentLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchI, setSearchI] = useState();
  const [agentPut, setAgentPut] = useState({});
  const [financialGroup, setFinancialGroup] = useState();
  const [travelGroup, setTravelGroup] = useState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [agentPutNew, setAgentPutNew] = useState(null);
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
    api.get.getSuperAgent({ page }).then(async (res) => {
      let newAgentList = [];
      for (let i = 0; i < res.result.docs.length; i++) {
        newAgentList.push({
          label: res.result.docs[i].superAgentInformation.superAgentName,
          value: res.result.docs[i]._id,
        });
      }
      setSuperAgentList(newAgentList);
      setIsSuperAgentLoading(true);
    });
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
  }, [page, selectedCity, isBlock, selectedSuperAgent, searchValue]);

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
      label: "فعال",
      value: true,
      id: "active",
    },
    {
      label: "غیر فعال",
      value: false,
      id: "deactive",
    },
  ];

  const isApprovedFilterItem = [
    {
      label: "تایید نشده",
      value: false,
      id: "NOT_APPROVED",
    },
    {
      label: "تایید شده",
      value: true,
      id: "APPROVED",
    },
  ];

  const reasonHandler = (value) => {
    setIsBlock(value !== "true");
  };

  const onCitySelected = (value) => {
    setSelectedCity(value.label);
  };
  const onSuperAgentSelected = (value) => {
    setSelectedSuperAgent(value.value);
  };

  const isBlockFields = () => (isBlock ? "IS_BLOCK" : null);
  const isBlockValue = () => (isBlock ? true : false);

  const isCityFields = () => (selectedCity ? "CITY" : null);
  const isCityValue = () => (selectedCity ? selectedCity : null);

  const isSuperAgentField = () => (selectedSuperAgent ? "SUPER_AGENT" : null);
  const isSuperAgentValue = () => (selectedSuperAgent ? selectedSuperAgent : null);

  const filterData = async () => {
    let newBody;
    newBody = {
      filteredFields: [isBlockFields(), isCityFields(), isSuperAgentField()],
      filteredValues: [isBlock && isBlockValue(), isCityValue(), isSuperAgentValue()],
    };
    const filteredData = await api.post.postFilterAgent({
      page,
      body: newBody,
      searchField: searchI,
      searchValue: searchValue,
    });
    setAgent(filteredData);
    setIsLoading(false);
  };

  const neFilterData = async () => {
    let newBody = {
      query: {
        userTypes: {
          $in: ["AGENT"],
        },
        "agentInformation.superAgent": "62bbdc500fdbe3049c5688b1",
      },
    };
    newBody = {
      filteredFields: [isBlockFields(), isCityFields(), isSuperAgentField()],
      filteredValues: [isBlockValue(), isCityValue(), isSuperAgentValue()],
    };
    const filteredData = await api.post.findUser({
      page,
      body: newBody,
      searchField: searchI,
      searchValue: searchValue,
    });
    setAgent(filteredData);
    setIsLoading(false);
  };
  const reset = () => {
    window.location.reload();
  };

  const agentDeleteHandler = async (id) => {
    const resDeleteAgrnt = await api.Delete.deleteAgentById(id);
    if (resDeleteAgrnt) {
      filterData();
      setIsDeleteModalOpen(false);
    } else setIsDeleteModalOpen(false);
  };

  const agentPutHandler = async (id) => {
    await api.put.putAgent(agentPutNew, id);
    filterData();
    setIsEditModalOpen(false);
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

  const onSelectedSearchBase = (selectedItem) => {
    setSearchI(selectedItem.value);
  };

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
                id={`reason-${firstItemSort.map((item) => item.id)}`}
                name={`reason-${firstItemSort.map((item) => item.id)}`}
              />
            </div>
          }
          mainData={
            <div className="main-filterDropDown">
              <div className="inputWrapper">
                <SelectRadio
                  item={isApprovedFilterItem}
                  onRadioChange={reasonHandler}
                  id={`reason-${isApprovedFilterItem.map((item) => item.id)}`}
                  name={`reason-${isApprovedFilterItem.map((item) => item.id)}`}
                />
              </div>
              {Cookies.get(constants.USER_TYPE) === "ADMIN" ? (
                <div>
                  <div className="inputWrapper" style={{ marginTop: "1rem" }}>
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
                  <div className="inputWrapper">
                    <DropDown2 data={superAgentList} onSelected={onSuperAgentSelected} labelName="اتحادیه" />
                  </div>
                </div>
              ) : null}
            </div>
          }
          footerData={
            <button className="Filterbutton reset" style={{ textDecoration: "none", color: "#0c0c0c" }} onClick={reset}>
              تنطیم مجدد
            </button>
          }
          SearchSelection={
            <SearchInput
              onSelectedSearchBase={onSelectedSearchBase}
              placeHolder="جستجو ... "
              value={searchValue}
              searchFildName={groupName}
              UserName="AGENT_NAME"
              codeName="AGENT_CODE"
              SearchOnChange={(e) => setSearchValue(e.target.value)}
            />
          }
          SearchTitleData={`جستجو ${groupName} : `}
          childern={
            <CreateModal
              type="Agent"
              buttonType="button"
              openButtonClass="button addButton"
              openButtonContent="افزودن"
              modalTitle={name}
              exitButtonContent="X"
            ></CreateModal>
          }
        />
        {isLoading && (
          <>
            <span>Loading ...</span>
          </>
        )}
        {isError && "مشکلی پیش اومده"}
        {agent ? (
          <div className="Table_wrapper">
            <>
              <table className="table">
                <thead className="thead">
                  <tr className="thead_row">
                    <th className="thead_cels">نام آژانس</th>
                    <th className="thead_cels">اتحادیه</th>
                    <th className="thead_cels">شماره تلفن</th>
                    {Cookies.get(constants.USER_TYPE) === "ADMIN" && (
                      <>
                        <th className="thead_cels">گروه مالی</th>
                        <th className="thead_cels">گروه سفر</th>
                      </>
                    )}
                    <th className="thead_cels">موجودی {"(تومان)"}</th>
                    <th className="thead_cels">ثبت فیش</th>
                    <th className="thead_cels"></th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {agent.docs.map((item, index) => {
                    return (
                      <tr className="table_body_row" key={item._id}>
                        <td className=" table_body_d">
                          <div className="tbodyWrapper">
                            <div>
                              <div>{item.agentInformation.agentName}</div>
                              <div className="unicode">{item.agentInformation.code}</div>
                            </div>
                          </div>
                        </td>
                        <td className=" table_body_d">
                          <div className="tbodyWrapper">
                            <div>
                              <div>{item.agentInformation.superAgent.superAgentInformation.superAgentName}</div>
                              <div className="unicode">
                                {item.agentInformation.superAgent.superAgentInformation.code}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className=" table_body_d center">{item.phoneNumber}</td>
                        {Cookies.get(constants.USER_TYPE) === "ADMIN" && (
                          <>
                            <td className=" table_body_d center">
                              <div className="tbodyfWrapper">
                                {item.agentInformation.financialGroup
                                  ? item.agentInformation.financialGroup.name
                                  : "پیدا نشد"}
                                <Modal
                                  openButtonClass="openButton"
                                  buttonType="button"
                                  modalId={`editModal${index}`}
                                  openButtonContent={<OpenIcone />}
                                  modalTitle={
                                    item.agentInformation.financialGroup
                                      ? item.agentInformation.financialGroup.name
                                      : "پیدا نشد"
                                  }
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
                                              {/* {item.agentInformation.financialGroup.subscription.cycle} روز */}
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
                                              {item.agentInformation.financialGroup?.subscription.fee.toLocaleString()
                                                ? item.agentInformation.financialGroup.subscription.fee.toLocaleString()
                                                : null}{" "}
                                              تومان
                                            </span>
                                            <span className="Down">حق عضویت ماهانه</span>
                                          </div>
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  }
                                >
                                  <ModalTable data={item.agentInformation.financialGroup} />
                                </Modal>
                              </div>
                            </td>
                            <td className=" table_body_d center">
                              <div className="tbodyfWrapper">
                                {item.agentInformation.travelGroup
                                  ? item.agentInformation.travelGroup.name
                                  : "پیدا نشد"}
                                <Modal
                                  openButtonClass="openButton"
                                  buttonType="button"
                                  modalId={`editModal${index}`}
                                  openButtonContent={<OpenIcone />}
                                  modalTitle={
                                    item.agentInformation.travelGroup
                                      ? item.agentInformation.travelGroup.name
                                      : "پیدا نشد"
                                  }
                                  exitButtonContent={<CloseIcone />}
                                >
                                  {item.agentInformation.travelGroup ? (
                                    <TravelModal data={item.agentInformation.travelGroup} />
                                  ) : null}
                                </Modal>
                              </div>
                            </td>
                          </>
                        )}

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
                              <AgentReceiptModal
                                userName={item.agentInformation.agentName}
                                driverId={item._id}
                                ownerType="AGENT"
                              />
                            </Modal>
                          </div>
                        </td>
                        <td className=" table_body_d center direction">
                          <TableButtons
                            editModal={true}
                            item={item}
                            deleteButtonClick={(it) => {
                              agentDeleteHandler(agent.docs[deletedIndex]._id);
                            }}
                            putUser={() => {
                              agentPutHandler(agent.docs[deletedIndex]._id);
                            }}
                            isDeleteModalOpen={isDeleteModalOpen}
                            onDeleteCancelModal={() => setIsDeleteModalOpen(false)}
                            onDeleteModalOpen={() => {
                              setDeletedIndex(index);
                              setIsDeleteModalOpen(true);
                            }}
                            isEditModalOpen={isEditModalOpen}
                            userName={item.agentInformation.agentName}
                            onCancelModal={() => setIsEditModalOpen(false)}
                            onModalOpen={() => {
                              console.log({ sdsdsd: agent.docs[index] });
                              setDeletedIndex(index);
                              setIsEditModalOpen(true);
                              setAgentPut({
                                ...agentPut,
                                phoneNumber: agent.docs[index].phoneNumber,
                                agentName: agent.docs[index].agentInformation.agentName,
                                firstName: agent.docs[index].firstName,
                                lastName: agent.docs[index].lastName,
                                nationalCode: agent.docs[index].agentInformation.nationalCode,
                                code: agent.docs[index].agentInformation.code,
                                shabaNumber: agent.docs[index].financial.shabaNumber,
                                kartNumber: agent.docs[index].financial.kartNumber,
                                address: agent.docs[index].agentInformation.address,
                              });
                            }}
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
                                    type="number"
                                    minLength={11}
                                    maxLength={11}
                                    autoComplete="off"
                                    value={agentPut.phoneNumber}
                                    onChange={(e) => {
                                      e.target.value.length <= 11 &&
                                        setAgentPut({
                                          ...agentPut,
                                          phoneNumber: e.target.value,
                                        });
                                      e.target.value.length <= 11 &&
                                        setAgentPutNew({
                                          ...agentPutNew,
                                          phoneNumber: e.target.value,
                                        });
                                    }}
                                  />
                                </div>
                                <div className="inputWrapper">
                                  <label htmlFor="superAgentName" className="label">
                                    <span className="">{`نام  ${groupName.split(" ها")}`}</span>
                                  </label>
                                  <input
                                    className="form-input"
                                    name="superAgentName"
                                    type="text"
                                    maxLength={20}
                                    autoComplete="off"
                                    value={agentPut.agentName}
                                    onChange={(e) => {
                                      setAgentPut({
                                        ...agentPut,
                                        agentName: e.target.value,
                                      });
                                      setAgentPutNew({
                                        ...agentPutNew,
                                        agentName: e.target.value,
                                      });
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
                                    value={agentPut.firstName}
                                    onChange={(e) => {
                                      setAgentPut({
                                        ...agentPut,
                                        firstName: e.target.value,
                                      });
                                      setAgentPutNew({
                                        ...agentPutNew,
                                        firstName: e.target.value,
                                      });
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
                                    value={agentPut.lastName}
                                    onChange={(e) => {
                                      setAgentPut({
                                        ...agentPut,
                                        lastName: e.target.value,
                                      });
                                      setAgentPutNew({
                                        ...agentPutNew,
                                        lastName: e.target.value,
                                      });
                                    }}
                                  />
                                </div>

                                <div className="inputWrapper">
                                  <DropDown2
                                    data={financialGroup}
                                    onSelected={(val) => {
                                      setAgentPut({
                                        ...agentPut,
                                        financialGroup: val.value,
                                      });
                                    }}
                                    labelName="گروه مالی"
                                  />
                                </div>
                                <div className="inputWrapper">
                                  <DropDown2
                                    data={travelGroup}
                                    onSelected={(val) => {
                                      setAgentPut({
                                        ...agentPut,
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
                                    value={agentPut.nationalCode}
                                    placeholder={item.agentInformation.nationalCode}
                                    onChange={(e) => {
                                      e.target.value.length <= 10 &&
                                        setAgentPut({
                                          ...agentPut,
                                          nationalCode: e.target.value,
                                        });
                                      e.target.value.length <= 10 &&
                                        setAgentPutNew({
                                          ...agentPutNew,
                                          nationalCode: e.target.value,
                                        });
                                    }}
                                  />
                                </div>
                                <div className="inputWrapper">
                                  <label htmlFor="cart" className="label">
                                    <span className="">کد آژانس</span>
                                  </label>
                                  <input
                                    className="form-input"
                                    name="cart"
                                    type="number"
                                    autoComplete="off"
                                    value={agentPut.code}
                                    onChange={(e) => {
                                      setAgentPut({
                                        ...agentPut,
                                        code: e.target.value,
                                      });
                                      e.target.value.length <= 6 &&
                                        setAgentPutNew({
                                          ...agentPutNew,
                                          code: e.target.value,
                                        });
                                    }}
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
                                    value={agentPut.shabaNumber}
                                    onChange={(e) => {
                                      e.target.value.length <= 24 &&
                                        setAgentPut({
                                          ...agentPut,
                                          shabaNumber: e.target.value,
                                        });
                                      e.target.value.length <= 24 &&
                                        setAgentPutNew({
                                          ...agentPutNew,
                                          shabaNumber: e.target.value,
                                        });
                                    }}
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
                                    value={agentPut.kartNumber}
                                    onChange={(e) => {
                                      e.target.value.length <= 16 &&
                                        setAgentPut({
                                          ...agentPut,
                                          kartNumber: e.target.value,
                                        });
                                      e.target.value.length <= 16 &&
                                        setAgentPutNew({
                                          ...agentPutNew,
                                          kartNumber: e.target.value,
                                        });
                                    }}
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
                                    value={agentPut.address}
                                    onChange={(val) => {
                                      setAgentPut({
                                        ...agentPut,
                                        address: val.target.value,
                                      });
                                      setAgentPutNew({
                                        ...agentPutNew,
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
              <Pagination data={{ page, totalPages: agent.totalPages }} onPaginateClick={(_page) => setPage(_page)} />
            </>
          </div>
        ) : null}
      </div>
      <div>{isAllChecked ? <DeleteModal modalTitle="آیا مطمئنید که تمامی داده ها حذف بشوند؟" /> : null}</div>
    </>
  );
};

export default AgentDataTable;
