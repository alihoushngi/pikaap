// number farsi or eng
const numberRegex = new RegExp(/^[۰۱۲۳۴۵۶۷۸۹0-9]*$/);

// ONLY NUMBER
const kartNumberRegex = new RegExp(/[۰۱۲۳۴۵۶۷۸۹0-9]/);
// letter fa only

//text fa + num

// const shebaFormat = /^(?:IR)(?=.{24}$)[0-9]*$/;

const regexes = {
	numberRegex,
	kartNumberRegex,
};
export default regexes;
