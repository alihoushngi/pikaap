import Cookies from "js-cookie";
import moment from "moment";
import persianRex from "persian-rex";
import { useEffect, useState } from "react";
import { cc_format } from "../../../helpers/function";
import api from "../../api";
import users from "../../assets/Images/users.png";
import {
  CreateModal,
  CustomSearchAgent,
  DeleteModal,
  DropDown2,
  SearchInput,
  SelectRadio,
  TableAssets,
  Toastify,
} from "../../components";
import regexes from "../../validation/regexes";
import { constants } from "../../values";
import Modal from "../Modal";
import Pagination from "../Pagination";
import Receipt from "../Receipt";
import TableButtons from "../TableButtons";
import "./index.scss";
const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
const baseOn = [
  { name: "شماره همراه", value: "PHONE_NUMBER" },
  { name: "نام آژانس", value: "AGENT_NAME" },
  { name: "کد آژانس", value: "AGENT_CODE" },
];
const DriversDataTable = ({ groupName, name }) => {
  const [driver, setDriver] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletedIndex, setDeletedIndex] = useState();
  const [isError, setIsError] = useState(null);
  const [page, setPage] = useState(1);
  const [Agent, setAgent] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const [citise, setCitise] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [isBlock, setIsBlock] = useState("");
  const [selectedCity, setSelectedCity] = useState();
  const [selectedSuperAgent, setSelectedSuperAgent] = useState(null);
  const [superAgentList, setSuperAgentList] = useState();
  const [isSuperAgentLoading, setIsSuperAgentLoading] = useState(false);
  const [isApproved, setIsApproved] = useState("");
  const [searchI, setSearchI] = useState();
  const [driverPut, setDriverPut] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    shabaNumber: "",
    kartNumber: "",
    travelGroup: "",
    financialGroup: "",
    address: "",
    nationalCode: "",
    carBrand: "",
    vin: "",
    insuranceExpiryDate: "",
    insuranceNumber: "",
    carModel: "",
    plateNumber: "",
    agentId: "",
    driverLicenseNumber: "",
    carSystem: "",
    carColor: "",
    uniqueCodeThirdPartyInsurance: "",
  });
  const [lastAgent, setLastAgent] = useState([]);
  const [searchedAgent, setSearchedAgent] = useState("09");
  const [baseAgentSearch, setBaseAgentSearch] = useState(baseOn[0].value);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [bodyreq, setBodyReq] = useState({
    filteredFields: [],
    filteredValues: [],
  });
  const [gender, setGender] = useState([
    { value: "MALE", label: "آقا" },
    { value: "FEMALE", label: "خانم" },
  ]);
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
  const driverStatus = [
    {
      label: "تایید",
      value: true,
    },
    {
      label: "عدم تایید",
      value: false,
    },
  ];
  useEffect(() => {
    api.get
      .findUserByPhoneNumber({ userType: "AGENT", searchValue: searchedAgent })
      .then((r) => setLastAgent(r.docs))
      .catch((e) => console.log({ e }));
  }, [searchedAgent]);

  useEffect(() => {
    setIsLoading(true);
    filterData();
    api.get.getAgent({ page }).then((res) => {
      setAgent(
        res.result.docs.map((item) => {
          return {
            label: item.agentInformation.agentName,
            value: item._id,
          };
        })
      );
    });
    api.get.getSuperAgent({ page }).then((res) => {
      setSuperAgentList(res.result.docs);
      setIsSuperAgentLoading(true);
    });
  }, [page, selectedCity, isBlock, searchValue, isApproved]);

  const driverDeleteHandler = (id) => {
    api.Delete.deleteDriverById(id).then((res) => {
      if (res.CODE === 2032) {
        Toastify("success", "راننده حذف شد");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else return Toastify("error", res.CODE);
    });
  };

  const driverUpdateHandler = (id) => {
    function toString(o) {
      Object.keys(o).forEach((k) => {
        if (typeof o[k] !== "object") {
          o[k] = p2e(o[k]);
        }
      });

      return o;
    }
    const newDriverPut = toString(driverPut);
    api.put.putDriver(newDriverPut, id).then((res) => {
      console.log({ res });
      //   window.location.reload();
    });
  };

  const OpenIcone = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="10px" height="10px">
        <path d="M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM502.6 9.367C496.8 3.578 488.8 0 480 0h-160c-17.67 0-31.1 14.32-31.1 31.1c0 17.67 14.32 31.1 31.99 31.1h82.75L178.7 290.7c-12.5 12.5-12.5 32.76 0 45.26C191.2 348.5 211.5 348.5 224 336l224-226.8V192c0 17.67 14.33 31.1 31.1 31.1S512 209.7 512 192V31.1C512 23.16 508.4 15.16 502.6 9.367z" />
      </svg>
    );
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
      label: "مسدود شده",
      value: true,
      id: "block",
    },
    {
      label: "آزاد",
      value: false,
      id: "free",
    },
  ];

  const approvedSort = [
    {
      label: "تایید شده",
      value: false,
      id: "approved",
    },
    {
      label: "رد شده",
      value: true,
      id: "rejected",
    },
  ];

  const onCitySelected = (value) => {
    setPage(1);
    setSelectedCity(value.label);
  };

  const isBlockFields = () => (isBlock !== "" ? "IS_BLOCK" : null);
  const isBlockValue = () => (isBlock ? true : false);

  const isApprovedFields = () => (isApproved !== "" ? "IS_APPROVED" : null);
  const isApprovedValue = () => (isApproved ? false : true);

  const isCityFields = () => (selectedCity ? "CITY" : null);
  const isCityValue = () => (selectedCity ? selectedCity : false);
  const filterData = async () => {
    let newBody;
    newBody = {
      filteredFields: [isBlockFields(), isCityFields(), isApprovedFields()],
      filteredValues: [isBlockValue(), isCityValue(), isApprovedValue()],
    };
    const filteredData = await api.post.postFilterDriver({
      page,
      body: newBody,
      searchField: searchI,
      searchValue: searchValue,
    });

    setDriver(filteredData);
    setBodyReq(newBody);
    setIsLoading(false);
    setTotalPages(filteredData.totalPages);
  };

  const reset = () => {
    window.location.reload();
  };

  const onSelectedSearchBase = (selectedItem) => {
    setSearchI(selectedItem.value);
  };

  const approvedDriver = (id) => {
    api.put.putApprovedDriver({ id }).then((res) => {
      window.location.reload();
    });
  };

  return (
    <>
      <div className="driversInformation">
        <TableAssets
          haveSearch={true}
          haveFilter={true}
          filterTitleData="مرتب سازی بر اساس  : "
          inputSelections={
            <div className="DropDownInputs">
              <SelectRadio
                item={firstItemSort}
                onRadioChange={(z) => {
                  setIsBlock(z !== "false");
                  setPage(1);
                }}
                // currentSelected={selectedReason}
                id={`reason-${firstItemSort.map((item) => item.id)}`}
                name={`reason-${firstItemSort.map((item) => item.id)}`}
              />
            </div>
          }
          mainData={
            <div className="main-filterDropDown">
              <div className="inputWrapper">
                <SelectRadio
                  item={approvedSort}
                  onRadioChange={(z) => {
                    setIsApproved(z !== "false");
                    setPage(1);
                  }}
                  id={`reason-${approvedSort.map((item) => item.id)}`}
                  name={`reason-${approvedSort.map((item) => item.id)}`}
                />
              </div>
              {Cookies.get(constants.USER_TYPE) === "ADMIN" && (
                <>
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
                </>
              )}
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
              UserName="LAST_NAME"
              codeName="NATIONAL_CODE"
              SearchOnChange={(e) => setSearchValue(e.target.value)}
            />
          }
          SearchTitleData={`جستجو ${groupName} : `}
          childern={
            <CreateModal
              type="Driver"
              buttonType="button"
              openButtonClass="button addButton"
              openButtonContent="افزودن"
              modalTitle={name}
            />
          }
        />
        {isLoading && <span>Loading....</span>}
        {isError && "مشکلی پیش اومده"}
        {driver && (
          <div className="Table_wrapper">
            <>
              <table className="table">
                <thead className="thead">
                  <tr className="thead_row">
                    <th className="thead_cels">نام {groupName}</th>
                    <th className="thead_cels">شماره </th>
                    <th className="thead_cels">{"اتحادیه / آژانس"} </th>
                    <th className="thead_cels">پلاک</th>
                    <th className="thead_cels">ثبت فیش</th>
                    <th className="thead_cels">موجودی {"(تومان)"}</th>
                    <th className="thead_cels">{"روزهای باقیمانده"}</th>
                    <th className="thead_cels">وضعیت راننده</th>
                    <th className="thead_cels"></th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {driver.docs.map((item, index) => {
                    const daysLeft = moment
                      .duration(moment(item.driverInformation.subscriptionExpireAt, "YYYY-MM-DD").diff(moment()))
                      .asDays();
                    return item.blocks.length > 0 ? (
                      <tr className="table_body_row block-user" key={item._id}>
                        <td className="table_body_d">
                          <div className="tbodyWrapper">
                            <div className="tbody_imgWrapper">
                              <img
                                src={item.driverInformation.avatar ? item.driverInformation.avatar : users}
                                alt="avatar"
                              />
                            </div>
                            <div style={{ marginTop: "4px" }}>
                              <div style={{ marginBottom: "2px" }}>
                                {item.firstName && item.lastName ? (
                                  <div>
                                    {item.firstName} {item.lastName}
                                  </div>
                                ) : (
                                  <span className="pending">نام راننده پیدا نشد</span>
                                )}
                              </div>
                              <div className="unicode">{item.driverInformation.isOnline ? "آنلاین" : "آفلاین"}</div>
                            </div>
                          </div>
                        </td>

                        <td className=" table_body_d center">
                          {item.phoneNumber ? (
                            `0${item.phoneNumber}`
                          ) : (
                            <span className="pending">شماره تلفن ثبت نشده است</span>
                          )}
                          <p style={{ marginTop: 4, opacity: 0.5 }}>
                            {item?.driverInformation?.agentId?.agentInformation?.code
                              ? item.driverInformation.agentId.agentInformation.code
                              : "بدون آژانس"}
                          </p>
                        </td>
                        <td className=" table_body_d center">
                          <div
                            style={{
                              color: "#EEEEEE",
                              marginTop: 12,
                              // fontSize: "0.8rem",
                            }}
                          >
                            {"نام اتحادیه:  "}
                            {item?.driverInformation?.superAgentId?.superAgentInformation?.superAgentName
                              ? item?.driverInformation?.superAgentId?.superAgentInformation?.superAgentName
                              : "بدون اتحادیه"}
                          </div>
                          <div
                            style={{
                              color: "#EEEEEE",
                              marginTop: 12,
                              // fontSize: "0.8rem",
                            }}
                          >
                            {"نام آژانس:  "}
                            {item?.driverInformation?.agentId?.agentInformation?.agentName
                              ? item?.driverInformation?.agentId?.agentInformation?.agentName
                              : "بدون آژانس"}
                          </div>
                        </td>
                        {item.driverInformation.plateNumber && (
                          <td className=" table_body_d center">
                            <div className="tbody_fWrapper">
                              <div className="license-wrapper">
                                <div className="license-plate">
                                  <div className="blue-column">
                                    <div className="flag">
                                      <div></div>
                                      <div></div>
                                      <div></div>
                                    </div>
                                    <div className="text">
                                      <div>I.R.</div>
                                      <div>IRAN</div>
                                    </div>
                                  </div>
                                  <span>{item.driverInformation.plateNumber.twoDigit}</span>
                                  <span className="alphabet-column"> {item.driverInformation.plateNumber.letter}</span>
                                  <span> {item.driverInformation.plateNumber.threeDigit}</span>
                                  <div className="iran-column">
                                    <span>ایــران</span>
                                    <strong>{item.driverInformation.plateNumber.iran}</strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        )}
                        {item.driverInformation.motorPlateNumber && (
                          <td className=" table_body_d center" style={{ position: "relative" }}>
                            <div className="tbody_fWrapper" style={{ position: "absolute" }}>
                              <div className="license-wrapper">
                                <div className="license-plate motor">
                                  <div className="blue-column motor">
                                    <div className="flag">
                                      <div></div>
                                      <div></div>
                                      <div></div>
                                    </div>
                                    <div className="text">
                                      <div>I.R.</div>
                                      <div>IRAN</div>
                                    </div>
                                  </div>
                                  <span>{item.driverInformation.motorPlateNumber.threeDigit}</span>
                                  <span>{item.driverInformation.motorPlateNumber.fiveDigit}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        )}
                        {!item.driverInformation.plateNumber && !item.driverInformation.motorPlateNumber && (
                          <td className=" table_body_d center ">
                            <span className="pending">پلاک ثبت نشده است</span>
                          </td>
                        )}
                        <td className=" table_body_d center">
                          <div className="tbody_fWrapper">
                            {/* {item.driverInformation.travelGroup.name} */}
                            <Modal
                              openButtonClass="openButton"
                              buttonType="button"
                              modalId={`editModal${index}`}
                              openButtonContent={<OpenIcone />}
                              modalTitle="ثبت فیش"
                            >
                              <Receipt
                                userName={`${item.firstName}${" "}${item.lastName}`}
                                driverId={item._id}
                                ownerType="DRIVER"
                              />
                            </Modal>
                          </div>
                        </td>
                        <td className=" table_body_d center">{item.balance.toLocaleString()}</td>
                        <td className=" table_body_d">
                          {/* Days left
                           */}
                          {daysLeft > 0 ? (
                            <div className="subscription-time">{Math.round(daysLeft)} روز</div>
                          ) : (
                            <div className="subscription-expired">{"بدون عضویت"}</div>
                          )}
                        </td>
                        <td className=" table_body_d">
                          {item.driverInformation.approved.isApproved === false && (
                            <>
                              <span className="rejected">تایید نشده</span>
                              <button className="acceptButton me-light" onClick={() => approvedDriver(item._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="10" fill="#ffffff">
                                  <defs>
                                    <style>{`.fa-secondary{opacity:.4}`}</style>
                                  </defs>
                                  <path
                                    className="fa-primary"
                                    d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z"
                                  />
                                </svg>
                              </button>
                            </>
                          )}
                          {item.driverInformation.approved.isApproved === true && (
                            <span className="accepted">تایید شده</span>
                          )}
                        </td>
                        <td className=" table_body_d center direction">
                          <TableButtons
                            editModal={true}
                            item={item}
                            deleteButtonClick={() => {
                              driverDeleteHandler(driver.docs[deletedIndex]._id);
                            }}
                            putUser={() => {
                              driverUpdateHandler(item._id);
                            }}
                            userName={item.firstName + " " + item.lastName}
                            isEditModalOpen={isEditModalOpen}
                            onModalOpen={() => {
                              console.log({
                                Z3: driver.docs[index],
                                index,
                                phoneNumber: driver.docs[index].phoneNumber,
                                firstName: driver.docs[index].firstName,
                                lastName: driver.docs[index].lastName,
                              });
                              setIsEditModalOpen(true);
                              setDeletedIndex(index);
                              setDriverPut({
                                ...driverPut,
                                phoneNumber: driver.docs[index].phoneNumber,
                                firstName: driver.docs[index].firstName,
                                lastName: driver.docs[index].lastName,
                                kartNumber: driver.docs[index].financial.kartNumber,
                                carSystem: driver.docs[index].driverInformation.carSystem,
                                carBrand: driver.docs[index].driverInformation.carBrand,
                                carColor: driver.docs[index].driverInformation.carColor,
                                carModel: driver.docs[index].driverInformation.carModel,
                                insuranceExpiryDate: driver.docs[index].driverInformation.insuranceExpiryDate,
                                vin: driver.docs[index].driverInformation.vin,
                                driverLicenseNumber: driver.docs[index].driverInformation.driverLicenseNumber,
                                insuranceNumber: driver.docs[index].driverInformation.insuranceNumber,
                                uniqueCodeThirdPartyInsurance:
                                  driver.docs[index].driverInformation.uniqueCodeThirdPartyInsurance,
                                nationalCode: driver.docs[index].driverInformation.nationalCode,
                                address: driver.docs[index].driverInformation.address,
                                shabaNumber: driver.docs[index].financial.shabaNumber,
                                gender: driver.docs[index].gender,
                                travelGroup: driver.docs[index].driverInformation.travelGroup._id,
                                financialGroup: driver.docs[index].driverInformation.financialGroup._id,
                                plateNumber: driver.docs[index].driverInformation.plateNumber,
                                agentId: driver.docs[index].driverInformation.agentId,
                              });
                            }}
                            onCancelModal={() => setIsEditModalOpen(false)}
                            isDeleteModalOpen={isDelModalOpen}
                            onDeleteModalOpen={() => {
                              setDeletedIndex(index);
                              setIsDelModalOpen(true);
                            }}
                            onDeleteCancelModal={() => setIsDelModalOpen(false)}
                            editChildren={
                              <div className="form edit-form" style={{ maxWidth: "80vw", height: "40vh" }}>
                                <div id="edit-driver" className="row" style={{ width: "100%" }}>
                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="PhoneNumber" className="label">
                                        <span className="">شماره همراه</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        style={{ direction: "ltr" }}
                                        name="PhoneNumber"
                                        type="text"
                                        minLength={11}
                                        maxLength={11}
                                        autoComplete="off"
                                        value={driverPut.phoneNumber}
                                        onChange={(e) => {
                                          if (e.target.value.match(regexes.numberRegex) || e.target.value === "") {
                                            e.target.value.length <= 11 &&
                                              setDriverPut({
                                                ...driverPut,
                                                phoneNumber: e.target.value,
                                              });
                                          } else {
                                            Toastify("error", "فقط عدد وارد کنید", "phone-number");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>
                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="name" className="label">
                                        <span className="">نام</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="name"
                                        type="text"
                                        value={driverPut.firstName}
                                        placeholder={item.firstName}
                                        onChange={(e) => {
                                          if (persianRex.text.test(e.target.value) || e.target.value === "") {
                                            setDriverPut({
                                              ...driverPut,
                                              firstName: e.target.value,
                                            });
                                          } else {
                                            Toastify("error", "فقط حروف فارسی مجاز هستند", "fa-firstName");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="familyName" className="label">
                                        <span className="">نام خانوادگی</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="familyName"
                                        type="text"
                                        maxLength={20}
                                        autoComplete="off"
                                        value={driverPut.lastName}
                                        placeholder={item.lastName}
                                        onChange={(e) => {
                                          if (persianRex.text.test(e.target.value) || e.target.value === "") {
                                            setDriverPut({
                                              ...driverPut,
                                              lastName: e.target.value,
                                            });
                                          } else {
                                            Toastify("error", "فقط حروف فارسی مجاز هستند", "fa-lastname");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="cart" className="label">
                                        <span className="">کد ملی</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="cart"
                                        type="text"
                                        maxLength={26}
                                        autoComplete="off"
                                        value={driverPut.nationalCode}
                                        placeholder={item.nationalCode}
                                        onChange={(e) => {
                                          if (regexes.numberRegex.test(e.target.value) || e.target.value === "") {
                                            e.target.value.length <= 10 &&
                                              setDriverPut({
                                                ...driverPut,
                                                nationalCode: e.target.value,
                                              });
                                          } else {
                                            Toastify("error", "فقط اعداد مجاز هستند", "fa-num-code-meli");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="cart" className="label">
                                        <span className="">شماره کارت </span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="cart"
                                        type="number"
                                        autoComplete="off"
                                        value={driverPut.kartNumber}
                                        placeholder={cc_format(item.financial?.kartNumber)}
                                        onChange={(e) => {
                                          if (regexes.kartNumberRegex.test(e.target.value) || e.target.value === "") {
                                            e.target.value.length <= 16 &&
                                              setDriverPut({
                                                ...driverPut,
                                                kartNumber: e.target.value,
                                              });
                                          } else {
                                            Toastify("error", "فقط اعداد مجاز هستند", "fa-num");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <DropDown2
                                        data={gender}
                                        defaultItem={item.gender === "MALE" ? gender[0] : gender[1]}
                                        onSelected={(val) => {
                                          setDriverPut({
                                            ...driverPut,
                                            gender: val.value,
                                          });
                                        }}
                                        labelName="جنسیت"
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="carSystem" className="label">
                                        <span className="">برند خودرو</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="carSystem"
                                        type="text"
                                        maxLength={25}
                                        autoComplete="off"
                                        value={driverPut.carBrand}
                                        placeholder={item.driverInformation.carBrand}
                                        onChange={(val) => {
                                          if (persianRex.text.test(val.target.value) || val.target.value === "") {
                                            setDriverPut({
                                              ...driverPut,
                                              carBrand: val.target.value,
                                            });
                                          } else {
                                            Toastify("error", "فقط حروف و اعداد فارسی مجاز است");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="carBrand" className="label">
                                        <span className="">مدل خودرو</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="carBrand"
                                        type="text"
                                        maxLength={25}
                                        autoComplete="off"
                                        value={driverPut.carSystem}
                                        placeholder={item.driverInformation.carSystem}
                                        onChange={(val) => {
                                          if (persianRex.text.test(val.target.value) || val.target.value === "") {
                                            setDriverPut({
                                              ...driverPut,
                                              carSystem: val.target.value,
                                            });
                                          } else {
                                            Toastify("error", "فقط حروف فارسی مجاز است");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="carColor" className="label">
                                        <span className="">رنگ خودرو</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="carColor"
                                        type="text"
                                        maxLength={20}
                                        autoComplete="off"
                                        value={driverPut.carColor}
                                        placeholder={item.driverInformation.carColor}
                                        onChange={(val) => {
                                          if (persianRex.text.test(val.target.value) || val.target.value === "") {
                                            setDriverPut({
                                              ...driverPut,
                                              carColor: val.target.value,
                                            });
                                          } else {
                                            Toastify("error", "فقط حروف فارسی مجاز است");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="carModel" className="label">
                                        <span className="">سال ساخت ماشین</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="carModel"
                                        type="number"
                                        maxLength={20}
                                        autoComplete="off"
                                        value={driverPut.carModel}
                                        placeholder={item.driverInformation.carModel}
                                        onChange={(val) => {
                                          val.target.value.length <= 10 &&
                                            setDriverPut({
                                              ...driverPut,
                                              carModel: val.target.value,
                                            });
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="carColor" className="label">
                                        <span className="">تاریخ پایان بیمه خودرو</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="carColor"
                                        type="number"
                                        maxLength={20}
                                        autoComplete="off"
                                        value={driverPut.insuranceExpiryDate}
                                        placeholder={item.driverInformation.insuranceExpiryDate}
                                        onChange={(val) => {
                                          val.target.value.length <= 15 &&
                                            setDriverPut({
                                              ...driverPut,
                                              insuranceExpiryDate: val.target.value,
                                            });
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="vin" className="label">
                                        <span className="">کد بارکد کارت ماشین</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="vin"
                                        type="text"
                                        maxLength={25}
                                        autoComplete="off"
                                        value={driverPut.vin}
                                        placeholder={item.driverInformation.vin}
                                        onChange={(val) => {
                                          if (/^[A-Z0-9]*$/.test(val.target.value) || val.target.value === "") {
                                            setDriverPut({
                                              ...driverPut,
                                              vin: val.target.value,
                                            });
                                          } else {
                                            Toastify("error", "فقط حروف بزرگ  و اعداد انگلیسی مجاز هستند");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="driverLicenseNumber" className="label">
                                        <span className="">شماره گواهینامه</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="driverLicenseNumber"
                                        type="text"
                                        maxLength={35}
                                        autoComplete="off"
                                        value={driverPut.driverLicenseNumber}
                                        placeholder={item.driverInformation.driverLicenseNumber}
                                        onChange={(val) => {
                                          if (regexes.numberRegex.test(val.target.value) || val.target.value === "") {
                                            setDriverPut({
                                              ...driverPut,
                                              driverLicenseNumber: val.target.value,
                                            });
                                          } else {
                                            Toastify("error", "فقط عدد مجاز است", "only-num");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="insuranceNumber" className="label">
                                        <span className="">شماره بیمه</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="insuranceNumber"
                                        type="text"
                                        maxLength={25}
                                        autoComplete="off"
                                        value={driverPut.insuranceNumber}
                                        placeholder={item.driverInformation.insuranceNumber}
                                        onChange={(val) => {
                                          setDriverPut({
                                            ...driverPut,
                                            insuranceNumber: val.target.value,
                                          });
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="carColor" className="label">
                                        <span className="">کد بیمه شخص ثالث</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="carColor"
                                        type="text"
                                        maxLength={35}
                                        autoComplete="off"
                                        value={driverPut.uniqueCodeThirdPartyInsurance}
                                        placeholder={item.driverInformation.uniqueCodeThirdPartyInsurance}
                                        onChange={(val) => {
                                          setDriverPut({
                                            ...driverPut,
                                            uniqueCodeThirdPartyInsurance: val.target.value,
                                          });
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="cart" className="label">
                                        <span className="">آدرس</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="cart"
                                        type="text"
                                        maxLength={35}
                                        autoComplete="off"
                                        value={driverPut.address}
                                        onChange={(val) => {
                                          setDriverPut({
                                            ...driverPut,
                                            address: val.target.value,
                                          });
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5 shaba">
                                    <section>
                                      <label htmlFor="shaba" className="label">
                                        <span className="">شماره شبا </span>
                                      </label>
                                      <input
                                        className="form-input"
                                        type="text"
                                        name="shaba"
                                        autoComplete="off"
                                        placeholder={item.financial?.shabaNumber}
                                        value={driverPut.shabaNumber}
                                        onChange={(e) => {
                                          if (regexes.numberRegex.test(e.target.value) || e.target.value === "") {
                                            e.target.value.length <= 24 &&
                                              setDriverPut({
                                                ...driverPut,
                                                shabaNumber: e.target.value,
                                              });
                                          } else {
                                            Toastify("error", "فقط اعداد مجاز هستند", "only-num-shaba");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-12 col-md-12 col-xs-12 selectAgent">
                                    <section>
                                      <label htmlFor="insuranceNumber" className="label">
                                        <span className="">{"انتخاب آژانس"}</span>
                                      </label>
                                      <CustomSearchAgent
                                        onSelectUser={(user) => setDriverPut({ ...driverPut, agentId: user.id })}
                                      />
                                    </section>
                                    {/* <CustomSearchDropDown
									baseOn={baseOn}
									options={lastAgent}
									onSelect={(selected) => {}}
									onInputSearchChange={(e) => {
									  setSearchedAgent(e.search);
									  setBaseAgentSearch(e.base);
									}}
								  /> */}
                                  </div>
                                </div>
                              </div>
                            }
                          />
                        </td>
                      </tr>
                    ) : (
                      <tr className="table_body_row" key={item._id}>
                        <td className=" table_body_d">
                          <div className="tbodyWrapper">
                            <div className="tbody_imgWrapper">
                              <img
                                src={item.driverInformation.avatar ? item.driverInformation.avatar : users}
                                alt="avatar"
                              />
                            </div>
                            <div style={{ marginTop: "4px" }}>
                              <div style={{ marginBottom: "2px" }}>
                                {item.firstName && item.lastName ? (
                                  <div>
                                    {item.firstName} {item.lastName}
                                  </div>
                                ) : (
                                  <span className="pending">نام راننده پیدا نشد</span>
                                )}
                              </div>
                              <div className="unicode">{item.driverInformation.isOnline ? "آنلاین" : "آفلاین"}</div>
                            </div>
                          </div>
                        </td>
                        <td className=" table_body_d center">
                          {item.phoneNumber ? (
                            `0${item.phoneNumber}`
                          ) : (
                            <span className="pending">شماره تلفن ثبت نشده است</span>
                          )}
                          <p style={{ marginTop: 4, opacity: 0.5 }}>
                            {item.driverInformation?.agentId?.agentInformation?.code}
                          </p>
                        </td>
                        <td className=" table_body_d center">
                          <div
                            style={{
                              color: "#EEEEEE",
                              marginTop: 12,
                              fontSize: "0.6rem",
                            }}
                          >
                            {"نام اتحادیه:  "}
                            {item?.driverInformation?.superAgentId?.superAgentInformation?.superAgentName
                              ? item?.driverInformation?.superAgentId?.superAgentInformation?.superAgentName
                              : "بدون اتحادیه"}
                          </div>
                          <div
                            style={{
                              color: "#EEEEEE",
                              marginTop: 12,
                              fontSize: "0.6rem",
                            }}
                          >
                            {"نام آژانس:  "}

                            {item?.driverInformation?.agentId?.agentInformation?.agentName
                              ? item?.driverInformation?.agentId?.agentInformation?.agentName
                              : "بدون آژانس"}
                          </div>
                        </td>
                        {item.driverInformation.plateNumber && (
                          <td className=" table_body_d center">
                            <div className="tbody_fWrapper">
                              <div className="license-wrapper">
                                <div className="license-plate">
                                  <div className="blue-column">
                                    <div className="flag">
                                      <div></div>
                                      <div></div>
                                      <div></div>
                                    </div>
                                    <div className="text">
                                      <div>I.R.</div>
                                      <div>IRAN</div>
                                    </div>
                                  </div>
                                  <span>{item.driverInformation.plateNumber.twoDigit}</span>
                                  <span className="alphabet-column"> {item.driverInformation.plateNumber.letter}</span>
                                  <span> {item.driverInformation.plateNumber.threeDigit}</span>
                                  <div className="iran-column">
                                    <span>ایــران</span>
                                    <strong>{item.driverInformation.plateNumber.iran}</strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        )}
                        {item.driverInformation.motorPlateNumber && (
                          <td className=" table_body_d center" style={{ position: "relative" }}>
                            <div className="tbody_fWrapper" style={{ position: "absolute" }}>
                              <div className="license-wrapper">
                                <div className="license-plate motor">
                                  <div className="blue-column motor">
                                    <div className="flag">
                                      <div></div>
                                      <div></div>
                                      <div></div>
                                    </div>
                                    <div className="text">
                                      <div>I.R.</div>
                                      <div>IRAN</div>
                                    </div>
                                  </div>
                                  <span>{item.driverInformation.motorPlateNumber.threeDigit}</span>
                                  <span>{item.driverInformation.motorPlateNumber.fiveDigit}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        )}
                        {!item.driverInformation.plateNumber && !item.driverInformation.motorPlateNumber && (
                          <td className=" table_body_d center ">
                            <span className="pending">پلاک ثبت نشده است</span>
                          </td>
                        )}
                        <td className=" table_body_d center">
                          <div className="tbody_fWrapper">
                            {/* {item.driverInformation.travelGroup.name} */}
                            <Modal
                              openButtonClass="openButton"
                              buttonType="button"
                              modalId={`editModal${index}`}
                              openButtonContent={<OpenIcone />}
                              modalTitle="ثبت فیش"
                            >
                              <Receipt
                                userName={`${item.firstName}${" "}${item.lastName}`}
                                driverId={item._id}
                                receiverType="DRIVER"
                              />
                            </Modal>
                          </div>
                        </td>
                        <td className=" table_body_d center">{item.balance.toLocaleString()}</td>
                        <td className=" table_body_d">
                          {/* Days left
                           */}
                          {daysLeft > 0 ? (
                            <div className="subscription-time">{Math.round(daysLeft)} روز</div>
                          ) : (
                            <div className="subscription-expired">{"بدون عضویت"}</div>
                          )}
                        </td>
                        <td className=" table_body_d">
                          {item.driverInformation.approved.isApproved === false && (
                            <>
                              <span className="rejected">تایید نشده</span>
                              <button className="acceptButton me-light" onClick={() => approvedDriver(item._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="10" fill="#ffffff">
                                  <defs>
                                    <style>{`.fa-secondary{opacity:.4}`}</style>
                                  </defs>
                                  <path
                                    className="fa-primary"
                                    d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z"
                                  />
                                </svg>
                              </button>
                            </>
                          )}
                          {item.driverInformation.approved.isApproved === true && (
                            <span className="accepted"> تایید شده </span>
                          )}
                        </td>
                        <td className=" table_body_d center direction">
                          <TableButtons
                            editModal={true}
                            deleteButtonClick={() => driverDeleteHandler(item._id)}
                            putUser={() => {
                              driverUpdateHandler(item._id);
                            }}
                            userName={item.firstName + " " + item.lastName}
                            isEditModalOpen={isEditModalOpen}
                            onModalOpen={() => {
                              console.log({ Z3: driver.docs[index] });
                              setIsEditModalOpen(true);
                              setDeletedIndex(index);
                              setDriverPut({
                                ...driverPut,
                                phoneNumber: driver.docs[index].phoneNumber,
                                firstName: driver.docs[index].firstName,
                                lastName: driver.docs[index].lastName,
                                kartNumber: driver.docs[index].financial.kartNumber,
                                carSystem: driver.docs[index].driverInformation.carSystem,
                                carBrand: driver.docs[index].driverInformation.carBrand,
                                carColor: driver.docs[index].driverInformation.carColor,
                                carModel: driver.docs[index].driverInformation.carModel,
                                insuranceExpiryDate: driver.docs[index].driverInformation.insuranceExpiryDate,
                                vin: driver.docs[index].driverInformation.vin,
                                driverLicenseNumber: driver.docs[index].driverInformation.driverLicenseNumber,
                                insuranceNumber: driver.docs[index].driverInformation.insuranceNumber,
                                uniqueCodeThirdPartyInsurance:
                                  driver.docs[index].driverInformation.uniqueCodeThirdPartyInsurance,
                                nationalCode: driver.docs[index].driverInformation.nationalCode,
                                address: driver.docs[index].driverInformation.address,
                                shabaNumber: driver.docs[index].financial.shabaNumber,
                                gender: driver.docs[index].gender,
                                travelGroup: driver.docs[index].driverInformation.travelGroup._id,
                                financialGroup: driver.docs[index].driverInformation.financialGroup._id,
                                plateNumber: driver.docs[index].driverInformation.plateNumber,
                                agentId: driver.docs[index].driverInformation.agentId,
                              });
                            }}
                            onCancelModal={() => setIsEditModalOpen(false)}
                            isDeleteModalOpen={isDelModalOpen}
                            onDeleteModalOpen={() => setIsDelModalOpen(true)}
                            onDeleteCancelModal={() => setIsDelModalOpen(false)}
                            editChildren={
                              <div className="form edit-form" style={{ maxWidth: "80vw", height: "40vh" }}>
                                <div id="edit-driver" className="row" style={{ width: "100%" }}>
                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="PhoneNumber" className="label">
                                        <span className="">شماره همراه</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        style={{ direction: "ltr" }}
                                        name="PhoneNumber"
                                        type="text"
                                        minLength={11}
                                        maxLength={11}
                                        autoComplete="off"
                                        value={driverPut.phoneNumber}
                                        onChange={(e) => {
                                          if (e.target.value.match(regexes.numberRegex) || e.target.value === "") {
                                            e.target.value.length <= 11 &&
                                              setDriverPut({
                                                ...driverPut,
                                                phoneNumber: e.target.value,
                                              });
                                          } else {
                                            Toastify("error", "فقط عدد وارد کنید", "phone-number");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>
                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="name" className="label">
                                        <span className="">نام</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="name"
                                        type="text"
                                        value={driverPut.firstName}
                                        placeholder={item.firstName}
                                        onChange={(e) => {
                                          if (persianRex.text.test(e.target.value) || e.target.value === "") {
                                            setDriverPut({
                                              ...driverPut,
                                              firstName: e.target.value,
                                            });
                                          } else {
                                            Toastify("error", "فقط حروف فارسی مجاز هستند", "fa-firstName");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="familyName" className="label">
                                        <span className="">نام خانوادگی</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="familyName"
                                        type="text"
                                        maxLength={20}
                                        autoComplete="off"
                                        value={driverPut.lastName}
                                        placeholder={item.lastName}
                                        onChange={(e) => {
                                          if (persianRex.text.test(e.target.value) || e.target.value === "") {
                                            setDriverPut({
                                              ...driverPut,
                                              lastName: e.target.value,
                                            });
                                          } else {
                                            Toastify("error", "فقط حروف فارسی مجاز هستند", "fa-lastname");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="cart" className="label">
                                        <span className="">کد ملی</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="cart"
                                        type="text"
                                        maxLength={26}
                                        autoComplete="off"
                                        value={driverPut.nationalCode}
                                        placeholder={item.nationalCode}
                                        onChange={(e) => {
                                          if (regexes.numberRegex.test(e.target.value) || e.target.value === "") {
                                            e.target.value.length <= 10 &&
                                              setDriverPut({
                                                ...driverPut,
                                                nationalCode: e.target.value,
                                              });
                                          } else {
                                            Toastify("error", "فقط اعداد مجاز هستند", "fa-num-code-meli");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="cart" className="label">
                                        <span className="">شماره کارت </span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="cart"
                                        type="number"
                                        autoComplete="off"
                                        value={driverPut.kartNumber}
                                        placeholder={cc_format(item.financial?.kartNumber)}
                                        onChange={(e) => {
                                          if (regexes.kartNumberRegex.test(e.target.value) || e.target.value === "") {
                                            e.target.value.length <= 16 &&
                                              setDriverPut({
                                                ...driverPut,
                                                kartNumber: e.target.value,
                                              });
                                          } else {
                                            Toastify("error", "فقط اعداد مجاز هستند", "fa-num");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <DropDown2
                                        data={gender}
                                        defaultItem={item.gender === "MALE" ? gender[0] : gender[1]}
                                        onSelected={(val) => {
                                          setDriverPut({
                                            ...driverPut,
                                            gender: val.value,
                                          });
                                        }}
                                        labelName="جنسیت"
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="carSystem" className="label">
                                        <span className="">برند خودرو</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="carSystem"
                                        type="text"
                                        maxLength={25}
                                        autoComplete="off"
                                        value={driverPut.carBrand}
                                        placeholder={item.driverInformation.carBrand}
                                        onChange={(val) => {
                                          if (persianRex.text.test(val.target.value) || val.target.value === "") {
                                            setDriverPut({
                                              ...driverPut,
                                              carBrand: val.target.value,
                                            });
                                          } else {
                                            Toastify("error", "فقط حروف و اعداد فارسی مجاز است");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="carBrand" className="label">
                                        <span className="">مدل خودرو</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="carBrand"
                                        type="text"
                                        maxLength={25}
                                        autoComplete="off"
                                        value={driverPut.carSystem}
                                        placeholder={item.driverInformation.carSystem}
                                        onChange={(val) => {
                                          if (persianRex.text.test(val.target.value) || val.target.value === "") {
                                            setDriverPut({
                                              ...driverPut,
                                              carSystem: val.target.value,
                                            });
                                          } else {
                                            Toastify("error", "فقط حروف فارسی مجاز است");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="carColor" className="label">
                                        <span className="">رنگ خودرو</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="carColor"
                                        type="text"
                                        maxLength={20}
                                        autoComplete="off"
                                        value={driverPut.carColor}
                                        placeholder={item.driverInformation.carColor}
                                        onChange={(val) => {
                                          if (persianRex.text.test(val.target.value) || val.target.value === "") {
                                            setDriverPut({
                                              ...driverPut,
                                              carColor: val.target.value,
                                            });
                                          } else {
                                            Toastify("error", "فقط حروف فارسی مجاز است");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="carModel" className="label">
                                        <span className="">سال ساخت ماشین</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="carModel"
                                        type="number"
                                        maxLength={20}
                                        autoComplete="off"
                                        value={driverPut.carModel}
                                        placeholder={item.driverInformation.carModel}
                                        onChange={(val) => {
                                          val.target.value.length <= 10 &&
                                            setDriverPut({
                                              ...driverPut,
                                              carModel: val.target.value,
                                            });
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="carColor" className="label">
                                        <span className="">تاریخ پایان بیمه خودرو</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="carColor"
                                        type="number"
                                        maxLength={20}
                                        autoComplete="off"
                                        value={driverPut.insuranceExpiryDate}
                                        placeholder={item.driverInformation.insuranceExpiryDate}
                                        onChange={(val) => {
                                          val.target.value.length <= 15 &&
                                            setDriverPut({
                                              ...driverPut,
                                              insuranceExpiryDate: val.target.value,
                                            });
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="vin" className="label">
                                        <span className="">کد بارکد کارت ماشین</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="vin"
                                        type="text"
                                        maxLength={25}
                                        autoComplete="off"
                                        value={driverPut.vin}
                                        placeholder={item.driverInformation.vin}
                                        onChange={(val) => {
                                          if (/^[A-Z0-9]*$/.test(val.target.value) || val.target.value === "") {
                                            setDriverPut({
                                              ...driverPut,
                                              vin: val.target.value,
                                            });
                                          } else {
                                            Toastify("error", "فقط حروف بزرگ  و اعداد انگلیسی مجاز هستند");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="driverLicenseNumber" className="label">
                                        <span className="">شماره گواهینامه</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="driverLicenseNumber"
                                        type="text"
                                        maxLength={35}
                                        autoComplete="off"
                                        value={driverPut.driverLicenseNumber}
                                        placeholder={item.driverInformation.driverLicenseNumber}
                                        onChange={(val) => {
                                          if (regexes.numberRegex.test(val.target.value) || val.target.value === "") {
                                            setDriverPut({
                                              ...driverPut,
                                              driverLicenseNumber: val.target.value,
                                            });
                                          } else {
                                            Toastify("error", "فقط عدد مجاز است", "only-num");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="insuranceNumber" className="label">
                                        <span className="">شماره بیمه</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="insuranceNumber"
                                        type="text"
                                        maxLength={25}
                                        autoComplete="off"
                                        value={driverPut.insuranceNumber}
                                        placeholder={item.driverInformation.insuranceNumber}
                                        onChange={(val) => {
                                          setDriverPut({
                                            ...driverPut,
                                            insuranceNumber: val.target.value,
                                          });
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="carColor" className="label">
                                        <span className="">کد بیمه شخص ثالث</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="carColor"
                                        type="text"
                                        maxLength={35}
                                        autoComplete="off"
                                        value={driverPut.uniqueCodeThirdPartyInsurance}
                                        placeholder={item.driverInformation.uniqueCodeThirdPartyInsurance}
                                        onChange={(val) => {
                                          setDriverPut({
                                            ...driverPut,
                                            uniqueCodeThirdPartyInsurance: val.target.value,
                                          });
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5">
                                    <section>
                                      <label htmlFor="cart" className="label">
                                        <span className="">آدرس</span>
                                      </label>
                                      <input
                                        className="form-input"
                                        name="cart"
                                        type="text"
                                        maxLength={35}
                                        autoComplete="off"
                                        value={driverPut.address}
                                        onChange={(val) => {
                                          setDriverPut({
                                            ...driverPut,
                                            address: val.target.value,
                                          });
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-3 col-md-5 col-xs-5 shaba">
                                    <section>
                                      <label htmlFor="shaba" className="label">
                                        <span className="">شماره شبا </span>
                                      </label>
                                      <input
                                        className="form-input"
                                        type="text"
                                        name="shaba"
                                        autoComplete="off"
                                        placeholder={item.financial?.shabaNumber}
                                        value={driverPut.shabaNumber}
                                        onChange={(e) => {
                                          if (regexes.numberRegex.test(e.target.value) || e.target.value === "") {
                                            e.target.value.length <= 24 &&
                                              setDriverPut({
                                                ...driverPut,
                                                shabaNumber: e.target.value,
                                              });
                                          } else {
                                            Toastify("error", "فقط اعداد مجاز هستند", "only-num-shaba");
                                          }
                                        }}
                                      />
                                    </section>
                                  </div>

                                  <div className="inp-holder col-lg-12 col-md-12 col-xs-12 selectAgent">
                                    <section>
                                      <label htmlFor="insuranceNumber" className="label">
                                        <span className="">{"انتخاب آژانس"}</span>
                                      </label>
                                      <CustomSearchAgent
                                        onSelectUser={(user) => setDriverPut({ ...driverPut, agentId: user.id })}
                                      />
                                    </section>
                                    {/* <CustomSearchDropDown
								baseOn={baseOn}
								options={lastAgent}
								onSelect={(selected) => {}}
								onInputSearchChange={(e) => {
								  setSearchedAgent(e.search);
								  setBaseAgentSearch(e.base);
								}}
							  /> */}
                                  </div>
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
              <Pagination data={{ page, totalPages: driver.totalPages }} onPaginateClick={(_page) => setPage(_page)} />
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

export default DriversDataTable;
