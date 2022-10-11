import { fetchAPI } from "../../services";
import {
    SCREEN_TYPE,
    PUT_USER_DATA,
    PUT_USER_TOKEN,
    LOAD_JOB_AND_PUMP_TYPES,
} from "../Constants";

export const ScreenTypeChange = (text) => {
    return{
        type: SCREEN_TYPE,
        payload: text
    }
}

export const putUserIntoState = (user) => {
    return{
        type: PUT_USER_DATA,
        payload: user
    }
}

export const putTokenIntoState = (token) => {
    return{
        type: PUT_USER_TOKEN,
        payload: token
    }
}


export const getJobAndPumpTypes = () => {

    return function(dispatch){
        fetchAPI('get', 'user/pump-and-job-types', null, true)
        .then(function (response) {
            if(response.data.success){
                dispatch({
                    type: LOAD_JOB_AND_PUMP_TYPES,
                    pumpTypes: response.data.pump_types,
                    jobTypes: response.data.job_types,
                })
            }
        }).catch(function (error) {
            console.log(error);
        });

    }
}
