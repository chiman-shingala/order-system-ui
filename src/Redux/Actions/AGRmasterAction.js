import { HTTP } from "../../HTTP/HTTP";
import { getAuthLoginUser } from "../../Services/AuthService/AuthService";
import { GET_AGR_DETAIL} from "../../Shared/Constants/ApiConstant";
import { AGR_MASTER} from "../Types/Type";

export const getAgrDetail = () => {
    let userData = getAuthLoginUser();
    return async (dispatch) => {
        const response = await HTTP.get(`${GET_AGR_DETAIL}`)
        dispatch(getAgr(response?.data?.Data))
    }
}
const getAgr = (data) => {
    return {
        type : AGR_MASTER,
        data : data
    }
}