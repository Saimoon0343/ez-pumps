import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Login from "../Screens/Login&SignUp/Login";
import SignUp from "../Screens/Login&SignUp/SignUp";
import Pump_Registraion from "../Screens/Login&SignUp/PumpEnrollment/Pump_Registraion";
import Pump_Details from "../Screens/Login&SignUp/PumpEnrollment/Pump_Details";
import Pump_Availablity from "../Screens/Login&SignUp/PumpEnrollment/Pump_Availablity";
import Company_Registration from "../Screens/Login&SignUp/Comapny_Registration/Company_Registration";
import Forget_Password from "../Screens/ForgetScreen/Forget_Password";
import App_Route from "./App_Route";
import New_Password from "../Screens/ForgetScreen/New_Password";
import OTP_Code from "../Screens/ForgetScreen/OTP_Code";
import PhoneVerification from '../Screens/Login&SignUp/PhoneVerification';
import Register from '../Screens/Login&SignUp/Register';

const Stack = createStackNavigator();


function AuthRoute(params) {
    return(
        <Stack.Navigator screenOptions={{ headerShown:false}} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="PumpEnrollment" component={PumpEnrollment} />
            <Stack.Screen name="CompanyEnrollment" component={CompanyEnrollment} />
            <Stack.Screen name="Forget_Password" component={Forget_Password} />
            <Stack.Screen name="New_Password" component={New_Password} />
            <Stack.Screen name="OTP_Code" component={OTP_Code} />
            <Stack.Screen name="App_Route" component={App_Route} />
            <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
}

function PumpEnrollment(params) {
    return(
        <Stack.Navigator screenOptions={{ headerShown:false}} >
            <Stack.Screen name="Pump_Registraion" component={Pump_Registraion} />
            <Stack.Screen name="Pump_Details" component={Pump_Details} />
            <Stack.Screen name="Pump_Availablity" component={Pump_Availablity} />
        </Stack.Navigator>
    )
}

function CompanyEnrollment(params) {
    return(
        <Stack.Navigator screenOptions={{ headerShown:false}} >
            <Stack.Screen name="Company_Registration" component={Company_Registration} />
        </Stack.Navigator>
    )
}

export default AuthRoute;
