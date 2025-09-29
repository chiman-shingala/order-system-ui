import { GET_ORDER_BY_TRNNO } from "../Types/Type"

let initialState = {
    orders : []
}

export const orderMasterReducer = (state = initialState , action) => {
    switch(action.type){
        case  GET_ORDER_BY_TRNNO: 
            return {
                orders : action.data
            };
        default : 
            return state;
    }
}