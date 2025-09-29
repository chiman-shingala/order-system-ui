import axios from "axios";
import { getAuthToken, unAuthorizedLogout } from "../Services/AuthService/AuthService"
import { ApiHttp } from "../Shared/Constants/ApiConstant";
import { loaderService } from "../Components/Loader/Loader";
import { errorPopup } from "../Shared/Constants/PopupConstant/PopupContant";

export let headers= {
    headers : {
        Authorization: 'Bearer ' + getAuthToken()
    }
}

export const HTTP = {
    get : async (url) => {
        return axios.get(`${ApiHttp}${url}` , headers).then((res) => {
            return res;
            
        }).catch((error) => {
            unAuthorizedLogout(error);
        })
    },
    post : async (url,value) => {
        if(value){
            loaderService(true)
            return axios.post(`${ApiHttp}${url}`, value , headers).then((res) => {
                if(res.data.StatusCode == 400){
                    errorPopup(res.data.Message)
                }
                loaderService(false)
                return res;
            }).catch((error) => {
                unAuthorizedLogout(error);
                return error
            })
        }
    },
    put : async (url, value) => {
        return axios.put(`${ApiHttp}${url}` , value, headers).then((res) => {
            if(res.data.StatusCode == 400){
                errorPopup(res.data.Message)
            }
            return res;
        }).catch((error) => {
            unAuthorizedLogout(error);
        })
    },
    delete : async (url) => {
        return axios.delete(`${ApiHttp}${url}` , headers).then((res) => {
            if(res.data.StatusCode == 400){
                errorPopup(res.data.Message)
            }
            return res;
        }).catch((error) => {
            unAuthorizedLogout(error);
        })
    },
}