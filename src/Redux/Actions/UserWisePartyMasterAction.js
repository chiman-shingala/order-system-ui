import { HTTP } from "../../HTTP/HTTP";
import { getAuthLoginUser } from "../../Services/AuthService/AuthService";
import { ADD_USER_WISE_PARTY, GET_USER_WISE_PARTY, UPDATE_USER_WISE_PARTY } from "../../Shared/Constants/ApiConstant";
import { USER_WISE_PARTY } from "../Types/Type"

let submitData;
export const getUserWiseParty = (value) => {
    submitData=value;
    let loginUser = getAuthLoginUser();
    return async (dispatch) => {
        if(value) {
            const response = await HTTP.get(`${GET_USER_WISE_PARTY}?CompanyId=${loginUser.companyId}&UserId=${value}`)
            dispatch(UserWiseparty(response?.data?.Data))
        }else{
            const response = await HTTP.get(`${GET_USER_WISE_PARTY}?CompanyId=${loginUser.companyId}&UserId=${loginUser.userId}`)
            dispatch(UserWiseparty(response?.data?.Data))
        }
    }
}

export const updateUserWiseParty= (data,userId) => {
    let loginUser = getAuthLoginUser();
    const payload = {
        CompanyId : data.CompanyId,
        UserId : userId,
        PartyCode : data.PartyCode,
        Enable : data.Enable,
    }

    return async (dispatch) => {
        const response = await HTTP.post(ADD_USER_WISE_PARTY, payload)
        dispatch(getUserWiseParty(submitData))
    }
}

export const updateSelectedUserWiseParty= (data,userId) => {
    
    let loginUser = getAuthLoginUser();
    if(data){
        data.forEach(element => {
            element.UserId = userId;
            element.CompanyId = loginUser.companyId;
        });
    }
    return async (dispatch) => {
        const response = await HTTP.post(UPDATE_USER_WISE_PARTY, data)
        dispatch(getUserWiseParty(submitData))
    }
}

const UserWiseparty = (data) => {
    return {
        type: USER_WISE_PARTY,
        data: data
    }
}