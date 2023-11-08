import { config } from "../values";
const superAgentRoute = config.BASE_URL + "administrator/super-agent";
const agent = config.BASE_URL + "administrator/agent";
const superAgentEditAgent = config.BASE_URL + "super-agent/agent";
const driver = config.BASE_URL + "administrator/driver";
const passengers = config.BASE_URL + "administrator/passenger";
const sendVerificationCode = config.BASE_URL + "user/send-verify-code";
const VerificationCode = config.BASE_URL + "user/verify-code";
const Invoice = config.BASE_URL + "invoice/s-f/all-user";
const province = config.BASE_URL + "province/get-all-province";
const city = config.BASE_URL + "province/get-all-city-province";
const financialGroups = config.BASE_URL + "financial-group";
const travelGroups = config.BASE_URL + "travel-group";
const createSuperAgent = config.BASE_URL + "administrator/super-agent";
const deleteSuperAgent = config.BASE_URL + "administrator/super-agent";
const deleteAgent = config.BASE_URL + "administrator/agent";
const deleteDriver = config.BASE_URL + "administrator/driver";
const deletePassengers = config.BASE_URL + "administrator/passenger";
const createInvoice = config.BASE_URL + "invoice";
const submitInvoice = config.BASE_URL + "invoice/submit";
const rejectInvoice = config.BASE_URL + "invoice/reject";
const DriverSandF = config.BASE_URL + "invoice/s-f/drivers";
const FilterSuperAgent = config.BASE_URL + "administrator/super-agent/sf";
const FilterAgent = config.BASE_URL + "administrator/agent/sf-a";
const FilterDriver = config.BASE_URL + "administrator/driver/sf";
const FilterPassengers = config.BASE_URL + "administrator/passenger/sf";
const getAllTransactions = config.BASE_URL + "transaction/find";
const getTravels = config.BASE_URL + "travels/find";
const getDashboardData = config.BASE_URL + "administrator";
const getSuperAgentDashboardData = config.BASE_URL + "super-agent";
const getPhoneNumberChecker = config.BASE_URL + "archivist/is-user-exist";
const adminCreateAgent = config.BASE_URL + "administrator/agent";
const superAgentCreateAgent = config.BASE_URL + "super-agent/agent";
const adminCreateDriver = config.BASE_URL + "administrator/driver";
const superAgentCreateDriver = config.BASE_URL + "super-agent/driver";
const agentCreateDriver = config.BASE_URL + "agent/driver";
const FilterInvoice = config.BASE_URL + "invoice/s-f/all-user";
const approvedDriver = config.BASE_URL + "administrator/driver/approve";
const patchSuperAgent = config.BASE_URL + "administrator/super-agent";
const patchAgent = config.BASE_URL + "administrator/agent";
const superAgentUpdateUserToAgent = config.BASE_URL + "super-agent/agent";
const adminUpdateUserToAgent = config.BASE_URL + "administrator/agent";
const checkLogin = config.BASE_URL + "archivist/is-user-exist";
const getAgentBySuperAgent = config.BASE_URL + "super-agent/agent";
const invoiceDriverFilter = config.BASE_URL + "invoice/s-f/drivers";
const invoiceSuperAgentFilter = config.BASE_URL + "invoice/s-f/super-agents";
const invoiceAgentFilter = config.BASE_URL + "invoice/s-f/agents";
const invoiceForAllUser = config.BASE_URL + "invoice/s-f/all-user";
const superAgentUpdate = config.BASE_URL + "administrator/super-agent";
const listAndFindInvoices = config.BASE_URL + "invoice/find";

const routes = {
  // ! ----------------------------------------------
  // ? super Agent
  superAgentCreateAgent,
  superAgentCreateDriver,
  superAgentRoute,
  createSuperAgent,
  patchSuperAgent,
  deleteSuperAgent,
  superAgentUpdate,
  FilterSuperAgent,
  superAgentUpdateUserToAgent,
  getAgentBySuperAgent,
  //  * super Agent
  // ! ----------------------------------------------
  // ? agent
  adminUpdateUserToAgent,
  adminCreateAgent,
  agentCreateDriver,
  agent,
  deleteAgent,
  FilterAgent,
  // * agent
  // ! ----------------------------------------------
  // ? driver
  deleteDriver,
  adminCreateDriver,
  DriverSandF,
  FilterDriver,
  approvedDriver,
  // * driver
  // ! ----------------------------------------------
  // ? invoice
  submitInvoice,
  rejectInvoice,
  FilterInvoice,
  createInvoice,
  invoiceDriverFilter,
  invoiceSuperAgentFilter,
  invoiceAgentFilter,
  invoiceForAllUser,
  listAndFindInvoices,
  // * invoice
  getDashboardData,
  getSuperAgentDashboardData,
  getTravels,
  getAllTransactions,
  driver,
  passengers,
  sendVerificationCode,
  VerificationCode,
  Invoice,
  province,
  city,
  financialGroups,
  travelGroups,
  deletePassengers,
  FilterPassengers,
  getPhoneNumberChecker,
  checkLogin,
  superAgentEditAgent,
};
export default routes;
