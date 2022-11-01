import Toast from 'react-native-toast-message';
import {navigate} from '../../navigation';
import {fetchAPI, getToken} from '../../services';
import {
  LOAD_PUMPS,
  LOAD_PUMPS_DONE,
  CREATE_UPDATE_PUMP,
  CREATE_UPDATE_PUMP_DONE,
  DELETE_PUMP,
  DELETE_PUMP_DONE,
} from '../Constants';
import {errorHandler} from '../../utils';

export const loadPumps = () => {
  const token = getToken();
  return function (dispatch) {
    dispatch({
      type: LOAD_PUMPS,
    });
    fetchAPI('get', 'get-pumps', null, token)
      .then(function (response) {
        loadPumpsDone(dispatch, response.data.pumps, false);
      })
      .catch(function () {
        loadPumpsDone(dispatch, [], true);
      });
  };
};

const loadPumpsDone = (dispatch, pumps, failed = false) => {
  return dispatch({
    type: LOAD_PUMPS_DONE,
    pumps: pumps,
    failed: failed,
  });
};

export const createUpdatePump = (
  pumpId,
  state,
  jobType,
  pumpType,
  lineLength,
  volume,
  pumpName,
  description,
  availability,
) => {
  return function (dispatch) {
    dispatch({
      type: CREATE_UPDATE_PUMP,
    });
    var data = new FormData();
    var url;
    if (pumpId !== 0) {
      url = 'update-pump/' + pumpId;
    } else {
      url = 'create-pump';
    }

    data.append('state', state);
    data.append('job_type', jobType);
    data.append('pump_type', pumpType);
    data.append('line_length', lineLength);
    data.append('m3', volume);
    data.append('name', pumpName);
    data.append('description', description);
    data.append('days', JSON.stringify(availability));
    console.log(58, data);
    fetchAPI('POST', url, data, true)
      .then(res => {
        createUpdatePumpDone(dispatch, res.data.pumps);
        navigate('App_Pumps');
      })
      .catch(err => {
        createUpdatePumpDone(dispatch, errorHandler(err));
      });
  };
};

const createUpdatePumpDone = (dispatch, pumps) => {
  return dispatch({
    type: CREATE_UPDATE_PUMP_DONE,
    pumps: pumps,
  });
};

export const deletePump = pumpId => {
  return function (dispatch) {
    dispatch({
      type: DELETE_PUMP,
    });
    fetchAPI('get', `delete-pump/${pumpId}`, null, true)
      .then(function (response) {
        deletePumpDone(dispatch, response.data.pumps);
        navigate('App_Pumps');
      })
      .catch(function (error) {
        Toast.show({text1: 'Something went wrong.'});
        deletePumpDone(dispatch, errorHandler(error));
      });
  };
};

const deletePumpDone = (dispatch, pumps) => {
  return dispatch({
    type: DELETE_PUMP_DONE,
    pumps: pumps,
  });
};
