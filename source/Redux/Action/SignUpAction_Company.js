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

export const Company_Registration = () => {
    return(dispatch)=>{
        dispatch({type: Company_Register});
        dispatch({type: Company_Register_Failed});
        dispatch({type: Company_Register_Success});
    }
}

export const Email=(text)=>{
    return{
        type:Company_Email,
        payload:text
    }
}

export const PhoneNumber=(text)=>{
    return{
        type:Company_PhoneNumber,
        payload:text
    }
}

export const Password=(text)=>{
    return{
        type:Company_Password,
        payload:text
    }
}

export const ConfirmPassword=(text)=>{
    return{
        type:Company_ConfirmPassword,
        payload:text
    }
}

export const UserName=(text)=>{
    return{
        type:Company_UserName,
        payload:text
    }
}

export const Name=(text)=>{
    return{
        type:Company_Name,
        payload:text
    }
}

export const Description=(text)=>{
    return{
        type:Company_Description,
        payload:text
    }
}