import { GET_MENU } from "../../Shared/Constants/ApiConstant"
import { GET_MENU_ITEM } from "../Types/Type"
import { HTTP } from "../../HTTP/HTTP"
import { getAllItems } from "./ItemMasterAction"
import { getAuthLoginUser } from "../../Services/AuthService/AuthService"

/*eslint eqeqeq: "off"*/
export const getAllMenuItems = () => {
    let loginUser = getAuthLoginUser();
    return async (dispatch) => {
        let response = await HTTP.get(`${GET_MENU}?userId=${loginUser?.userId}`)
        let menu = response?.data?.Data
        let index = menu.findIndex(x => x.Name == 'Dashboard');
        if(index > 0){
            let dashboardMenu = menu.find(x => x.Name == 'Dashboard');
            menu = menu.filter(x => x.Name != 'Dashboard');
            menu.splice(0 , 0 , dashboardMenu)
        }
        dispatch(getMenuItem(menu))
    }
}

const getMenuItem = (data) => {
    return {
        type : GET_MENU_ITEM,
        data : data
    }
}