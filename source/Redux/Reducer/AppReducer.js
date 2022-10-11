import {
    SCREEN_TYPE,
    LOAD_JOB_AND_PUMP_TYPES
} from "../Constants";

const initialState = {
    ScreenType:"",
    jobTypes: [],
    pumpTypes: [],
}

const AppReducer = (state=initialState, action) => {
    switch (action.type) {
        case SCREEN_TYPE:
            return { ...state, ScreenType:action.payload }
        case LOAD_JOB_AND_PUMP_TYPES:
            return {...state, jobTypes: action.jobTypes, pumpTypes: action.pumpTypes, }
        default:
            return state
    }
}

export default AppReducer;