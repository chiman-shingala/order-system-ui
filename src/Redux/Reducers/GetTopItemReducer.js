import { GET_TOP_ITEM} from "../Types/Type";

let initialState = {
    topItem : []
}

export const getTopItemReducer = (state = initialState , action) =>{
    switch(action.type){
        case GET_TOP_ITEM : 
            return {
                topItem : action.data
            };
        default : 
            return state;
    }
}