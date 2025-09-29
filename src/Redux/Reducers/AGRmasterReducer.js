import { AGR_MASTER } from "../Types/Type"

let initialState = {
    agrDetail : []
}

export const AgrMasterReducer = (state = initialState , action) =>{
    switch(action.type){
        case  AGR_MASTER: 
            return {
                agrDetail : action.data
            };
        default : 
            return state;
    }
}