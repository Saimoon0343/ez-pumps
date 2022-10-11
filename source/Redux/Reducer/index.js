import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import AuthReducer from './AuthReducer';
import JobReducer from './JobReducer';
import PumpReducer from './PumpReducer';
import GlobalReducer from './GlobalReducer';

export default combineReducers({
    appReducer: AppReducer,
    authReducer: AuthReducer,
    pumpReducer: PumpReducer,
    jobReducer: JobReducer,
    globalReducer: GlobalReducer
});