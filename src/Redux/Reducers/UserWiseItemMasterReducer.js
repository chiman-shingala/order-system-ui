import { USER_WISE_ITEM } from "../Types/Type"

let initialState = {
    userWiseItems : []
}

export const userWiseItemMasterReducer = (state = initialState , action) => {
    switch(action.type){
        case USER_WISE_ITEM : 
            return {
                userWiseItems : action.data
            };
        default : 
            return state;
    }
}