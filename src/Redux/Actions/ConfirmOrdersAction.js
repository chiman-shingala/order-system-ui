import moment from "moment";
import { HTTP, headers } from "../../HTTP/HTTP";
import { getAuthLoginUser, unAuthorizedLogout } from "../../Services/AuthService/AuthService";
import { ApiHttp, CONFIRM_ORDERS_BY_ADMIN, DISPATCH_CONFIRM_ORDER, ORDER_MASTER_ORDER_RECEIVED, ORDER_MASTER_ORDER_RETURNED, RECEIVED_DISPATCH_ORDER, UPDATE_ORDERS_BY_ADMIN } from "../../Shared/Constants/ApiConstant";
import { CONFIRM_ORDERS } from "../Types/Type";
import { errorPopup } from "../../Shared/Constants/PopupConstant/PopupContant";
import { loaderService } from "../../Components/Loader/Loader";
import axios from "axios";
let loginDetail = getAuthLoginUser();

export const getConfirmOrder = (data) => {
    if (loginDetail.usercategoryId > 1) {
        data.CompanyId = loginDetail.companyId
    }
    let str = '';
    for (let key in data) {
        if (data[key] != '') {
            str += `${key}=${data[key]}&`
        }
    }
    str += `AcYear=${loginDetail.acYear}&UserId=${loginDetail.userId}`
    return async (dispatch) => {
        const response = await HTTP.get(`${CONFIRM_ORDERS_BY_ADMIN}?${str}`)
        let resData = response?.data?.Data;
        if (data.key) {
            resData = resData.filter(x => x[data.key] == true);
        }
        dispatch(ConfirmOrder(resData))
    }
}

export const updateConfirmOrder = (data, callbackData) => {
    let loginDetail = getAuthLoginUser();
    const payload = {
        UserId: loginDetail.userId,
        TrnNo: data.TrnNo,
        IsOrderConfirmed: data.IsOrderConfirmed,
        CompanyId: data.CompanyId,
        AcYear: loginDetail.acYear
    }
    return async (dispatch) => {
        loaderService(true)
        return axios.post(`${ApiHttp}${UPDATE_ORDERS_BY_ADMIN}`, payload, headers).then((res) => {
            if (res.data.StatusCode == 400) {
                errorPopup(res.data.Message)
            }
            loaderService(false)
            dispatch(getConfirmOrder(callbackData))
            return res;
        }).catch((error) => {
            unAuthorizedLogout(error);
            return error
        })
    }
}
export const dispatchConfirmOrder = (data, callbackData) => {
    let loginDetail = getAuthLoginUser();
    const payload = {
        UserId: loginDetail.userId,
        TrnNo: data.TrnNo,
        IsOrderDispatched: data.IsOrderDispatched,
        CompanyId: data.CompanyId,
        AcYear: loginDetail.acYear
    }
    return async (dispatch) => {
        loaderService(true)
        return axios.post(`${ApiHttp}${DISPATCH_CONFIRM_ORDER}`, payload, headers).then((res) => {
            if (res.data.StatusCode == 400) {
                errorPopup(res.data.Message)
            }
            loaderService(false)
            dispatch(getConfirmOrder(callbackData))
            return res;
        }).catch((error) => {
            unAuthorizedLogout(error);
            return error
        })
    }
}
export const receivedConfirmOrder = (data, callbackData) => {
    let loginDetail = getAuthLoginUser();
    const payload = {
        UserId: loginDetail.userId,
        TrnNo: data.TrnNo,
        IsOrderReceived: data.IsOrderReceived,
        CompanyId: data.CompanyId,
        AcYear: loginDetail.acYear
    }
    return async (dispatch) => {
        loaderService(true)
        return axios.post(`${ApiHttp}${ORDER_MASTER_ORDER_RECEIVED}`, payload, headers).then((res) => {
            if (res.data.StatusCode == 400) {
                errorPopup(res.data.Message)
            }
            loaderService(false)
            dispatch(getConfirmOrder(callbackData))
            return res;
        }).catch((error) => {
            unAuthorizedLogout(error);
            return error
        })
    }
}
export const returnedConfirmOrder = (data, callbackData) => {
    let loginDetail = getAuthLoginUser();
    const payload = {
        UserId: loginDetail.userId,
        TrnNo: data.TrnNo,
        IsOrderReturned: data.IsOrderReturned,
        CompanyId: data.CompanyId,
        AcYear: loginDetail.acYear
    }
    return async (dispatch) => {
        loaderService(true)
        return axios.post(`${ApiHttp}${ORDER_MASTER_ORDER_RETURNED}`, payload, headers).then((res) => {
            if (res.data.StatusCode == 400) {
                errorPopup(res.data.Message)
            }
            loaderService(false)
            dispatch(getConfirmOrder(callbackData))
            return res;
        }).catch((error) => {
            unAuthorizedLogout(error);
            return error
        })
    }
}

const ConfirmOrder = (data) => {
    return {
        type: CONFIRM_ORDERS,
        data: data
    }
}