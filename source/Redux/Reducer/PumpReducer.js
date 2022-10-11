import {
    LOAD_PUMPS,
    LOAD_PUMPS_DONE,
    GET_PUMP_FORM_INFO,
    CREATE_UPDATE_PUMP,
    CREATE_UPDATE_PUMP_DONE,
    SHOW_OR_HIDE_DELETE_PUMP_ALERT,
    DELETE_PUMP,
    DELETE_PUMP_DONE
} from "../Constants";


const initialState = {
    loading: false,
    failed: false,
    pumps: [],
    pump_form_info: [],
    delete_alert: false,
    actionLoading: false,
    delete_loading: false
}

export default (state = initialState, action) => {
    const {type, pumps, pump_form_info, delete_alert, failed} = action;
    switch (type) {
        case LOAD_PUMPS:
            return {...state, loading: true, failed: false}
        case LOAD_PUMPS_DONE:
            return {...state, loading: false, pumps: pumps, failed: failed}
        case GET_PUMP_FORM_INFO:
            return {...state, pump_form_info: pump_form_info}
        case CREATE_UPDATE_PUMP:
            return {...state, actionLoading: true}
        case CREATE_UPDATE_PUMP_DONE:
            return {...state, actionLoading: false, pumps: pumps}
        case SHOW_OR_HIDE_DELETE_PUMP_ALERT:
            return {...state, delete_alert: delete_alert}
        case DELETE_PUMP:
            return {...state, delete_loading: true}
        case DELETE_PUMP_DONE:
            return {...state, delete_loading: false,  delete_alert: false, pumps:pumps}
        default:
            return state;
    }
}
