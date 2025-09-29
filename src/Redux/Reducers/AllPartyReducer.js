import { ALL_PARTY } from "../Types/Type"

let initialState = {
    allParty : []
}

export const allPartyReducer = (state = initialState , action) =>{
    switch(action.type){
        case  ALL_PARTY: 
            return {
                allParty : action.data
            };
        default : 
            return state;
    }
}