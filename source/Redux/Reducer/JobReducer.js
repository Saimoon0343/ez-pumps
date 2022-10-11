import {
    CREATE_JOB,
    CREATE_JOB_DONE, CREATE_UPDATE_PUMP, CREATE_UPDATE_PUMP_DONE,
    GET_COMPANY_FORM_INFO,
    JOB_FILTER_CHANGE,
    LOAD_MY_JOBS,
    LOAD_MY_JOBS_DONE,
} from '../Constants';


const initialState = {
    loading: false,
    failed: false,
    company_form_info: [],
    jobs: [],


    myJobs: [],
    pending: [],
    inprocess: [],
    completed: [],
    cancelled: [],
    applied: [],
    rejected: [],
    requests: [],
    jobsFilter: {
        distance: {id: '', type_name: ''},
        pumpType: {id: '', type_name: ''},
        jobType: {id: '', type_name: ''}
    }
}

export default (state=initialState, action) => {
    const {type, company_form_info, jobs, pending, inprocess, completed, cancelled, failed, jobsFilter, applied, rejected, requests} = action;
    switch (type) {
        case GET_COMPANY_FORM_INFO:
            return {...state, company_form_info: company_form_info}
        case CREATE_JOB:
            return {...state, loading: true}
        case CREATE_JOB_DONE:
            return {...state, loading: false, jobs: jobs}


        case LOAD_MY_JOBS:
            return {...state, loading: true}
        case LOAD_MY_JOBS_DONE:
            return {
                ...state,
                loading: false,
                pending: pending,
                inprocess: inprocess,
                completed: completed,
                cancelled: cancelled,
                applied: applied,
                rejected: rejected,
                requests: requests,
                failed: failed
            }
        case JOB_FILTER_CHANGE:
            return {...state, jobsFilter}
        default:
            return state;
    }
}
