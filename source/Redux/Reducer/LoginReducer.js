import {
    Login_Failed,
    Login_Success,
    User_Login,
    User_Data,
    User_Token
} from "../Constants";

const initialState={
    Loader:false,
    Failed:false,
    User:"",
    Token:"",
    error:""
}

export default ( state=initialState, action )=>{
        switch (action.type) {
            case User_Login:
                return {...state, Loader:true}
            case Login_Failed:
                return {...state, Loader:false, Failed:true}

            case Login_Success:
                return{ ...state, Loader:false, ...initialState }
            
            case User_Data:
                return{...state, user: action.payload}
            
            case User_Token:
                return {...state, Token:action.payload}
        
            default:
                return state;
        }
}