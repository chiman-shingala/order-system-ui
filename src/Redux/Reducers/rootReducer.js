import { combineReducers } from "redux";
import { itemMasterReducer } from "./ItemMasterReducer";
import { menuMasterReducer } from "./menuMasterReducer";
import { companyMasterReducer } from "./CompanyMasterReducer";
import { orderMasterReducer } from "./orderMasterReducer";
import { userMasterReducer } from "./UserMasterReducer";
import { userCategoryMasterReducer } from "./userCategoryMasterReducer";
import { userWiseItemMasterReducer } from "./UserWiseItemMasterReducer";
import { orderDetailsByUserReducer } from "./OrderDetailsByUserReducer";
import { confirmOrdersReducer } from "./ConfirmOrderReducer";
import { dailyOrderSummaryReducer } from "./dailyOrderSummaryReducer";
import { getTotalOrderReducer } from "./GetTotalOrderCount";
import { getTopUserReducer } from "./GetTopUserReducer";
import { getTopItemReducer } from "./GetTopItemReducer";
import { paymentDetailreducer } from "./PaymentReducer";
import { partyMasterReducer } from "./PartyMasterReducer";
import { AgrMasterReducer } from "./AGRmasterReducer";
import { getPartyCode } from "./PartyCodeReducer";
import { getUserWisePartyMasterReducer } from "./UserWisePartymasterReducer";
import { allPartyReducer } from "./AllPartyReducer";


export const rootReducer = combineReducers({
    menu : menuMasterReducer,
    items : itemMasterReducer,
    company : companyMasterReducer,
    orders : orderMasterReducer,
    user : userMasterReducer,
    userCategory : userCategoryMasterReducer,
    userWiseItems : userWiseItemMasterReducer,
    orderDetails : orderDetailsByUserReducer,
    confirmOrders : confirmOrdersReducer,
    dailyOrder : dailyOrderSummaryReducer,
    orderCount : getTotalOrderReducer,
    topUser : getTopUserReducer,
    topItem : getTopItemReducer,
    paymentDetail : paymentDetailreducer,
    partyDetail:partyMasterReducer,
    agrDetail:AgrMasterReducer,
    partyCode:getPartyCode,
    userWiseParty: getUserWisePartyMasterReducer,
    allParty : allPartyReducer
})