import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Slide from '../assets/animation/Slide';
import { isReadyRef, navigationRef } from '../navigation';
import { AuthContext } from '../context';
import { useDispatch } from 'react-redux';
import {
    GET_COMPANY_FORM_INFO,
    GET_PUMP_FORM_INFO,
    PUT_USER_DATA,
} from '../Redux/Constants';
import AuthScreen from '../Screens/AuthScreen';
import AppRoutes from './App_Route';
import AuthRoute from './Auth_Route';
import {fetchAPI, getToken, getUser} from '../services';

const Stack = createStackNavigator();

const Routes = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(null)

    const dispatch = useDispatch();

    useEffect(()=>{
        checkToken();
    },[])

    const checkToken = async () => {
        const user = await getUser();
        const token = await getToken();
        if(user && token){
            setIsLoggedIn(true);
            dispatch({
                type: PUT_USER_DATA,
                user,
                token
            });

            if(user.user_type === "PUMP"){
                fetchAPI('get', 'get-pump-form-info', null, true)
                    .then(function (response) {
                        dispatch({
                            type: GET_PUMP_FORM_INFO,
                            pump_form_info: response.data
                        });
                    }).catch(function () {
                    dispatch({
                        type: GET_PUMP_FORM_INFO,
                        pump_form_info: [],
                    });
                });
            }else{
                fetchAPI('get', 'get-company-form-info', null, true)
                    .then(function (response) {
                        dispatch({
                            type: GET_COMPANY_FORM_INFO,
                            company_form_info: response.data
                        });
                    }).catch(function () {
                    dispatch({
                        type: GET_COMPANY_FORM_INFO,
                        company_form_info: [],
                    });
                });
            }
        }else{
            setIsLoggedIn(false);
        }
    }

    if(isLoggedIn === null){
        return <AuthScreen/>
    }

    return(
        <>
            <AuthContext.Provider value={{updateState:checkToken}}>
                <NavigationContainer
                    ref={navigationRef}
                    onReady={() => {
                        isReadyRef.current = true;
                    }}
                >
                    <Stack.Navigator screenOptions={{headerShown:false}}>
                        {isLoggedIn
                            ?
                                <Stack.Screen options={{ cardStyleInterpolator: Slide }} name="MainRoutes" component={AppRoutes}/>
                            :
                                <Stack.Screen name="AuthRoutes" component={AuthRoute}/>
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthContext.Provider>
        </>
    )
}
export default Routes;
