import { HTTP } from "../../HTTP/HTTP";
import { getAuthLoginUser } from "../../Services/AuthService/AuthService";
import { GET_ALL_PARTY } from "../../Shared/Constants/ApiConstant";
import { ALL_PARTY } from "../Types/Type"

export const getAllParty = () => {
    let userData = getAuthLoginUser();
    return async (dispatch) => {
        const response = await HTTP.get(`${GET_ALL_PARTY}?AcYear=${userData.acYear}&CompanyId=${userData.companyId}`)
        dispatch(getParty(response?.data?.Data))
    }
}
const getParty = (data) => {
    return {
        type : ALL_PARTY,
        data : data
    }
}