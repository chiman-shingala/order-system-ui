import { PARTY_CODE } from "../Types/Type"

let initialState = {
    partyCode : []
}

export const getPartyCode = (state = initialState , action) =>{
    switch(action.type){
        case  PARTY_CODE: 
            return {
                partyCode : action.data
            };
        default : 
            return state;
    }
}