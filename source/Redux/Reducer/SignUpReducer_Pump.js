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
} from "../Constants";

const initialState = {
    Success:false,
    Loader:false,
    Failed:false,
    error:"",
    Email:"",
    PhoneNumber:"",
    Password:"",
    Confirm_Password:"",
    PumpUserName:"",
    PumpName:"",
    PumpDescription:"",
    State:"",
    PumpJopType:"",
    PumpType:"",
    PumpLineLength:"",
    PumpM3:"",
    IsMonday:false,
    IsTuesday:false,
    IsWednesday:false,
    IsThursday:false,
    IsFriday:false,
}

export default (state= initialState, action) => {
    switch (action.type) {
        case Pump_Register:
            return {...state, Loader:true, error:''}
        
        case Pump_Register_Success:
            return {...state, Loader:false}
        
        case Pump_Register_Failed:
            return {...state, Loader:false, Failed:true, error:action.payload}

        case Pump_Email:
            return{ ...state, Email:action.payload }

        case Pump_PhoneNumber:
            return{ ...state, PhoneNumber: action.payload}

        case Pump_Password:
            return {...state, Password:action.payload}

        case Pump_ConfirmPassword:
            return {...state, Confirm_Password:action.payload}

        case Pump_UserName:
            return{ ...state, PumpUserName:action.payload }
        
        case Pump_Name:
            return{ ...state, PumpName:action.payload }

        case Pump_Description:
            return{ ...state, PumpDescription:action.payload }

        case Pump_State:
            return{ ...state, State:action.payload }

        case Pump_JopType:
            return{ ...state, PumpJopType:action.payload }

        case Pump_Type:
            return{ ...state, PumpType:action.payload }

        case Pump_LineLength:
            return{ ...state, PumpLineLength:action.payload }

        case Pump_M3:
            return{ ...state, PumpM3:action.payload }

        case Monday:
            return{ ...state, IsMonday:action.payload }

        case Tuesday:
            return{ ...state, IsTuesday:action.payload }
            
        case Wednesday:
            return{ ...state, IsWednesday:action.payload }
            
        case Thursday:
                return{ ...state, IsThursday:action.payload }
                
        case Friday:
            return{ ...state, IsFriday:action.payload }

        default:
            return state
    }
}