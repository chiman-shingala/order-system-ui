import axios from "axios";
import { ApiHttp, CHANGE_USER_PASSWORD, USER_LOGIN } from "../../Shared/Constants/ApiConstant";
import { errorPopup, successPopup } from "../../Shared/Constants/PopupConstant/PopupContant";
import { loaderService } from "../../Components/Loader/Loader";

export const signIn = (data) => {
    loaderService(true);
    axios.post(`${ApiHttp}${USER_LOGIN}` , data ).then((res) => {
        loaderService(false);
        if(res.data.StatusCode === 200){
            setAuthToken(res.data.Data)
            window.location.href = '/';
        }else{
            errorPopup(res.data.Message)
        }
    })
}

export const ChangePassword = (data) => {
    loaderService(true);
    axios.put(`${ApiHttp}${CHANGE_USER_PASSWORD}` , data ).then((res) => {
        loaderService(false);
        if(res.data.StatusCode === 200){
            successPopup(res.data.Message)
        }else{
            errorPopup(res.data.Message)
        }
    })
}

export const signOut = () => {
    localStorage.clear();
    errorPopup('Session expired');
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
}

export const setAuthToken = (value) => {
    localStorage.setItem('UserData', btoa(JSON.stringify(value)));
}

export const getAuthToken = () => {
    if(localStorage.getItem('UserData')){
        let tokenData = JSON.parse(atob(localStorage.getItem('UserData')));
        return  tokenData.token;
    }
}
export const getAuthLoginUser = () => {
    if(localStorage.getItem('UserData')){
        let userData = JSON.parse(atob(localStorage.getItem('UserData')));
        delete userData.token;
        return  userData;
    }
}
export const unAuthorizedLogout = (error) => {
    if(error.response?.status === 401){
        signOut();
    }
}