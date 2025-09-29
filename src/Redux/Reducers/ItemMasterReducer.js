import { GET_ITEM } from "../Types/Type"

let initialState = {
    items : []
}

export const itemMasterReducer = (state = initialState , action) => {
    switch(action.type){
        case GET_ITEM : 
            return {
                items : action.data
            };
        default : 
            return state;
    }
}