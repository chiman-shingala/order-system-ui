import { HTTP } from "../../HTTP/HTTP"
import { getAuthLoginUser } from "../../Services/AuthService/AuthService"
import { ADD_USERS, DELETE_USERS, GET_USERS, UPDATE_USERS } from "../../Shared/Constants/ApiConstant"
import { GET_USER } from "../Types/Type"

export const getAllUsers = () => {
    let loginUser = getAuthLoginUser();
    return async (dispatch) => {
        const response = await HTTP.get(`${GET_USERS}?CompanyId=${loginUser.companyId}&UserCategoryId=${loginUser.usercategoryId}`)
        dispatch(getUser(response?.data?.Data))
    }
}

export const addNewUser = (value) => {
    let loginUser = getAuthLoginUser();
    value.LoginUser = loginUser.userId;
    if(loginUser.usercategoryId == 1){
        value.CompanyId = value.CompanyId
    }
    else{

        value.CompanyId = loginUser.companyId;
    }
    
    return async (dispatch) => {
        await HTTP.post(ADD_USERS, value)
        dispatch(getAllUsers())
    }
}

export const updateUser = (value) => {
    let loginUser = getAuthLoginUser();
    value.LoginUser = loginUser.userId;
    if(loginUser.usercategoryId == 1){
        value.CompanyId = value.CompanyId
    }
    else{

        value.CompanyId = loginUser.companyId;
    }
    return async (dispatch) => {
        await HTTP.put(UPDATE_USERS, value).catch((err) => {
            console.log('err', err)
        })
        dispatch(getAllUsers())
    }
}

export const deleteUsers = (UserId) => {
    return async (dispatch) => {
        await HTTP.delete(`${DELETE_USERS}?UserId=${UserId}`)
        dispatch(getAllUsers())
    }
}
const getUser = (data) => {
    return {
        type: GET_USER,
        data: data
    }
}