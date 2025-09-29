import { HTTP, headers } from "../../HTTP/HTTP"
import { GET_ORDER_BY_TRNNO } from "../Types/Type"
import { ApiHttp, DELETE_ORDER_DETAIL, GET_ITEM_PERMISSION, GET_ORDERS_TRNNO, GET_PARTY_PERMISSION, INSERT_DETAIL, ORDER_DETAIL_CONFIRM_ORDER, ORDER_DETAIL_DISPATCH_ORDER, ORDER_DETAIL_ORDER_RECEIVED, ORDER_DETAIL_ORDER_RETURNED } from "../../Shared/Constants/ApiConstant"
import { getAuthLoginUser, unAuthorizedLogout } from "../../Services/AuthService/AuthService"
import { loaderService } from "../../Components/Loader/Loader"
import axios from "axios"
import { errorPopup } from "../../Shared/Constants/PopupConstant/PopupContant"
import { getConfirmOrder } from "./ConfirmOrdersAction"
export const getOrderByTrno = (TrnNo) => {
    let loginUser = getAuthLoginUser();
    if(TrnNo){
        let url = `?CompanyId=${loginUser.companyId}&AcYear=${loginUser.acYear}&TrnNo=${TrnNo}&UserId=${loginUser.userId}`
        return async (dispatch) => {
            const response = await HTTP.get(GET_ORDERS_TRNNO+url)
            dispatch(getOrder(response?.data?.Data))
        }
    }

}

export const setBlankOrder = () => {
    return async (dispatch) => {
        dispatch(getOrder([]))
    }
}

export const confirmOrderByTrnNo =(data, callbackData)=>{
    let loginDetail = getAuthLoginUser();
    const payload = {
        UserId : loginDetail.userId,
        TrnNo : data.TrnNo,
        IsOrderConfirmed : data.IsOrderConfirmed,
        SeqNo : data.SeqNo,
        CompanyId : data.CompanyId,
        AcYear: loginDetail.acYear
    }
    return async (dispatch) => {
        loaderService(true)
        return axios.post(`${ApiHttp}${ORDER_DETAIL_CONFIRM_ORDER}`, payload , headers).then((res) => {
            if(res.data.StatusCode == 400){
                errorPopup(res.data.Message)
            }
            loaderService(false)
            dispatch(getConfirmOrder(callbackData))
            dispatch(getOrderByTrno(data.TrnNo))
            return res;
        }).catch((error) => {
            unAuthorizedLogout(error);
            return error
        })
    }
}
export const dispatchOrderByTrnNo =(data, callbackData)=>{
    let loginDetail = getAuthLoginUser();
    const payload = {
        UserId : loginDetail.userId,
        TrnNo : data.TrnNo,
        IsOrderDispatched : data.IsOrderDispatched,
        SeqNo : data.SeqNo,
        CompanyId : data.CompanyId,
        AcYear: loginDetail.acYear
    }
    return async (dispatch) => {
        loaderService(true)
        return axios.post(`${ApiHttp}${ORDER_DETAIL_DISPATCH_ORDER}`, payload , headers).then((res) => {
            if(res.data.StatusCode == 400){
                errorPopup(res.data.Message)
            }
            loaderService(false)
            dispatch(getConfirmOrder(callbackData))
            dispatch(getOrderByTrno(data.TrnNo))
            return res;
        }).catch((error) => {
            unAuthorizedLogout(error);
            return error
        })
    }
}
export const receivedOrderByTrnNo =(data, callbackData)=>{
    let loginDetail = getAuthLoginUser();
    const payload = {
        UserId : loginDetail.userId,
        TrnNo : data.TrnNo,
        IsOrderReceived : data.IsOrderReceived,
        SeqNo : data.SeqNo,
        CompanyId : data.CompanyId,
        AcYear: loginDetail.acYear
    }
    return async (dispatch) => {
        loaderService(true)
        return axios.post(`${ApiHttp}${ORDER_DETAIL_ORDER_RECEIVED}`, payload , headers).then((res) => {
            if(res.data.StatusCode == 400){
                errorPopup(res.data.Message)
            }
            loaderService(false)
            dispatch(getConfirmOrder(callbackData))
            dispatch(getOrderByTrno(data.TrnNo))
            return res;
        }).catch((error) => {
            unAuthorizedLogout(error);
            return error
        })
    }
}

export const returnedOrderByTrnNo =(data, callbackData)=>{
    let loginDetail = getAuthLoginUser();
    const payload = {
        UserId : loginDetail.userId,
        TrnNo : data.TrnNo,
        IsOrderReturned : data.IsOrderReturned,
        SeqNo : data.SeqNo,
        CompanyId : data.CompanyId,
        AcYear: loginDetail.acYear
    }
    return async (dispatch) => {
        loaderService(true)
        return axios.post(`${ApiHttp}${ORDER_DETAIL_ORDER_RETURNED}`, payload , headers).then((res) => {
            if(res.data.StatusCode == 400){
                errorPopup(res.data.Message)
            }
            loaderService(false)
            dispatch(getConfirmOrder(callbackData))
            dispatch(getOrderByTrno(data.TrnNo))
            return res;
        }).catch((error) => {
            unAuthorizedLogout(error);
            return error
        })
    }
}

export const getItemPermission =async () =>{
    let loginUser = getAuthLoginUser();
        const response = await HTTP.get(`${GET_ITEM_PERMISSION}?CompanyId=${loginUser.companyId}&UserId=${loginUser.userId}`)
        // dispatch(getOrder(response?.data?.Data))
        return response?.data?.Data
}

export const getPartypermission = async() =>{
    let loginUser = getAuthLoginUser();
    const response = await HTTP.get(`${GET_PARTY_PERMISSION}?CompanyId=${loginUser.companyId}&UserId=${loginUser.userId}`)
        // dispatch(getOrder(response?.data?.Data))
        return response?.data?.Data
}

export const addOrderByTrno = (data) => {
    return async (dispatch) => {
        const response = await HTTP.post(INSERT_DETAIL, data)
        if(response){
            dispatch(getOrder([]))
        }
    }
}

export const deleteOrderByTrno = (data, TrnNo) => {
    return async (dispatch) => {
        const response = await HTTP.delete(`${DELETE_ORDER_DETAIL}?CompanyId=${getAuthLoginUser().companyId}&AcYear=${getAuthLoginUser().acYear}&TrnNo=${data.TrnNo}&SeqNo=${data.SeqNo}`, data)
        if(response){
            dispatch(getOrderByTrno(TrnNo))
        }
    }
}

const getOrder = (data) => {
    return {
        type : GET_ORDER_BY_TRNNO,
        data : data
    }
}