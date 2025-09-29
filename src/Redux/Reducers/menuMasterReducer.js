import { GET_MENU_ITEM } from "../Types/Type"

let initialState = {
    menu : []
}

export const menuMasterReducer = (state = initialState , action) => {
    switch(action.type){
        case GET_MENU_ITEM : 
            return {
                menu : action.data
            };
        default : 
            return state;
    }
}