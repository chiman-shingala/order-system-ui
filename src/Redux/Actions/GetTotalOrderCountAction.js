import moment from "moment";
import { HTTP } from "../../HTTP/HTTP";
import { GET_ORDER_TOTAL_COUNT_SUMMARY } from "../../Shared/Constants/ApiConstant";
import { GET_TOTAL_ORDER_COUNT } from '../Types/Type';
import { getAuthLoginUser } from "../../Services/AuthService/AuthService";

let loginDetail = getAuthLoginUser();
export const getOrderCount = (data) => {
    return async (dispatch) => {
        const response = await HTTP.get(`${GET_ORDER_TOTAL_COUNT_SUMMARY}?CompanyId=${loginDetail.companyId}&UserId=${loginDetail.userId}&UserCategoryId=${loginDetail.usercategoryId}&FromDate=${data.FromDate}&ToDate=${data.ToDate}`)
        dispatch(getCount(response.data.Data[0]))
    }
}

export const getCountDetail = () =>
{
    let date = moment().format('YYYY-MM-DD');
    return async (dispatch) => {
        const response = await HTTP.get(`${GET_ORDER_TOTAL_COUNT_SUMMARY}?CompanyId=${loginDetail.companyId}&UserId=${loginDetail.userId}&UserCategoryId=${loginDetail.usercategoryId}&FromDate=${date}&ToDate=${date}`)
            dispatch(getCount(response?.data?.Data[0]))
    }

}
const getCount = (data) => {
    return {
        type: GET_TOTAL_ORDER_COUNT,
        data: data
    }
}