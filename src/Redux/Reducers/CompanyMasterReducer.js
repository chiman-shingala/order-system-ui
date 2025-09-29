import { GET_COMPANY } from "../Types/Type"

let initialState = {
    company : []
}

export const companyMasterReducer = (state = initialState , action) => {
    switch(action.type){
        case  GET_COMPANY: 
            return {
                company : action.data
            };
        default : 
            return state;
    }
}