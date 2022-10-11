import {
    Company_Register,
    Company_Register_Success,
    Company_Register_Failed,
    Company_Email,
    Company_PhoneNumber,
    Company_Password,
    Company_ConfirmPassword,
    Company_UserName,
    Company_Name,
    Company_Description,
} from "../Constants";

const initialState = {
    Loader:false,
    Failed:false,
    error:"",
    Email:"",
    PhoneNumber:"",
    Password:"",
    Confirm_Password:"",
    UserName:"",
    CompanyName:"",
    CompanyDescription:""
}

export default (state=initialState, action)=>{
    switch (action.type) {
        case Company_Register:
            return {...state, Loader:true}

        case Company_Register_Success:
            return {...state, Loader:false, ...initialState}
        
        case Company_Register_Failed:
            return{...state, Loader:false, Failed:true, error:action.payload}
            
        case Company_Email:
            return {...state, Email:action.payload}

        case Company_PhoneNumber:
            return{...state, PhoneNumber:action.payload}

        case Company_Password:
            return {...state, Password:action.payload}

        case Company_ConfirmPassword:
            return{...state, Confirm_Password:action.payload}

        case Company_UserName:
            return{...state, UserName:action.payload}

        case Company_Name:
            return{...state, CompanyName:action.payload}
        
        case Company_Description:
            return{...state, CompanyDescription:action.payload}
            
        default:
            return state
    }
}