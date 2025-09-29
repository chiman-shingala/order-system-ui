import moment from "moment"
import { HTTP } from "../../HTTP/HTTP"
import { getAuthLoginUser } from "../../Services/AuthService/AuthService"
import { ORDER_DETAILS_BY_USER, ORDER_DETAIL_GLOBAL_DATA, ORDER_DETAIL_ORDER_RECEIVED } from "../../Shared/Constants/ApiConstant"
import { GET_ORDER_DETAILS, GET_USER } from "../Types/Type"

// for the issue of user id we are not using (getOrderByTrno) this api for the order detail instead of this we are using below procedure //
let loginDetail = getAuthLoginUser();
export const getAllOrderDetails = (data) => {
    if(loginDetail.usercategoryId > 1){
        data.CompanyId = loginDetail.companyId
    }
    if(loginDetail.usercategoryId == 1){
        if(data.CompanyId == "DEFAULT"){
            data.CompanyId = ''
        }
    }
    let str = '';
    for(let key in data){
        if(data[key] != ''){
            str += `${key}=${data[key]}&`
        }
    }
    str += `AcYear=${loginDetail.acYear}&UserId=${loginDetail.userId}`
    return async (dispatch) => {
        const response = await HTTP.get(`${ORDER_DETAILS_BY_USER}?${str}`)
        dispatch(getOrder(response?.data?.Data))
    }
}

// export const getAllOrderDetailsDatewise = (data) => {
//     let date = moment().format('YYYY-MM-DD');
//     let str = '';
//     if(data){
//         str += `CompanyId=${loginDetail.companyId}&AcYear=${loginDetail.acYear}&UserId=${loginDetail.userId}&FromOrderDate=${data.FromDate}&ToOrderDate=${data.ToDate}`
//     }
//     else{
//      str += `CompanyId=${loginDetail.companyId}&AcYear=${loginDetail.acYear}&UserId=${loginDetail.userId}&FromOrderDate=${date}&ToOrderDate=${date}`
//     }
//     return async (dispatch) => {
//         const response = await HTTP.get(`${ORDER_DETAILS_BY_USER}?${str}`)
//         console.log(response?.data?.Data);
//         dispatch(getOrder(response?.data?.Data))
//     }
// }
export const receivedOrderByTrnNo =(data)=>{
    let loginDetail = getAuthLoginUser();
    const payload = {
        UserId : loginDetail.userId,
        TrnNo : data.TrnNo,
        IsOrderReceived : data.IsOrderReceived,
        SeqNo : data.SeqNo,
        CompanyId : loginDetail.companyId,
        AcYear: data.AcYear
    }
    return async (dispatch) => {
        const response =  await HTTP.post(ORDER_DETAIL_ORDER_RECEIVED, payload)
        dispatch(getAllOrderDetails(data))
    }
}

export const orderDetailGlobalData = (data) =>{
    let loginDetail = getAuthLoginUser();
    return async (dispatch) => {
        let str = `GlobalSearch=${data}&UserId=${loginDetail.userId}&CompanyId=${loginDetail.companyId}&AcYear=${loginDetail.acYear}`;
        const response = await HTTP.get(`${ORDER_DETAIL_GLOBAL_DATA}?${str}`)
        dispatch(getOrder(response?.data?.Data))

        // getOrder([]);
    }
}
const getOrder = (data) => {
    return {
        type: GET_ORDER_DETAILS,
        data: data
    }
}