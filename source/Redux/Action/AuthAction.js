import {setItem} from '../../persist-storage';
import {fetchAPI} from '../../services';
import Toast from 'react-native-toast-message';
import {
  LOGIN,
  LOGIN_DONE,
  REGISTER,
  REGISTER_DONE,
  REGISTER_SUCCESS,
  REGISTER_STEP_ONE,
  REGISTER_STEP_ONE_DONE,
  REGISTER_STEP_TWO,
  REGISTER_STEP_TWO_DONE,
  SET_DESCRIPTION,
  SET_EMAIL,
  SET_NAME,
  SET_PASSWORD,
  SET_PHONE,
  SET_USERNAME,
  SET_USER_TYPE,
  SET_IS_AGREE,
  SET_WEBSITE,
  SET_IS_CHECK,
  RESEND_OTP,
  RESEND_OTP_DONE,
  GET_PUMP_FORM_INFO,
  GET_COMPANY_FORM_INFO,
  UPDATE_USER_DATA,
  ABC,
} from '../Constants';
import FormData from 'form-data';
import {navigate} from '../../navigation';
import {errorHandler} from '../../utils';

export const login = (email, password, context) => {
  var data = new FormData();
  data.append('email', email);
  data.append('password', password);
  return function (dispatch) {
    dispatch({
      type: LOGIN,
    });
    fetchAPI('POST', 'login', data)
      .then(res => {
        if (res.data.user) {
          setItem('user', JSON.stringify(res.data.user));
          setItem('token', res.data.access_token);
          context.updateState();
          if (res.data.user.user_type === 'PUMP') {
            fetchAPI('get', 'get-pump-form-info', null, res.data.access_token)
              .then(function (response) {
                dispatch({
                  type: GET_PUMP_FORM_INFO,
                  pump_form_info: response.data,
                });
              })
              .catch(function () {
                dispatch({
                  type: GET_PUMP_FORM_INFO,
                  pump_form_info: [],
                });
              });
          } else {
            fetchAPI(
              'get',
              'get-company-form-info',
              null,
              res.data.access_token,
            )
              .then(function (response) {
                dispatch({
                  type: GET_COMPANY_FORM_INFO,
                  company_form_info: response.data,
                });
              })
              .catch(function () {
                dispatch({
                  type: GET_COMPANY_FORM_INFO,
                  company_form_info: [],
                });
              });
          }
          loginDone(dispatch, 'Login Successful', res.data.user);
        } else {
          loginDone(dispatch, res.data.message);
        }
      })
      .catch(err => {
        loginDone(dispatch, errorHandler(err));
      });
  };
};
const loginDone = (dispatch, message, user, token) => {
  Toast.show({text1: message});
  dispatch({
    type: LOGIN_DONE,
    message,
    user,
    token,
  });
};

export const register = () => {
  return function (dispatch, getState) {
    const {email, password, phone, name, username, description, userType} =
      getState().authReducer;
    dispatch({
      type: REGISTER,
    });
    var data = new FormData();
    data.append('name', name);
    data.append('username', username);
    data.append('email', email);
    data.append('password', password);
    data.append('description', description);
    data.append('phone', phone);
    data.append('type', userType ? 'company' : 'pump');

    fetchAPI('post', 'auth/register', data)
      .then(function (response) {
        registerDone(dispatch, response.data.message);
        if (response.data.message) {
          dispatch({type: REGISTER_SUCCESS});
          return navigate('Login');
        } else {
        }
      })
      .catch(function (error) {
        registerDone(dispatch, 'Some Problem Occurred');
      });
  };
};

const registerDone = (dispatch, message) => {
  Toast.show({text1: message});
  return dispatch({
    type: REGISTER_DONE,
  });
};
export const registerStepOne = () => {
  return function (dispatch, getState) {
    const {email, password, phone, userType} = getState().globalReducer;
    dispatch({
      type: REGISTER_STEP_ONE,
    });
    var data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('phone_number', phone);
    data.append('user_type', userType ? 'company' : 'pump');

    fetchAPI('post', 'register-step-one', data)
      .then(function (response) {
        registerStepOneDone(dispatch, response.data.message);
        return navigate('Register');
      })
      .catch(function (error) {
        registerStepOneDone(dispatch, errorHandler(error));
      });
  };
};

