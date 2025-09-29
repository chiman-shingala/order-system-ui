import moment from "moment";
import { HTTP } from "../../HTTP/HTTP";
import { getAuthLoginUser } from "../../Services/AuthService/AuthService";
import { GET_TOP_ITEM} from "../Types/Type";
import { GET_TOP_ITEM_DETAIL } from "../../Shared/Constants/ApiConstant";


let loginDetail = getAuthLoginUser();
export const getTopItemDateWise = (data) => {
    return async (dispatch) => {
        const response = await HTTP.get(`${GET_TOP_ITEM_DETAIL}?CompanyId=${loginDetail.companyId}&UserId=${loginDetail.userId}&FromDate=${data.FromDate}&ToDate=${data.ToDate}`)
        dispatch(TopItem(response?.data?.Data))
    }
}

export const getTopItemDetail = () =>
{
    let date = moment().format('YYYY-MM-DD');
    return async (dispatch) => {
        const response = await HTTP.get(`${GET_TOP_ITEM_DETAIL}?CompanyId=${loginDetail.companyId}&UserId=${loginDetail.userId}&FromDate=${date}&ToDate=${date}`)
            dispatch(TopItem(response?.data?.Data))
    }

}
const TopItem = (data) => {
    return {
        type : GET_TOP_ITEM,
        data : data
    }
}