import moment from "moment";
import { HTTP } from "../../HTTP/HTTP"
import {GET_DAILY_ORDER} from "../Types/Type"
import { GET_DAILY_ORDER_SUMMARY } from "../../Shared/Constants/ApiConstant";
import { getAuthLoginUser } from "../../Services/AuthService/AuthService";

let loginDetail = getAuthLoginUser();
export const getDailyOrder = () =>{
  let date = moment().format('YYYY-MM-DD');

    return async (dispatch) =>{
        const response = await HTTP.get(`${GET_DAILY_ORDER_SUMMARY}?CompanyId=${loginDetail.companyId}&UserId=${loginDetail.userId}&FromDate=${date}&ToDate=${date}`)
        dispatch(getOrder(response.data.Data))
    }
}
export const getDailyOrderDatewise = (data) =>{
      return async (dispatch) =>{
          const response = await HTTP.get(`${GET_DAILY_ORDER_SUMMARY}?CompanyId=${loginDetail.companyId}&UserId=${loginDetail.userId}&FromDate=${data.FromDate}&ToDate=${data.ToDate}`)
          dispatch(getOrder(response.data.Data))
      }
  }
const getOrder = (data) => {
    return {
        type : GET_DAILY_ORDER,
        data : data
    }
}