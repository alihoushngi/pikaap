import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import pikkapp from "../assets/Images/Pikaap.png";
import vector from "../assets/Images/TaxiVector.png";
import DropDown from "../components/DropDown";
import { UserContext } from "../context/UserContextProvider";
import api from "../api";
import "./index.scss";
import { CountDown, SelectRadio, Toastify, VerifictionInput } from "../components";
import { constants } from "../values";
import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth";

const userTypes = [
  {
    name: "ادمین",
    value: "ADMIN",
    id: "admin",
  },
  {
    name: "اتحادیه",
    value: "SUPER_AGENT",
    id: "superAgent",
  },
  {
    name: "نماینده",
    value: "AGENT",
    id: "agent",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState();
  const [userType, setUserType] = useState();
  const [show, setShow] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [VerificationCode, setVerificationCode] = useState();
  const isAuthenticate = useAuth();

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticate) navigate("/administrator/dashboard");
  }, []);

  const userChecker = (phoneNumber, userType) => {
    api.get.loginIsExitsChecker({ phoneNumber, userType }).then((res) => {
      if (!phoneNumber && !userType) {
        alert("شماره تلفن و نوع کاربر تعیین نشده است");
        setDisabledBtn(false);
        return null;
      } else if (!phoneNumber) {
        alert("شماره تلفن وارد نشده است");
        setDisabledBtn(false);
        return null;
      } else if (!userType) {
        alert("نوع کاربر تعیین نشده است");
        setDisabledBtn(false);
        return null;
      } else if (
        (res.result.isUserExist && !res.result.isUserTypeExist) ||
        (!res.result.isUserExist && !res.result.isUserTypeExist)
      ) {
        alert("کاربر نا معتبر است لطفا با پشتیبانی تماس بگیرید ");
        setDisabledBtn(false);
        return null;
      } else if (res.result.isUserExist && res.result.isUserTypeExist) {
        if (!phoneNumber && !userType) {
          alert("شماره تلفن و نوع کاربر تعیین نشده است");
          setDisabledBtn(false);
          return null;
        } else if (!phoneNumber) {
          alert("شماره تلفن وارد نشده است");
          setDisabledBtn(false);
          return null;
        } else if (!userType) {
          alert("نوع کاربر تعیین نشده است");
          setDisabledBtn(false);
          return null;
        } else if (phoneNumber && userType) {
          api.post
            .postVerificationCode({
              phoneNumber: phoneNumber,
              currency: "IRR",
              countryCode: "0098",
              language: "fa",
              userType: userType,
            })
            .then((res) => {
              if (res.CODE === 2010) {
                setShow(true);
                setTimeout(() => {
                  setDisabledBtn(false);
                }, 120000);
              }
              if (res.response.data.CODE === 5015) {
                setDisabledBtn(false);
                return Toastify("error", "خطا در ارسال کد لطفا بعد از ۲ دقیقه مجدد تلاش کنید");
              }
            });
        }
      }
    });
  };

  const sendVerificationCode = () => {};

  const verifyCode = () => {
    if (VerificationCode && VerificationCode.length === 5) {
      api.post
        .postSubmitVerficationCode({
          phoneNumber: phoneNumber,
          verificationCode: VerificationCode,
        })
        .then((response) => {
          console.log({ response });
          setUser({
            name: response.result.user.firstName,
            lastName: response.result.user.lastName,
            type: userType.value,
          });
          const tokens = response.result.user.tokens;
          tokens.map((token) => {
            if (token.userType === userType.value) {
              Cookies.set(constants.TOKEN, token.token, {
                expires: new Date().getFullYear(),
              });
              Cookies.set(constants.USER_TYPE, userType.value, {
                expires: new Date().getFullYear(),
              });
              Cookies.set(constants.USER_ID, response.result.user._id, {
                expires: new Date().getFullYear(),
              });
              Cookies.set(
                constants.USER_COORDINATES_LATITUDE,
                response.result.user.superAgentInformation.lat ? response.result.user.superAgentInformation.lat : "",
                {
                  expires: new Date().getFullYear(),
                }
              );
              Cookies.set(
                constants.USER_COORDINATES_LONGITUDE,
                response.result.user.superAgentInformation.long ? response.result.user.superAgentInformation.long : "",
                {
                  expires: new Date().getFullYear(),
                }
              );
            }
            return "";
          });
          window.location.reload();
        });
    } else {
    }
  };

  const [selectedReason, setSelectedReason] = useState();
  const reasonHandler = (value) => {
    setUserType(value);
  };

  return (
    <FromWrapper>
      <LoginAndRegisterFormWrapper>
        <FormWrapper>
          <LoginHeaderForm>
            <TitleHeader>ورورد به پیکاپ</TitleHeader>
            {/* <QuestionHeader>
							قبلا ثبت نام نکرده اید؟{" "}
							<Link
								style={{
									color: "#3699FF",
									fontWeight: "600",
									textDecoration: "none",
								}}
								to='#'
							>
								ثبت نام
							</Link>
						</QuestionHeader> */}
          </LoginHeaderForm>
          <InputWrapper>
            <InputGroup>
              <Label htmlFor="phoneNumber">شماره تلفن</Label>
              <Input
                type="tel"
                // pattern='[0-9]{4}-[0-9]{3}-[0-9]{4}'
                name="phoneNumber"
                maxLength="11"
                required
                // value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </InputGroup>
            <SelectionWrapper>
              <DropDown
                menuLink="role-menu"
                itemRow="item-row"
                itemText={userType ? userType.name : "نوع کاربر"}
                menuIcon="menu-icon"
                svgWrapper="svg-wrapper"
                menuTitle="menu-title"
                selectClass="subMenu"
                closeAfterClick={true}
                itemHasSubMenu={userTypes.map((user, index) => (
                  <span key={index} onClick={() => setUserType(user)}>
                    {user.name}
                  </span>
                ))}
              />
              {/* <SelectRadio
							item={userTypes}
							onRadioChange={reasonHandler}
							currentSelected={selectedReason}
							// id={`reason-${userType.id}`}
							// name={`reason-${userType.id}`}
						/> */}
            </SelectionWrapper>
            <SubmitButton
              onClick={() => {
                userChecker(phoneNumber, userType.value);
                setDisabledBtn(true);
              }}
              disabled={disabledBtn}
            >
              {show ? (
                <div className="deactivated-button">
                  ارسال مجدد <CountDown seconds={120} />
                </div>
              ) : (
                "ارسال کد"
              )}
            </SubmitButton>
            {show ? (
              <div style={{ marginTop: "1rem" }}>
                <InputGroup>
                  <AtrWrapper>
                    <Label htmlFor="reaciveCode">کد تایید</Label>
                  </AtrWrapper>
                  <VerifictionInput value={VerificationCode} setValue={setVerificationCode} />
                </InputGroup>
                <SubmitButtonWrapper>
                  <SubmitButton onClick={() => verifyCode()}>ورود</SubmitButton>
                </SubmitButtonWrapper>
              </div>
            ) : null}
          </InputWrapper>
          {/* <LinkWrapper>
						<Link to='#'>درباره ما</Link>
						<Link to='#'>پشتیبانی</Link>
						<Link to='#'>سوالات متداول</Link>
					</LinkWrapper> */}
        </FormWrapper>
      </LoginAndRegisterFormWrapper>
      <FormSIdeWrapper>
        <FormSIde>
          <FirstSection>
            <ImageWrapper>
              <Image src={pikkapp} />
            </ImageWrapper>
            <WellcomeTitle>به پیکاپ خوش آمدید</WellcomeTitle>
            <WellcomeDis>تجربه شگفت انگیز در کار با سرویس مسافربری</WellcomeDis>
          </FirstSection>
          <div>
            <VectorWrapepr>
              <Vector src={vector} />
            </VectorWrapepr>
          </div>
        </FormSIde>
      </FormSIdeWrapper>
    </FromWrapper>
  );
};

const FromWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: space-between;
  height: 100vh;
`;

const LoginAndRegisterFormWrapper = styled.div`
  margin: 0 auto;
  margin-top: 10rem;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
`;

const LoginHeaderForm = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const TitleHeader = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const QuestionHeader = styled.span`
  color: #474761;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectionWrapper = styled.div`
  margin-top: 1rem;
`;

const Input = styled.input`
  background-clip: padding-box;
  border: 1px solid #323248;
  padding: 0.825rem 1.5rem;
  font-size: 1.15rem;
  border-radius: 0.625rem;
  background-color: #1e1e2d;
  border-color: #1e1e2d;
  color: #92929f;
  transition: color 0.2s ease, background-color 0.2s ease;
  :focus {
    background-color: #171723 !important;
    border-color: #171723 !important;
  }
`;

const AtrWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const ForgetLink = styled.button`
  background-color: transparent;
  border: none;
  color: #474761;
  font-weight: 500;
  font-family: inherit;
  margin-bottom: 0.5rem;
`;

const SubmitButtonWrapper = styled.div``;
const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5rem 1.5rem;
  margin-top: 1rem;
  background-color: #187de4;
  border-radius: 0.625rem;
  font-family: inherit;
  color: #ffffff;
  border: 0;
  &:disabled {
    background-color: #40658a;
    opacity: 0.6;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
  a {
    text-decoration: none;
    color: #565674;
    transition: color 0.2s ease, background-color 0.2s ease;
    :hover {
      color: #0073e9;
    }
  }
`;

const FormSIdeWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const FormSIde = styled.div`
  width: 600px;
  background-color: #1e1e2d;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: space-between;
`;

const FirstSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  margin-top: 11rem;
  margin-bottom: 1.5rem;
`;

const Image = styled.img`
  width: 150px;
`;

const WellcomeTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const WellcomeDis = styled.span``;

const VectorWrapepr = styled.div`
  width: 600px;
  bottom: 0;
`;
const Vector = styled.img`
  width: 100%;
`;

export default Login;
