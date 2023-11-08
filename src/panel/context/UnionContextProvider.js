import React, { createContext, useEffect, useState } from "react";
import TaxiAvatar from "../assets/Images/TaxiAvatar.jpg";
import maneger from "../assets/Images/image-user.svg";
import unionPhoto from "../assets/Images/square-u.svg";
import taxiPhoto from "../assets/Images/square-t.svg";
import taxtionPhoto from "../assets/Images/square-dollar.svg";
import Driver from "../assets/Images/square-c.svg";
import travelImage from "../assets/Images/square-poll-vertical.svg";

export const UnionContext = createContext();
const UnionContextProvider = ({ children }) => {
  const [union, setUnion] = useState(() => {
    let unionData = [
      {
        id: 1,
        group: "اتحادیه",
        image: TaxiAvatar,
        name: "رامسر",
        call: "09981560306",
        unionCode: 1234,
        amount: 20000,
        travelGroup: "سفر1",
        financialGroup: "مالی 1",
        financial: [
          {
            image: maneger,
            name: "مدیر",
            persentage: 12,
            membershipShare: 2213000,
          },
          {
            image: unionPhoto,
            name: "اتحادیه",
            persentage: 14,
            membershipShare: 457,
          },
          {
            image: taxiPhoto,
            name: "آژانس",
            persentage: 45,
            membershipShare: 8837,
          },
          {
            image: taxtionPhoto,
            name: "مالیات",
            persentage: 13,
            membershipShare: 8373,
          },
          {
            image: Driver,
            name: "راننده",
            persentage: 17,
            membershipShare: 0,
          },
        ],
        travel: {
          image: travelImage,
          minTraveling: 5,
          startPayTravel: 12000,
          morePayTravel: 2000,
          forYears: 1,
          trafic: 1.2,
          moreKilometers: 3000,
        },
      },
      {
        id: 2,
        group: "اتحادیه",
        image: TaxiAvatar,
        name: "تهران",
        call: "09981560306",
        unionCode: 15634,
        amount: 20100,
        travelGroup: "سفر7",
        financialGroup: "مالی 2",
        financial: [
          {
            image: maneger,
            name: "مدیر",
            persentage: 46,
            membershipShare: 86345,
          },

          {
            image: unionPhoto,
            name: "اتحادیه",
            persentage: 76,
            membershipShare: 7387,
          },
          {
            image: taxiPhoto,
            name: "آژانس",
            persentage: 97,
            membershipShare: 37883,
          },
          {
            image: taxtionPhoto,
            name: "مالیات",
            persentage: 56,
            membershipShare: 1737,
          },
          {
            image: Driver,
            name: "راننده",
            persentage: 10,
            membershipShare: 0,
          },
        ],
        travel: {
          image: travelImage,
          minTraveling: 5,
          startPayTravel: 15000,
          morePayTravel: 2000,
          forYears: 1,
          trafic: 1.2,
          moreKilometers: 3000,
          eling: 5,
        },
      },
      {
        id: 3,
        group: "اتحادیه",
        image: TaxiAvatar,
        name: "رشت",
        call: "09981560306",
        unionCode: 15634,
        amount: 2100,
        travelGroup: "سفر8",
        financialGroup: "مالی 3",
        financial: [
          {
            image: maneger,
            name: "مدیر",
            persentage: 10,
            membershipShare: 788956,
          },

          {
            image: unionPhoto,
            name: "اتحادیه",
            persentage: 10,
            membershipShare: 48612,
          },
          {
            image: taxiPhoto,
            name: "آژانس",
            persentage: 10,
            membershipShare: 94123,
          },
          {
            image: taxtionPhoto,
            name: "مالیات",
            persentage: 10,
            membershipShare: 1654,
          },
          {
            image: Driver,
            name: "راننده",
            persentage: 10,
            membershipShare: 0,
          },
        ],
        travel: {
          image: travelImage,
          minTraveling: 5,
          startPayTravel: 15000,
          morePayTravel: 2000,
          forYears: 1,
          trafic: 1.2,
          moreKilometers: 3000,
          eling: 5,
        },
      },
      {
        id: 4,
        group: "اتحادیه",
        image: TaxiAvatar,
        name: "آبادان",
        call: "09981560306",
        unionCode: 15634,
        amount: 30500,
        travelGroup: "سفر2",
        financialGroup: "مالی",
        financial: [
          {
            image: maneger,
            name: "مدیر",
            persentage: 10,
            membershipShare: 16461,
          },

          {
            image: unionPhoto,
            name: "اتحادیه",
            persentage: 10,
            membershipShare: 64165,
          },
          {
            image: taxiPhoto,
            name: "آژانس",
            persentage: 10,
            membershipShare: 416631,
          },
          {
            image: taxtionPhoto,
            name: "مالیات",
            persentage: 10,
            membershipShare: 6510,
          },
          {
            image: Driver,
            name: "راننده",
            persentage: 10,
            membershipShare: 0,
          },
        ],
        travel: {
          image: travelImage,
          minTraveling: 5,
          startPayTravel: 15000,
          morePayTravel: 2000,
          forYears: 1,
          trafic: 1.2,
          moreKilometers: 3000,
          eling: 5,
        },
      },
      {
        id: 5,
        group: "اتحادیه",
        image: TaxiAvatar,
        name: "بوشهر",
        call: "09981560306",
        unionCode: 15634,
        amount: 1250,
        travelGroup: "سفر1",
        financialGroup: "مالی",
        financial: [
          {
            image: maneger,
            name: "مدیر",
            persentage: 10,
            membershipShare: 89416,
          },

          {
            image: unionPhoto,
            name: "اتحادیه",
            persentage: 10,
            membershipShare: 9461,
          },
          {
            image: taxiPhoto,
            name: "آژانس",
            persentage: 10,
            membershipShare: 6416,
          },
          {
            image: taxtionPhoto,
            name: "مالیات",
            persentage: 10,
            membershipShare: 49165,
          },
          {
            image: Driver,
            name: "راننده",
            persentage: 10,
            membershipShare: 0,
          },
        ],
        travel: {
          image: travelImage,
          minTraveling: 5,
          startPayTravel: 15000,
          morePayTravel: 2000,
          forYears: 1,
          trafic: 1.2,
          moreKilometers: 3000,
          eling: 5,
        },
      },
      {
        id: 6,
        group: "اتحادیه",
        image: TaxiAvatar,
        name: "ساری",
        call: "09981560306",
        unionCode: 15634,
        amount: 12530,
        travelGroup: "سفر6",
        financialGroup: "مالی",
        financial: [
          {
            image: maneger,
            name: "مدیر",
            persentage: 10,
            membershipShare: 6161,
          },

          {
            image: unionPhoto,
            name: "اتحادیه",
            persentage: 10,
            membershipShare: 216165,
          },
          {
            image: taxiPhoto,
            name: "آژانس",
            persentage: 10,
            membershipShare: 5494156,
          },
          {
            image: taxtionPhoto,
            name: "مالیات",
            persentage: 10,
            membershipShare: 64161,
          },
          {
            image: Driver,
            name: "راننده",
            persentage: 10,
            membershipShare: 0,
          },
        ],
        travel: {
          image: travelImage,
          minTraveling: 5,
          startPayTravel: 15000,
          morePayTravel: 2000,
          forYears: 1,
          trafic: 1.2,
          moreKilometers: 3000,
        },
      },
      {
        id: 7,
        group: "اتحادیه",
        image: TaxiAvatar,
        name: "املش",
        call: "09981560306",
        unionCode: 83134,
        amount: 65120,
        travelGroup: "سفر7",
        financialGroup: "مالی",
        financial: [
          {
            image: maneger,
            name: "مدیر",
            persentage: 10,
            membershipShare: 4961,
          },

          {
            image: unionPhoto,
            name: "اتحادیه",
            persentage: 10,
            membershipShare: 4610,
          },
          {
            image: taxiPhoto,
            name: "آژانس",
            persentage: 10,
            membershipShare: 64163,
          },
          {
            image: taxtionPhoto,
            name: "مالیات",
            persentage: 10,
            membershipShare: 1612,
          },
          {
            image: Driver,
            name: "راننده",
            persentage: 10,
            membershipShare: 0,
          },
        ],
        travel: {
          image: travelImage,
          minTraveling: 5,
          startPayTravel: 15000,
          morePayTravel: 2000,
          forYears: 1,
          trafic: 1.2,
          moreKilometers: 3000,
          eling: 5,
        },
      },
      {
        id: 8,
        group: "اتحادیه",
        image: TaxiAvatar,
        name: "چمسغال",
        call: "09981560306",
        unionCode: 1556134,
        amount: 2160540,
        travelGroup: "سفر3",
        financialGroup: "مالی",
        financial: [
          {
            image: maneger,
            name: "مدیر",
            persentage: 10,
            membershipShare: 59616,
          },

          {
            image: unionPhoto,
            name: "اتحادیه",
            persentage: 10,
            membershipShare: 641631,
          },
          {
            image: taxiPhoto,
            name: "آژانس",
            persentage: 10,
            membershipShare: 4613,
          },
          {
            image: taxtionPhoto,
            name: "مالیات",
            persentage: 10,
            membershipShare: 41613,
          },
          {
            image: Driver,
            name: "راننده",
            persentage: 10,
            membershipShare: 0,
          },
        ],
        travel: {
          image: travelImage,
          minTraveling: 5,
          startPayTravel: 15000,
          morePayTravel: 2000,
          forYears: 1,
          trafic: 1.2,
          moreKilometers: 3000,
          eling: 5,
        },
      },
      {
        id: 9,
        group: "اتحادیه",
        image: TaxiAvatar,
        name: "مهاباد",
        call: "09981560306",
        unionCode: 155434,
        amount: 95100,
        travelGroup: "سفر5",
        financialGroup: "مالی",
        financial: [
          {
            image: maneger,
            name: "مدیر",
            persentage: 10,
            membershipShare: 1612,
          },

          {
            image: unionPhoto,
            name: "اتحادیه",
            persentage: 10,
            membershipShare: 459612,
          },
          {
            image: taxiPhoto,
            name: "آژانس",
            persentage: 10,
            membershipShare: 5261,
          },
          {
            image: taxtionPhoto,
            name: "مالیات",
            persentage: 10,
            membershipShare: 564651,
          },
          {
            image: Driver,
            name: "راننده",
            persentage: 10,
            membershipShare: 0,
          },
        ],
        travel: {
          image: travelImage,
          minTraveling: 5,
          startPayTravel: 15000,
          morePayTravel: 2000,
          forYears: 1,
          trafic: 1.2,
          moreKilometers: 3000,
          eling: 5,
        },
      },
      {
        id: 10,
        group: "اتحادیه",
        image: TaxiAvatar,
        name: "رودبار",
        call: "09981560306",
        unionCode: 15784,
        amount: 2640,
        travelGroup: "سفر2",
        financialGroup: "مالی",
        financial: [
          {
            image: maneger,
            name: "مدیر",
            persentage: 10,
            membershipShare: 54615,
          },

          {
            image: unionPhoto,
            name: "اتحادیه",
            persentage: 10,
            membershipShare: 16,
          },
          {
            image: taxiPhoto,
            name: "آژانس",
            persentage: 10,
            membershipShare: 6416,
          },
          {
            image: taxtionPhoto,
            name: "مالیات",
            persentage: 10,
            membershipShare: 64165,
          },
          {
            image: Driver,
            name: "راننده",
            persentage: 10,
            membershipShare: 0,
          },
        ],
        travel: {
          image: travelImage,
          minTraveling: 5,
          startPayTravel: 15000,
          morePayTravel: 2000,
          forYears: 1,
          trafic: 1.2,
          moreKilometers: 3000,
          eling: 5,
        },
      },
    ];

    const ls = localStorage.getItem("union");
    if (ls) {
      unionData = JSON.parse(ls);
    }
    return unionData;
  });

  useEffect(() => {
    localStorage.setItem("union", JSON.stringify(union));
  }, [union]);

  return <UnionContext.Provider value={{ union, setUnion }}>{children}</UnionContext.Provider>;
};

export default UnionContextProvider;
