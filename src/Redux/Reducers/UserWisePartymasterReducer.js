import { USER_WISE_PARTY } from "../Types/Type"

let initialState = {
    userWiseParty : []
}

export const getUserWisePartyMasterReducer = (state = initialState , action) =>{
    switch(action.type){
        case USER_WISE_PARTY : 
            return {
                userWiseParty : action.data
            };
        default : 
            return state;
    }
}