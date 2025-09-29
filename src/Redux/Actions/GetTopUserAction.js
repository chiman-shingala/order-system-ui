import moment from "moment";
import { HTTP } from "../../HTTP/HTTP";
import { getAuthLoginUser } from "../../Services/AuthService/AuthService";
import { GET_TOP_USER_DETAIL } from "../../Shared/Constants/ApiConstant";
import { GET_TOP_USER} from "../Types/Type";


let loginDetail = getAuthLoginUser();
export const getTopUserDateWise = (data) => {
    return async (dispatch) => {
        const response = await HTTP.get(`${GET_TOP_USER_DETAIL}?CompanyId=${loginDetail.companyId}&UserId=${loginDetail.userId}&FromDate=${data.FromDate}&ToDate=${data.ToDate}`)
        dispatch(TopUser(response?.data?.Data))
    }
}

export const getTopUserDetail = () =>
{
    let date = moment().format('YYYY-MM-DD');
    return async (dispatch) => {
        const response = await HTTP.get(`${GET_TOP_USER_DETAIL}?CompanyId=${loginDetail.companyId}&UserId=${loginDetail.userId}&FromDate=${date}&ToDate=${date}`)
            dispatch(TopUser(response?.data?.Data))
    }

}
const TopUser = (data) => {
    return {
        type : GET_TOP_USER,
        data : data
    }
}