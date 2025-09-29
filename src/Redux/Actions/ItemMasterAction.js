import { ADD_ITEMS, DELETE_ITEMS, GET_ITEMS, GET_ITEM_BY_COMPANY_ID, UPDATE_ITEMS } from "../../Shared/Constants/ApiConstant"
import { GET_ITEM } from "../Types/Type"
import { HTTP } from "../../HTTP/HTTP"
import { getAuthLoginUser } from "../../Services/AuthService/AuthService"

export const getAllItems = () => {
    let userData = getAuthLoginUser();
    return async (dispatch) => {
        const response = await HTTP.get(`${GET_ITEMS}?CompanyId=${userData.companyId}&UserId=${userData.userId}`)
        dispatch(getItem(response?.data?.Data))
    }
}


export const getallItemsByCompanyId = async (companyId) => {
    const response = await HTTP.get(`${GET_ITEM_BY_COMPANY_ID}?CompanyId=${companyId}`)
    return response?.data?.Data
}

export const addNewItems = (value) => {
    let userData = getAuthLoginUser();
    

    const formData = new FormData();
    formData.append('ItemName', value.ItemName);
    formData.append('ItemRate', value.ItemRate);
    formData.append('Mrp', value.Mrp);
    formData.append('ItemCode', value.ItemCode);
    formData.append('IsActive', value.IsActive);
    formData.append('AcYear',userData.acYear);
    formData.append('ItemDescription', value.ItemDescription);
    formData.append('file', value.file[0]);
    formData.append('CompanyId',  userData.companyId);
    formData.append('UserId',  userData.userId);
    

    return async (dispatch) => {
        await HTTP.post(ADD_ITEMS , formData)
        dispatch(getAllItems())
    }
}

export const updateItems = (value) => {
    let userData = getAuthLoginUser();

    const formData = new FormData();
    formData.append('ItemId', value.ItemId);
    formData.append('ItemName', value.ItemName);
    formData.append('ItemRate', value.ItemRate); 
    formData.append('Mrp', value.Mrp);
    formData.append('ItemCode', value.ItemCode);
    formData.append('IsActive', value.IsActive);
    formData.append('AcYear',userData.acYear);
    formData.append('ItemDescription', value.ItemDescription);
    formData.append('file', value.file[0]);
    formData.append('OldImageName',  value.ItemImage);
    formData.append('CompanyId',  userData.companyId);
    formData.append('UserId',  userData.userId);

    return async (dispatch) => {
        await HTTP.put(`${UPDATE_ITEMS}?OldImageName=${value.ItemImage}` , formData)
        dispatch(getAllItems())
    }
}

export const deleteItems = (itemId, itemImage) => {
    return async (dispatch) => {
        await HTTP.delete(`${DELETE_ITEMS}?ItemId=${itemId}&OldImageName=${itemImage}`)
        dispatch(getAllItems())
    }
}

const getItem = (data) => {
    return {
        type : GET_ITEM,
        data : data
    }
}