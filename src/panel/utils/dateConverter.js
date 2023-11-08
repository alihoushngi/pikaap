import * as shamsi from "shamsi-date-converter";

const dateConverter = (date) => {
  return shamsi.gregorianToJalali(date).join("/");
};

export default dateConverter;
