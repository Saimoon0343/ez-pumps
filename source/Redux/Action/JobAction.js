import Toast from 'react-native-toast-message';
import {navigate} from '../../navigation';
import {fetchAPI, getToken} from '../../services';
import {
    LOAD_COMPANY_JOBS,
    LOAD_COMPANY_JOBS_DONE,
    JOB_FILTER_CHANGE,
    CREATE_JOB,
    CREATE_JOB_DONE,
} from '../Constants';
import {errorHandler} from '../../utils';


export const changeJobsFilter = (jobsFilter) => {
    return {
        type: JOB_FILTER_CHANGE,
        jobsFilter,
    };
};

export const createJob = (state, jobType, pumpType, lineLength, volume, jobName, description, address_1, address_2, date, price_from, price_to) => {
    return function (dispatch) {
        dispatch({
            type: CREATE_JOB,
        });
        var data = new FormData();

        data.append('state', state);
        data.append('job_type', jobType);
        data.append('pump_type', pumpType);
        data.append('line_length', lineLength);
        data.append('m3', volume);
        data.append('name', jobName);
        data.append('description', description);
        data.append('address_1', address_1);
        data.append('address_2', address_2);
        data.append('date_and_time', date);
        data.append('price_from', price_from);
        data.append('price_to', price_to);
        fetchAPI('POST', 'create-job', data, true)
            .then((res) => {
                createJobDone(dispatch, res.data.jobs);
                navigate('MyJobs');
            }).catch((err) => {
            createJobDone(dispatch, errorHandler(err));
        });
    };
};

const createJobDone = (dispatch, pumps) => {
    return dispatch({
        type: CREATE_JOB_DONE,
        pumps: pumps,
    });
};
