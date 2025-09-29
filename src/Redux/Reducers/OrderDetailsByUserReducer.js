import { GET_ORDER_DETAILS } from "../Types/Type"

let initialState = {
    orderDetails : []
}

export const orderDetailsByUserReducer = (state = initialState , action) => {
    switch(action.type){
        case GET_ORDER_DETAILS : 
            return {
                orderDetails : action.data
            };
        default : 
            return state;
    }
}