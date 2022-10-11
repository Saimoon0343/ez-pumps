import {
    LOGIN,
    LOGIN_DONE,
    REGISTER,
    REGISTER_DONE,
    REGISTER_SUCCESS,
    PUT_USER_DATA,
    SET_EMAIL,
    SET_PHONE,
    SET_NAME,
    SET_USERNAME,
    SET_DESCRIPTION,
    SET_PASSWORD,
    SET_USER_TYPE,
    SET_WEBSITE,
    SET_IS_CHECK,

} from "../Constants";

const initialState = {
    // loading: false,
    registerLoading: false,
    email: "",
    password: "",
    phone: "",
    username: "",
    name: "",
    description: "",
    userType: true, // true for company false for pump
    isCheck: false,
    website: "",
}
export default (state = initialState, action) => {
    const {
        type,
        email,
        password,
        phone,
        description,
        name,
        username,
        userType,
        isCheck,
        website
    } = action;
    switch (type) {
        // case LOGIN:
        //     return {...state, loading: true}
        // case LOGIN_DONE:
        //     return {...state, loading: false, token, user}
        // case REGISTER:
        //     return {...state, registerLoading: true}
        // case REGISTER_DONE:
        //     return {...state, registerLoading: false}
        // case REGISTER_SUCCESS:
        //     return {initialState}
        // case PUT_USER_DATA:
        //     return {...state, user, token}
        case SET_EMAIL:
            return {
                ...state, email
            }
            case SET_DESCRIPTION:
                return {
                    ...state, description
                }
                case SET_PHONE:
                    return {
                        ...state, phone
                    }
                    case SET_PASSWORD:
                        return {
                            ...state, password
                        }
                        case SET_NAME:
                            return {
                                ...state, name
                            }
                            case SET_USERNAME:
                                return {
                                    ...state, username
                                }
                                case SET_USER_TYPE:
                                    return {
                                        ...state, userType
                                    }

                                    case SET_WEBSITE:
                                        return {
                                            ...state, website
                                        }
                                        case SET_IS_CHECK:
                                            return {
                                                ...state, isCheck
                                            }
                                            default:
                                                return state;
    }
}