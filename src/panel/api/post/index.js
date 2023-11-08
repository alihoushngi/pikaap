import postVerificationCode from "./postVerificationCode";
import postSubmitVerficationCode from "./postSubmitVerficationCode";
import postInvoice from "./postInvoice";
import postCreateSuperAgent from "./postCreateSuperAgent";
import postCreateInvoice from "./postCreateInvoice";
import postFilterSuperAgent from "./postFilterSuperAgent";
import postFilterAgent from "./postFilterAgent";
import postFilterDriver from "./postFilterDriver";
import postFilterPassengers from "./postFilterPassengers";
import getAllTransactions from "./getAllTransactions";
import CreateAgent from "./CreateAgent";
import superAgentCreateAgent from "./superAgentCreateAgent";
import adminCreateAgent from "./adminCreateAgent";
import CreateDriver from "./CreateDriver";
import postFilterInvoces from "./postFilterInvoces";
import makeDriver from "./makeDriver";
import filterinvoiceDriver from "./filterinvoiceDriver";
import filterInvoiceSuperAgent from "./filterInvoiceSuperAgent";
import filterInvoiceAgent from "./filterInvoiceAgent";
import filterInvoiceForAllUser from "./filterInvoiceForAllUser";
import CreateFinancialGroup from "./CreateFinancialGroup";
import findUser from "./findUser";
import findSuperAgent from "./findSuperAgent";
import findAgent from "./findAgent";

const post = {
  findAgent,
  findSuperAgent,
  findUser,
  superAgentCreateAgent,
  adminCreateAgent,
  makeDriver,
  getAllTransactions,
  postVerificationCode,
  postSubmitVerficationCode,
  postInvoice,
  postCreateSuperAgent,
  postCreateInvoice,
  postFilterSuperAgent,
  postFilterAgent,
  postFilterDriver,
  postFilterPassengers,
  CreateAgent,
  CreateDriver,
  postFilterInvoces,
  filterinvoiceDriver,
  filterInvoiceSuperAgent,
  filterInvoiceAgent,
  filterInvoiceForAllUser,
  CreateFinancialGroup,
};
export default post;
