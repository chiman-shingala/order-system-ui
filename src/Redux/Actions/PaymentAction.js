import axios from "axios";
import { HTTP, headers } from "../../HTTP/HTTP";
import { getAuthLoginUser, unAuthorizedLogout } from "../../Services/AuthService/AuthService";
import { ADD_PAYMENT, ApiHttp, GET_PAYMENT_DETAIL } from "../../Shared/Constants/ApiConstant";
import { PAYMENT_DETAIL } from "../Types/Type";
import { errorPopup } from "../../Shared/Constants/PopupConstant/PopupContant";
import { loaderService } from "../../Components/Loader/Loader";
import { getConfirmOrder } from "./ConfirmOrdersAction";

export const addPayment= (data, callbackData) => {
    let loginDetail = getAuthLoginUser();
    const payload = {
        CompanyId: loginDetail.companyId,
        AcYear: loginDetail.acYear,
        TrnNo: data.TrnNo,
        SeqNo: 0,
        UserId: loginDetail.userId,
        PaymentDate: data.PaymentDate,
        PaymentAmount: Number(data.PaymentAmount),
        AdjustAmount: Number(data.AdjustAmount),
        Remark: data.Remark
    };
    return async (dispatch) => {
        loaderService(true)
        return axios.post(`${ApiHttp}${ADD_PAYMENT}`, payload , headers).then((res) => {
            if(res.data.StatusCode == 400){
                errorPopup(res.data.Message)
            }
            loaderService(false)
            dispatch(getpayment([]))
            dispatch(getConfirmOrder(callbackData))
            return res;
        }).catch((error) => {
            unAuthorizedLogout(error);
            return error
        })
    }
}

export const getPaymentDetail = (data) =>{
    let loginDetail = getAuthLoginUser();
    return async (dispatch) => {
        const response = await HTTP.get(`${GET_PAYMENT_DETAIL}?CompanyId=${data.CompanyId}&AcYear=${data.AcYear}&TrnNo=${data.TrnNo}`)
        dispatch(getpayment(response?.data?.Data))
    }

}
const getpayment = (data) => {
    return {
        type : PAYMENT_DETAIL,
        data : data
    }
}
