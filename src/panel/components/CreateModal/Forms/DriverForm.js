import React, { memo, useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import api from "../../../api";
import { validSubmitPersonalInformation, validVehicleInfo } from "../../../validation";
import CustomButton from "../../CustomButton";
import CustomSearchDropDown from "../../CustomSearchDropDown";
import DropDown2 from "../../DropDown2";
import Plaque from "../../Plaque";
import { Toastify } from "../../../components";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persianRex from "persian-rex";
import { cc_format } from "../../../../helpers/function";
import regexes from "../../../validation/regexes";

const DriverForm = ({ step, setStep, DriverFormData, setDriverFormData }) => {
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
  const baseOn = [
    { name: "شماره همراه", value: "PHONE_NUMBER" },
    { name: "نام آژانس", value: "AGENT_NAME" },
    { name: "کد آژانس", value: "AGENT_CODE" },
  ];
  const [citise, setCitise] = useState();
  const [financialGroup, setFinancialGroup] = useState();
  const [Agent, setAgent] = useState();
  const [travelGroup, setTravelGroup] = useState();
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [page, setPage] = useState(1);
  const [isPatch, setIsPatch] = useState(false);
  const [lastAgent, setLastAgent] = useState([]);
  const [searchedAgent, setSearchedAgent] = useState("09");
  const [baseAgentSearch, setBaseAgentSearch] = useState(baseOn[0].value);
  const [gender, setGender] = useState([
    { value: "MALE", label: "آقا" },
    { value: "FEMALE", label: "خانم" },
  ]);
  useEffect(() => {
    api.get
      .findUserByPhoneNumber({ userType: "AGENT", searchValue: searchedAgent })
      .then((r) => setLastAgent(r.docs))
      .catch((e) => console.log({ e }));

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
  }, []);

  const submitHandler = async () => {
    const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    function toString(o) {
      Object.keys(o).forEach((k) => {
        if (typeof o[k] !== "object") {
          o[k] = p2e(o[k]);
        }
      });

      return o;
    }
    const newDriverFormData = toString(DriverFormData);
    if (DriverFormData.agentId.length < 1) return Toastify("error", "شناسه اتحادیه اشتباه است");
    else {
      let resMakeDriver;
      if (isPatch)
        resMakeDriver = await api.patch.makeDriver(newDriverFormData, userId).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
      else
        resMakeDriver = await api.post.makeDriver(newDriverFormData).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
    }
  };

  const checkNumber = async (phoneNumber, userType) => {
    if (!phoneNumber.length) return Toastify("error", "شماره تلفن رو وارد کنید", "empty-phone");
    if (phoneNumber.charAt(0) !== "0") return Toastify("error", "شماره تلفن را با صفر وارد کنید", "enter-with-zero");
    if (phoneNumber.length !== 11) return Toastify("error", "شماره وارد شده اشتباه است", "invalid-phone");

    setIsLoading(true);
    const resGetUser = await api.get.phoneNumberChecker({
      phoneNumber,
      userType,
    });
    const { isUserExist, isUserTypeExist, user } = resGetUser.result;
    setUserId(user._id);
    setIsLoading(false);
    if (isUserExist && isUserTypeExist) Toastify("error", "شماره تلفن با این نقش قبلا ایجاد شده است", "already-exist");
    else if (isUserExist && !isUserTypeExist) {
      const { firstName, lastName, nationalCode, financial } = user;
      setStep((prev) => {
        setIsPatch(true);
        setDriverFormData({
          ...DriverFormData,
          firstName,
          lastName,
          nationalCode,
          shabaNumber: financial && financial.shabaNumber,
          kartNumber: financial && financial.kartNumber,
        });
        return prev + 1;
      });
    } else {
      const { firstName, lastName, nationalCode, financial } = user;
      setStep((prev) => {
        setDriverFormData({
          ...DriverFormData,
          firstName,
          lastName,
          nationalCode,
          shabaNumber: financial && financial.shabaNumber,
          kartNumber: financial && financial.kartNumber,
        });
        return prev + 1;
      });
    }
  };

  const submitPersonalInformation = () => {
    const resValidation = validSubmitPersonalInformation(DriverFormData);
    if (resValidation) setStep(3);
  };

  const submitVehicleInformation = () => {
    const resValidation = validVehicleInfo(DriverFormData);
    if (resValidation) setStep(4);
  };
  const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

  useEffect(() => {
    if (baseAgentSearch === "PHONE_NUMBER") {
      api.get
        .findUserByPhoneNumber({ userType: "AGENT", searchValue: searchedAgent })
        .then((r) => setLastAgent(r.docs))
        .catch((e) => console.log({ e }));
    } else if (baseAgentSearch === "AGENT_CODE") {
      api.get
        .findUserAgentCode({ searchValue: searchedAgent })
        .then((r) => setLastAgent(r.docs))
        .catch((e) => console.log({ e }));
    } else {
      api.get
        .findUserByAgentName({ searchValue: searchedAgent })
        .then((r) => setLastAgent(r.docs))
        .catch((e) => console.log({ e }));
    }
  }, [searchedAgent]);
  return (
    <>
      {step === 1 && (
        <div className="form first-form">
          <div className="inputWrapper">
            <label htmlFor="PhoneNumber" className="label">
              <span className="required">شماره همراه</span>
            </label>
            <input
              className="form-input"
              style={{ direction: "ltr" }}
              name="PhoneNumber"
              type="text"
              minLength={11}
              maxLength={11}
              autoComplete="off"
              value={DriverFormData.phoneNumber}
              onChange={(e) => {
                if (e.target.value.match(regexes.numberRegex) || e.target.value === "") {
                  e.target.value.length <= 11 &&
                    setDriverFormData({
                      ...DriverFormData,
                      phoneNumber: e.target.value,
                    });
                } else {
                  Toastify("error", "فقط عدد وارد کنید", "phone-numbersd");
                }
              }}
            />
          </div>
          <div className="buttonWrapper">
            <CustomButton
              text={"بررسی شماره"}
              leftIcon={"fas fa-chevron-right"}
              isLoading={isLoading}
              disabled={false}
              onClick={() => {
                checkNumber(DriverFormData.phoneNumber, "DRIVER");
              }}
            />
          </div>
        </div>
      )}
      {step === 2 && (
        <>
          <div className="form seconde-form">
            <div className="inputWrapper">
              <label htmlFor="name" className="label">
                <span className="required">نام</span>
              </label>
              <input
                className="form-input"
                name="name"
                type="text"
                value={DriverFormData.firstName}
                onChange={(e) => {
                  if (persianRex.text.test(e.target.value) || e.target.value === "") {
                    setDriverFormData({
                      ...DriverFormData,
                      firstName: e.target.value,
                    });
                  } else {
                    Toastify("error", "فقط حروف فارسی مجاز هستند");
                  }
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="familyName" className="label">
                <span className="required">نام خانوادگی</span>
              </label>
              <input
                className="form-input"
                name="familyName"
                type="text"
                maxLength={20}
                autoComplete="off"
                value={DriverFormData.lastName}
                onChange={(e) => {
                  if (persianRex.text.test(e.target.value) || e.target.value === "") {
                    setDriverFormData({
                      ...DriverFormData,
                      lastName: e.target.value,
                    });
                  } else {
                    Toastify("error", "فقط حروف فارسی مجاز هستند");
                  }
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="mobileNumber" className="label">
                <span className="required">شماره موبایل</span>
              </label>
              <input
                className="form-input"
                name="mobileNumber"
                type="number"
                maxLength={11}
                minLength={11}
                autoComplete="off"
                value={DriverFormData.phoneNumber}
                readOnly={DriverFormData.phoneNumber && DriverFormData.phoneNumber.length > 0}
              />
            </div>
            <div className="inputWrapper shaba">
              <label htmlFor="shaba" className="label">
                <span className="required">شماره شبا </span>
              </label>
              <input
                className="form-input"
                type="text"
                name="shaba"
                autoComplete="off"
                placeholder="وارد کنید IR بدون"
                value={DriverFormData.shabaNumber}
                onChange={(e) => {
                  if (regexes.numberRegex.test(e.target.value) || e.target.value === "") {
                    e.target.value.length <= 24 &&
                      setDriverFormData({
                        ...DriverFormData,
                        shabaNumber: e.target.value,
                      });
                  } else {
                    Toastify("error", "فقط اعداد مجاز هستند");
                  }
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="cart" className="label">
                <span className="required">شماره کارت </span>
              </label>
              <input
                className="form-input"
                name="cart"
                type="text"
                autoComplete="off"
                value={DriverFormData.kartNumber ? cc_format(DriverFormData.kartNumber) : ""}
                onChange={(e) => {
                  if (regexes.kartNumberRegex.test(e.target.value) || e.target.value === "") {
                    e.target.value.length <= 19 &&
                      setDriverFormData({
                        ...DriverFormData,
                        kartNumber: e.target.value,
                      });
                  } else {
                    Toastify("error", "فقط اعداد مجاز هستند");
                  }
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="cart" className="label">
                <span className="required">کد ملی</span>
              </label>
              <input
                className="form-input"
                name="cart"
                type="text"
                maxLength={26}
                autoComplete="off"
                value={DriverFormData.nationalCode}
                onChange={(e) => {
                  if (regexes.numberRegex.test(e.target.value) || e.target.value === "") {
                    e.target.value.length <= 10 &&
                      setDriverFormData({
                        ...DriverFormData,
                        nationalCode: e.target.value,
                      });
                  } else {
                    Toastify("error", "فقط اعداد مجاز هستند");
                  }
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="cart" className="label">
                <span className="required">آدرس</span>
              </label>
              <input
                className="form-input"
                name="cart"
                type="text"
                maxLength={35}
                autoComplete="off"
                value={DriverFormData.address}
                onChange={(val) => {
                  setDriverFormData({
                    ...DriverFormData,
                    address: val.target.value,
                  });
                }}
              />
            </div>
            <div className="inputWrapper">
              <DropDown2
                data={gender}
                onSelected={(val) => {
                  setDriverFormData({
                    ...DriverFormData,
                    gender: val.value,
                  });
                }}
                labelName="جنسیت"
              />
            </div>
          </div>
          <div className="buttonWrapper">
            <CustomButton text={"بعدی"} onClick={submitPersonalInformation} leftIcon={"fal fa-chevron-right"} />
            <CustomButton text={"قبلی"} onClick={() => setStep(1)} rightIcon={"fal fa-chevron-left"} />
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <div className="form seconde-form">
            <div className="inputWrapper">
              <label htmlFor="carSystem" className="label">
                <span className="required">برند خودرو</span>
              </label>
              <input
                placeholder="مثال: سایپا"
                className="form-input"
                name="carSystem"
                type="text"
                maxLength={25}
                autoComplete="off"
                value={DriverFormData.carSystem}
                onChange={(val) => {
                  if (persianRex.text.test(val.target.value) || val.target.value === "") {
                    setDriverFormData({
                      ...DriverFormData,
                      carSystem: val.target.value,
                    });
                  } else {
                    Toastify("error", "فقط حروف فارسی مجاز است");
                  }
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="carBrand" className="label">
                <span className="required">مدل خودرو</span>
              </label>
              <input
                placeholder="مثال: پراید"
                className="form-input"
                name="carBrand"
                type="text"
                maxLength={25}
                autoComplete="off"
                value={DriverFormData.carBrand}
                onChange={(val) => {
                  if (persianRex.text.test(val.target.value) || val.target.value === "") {
                    setDriverFormData({
                      ...DriverFormData,
                      carBrand: val.target.value,
                    });
                  } else {
                    Toastify("error", "فقط حروف و اعداد فارسی مجاز است");
                  }
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="carColor" className="label">
                <span className="required">رنگ خودرو</span>
              </label>
              <input
                placeholder="مثال: مشکی"
                className="form-input"
                name="carColor"
                type="text"
                maxLength={20}
                autoComplete="off"
                value={DriverFormData.carColor}
                onChange={(val) => {
                  if (persianRex.text.test(val.target.value) || val.target.value === "") {
                    setDriverFormData({
                      ...DriverFormData,
                      carColor: val.target.value,
                    });
                  } else {
                    Toastify("error", "فقط حروف فارسی مجاز است");
                  }
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="carModel" className="label">
                <span className="required">سال ساخت ماشین</span>
              </label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                inputClass="form-input"
                portal
                zIndex={50000}
                onlyYearPicker
                onChange={(val) => {
                  setDriverFormData({
                    ...DriverFormData,
                    carModel: p2e(val.format("YYYY")),
                  });
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="carColor" className="label">
                <span className="required">تاریخ پایان بیمه خودرو</span>
              </label>

              <DatePicker
                calendar={persian}
                locale={persian_fa}
                inputClass="form-input"
                portal
                zIndex={50000}
                value={DriverFormData.insuranceExpiryDate}
                onChange={(val) => {
                  setDriverFormData({
                    ...DriverFormData,
                    insuranceExpiryDate: p2e(val.format("YYYY/MM/DD")),
                  });
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="vin" className="label">
                <span className="required">کد بارکد کارت ماشین</span>
              </label>
              <input
                className="form-input"
                name="vin"
                type="text"
                maxLength={17}
                autoComplete="off"
                value={DriverFormData.vin}
                onChange={(val) => {
                  if (/^[A-Z0-9]*$/.test(val.target.value) || val.target.value === "") {
                    setDriverFormData({
                      ...DriverFormData,
                      vin: val.target.value,
                    });
                  } else {
                    Toastify("error", "فقط حروف بزرگ  و اعداد انگلیسی مجاز هستند");
                  }
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="driverLicenseNumber" className="label">
                <span className="required">شماره گواهینامه</span>
              </label>
              <input
                className="form-input"
                name="driverLicenseNumber"
                type="text"
                maxLength={10}
                autoComplete="off"
                value={DriverFormData.driverLicenseNumber}
                onChange={(val) => {
                  if (regexes.numberRegex.test(val.target.value) || val.target.value === "") {
                    setDriverFormData({
                      ...DriverFormData,
                      driverLicenseNumber: val.target.value,
                    });
                  } else {
                    Toastify("error", "فقط عدد مجاز است", "only-num");
                  }
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="insuranceNumber" className="label">
                <span className="required">شماره بیمه</span>
              </label>
              <input
                className="form-input"
                name="insuranceNumber"
                type="text"
                maxLength={25}
                autoComplete="off"
                value={DriverFormData.insuranceNumber}
                onChange={(val) => {
                  setDriverFormData({
                    ...DriverFormData,
                    insuranceNumber: val.target.value,
                  });
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="carColor" className="label">
                <span className="required">کد بیمه شخص ثالث</span>
              </label>
              <input
                className="form-input"
                name="carColor"
                type="text"
                maxLength={35}
                autoComplete="off"
                value={DriverFormData.uniqueCodeThirdPartyInsurance}
                onChange={(val) => {
                  setDriverFormData({
                    ...DriverFormData,
                    uniqueCodeThirdPartyInsurance: val.target.value,
                  });
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="license" className="label">
                <span className="required">پلاک</span>
              </label>
              <Plaque
                onChange={(plaque) => {
                  setDriverFormData({
                    ...DriverFormData,
                    plateNumber: plaque,
                  });
                }}
              />
            </div>
          </div>
          <div className="buttonWrapper">
            <CustomButton text={"بعدی"} onClick={submitVehicleInformation} leftIcon={"fal fa-chevron-right"} />
            <CustomButton text={"قبلی"} onClick={() => setStep(2)} rightIcon={"fal fa-chevron-left"} />
          </div>
        </>
      )}
      {step === 4 && (
        <div className="third-form">
          <div className="inputWrapper">
            <div style={{ minWidth: "20vw" }}>
              <label htmlFor="carColor" className="label">
                <span className="required">{"انتخاب آژانس"}</span>
              </label>
              <CustomSearchDropDown
                options={lastAgent}
                baseOn={baseOn}
                onSelect={(e) => {
                  setDriverFormData({
                    ...DriverFormData,
                    agentId: e._id,
                  });
                }}
                onInputSearchChange={(e) => {
                  setSearchedAgent(e.search);
                  setBaseAgentSearch(e.base);
                }}
              />
            </div>
          </div>
          <div className="buttonWrapper">
            <CustomButton text={"تایید"} onClick={submitHandler} />
            <CustomButton text={"قبلی"} onClick={() => setStep(3)} rightIcon={"fal fa-chevron-left"} />
          </div>
        </div>
      )}
    </>
  );
};

export default memo(DriverForm);