const registerStepOneDone = (dispatch, message) => {
  Toast.show({text1: message});
  return dispatch({
    type: REGISTER_STEP_ONE_DONE,
  });
};
export const registerStepTwo = (ImgSrc, address) => {
  return function (dispatch, getState) {
    const {
      name,
      username,
      description,
      website,
      userType,
      email,
      password,
      phone,
      isCheck,
    } = getState().globalReducer;
    dispatch({
      type: REGISTER_STEP_TWO,
    });
    var data = new FormData();
    data.append('user_type', userType ? 'company' : 'pump');
    data.append('company_name', name);
    data.append('user_name', username);
    data.append('email', email);
    data.append('password', password);
    data.append('phone_number', phone);
    data.append('cover_image', ImgSrc);
    data.append('description', description);
    data.append('website', website);
    data.append('address', address.desp);
    data.append('lat', address.region.latitude);
    data.append('lng', address.region.longitude);
    data.append('is_agree', isCheck ? '1' : '0');
    console.log(197, address);
    fetchAPI('post', 'register-step-two', data)
      .then(function (response) {
        console.log(199, response);
        registerStepTwoDone(dispatch, response.data.message);
        return navigate('PhoneVerification');
      })
      .catch(function (error) {
        console.log(190, error);
        registerStepTwoDone(dispatch, errorHandler(error));
      });
  };
};

const registerStepTwoDone = (dispatch, message) => {
  Toast.show({text1: message});
  return dispatch({
    type: REGISTER_STEP_TWO_DONE,
  });
};
export const verifyOtp = otp => {
  return function (dispatch, getState) {
    const {email} = getState().globalReducer;
    dispatch({
      type: REGISTER_STEP_TWO,
    });
    var data = new FormData();
    data.append('email', email);
    data.append('otp', otp);
    fetchAPI('post', 'verify-otp', data)
      .then(function (response) {
        verifyOtpDone(dispatch, response.data.message);
        return navigate('Login');
      })
      .catch(function (error) {
        verifyOtpDone(dispatch, errorHandler(error));
      });
  };
};

const verifyOtpDone = (dispatch, message) => {
  Toast.show({text1: message});
  return dispatch({
    type: REGISTER_STEP_TWO_DONE,
  });
};

export const resendOtp = () => {
  return function (dispatch, getState) {
    const {email} = getState().globalReducer;

    dispatch({
      type: RESEND_OTP,
    });
    var data = new FormData();
    data.append('email', email);

    fetchAPI('post', 'regenerate-otp', data)
      .then(function (response) {
        resendOtpDone(dispatch, response.data.message);
        if (response.data.message == 'Otp successfully created.') {
          resendOtpDone(dispatch, 'OTP is successfully sent');
        } else if (response.data.error) {
          resendOtpDone(dispatch, response.error);
        } else {
          resendOtpDone(dispatch, 'Some Problem Occurred inside server');
        }
      })
      .catch(function () {
        verifyOtpDone(dispatch, 'Some Problem Occurred outside server');
      });
  };
};

const resendOtpDone = (dispatch, message) => {
  Toast.show({text1: message});
  return dispatch({
    type: RESEND_OTP_DONE,
  });
};

export const toggleUserType = userType => {
  return {
    type: SET_USER_TYPE,
    userType,
  };
};

export const setEmail = email => {
  return {
    type: SET_EMAIL,
    email,
  };
};
export const setName = name => {
  return {
    type: SET_NAME,
    name,
  };
};
export const setPhone = phone => {
  return {
    type: SET_PHONE,
    phone,
  };
};
export const setUsername = username => {
  return {
    type: SET_USERNAME,
    username,
  };
};
export const setPassword = password => {
  return {
    type: SET_PASSWORD,
    password,
  };
};
export const setDescription = description => {
  return {
    type: SET_DESCRIPTION,
    description,
  };
};

export const setWebsite = website => {
  return {
    type: SET_WEBSITE,
    website,
  };
};
export const setIsCheck = isCheck => {
  return {
    type: SET_IS_CHECK,
    isCheck,
  };
};

export const updateUserData = user => {
  return {
    type: UPDATE_USER_DATA,
    user: user,
  };
};

export const setAbcVal = abc => {
  return {
    type: ABC,
    abc: abc,
  };
};
