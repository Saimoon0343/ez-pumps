import {
    Pump_Register,
    Pump_Register_Failed,
    Pump_Register_Success,
    Pump_Email,
    Pump_PhoneNumber,
    Pump_Password,
    Pump_ConfirmPassword,
    Pump_UserName,
    Pump_Name,
    Pump_Description,
    Pump_State,
    Pump_JopType,
    Pump_Type,
    Pump_LineLength,
    Pump_M3,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday
} from "../AppConstants";

export const Pump_Registration = () => {
    return(dispatch)=> {
        dispatch({ type: Pump_Register });
        dispatch({ type: Pump_Register_Failed });
        dispatch({ type: Pump_Register_Success });
    }
}

export const Email = (text) =>{
    return{
        type:Pump_Email,
        payload: text
    }
}

export const PhoneNumber = (text) =>{
    return{
        type:Pump_PhoneNumber,
        payload: text
    }
}

export const Password = (text) =>{
    return{
        type:Pump_Password,
        payload: text
    }
}

export const ConfirmPassword = (text) =>{
    return{
        type:Pump_ConfirmPassword,
        payload: text
    }
}

export const PumpUserName = (text) =>{
    return{
        type:Pump_UserName,
        payload: text
    }
}

export const PumpName = (text) =>{
    return{
        type:Pump_Name,
        payload: text
    }
}

export const PumpDescription = (text) =>{
    return{
        type:Pump_Description,
        payload: text
    }
}

export const State = (text) =>{
    return{
        type:Pump_State,
        payload: text
    }
}

export const JopType = (text) =>{
    return{
        type:Pump_JopType,
        payload: text
    }
}

export const PumpType = (text) =>{
    return{
        type:Pump_Type,
        payload: text
    }
}

export const LineLength = (text) =>{
    return{
        type:Pump_LineLength,
        payload: text
    }
}

export const M3 = (text) =>{
    return{
        type:Pump_M3,
        payload: text
    }
}

export const IsMonday = (text) =>{
    return{
        type:Monday,
        payload: text
    }
}


export const IsTuesday = (text) =>{
    return{
        type:Tuesday,
        payload: text
    }
}

export const IsWednesday = (text) =>{
    return{
        type:Wednesday,
        payload: text
    }
}

export const IsThursday = (text) =>{
    return{
        type:Thursday,
        payload: text
    }
}

export const IsFriday = (text) =>{
    return{
        type:Friday,
        payload: text
    }
}