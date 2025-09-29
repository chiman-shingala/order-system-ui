import {GET_TOTAL_ORDER_COUNT} from '../Types/Type';

let initialState = {
    orderCount : {}
}

export const getTotalOrderReducer = (state = initialState , action) =>{
    switch(action.type){
        case GET_TOTAL_ORDER_COUNT : 
            return {
                orderCount : action.data
            };
        default : 
            return state;
    }
}