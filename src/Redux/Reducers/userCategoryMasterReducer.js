import { GET_USER_CATEGORY } from "../Types/Type"

let initialState = {
    userCategory : []
}

export const userCategoryMasterReducer = (state = initialState , action) => {
    switch(action.type){
        case GET_USER_CATEGORY : 
            return {
                userCategory : action.data
            };
        default : 
            return state;
    }
}