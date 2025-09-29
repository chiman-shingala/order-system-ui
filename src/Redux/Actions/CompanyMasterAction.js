import { HTTP } from "../../HTTP/HTTP"
import { getAuthLoginUser } from "../../Services/AuthService/AuthService"
import { ADD_COMPANIES, DELETE_COMPANY, EDIT_COMPANIES, GET_COMPANIES } from "../../Shared/Constants/ApiConstant"
import { GET_COMPANY } from "../Types/Type"

export const getAllCompanies = () => {
    return async (dispatch) => {
        const response = await HTTP.get(GET_COMPANIES);
        dispatch(getCompany(response?.data?.Data))
    }
}

export const addNewCompanies = (value) => {
    let userData = getAuthLoginUser();
    value.UserId = userData.userId;
    return async (dispatch) => {
        await HTTP.post(ADD_COMPANIES , value)
        dispatch(getAllCompanies())
    }
}

export const updateCompany = (value) => {
    let userData = getAuthLoginUser();
    value.UserId = userData.userId;
    return async (dispatch) => {
        await HTTP.put(EDIT_COMPANIES , value)
        dispatch(getAllCompanies())
    }
}

export const deleteCompanies = (CompanyId) => {
    return async (dispatch) => {
        await HTTP.delete(`${DELETE_COMPANY}?CompanyId=${CompanyId}`)
        dispatch(getAllCompanies())
    }
}

const getCompany = (data) => {
    return {
        type : GET_COMPANY,
        data : data
    }
}