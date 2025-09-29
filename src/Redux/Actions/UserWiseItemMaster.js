import { HTTP } from "../../HTTP/HTTP"
import { getAuthLoginUser } from "../../Services/AuthService/AuthService"
import { ADD_USER_WISE_ITEM, GET_ITEM_PERMISSION, GET_USER_WISE_ITEM, UPDATE_DETAIL_ORDER_ITEM } from "../../Shared/Constants/ApiConstant"
import { successPopup } from "../../Shared/Constants/PopupConstant/PopupContant";
import { USER_WISE_ITEM } from "../Types/Type"

let submitData;
export const getUserWiseItems = (value) => {
    submitData=value;
    let loginUser = getAuthLoginUser();
    return async (dispatch) => {
        if(value) {
            const response = await HTTP.get(`${GET_USER_WISE_ITEM}?CompanyId=${loginUser.companyId}&UserId=${value}`)
            dispatch(UserWiseItems(response?.data?.Data))
        }else{
            const response = await HTTP.get(`${GET_USER_WISE_ITEM}?CompanyId=${loginUser.companyId}&UserId=${loginUser.userId}`)
            dispatch(UserWiseItems(response?.data?.Data))
        }
    }
}



export const addSelectedUserWiseItem= (data,userId) => {
    
    let loginUser = getAuthLoginUser();
    if(data){
        data.forEach(element => {
            element.UserId = userId;
            element.CompanyId = loginUser.companyId;
            element.Rate = element.ItemRate;
        });
    }
    return async (dispatch) => {
        const response = await HTTP.post(UPDATE_DETAIL_ORDER_ITEM, data)
        // successPopup('Your changes saved successfully')
        dispatch(getUserWiseItems(submitData))
    }
}



export const updateUserWiseItems = (data,userId) => {
    let loginUser = getAuthLoginUser();
    const payload = {
        CompanyId : data.CompanyId,
        UserId : userId,
        ItemId : data.ItemId,
        Enable : data.Enable,
        Rate: data.ItemRate
    }

    return async (dispatch) => {
        const response = await HTTP.post(ADD_USER_WISE_ITEM, payload)
        dispatch(getUserWiseItems(submitData))
    }
}

const UserWiseItems = (data) => {
    return {
        type: USER_WISE_ITEM,
        data: data
    }
}