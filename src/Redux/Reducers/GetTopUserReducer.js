import { GET_TOP_USER} from "../Types/Type";

let initialState = {
    topUser : []
}
export const getTopUserReducer = (state = initialState , action) =>{
    switch(action.type){
        case GET_TOP_USER : 
            return {
                topUser : action.data
            };
        default : 
            return state;
    }
}