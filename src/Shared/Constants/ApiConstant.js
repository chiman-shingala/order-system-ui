export const ApiHttp = 'http://localhost:4000/api/';

export const USER_LOGIN = 'User/login';
export const LOGOUT = 'User/logout';
export const GET_ITEMS = 'ItemMaster/item';
export const ADD_ITEMS = 'ItemMaster/addItem';
export const UPDATE_ITEMS = 'ItemMaster/updateItem';
export const DELETE_ITEMS = 'ItemMaster/deleteItem';
export const GET_ITEM_BY_COMPANY_ID = 'ItemMaster/itemByCompanyId';

export const GET_MENU = 'MenuMaster/GetMenu';

export const GET_COMPANIES = 'CompanyMaster/company';
export const ADD_COMPANIES = 'CompanyMaster/addCompany';
export const EDIT_COMPANIES = 'CompanyMaster/updateCompany';
export const DELETE_COMPANY = 'CompanyMaster/deleteCompany';

export const GET_USERS = 'User/user';
export const ADD_USERS = 'User/addUser';
export const UPDATE_USERS = 'User/updateUser';
export const DELETE_USERS = 'User/deleteUser';

export const GET_ORDERS_TRNNO = 'OrderDetail/getOrderDetailsFromTrnNo';
export const INSERT_DETAIL = 'OrderDetail/insertOrder';
export const DELETE_ORDER_DETAIL = 'OrderDetail/deleteOrderDetail';
export const CHANGE_USER_PASSWORD = 'User/ChangeUserPassword';
export const USER_CATEGORY = 'UserCategoryMaster/UserCategory';
export const GET_USER_WISE_ITEM = 'UserWiseItemMaster/getUserWiseItemMaster';
export const ADD_USER_WISE_ITEM = 'UserWiseItemMaster/addUserWiseItem';
export const ORDER_DETAIL_CONFIRM_ORDER = 'OrderDetail/orderDetailOrderConfirmed';
export const ORDER_DETAIL_DISPATCH_ORDER = 'OrderDetail/orderDetailOrderDispatched';
export const ORDER_DETAILS_BY_USER = 'OrderDetailByUser/oderDetailByUser';
export const CONFIRM_ORDERS_BY_ADMIN = 'OrderDetail/getOrderMasterDetails';
export const UPDATE_ORDERS_BY_ADMIN = 'OrderDetail/orderMasterOrderConfirmed';
export const DISPATCH_CONFIRM_ORDER = 'OrderDetail/orderMasterOrderDispatched';
export const ORDER_MASTER_ORDER_RECEIVED = 'OrderDetail/orderMasterOrderReceived';
export const ORDER_DETAIL_ORDER_RECEIVED = 'OrderDetail/orderDetailOrderReceived';
export const GET_ITEM_PERMISSION = 'UserWiseItemMaster/getItemForOrderAsync';
export const GET_DAILY_ORDER_SUMMARY = 'Report/getDailyOrderSummary';
export const GET_ORDER_TOTAL_COUNT_SUMMARY = 'OrderDetail/getTotalOrders';
export const GET_TOP_USER_DETAIL = 'User/topUser';
export const GET_TOP_ITEM_DETAIL = 'ItemMaster/topItems';
export const ADD_PAYMENT = 'Payment/addPayment';
export const GET_PAYMENT_DETAIL = 'Payment/getPaymentDetail';
export const GET_PARTY_DETAIL = 'PartyMast/getPartyMastDetails';
export const GET_ALL_PARTY = 'PartyMast/getAllParty';
export const ORDER_MASTER_ORDER_RETURNED = 'OrderDetail/orderMasterOrderReturn';
export const ORDER_DETAIL_ORDER_RETURNED = 'OrderDetail/orderDetailOrderReturn';
export const UPDATE_DETAIL_ORDER_ITEM = 'UserWiseItemMaster/addUserWiseItem';

export const GET_AGR_DETAIL = 'PartyMast/getAgrpMasterDetails';
export const ADD_NEW_PARTY = 'PartyMast/addpartyMastDetail';
export const DELETE_PARTY = 'PartyMast/deletePartyMastDetail';
export const GET_PARTY_CODE = 'PartyMast/getPartyCode';
export const GET_USER_WISE_PARTY = 'UserWisePartyMaster/getUserWisePartyMaster';
export const ADD_USER_WISE_PARTY = 'UserWisePartyMaster/addUserWiseParty';
export const UPDATE_USER_WISE_PARTY = 'UserWisePartyMaster/updateUserWisePartyMaster';
export const GET_PARTY_PERMISSION = 'UserWisePartyMaster/getPartyForOrder';
export const ORDER_DETAIL_GLOBAL_DATA= 'GlobalSearch/global';
