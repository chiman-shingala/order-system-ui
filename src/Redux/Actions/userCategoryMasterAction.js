import { HTTP } from "../../HTTP/HTTP"
import { USER_CATEGORY } from "../../Shared/Constants/ApiConstant"
import { GET_USER_CATEGORY } from "../Types/Type"

export const getAllUsersCategory = () => {
    return async (dispatch) => {
        const response = await HTTP.get(USER_CATEGORY)
        dispatch(getUserCategory(response?.data?.Data))
    }
}

const getUserCategory = (data) => {
    return {
        type: GET_USER_CATEGORY,
        data: data
    }
}