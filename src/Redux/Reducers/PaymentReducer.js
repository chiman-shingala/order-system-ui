import { PAYMENT_DETAIL } from "../Types/Type";

let initialState = {
    paymentDetail : []
}
export const paymentDetailreducer = (state = initialState , action) =>{
    switch(action.type){
        case  PAYMENT_DETAIL: 
            return {
                paymentDetail : action.data
            };
        default : 
            return state;
    }
}