import { CONFIRM_ORDERS } from "../Types/Type"

let initialState = {
    confirmOrders : []
}

export const confirmOrdersReducer = (state = initialState , action) => {
    switch(action.type){
        case CONFIRM_ORDERS : 
            return {
                confirmOrders : action.data
            };
        default : 
            return state;
    }
}