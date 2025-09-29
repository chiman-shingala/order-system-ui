import { HTTP } from "../../HTTP/HTTP";
import { GET_PARTY_CODE } from "../../Shared/Constants/ApiConstant";
import { PARTY_CODE} from "../Types/Type";

export const getPartyCodeAction= () => {
    return async (dispatch) => {
        const response = await HTTP.get(`${GET_PARTY_CODE}`)
        dispatch(getCode(response?.data?.Data[0]))
    }
}

const getCode = (data) => {
    return {
        type : PARTY_CODE,
        data : data
    }
}