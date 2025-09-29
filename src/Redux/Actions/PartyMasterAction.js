import { HTTP } from "../../HTTP/HTTP";
import { getAuthLoginUser } from "../../Services/AuthService/AuthService";
import { ADD_NEW_PARTY, DELETE_PARTY, GET_ALL_PARTY, GET_PARTY_DETAIL } from "../../Shared/Constants/ApiConstant";
import { successPopup } from "../../Shared/Constants/PopupConstant/PopupContant";
import { PARTY_MASTER } from "../Types/Type";
import { getAllParty } from "./AllPartyAction";
import { getPartyCodeAction } from "./GetPartyCodeAction";

export const getAllPartyDetail = (Agrcode) => {

    let userData = getAuthLoginUser();
    return async (dispatch) => {
        const response = await HTTP.get(`${GET_PARTY_DETAIL}?Agrcode=${Agrcode}&AcYear=${userData.acYear}&CompanyId=${userData.companyId}`)
        dispatch(getParty(response?.data?.Data))
    }
}


export const addNewParty = (data) => {
    let userData = getAuthLoginUser();
    data.UserId = userData.userId;
    if(!data.CompanyId){
        data.CompanyId = userData.companyId
        data.AcYear = userData.acYear
    }
    return async (dispatch) => {
        let res = await HTTP.post(ADD_NEW_PARTY, data)
        if(res.status == 200){
            dispatch(getPartyCodeAction())
            dispatch(getAllParty())
            successPopup('Party successfully added')
        }
    }
}

export const deleteParty = (data) => {
    return async (dispatch) => {
        let res = await HTTP.delete(`${DELETE_PARTY}?PartyCode=${data.PartyCode}&AcYear=${data.AcYear}&CompanyId=${data.CompanyId}`)
        if(res.status == 200){
            successPopup('Party deleted successfully')
            dispatch(getAllParty())
            dispatch(getAllPartyDetail(data.Agrcode))
        }
        // dispatch(getAllItems())
    }
}

const getParty = (data) => {
    return {
        type: PARTY_MASTER,
        data: data
    }
}