import { PARTY_MASTER } from "../Types/Type";

let initialState = {
    partyDetail : []
}

export const partyMasterReducer = (state = initialState , action) =>{
    switch(action.type){
        case  PARTY_MASTER: 
            return {
                partyDetail : action.data
            };
        default : 
            return state;
    }
}