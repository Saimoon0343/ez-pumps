import {fetchAPI} from '../../services';
import {LOAD_MY_JOBS, LOAD_MY_JOBS_DONE} from '../Constants';

export const loadMyJobs = () => {
  return function (dispatch) {
    dispatch({
      type: LOAD_MY_JOBS,
    });
    fetchAPI('get', 'get-user-jobs', null, true)
      .then(function (response) {
        // console.log(12, response);
        const jobs = response.data;
        const completedJobs = jobs.complete_jobs;
        const pendingJobs = jobs.pending_jobs;
        const cancelledJobs = jobs.cancelled_jobs;
        const inProcessJobs = jobs.in_process_jobs;
        const appliedJobs = jobs.applied_jobs;
        const rejectedJobs = jobs.rejected_jobs;
        const jobRequest = jobs.applied_jobs;

        dispatch({
          type: LOAD_MY_JOBS_DONE,
          completed: completedJobs,
          pending: pendingJobs,
          cancelled: cancelledJobs,
          inprocess: inProcessJobs,
          applied: appliedJobs,
          rejected: rejectedJobs,
          requests: jobRequest,
          failed: false,
        });
      })
      .catch(function (error) {
        console.log(34, error);
        loadMyJobsDone(dispatch, true);
      });
  };
};

const loadMyJobsDone = (dispatch, failed = false) => {
  return dispatch({
    type: LOAD_MY_JOBS_DONE,
    // myJobs: jobs,
    failed,
  });
};
