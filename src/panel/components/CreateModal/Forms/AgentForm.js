import React, { memo, useEffect, useState } from "react"
import DropDown2 from "../../DropDown2"
import Cookies from "js-cookie"
import api from "../../../api"
import { createGlobalStyle } from "styled-components"
import { constants } from "../../../values"
import CustomButton from "../../CustomButton"
import Toastify from "../../Toastify"
import persianRex from "persian-rex"
import regexes from "../../../validation/regexes"
import { cc_format } from "../../../../helpers/function"
import agentValidation from "../../../validation/agentValidation"
import agentPatchValidation from "../../../validation/agentPatch"

const AgentForm = ({ step, setStep, AgentFormData, setAgentFormData, AgentFormPatchData, setAgentFormPatchData }) => {
  const [province, setProvince] = useState([
    {
      value: 300,
      label: "مازندران",
    },
    {
      value: 299,
      label: "گیلان",
    },
  ])
  const [superAgent, setSuperAgent] = useState()
  const [page, setPage] = useState(1)
  // const shebaFormat = /^(?:IR)(?=.{24}$)[0-9]*$/;
  useEffect(() => {
    // ! SuperAgent
    api.get.getSuperAgent({ page }).then((res) => {
      setSuperAgent(
        res.result.docs.map((item) => {
          return {
            label: item.superAgentInformation.superAgentName,
            value: item._id,
          }
        })
      )
    })
  }, [])

  // ! post data to server

  const [patchUser, setPatchUser] = useState(false)
  const [isLoading, setLoading] = useState()
  const submitHandler = async () => {
    const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    function toString(o) {
      Object.keys(o).forEach((k) => {
        if (typeof o[k] !== "object") {
          o[k] = p2e(o[k])
        }
      })

      return o
    }
    console.log({ isLoading })
    if (!isLoading) {
      setLoading(true)
      let resCreateAgent
      const isAdmin = Cookies.get(constants.USER_TYPE) !== "SUPER_AGENT"
      console.log({ patchUser, isAdmin })
      if (patchUser && isAdmin) resCreateAgent = await api.patch.adminUpdateUserToAgent(toString(AgentFormPatchData), setLoading)
      else if (patchUser && !isAdmin) resCreateAgent = await api.patch.superAgentUpdateUserToAgent(toString(AgentFormPatchData), setLoading)
      else if (!patchUser && isAdmin) resCreateAgent = await api.post.adminCreateAgent(toString(AgentFormData), setLoading)
      else if (!patchUser && !isAdmin) resCreateAgent = await api.post.superAgentCreateAgent(toString(AgentFormData), setLoading)
      if (resCreateAgent) {
        Toastify("success", "آژانس اضافه شد")
        setTimeout(() => window.location.reload(), 2000)
      }
    }
  }

  const checkNumber = (phoneNumber, userType) => {
    if (!phoneNumber.length) return Toastify("error", "شماره تلفن رو وارد کنید", "enter-phone")

    if (phoneNumber.charAt(0) !== "0" && phoneNumber.charAt(0) !== "۰") return Toastify("error", "شماره تلفن را با صفر وارد کنید", "enter-with-zero")
    if (phoneNumber.length !== 11) return Toastify("error", "شماره وارد شده اشتباه است", "invalid-phone")

    api.get.phoneNumberChecker({ phoneNumber, userType }).then((res) => {
      if (res.result.isUserExist && res.result.isUserTypeExist) {
        Toastify("error", "شماره تلفن با این نقش قبلاایجاد شده است", "phone-duplicated")
      }
      if (res.result.isUserExist && !res.result.isUserTypeExist) {
        setStep((prev) => prev + 1)
        setPatchUser(true)
        setAgentFormPatchData({
          ...AgentFormPatchData,
          userId: res.result.user._id,
        })
      }
      if (!res.result.isUserExist && !res.result.isUserTypeExist) {
        setStep((prev) => prev + 1)
      }
    })
  }

  return (
    <>
      {step === 1 && (
        <div className='form first-form'>
          <div className='inputWrapper'>
            <label htmlFor='PhoneNumber' className='label'>
              <span className='required'>شماره همراه</span>
            </label>
            <input
              className='form-input'
              style={{ direction: "ltr" }}
              name='PhoneNumber'
              type='text'
              minLength={11}
              maxLength={11}
              autoComplete='off'
              value={AgentFormData.phoneNumber}
              onChange={(e) => {
                if (e.target.value.match(regexes.numberRegex) || e.target.value === "") {
                  e.target.value.length <= 11 &&
                    setAgentFormData({
                      ...AgentFormData,
                      phoneNumber: e.target.value,
                    })
                } else {
                  Toastify("error", "فقط عدد وارد کنید", "phone-number")
                }
              }}
            />
          </div>
          <div className='buttonWrapper'>
            <CustomButton onClick={() => checkNumber(AgentFormData.phoneNumber, "AGENT")} text={"بررسی شماره"} />
          </div>
        </div>
      )}
      {step === 2 && (
        <>
          {!patchUser ? (
            <div className='form seconde-form'>
              <div className='inputWrapper'>
                <label htmlFor='agentName' className='label'>
                  <span className='required'>نام آژانس</span>
                </label>
                <input
                  className='form-input'
                  name='agentName'
                  type='text'
                  maxLength={20}
                  autoComplete='off'
                  value={AgentFormData.agentName}
                  onChange={(e) => {
                    if (persianRex.text.test(e.target.value) || e.target.value === "") {
                      setAgentFormData({
                        ...AgentFormData,
                        agentName: e.target.value,
                      })
                    } else {
                      Toastify("error", "فقط حروف فارسی مجاز هستند", "fa-agent")
                    }
                  }}
                />
              </div>
              <div className='inputWrapper'>
                <label htmlFor='Name' className='label'>
                  <span className='required'>نام</span>
                </label>
                <input
                  className='form-input'
                  name='Name'
                  type='text'
                  maxLength={20}
                  autoComplete='off'
                  value={AgentFormData.firstName}
                  onChange={(e) => {
                    if (persianRex.text.test(e.target.value) || e.target.value === "") {
                      setAgentFormData({
                        ...AgentFormData,
                        firstName: e.target.value,
                      })
                    } else {
                      Toastify("error", "فقط حروف فارسی مجاز هستند", "fa-firstName")
                    }
                  }}
                />
              </div>
              <div className='inputWrapper'>
                <label htmlFor='familyName' className='label'>
                  <span className='required'>نام خانوادگی</span>
                </label>
                <input
                  className='form-input'
                  name='familyName'
                  type='text'
                  maxLength={20}
                  autoComplete='off'
                  value={AgentFormData.lastName}
                  onChange={(e) => {
                    if (persianRex.text.test(e.target.value) || e.target.value === "") {
                      setAgentFormData({
                        ...AgentFormData,
                        lastName: e.target.value,
                      })
                    } else {
                      Toastify("error", "فقط حروف فارسی مجاز هستند", "fa-lastname")
                    }
                  }}
                />
              </div>
              <div className='inputWrapper'>
                <label htmlFor='mobileNumber' className='label'>
                  <span className='required'>شماره موبایل</span>
                </label>
                <input className='form-input' name='mobileNumber' type='number' maxLength={11} minLength={11} autoComplete='off' value={AgentFormData.phoneNumber} readOnly />
              </div>
              <div className='inputWrapper shaba'>
                <label htmlFor='shaba' className='label'>
                  <span className='required'>شماره شبا </span>
                </label>
                <input
                  className='form-input'
                  type='text'
                  name='shaba'
                  autoComplete='off'
                  placeholder='بدون IR وارد کنید'
                  value={AgentFormData.shabaNumber}
                  onChange={(e) => {
                    if (regexes.numberRegex.test(e.target.value) || e.target.value === "") {
                      e.target.value.length <= 24 &&
                        setAgentFormData({
                          ...AgentFormData,
                          shabaNumber: e.target.value,
                        })
                    } else {
                      Toastify("error", "فقط اعداد مجاز هستند", "fa-num-shaba")
                    }
                  }}
                />
              </div>
              <div className='inputWrapper'>
                <label htmlFor='cart' className='label'>
                  <span className='required'>شماره کارت </span>
                </label>
                <input
                  className='form-input'
                  name='cart'
                  type='text'
                  autoComplete='off'
                  value={AgentFormData.kartNumber ? cc_format(AgentFormData.kartNumber) : ""}
                  onChange={(e) => {
                    if (regexes.kartNumberRegex.test(e.target.value) || e.target.value === "") {
                      e.target.value.length <= 19 &&
                        setAgentFormData({
                          ...AgentFormData,
                          kartNumber: e.target.value,
                        })
                    } else {
                      Toastify("error", "فقط اعداد مجاز هستند", "fa-num-kart")
                    }
                  }}
                />
              </div>
              <div className='inputWrapper'>
                <label htmlFor='cart' className='label'>
                  <span className='required'>کد ملی</span>
                </label>
                <input
                  className='form-input'
                  name='cart'
                  type='text'
                  maxLength={26}
                  autoComplete='off'
                  value={AgentFormData.nationalCode}
                  onChange={(e) => {
                    if (regexes.numberRegex.test(e.target.value) || e.target.value === "") {
                      e.target.value.length <= 10 &&
                        setAgentFormData({
                          ...AgentFormData,
                          nationalCode: e.target.value,
                        })
                    } else {
                      Toastify("error", "فقط اعداد مجاز هستند", "fa-num-code-meli")
                    }
                  }}
                />
              </div>
              <div className='inputWrapper'>
                <label htmlFor='cart' className='label'>
                  <span className='required'>آدرس</span>
                </label>
                <input
                  className='form-input'
                  name='cart'
                  type='text'
                  maxLength={35}
                  autoComplete='off'
                  value={AgentFormData.address}
                  onChange={(val) => {
                    if (persianRex.text.test(val.target.value) || val.target.value === "") {
                      setAgentFormData({
                        ...AgentFormData,
                        address: val.target.value,
                      })
                    } else {
                      Toastify("error", "فقط حروف فارسی  و عدد مجاز است", "fa-num-address")
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <div className='form seconde-form'>
              <div className='inputWrapper'>
                <label htmlFor='agentName' className='label'>
                  <span className='required'>نام آژانس</span>
                </label>
                <input
                  className='form-input'
                  name='agentName'
                  type='text'
                  maxLength={20}
                  autoComplete='off'
                  value={AgentFormPatchData.agentName}
                  onChange={(e) => {
                    if (persianRex.text.test(e.target.value) || e.target.value === "") {
                      setAgentFormPatchData({
                        ...AgentFormPatchData,
                        agentName: e.target.value,
                      })
                    } else {
                      Toastify("error", "فقط حروف فارسی مجاز هستند", "name-fa")
                    }
                  }}
                />
              </div>
              <div className='inputWrapper shaba'>
                <label htmlFor='shaba' className='label'>
                  <span className='required'>شماره شبا </span>
                </label>
                <input
                  className='form-input'
                  type='text'
                  name='shaba'
                  autoComplete='off'
                  placeholder='بدون IR وارد کنید'
                  value={AgentFormPatchData.shabaNumber}
                  onChange={(e) => {
                    if (regexes.numberRegex.test(e.target.value) || e.target.value === "") {
                      e.target.value.length <= 24 &&
                        setAgentFormPatchData({
                          ...AgentFormPatchData,
                          shabaNumber: e.target.value,
                        })
                    } else {
                      Toastify("error", "فقط اعداد مجاز هستند", "fa-num-shaba")
                    }
                  }}
                />
              </div>
              <div className='inputWrapper'>
                <label htmlFor='cart' className='label'>
                  <span className='required'>شماره کارت </span>
                </label>
                <input
                  className='form-input'
                  name='cart'
                  type='text'
                  autoComplete='off'
                  value={AgentFormPatchData.kartNumber ? cc_format(AgentFormPatchData.kartNumber) : ""}
                  onChange={(e) => {
                    if (regexes.kartNumberRegex.test(e.target.value) || e.target.value === "") {
                      e.target.value.length <= 19 &&
                        setAgentFormPatchData({
                          ...AgentFormPatchData,
                          kartNumber: e.target.value,
                        })
                    } else {
                      Toastify("error", "فقط اعداد مجاز هستند", "fa-num")
                    }
                  }}
                />
              </div>
              <div className='inputWrapper'>
                <label htmlFor='cart' className='label'>
                  <span className='required'>کد ملی</span>
                </label>
                <input
                  className='form-input'
                  name='cart'
                  type='text'
                  maxLength={26}
                  autoComplete='off'
                  value={AgentFormPatchData.nationalCode}
                  onChange={(e) => {
                    if (regexes.numberRegex.test(e.target.value) || e.target.value === "") {
                      e.target.value.length <= 10 &&
                        setAgentFormPatchData({
                          ...AgentFormPatchData,
                          nationalCode: e.target.value,
                        })
                    } else {
                      Toastify("error", "فقط اعداد مجاز هستند", "fa-num-national-code")
                    }
                  }}
                />
              </div>
              <div className='inputWrapper'>
                <label htmlFor='cart' className='label'>
                  <span className='required'>آدرس</span>
                </label>
                <input
                  className='form-input'
                  name='cart'
                  type='text'
                  maxLength={35}
                  autoComplete='off'
                  value={AgentFormPatchData.address}
                  onChange={(e) => {
                    if (persianRex.text.test(e.target.value) || e.target.value === "") {
                      setAgentFormPatchData({
                        ...AgentFormPatchData,
                        address: e.target.value,
                      })
                    } else {
                      Toastify("error", "فقط حروف فارسی مجاز است", "fa-num-address")
                    }
                  }}
                />
              </div>
            </div>
          )}

          <div className='buttonWrapper'>
            <button
              className='NextButton'
              onClick={() => {
                if (patchUser) {
                  const isPatchFormValid = agentPatchValidation(AgentFormPatchData)
                  if (isPatchFormValid) setStep((prev) => prev + 1)
                } else {
                  const isFormValid = agentValidation(AgentFormData)

                  if (isFormValid) setStep((prev) => prev + 1)
                }
              }}
            >
              بعدی
              <div className='svg-icon next'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' fill='#cdcdde'>
                  <defs>
                    <style>{`.fa-secondary{opacity:.4}`}</style>
                  </defs>
                  <path
                    className='fa-primary'
                    d='M224 416c0 12.94-7.797 24.61-19.75 29.56c-11.97 4.953-25.72 2.219-34.88-6.938l-160-160C3.125 272.4 0 264.2 0 256s3.125-16.38 9.375-22.62l160-160c9.156-9.156 22.91-11.89 34.88-6.938C216.2 71.39 224 83.06 224 96V416z'
                  />
                  <path className='fa-secondary' d='M448 224v64c0 17.67-14.33 32-32 32h-192V192h192C433.7 192 448 206.3 448 224z' />
                </svg>
              </div>
            </button>
            <button className='PrevButton' onClick={() => setStep((prev) => prev - 1)}>
              <div className='svg-icon back'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' fill='#cdcdde'>
                  <defs>
                    <style>{`.fa-secondary{opacity:.4}`}</style>
                  </defs>
                  <path
                    className='fa-primary'
                    d='M224 416c0 12.94-7.797 24.61-19.75 29.56c-11.97 4.953-25.72 2.219-34.88-6.938l-160-160C3.125 272.4 0 264.2 0 256s3.125-16.38 9.375-22.62l160-160c9.156-9.156 22.91-11.89 34.88-6.938C216.2 71.39 224 83.06 224 96V416z'
                  />
                  <path className='fa-secondary' d='M448 224v64c0 17.67-14.33 32-32 32h-192V192h192C433.7 192 448 206.3 448 224z' />
                </svg>
              </div>
              قبلی
            </button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          {!patchUser ? (
            <div className='third-form'>
              {Cookies.get(constants.USER_TYPE) !== "SUPER_AGENT" ? (
                <div className='inputWrapper'>
                  <DropDown2
                    data={superAgent}
                    onSelected={(val) => {
                      setAgentFormData({
                        ...AgentFormData,
                        superAgentId: val.value,
                      })
                    }}
                    labelName='نام اتحادیه'
                  />
                </div>
              ) : null}
              <div className='inputWrapper'>
                <label htmlFor='cart' className='label'>
                  <span className='required'>کد آژانس</span>
                </label>
                <input
                  className='form-input'
                  name='cart'
                  type='text'
                  autoComplete='off'
                  value={AgentFormData.code}
                  onChange={(e) => {
                    if (regexes.numberRegex.test(e.target.value) || e.target.value === "") {
                      setAgentFormData({
                        ...AgentFormData,
                        code: e.target.value,
                      })
                    } else {
                      return Toastify("error", "فقط عدد وارد کنید", "fa-num-agent-code")
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <div className='third-form'>
              {Cookies.get(constants.USER_TYPE) !== "SUPER_AGENT" ? (
                <div className='inputWrapper'>
                  <DropDown2
                    data={superAgent}
                    onSelected={(val) => {
                      setAgentFormPatchData({
                        ...AgentFormPatchData,
                        superAgentId: val.value,
                      })
                    }}
                    labelName='نام اتحادیه'
                  />
                </div>
              ) : null}

              <div className='inputWrapper'>
                <label htmlFor='cart' className='label'>
                  <span className='required'>کد آژانس</span>
                </label>
                <input
                  className='form-input'
                  name='cart'
                  type='text'
                  autoComplete='off'
                  value={AgentFormPatchData.code}
                  onChange={(e) => {
                    if (regexes.numberRegex.test(e.target.value) || e.target.value === "") {
                      setAgentFormPatchData({
                        ...AgentFormPatchData,
                        code: e.target.value,
                      })
                    } else {
                      return Toastify("error", "فقط عدد وارد کنید", "fa-num-agent-code")
                    }
                  }}
                />
              </div>
            </div>
          )}

          <div className='buttonWrapper'>
            <button
              className='NextButton'
              onClick={() => {
                if (patchUser) {
                  if (!AgentFormPatchData.superAgentId.length && Cookies.get(constants.USER_TYPE) === "ADMIN") return Toastify("error", "نام اتحادیه وارد نشد", "su-agent-null")
                  if (!AgentFormPatchData.code.length) return Toastify("error", "کد آژانس وارد نشد", "agent-code-null")
                } else {
                  if (!AgentFormData.superAgentId.length && Cookies.get(constants.USER_TYPE) === "ADMIN") return Toastify("error", "نام اتحادیه وارد نشد", "su-agent-null")
                  if (!AgentFormData.code.length) return Toastify("error", "کد آژانس وارد نشد", "agent-code-null")
                }
                submitHandler()
              }}
            >
              تایید
            </button>
            <button className='PrevButton' onClick={() => setStep((prev) => prev - 1)}>
              <div className='svg-icon back'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' fill='#cdcdde'>
                  <defs>
                    <style>{`.fa-secondary{opacity:.4}`}</style>
                  </defs>
                  <path
                    className='fa-primary'
                    d='M224 416c0 12.94-7.797 24.61-19.75 29.56c-11.97 4.953-25.72 2.219-34.88-6.938l-160-160C3.125 272.4 0 264.2 0 256s3.125-16.38 9.375-22.62l160-160c9.156-9.156 22.91-11.89 34.88-6.938C216.2 71.39 224 83.06 224 96V416z'
                  />
                  <path className='fa-secondary' d='M448 224v64c0 17.67-14.33 32-32 32h-192V192h192C433.7 192 448 206.3 448 224z' />
                </svg>
              </div>
              قبلی
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default memo(AgentForm)
