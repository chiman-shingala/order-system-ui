import { GET_DAILY_ORDER } from "../Types/Type"

let initialState = {
    dailyOrder : []
}

export const dailyOrderSummaryReducer = (state = initialState , action) => {
    switch(action.type){
        case GET_DAILY_ORDER : 
            return {
                dailyOrder : action.data
            };
        default : 
            return state;
    }
}