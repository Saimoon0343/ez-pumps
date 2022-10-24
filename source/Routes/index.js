import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Slide from '../assets/animation/Slide';
import {isReadyRef, navigationRef} from '../navigation';
import {AuthContext} from '../context';
import {useDispatch} from 'react-redux';
import {
  GET_COMPANY_FORM_INFO,
  GET_PUMP_FORM_INFO,
  PUT_USER_DATA,
} from '../Redux/Constants';
import AuthScreen from '../Screens/AuthScreen';
import AppRoutes from './App_Route';
import AuthRoute from './Auth_Route';
import {fetchAPI, getToken, getUser} from '../services';
import {Pusher, PusherEvent} from '@pusher/pusher-websocket-react-native';

const Stack = createStackNavigator();

const Routes = () => {
  const initPusher = async data => {
    const user = await getUser();

    // console.log(23, data);
    // console.log(24, user);
    const pusher = Pusher.getInstance();

    await pusher.init({
      apiKey: 'b0c541126acaad1a9dca',
      cluster: 'ap2',
    });
    await pusher
      .subscribe({
        channelName: 'notification-channel',
        // onEvent: 'notification-event.2',
      })
      .then(res => {
        console.log(34, res);
      })
      .catch(err => console.log('err', err));
    await pusher
      .connect()
      .then(res => {
        console.log(45, res);
      })
      .catch(err => console.log('err', err));
    const {onEvent} = pusher.init;
    let y = 'notification-event.2';
    let channelName = 'notification-channel';
    PusherEvent.bind(channelName, y, null, user.id, function (data) {
      console.log(51, data);
    });
    // onEvent(y => console.log(6789, y));
    //   pusher.
    // pusher.channels.('notification-event.2', event => {
    //   console.log('event', event);
    //   console.log('channel.state', channel.state);
    // });

    // Pusher.bind(`notification-event.2`, function (data) {
    //   console.log(37, data);
    // });
    // pusher.subscribe('notification-channel');
    // (await channel).onEvent(`notification-event.${user.id}`, function (data) {
    //   console.log(37, data);
    // });
    // onEvent(even: `notification-event.${user.id}`) {
    //     console.log("onEvent: $event");
    //   }
    // function onEvent(PusherEvent, event) {
    //   console.log(`onEvent: ${event}`);
    // }
    // onEvent();
    // channel.bind(`notification-event.${user.id}`, function (data) {
    //   console.log(37, data);
    // });

    // channel.onEvent('notification-event.2', event => {
    //   console.log('event', event);
    //   console.log('channel.state', channel.state);
    // });
    // let myChannel = await pusher.subscribe({
    //     channelName: "notification-channel",
    //     onEvent: ("notification-event",user.id) => {
    //       console.log(`onEvent: ${event}`);
    //     }
    //   });
  };
  //   const initPusher = async () => {
  //     const pusher = Pusher.getInstance();
  //     var v = 'notification-event.2';
  //     var channelName = 'notification-channel';
  //     function onSubscriptionSucceeded(channelName, data) {
  //       console.log(`onSubscriptionSucceeded: ${channelName} data: ${data}`);
  //     }
  //     const onEvent = v => console.log(67);
  //     try {
  //       await pusher.init({
  //         apiKey: 'b0c541126acaad1a9dca',
  //         cluster: 'ap2',
  //         // authEndpoint: '<YOUR ENDPOINT URI>',
  //         onConnectionStateChange: (currenstate, prevState) =>
  //           console.log(90, currenstate, 78, prevState),
  //         onError: err => console.log(86, err),
  //         onEvent: onEvent(v),
  //         onSubscriptionSucceeded: onSubscriptionSucceeded(channelName),
  //       });

  //       await pusher.subscribe({channelName: 'notification-channel'});
  //       await pusher.connect();
  //     } catch (e) {
  //       console.log(`ERROR: ${e}`);
  //     }
  //   };
  initPusher();

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const user = await getUser();
    const token = await getToken();
    if (user && token) {
      setIsLoggedIn(true);
      dispatch({
        type: PUT_USER_DATA,
        user,
        token,
      });

      if (user.user_type === 'PUMP') {
        fetchAPI('get', 'get-pump-form-info', null, true)
          .then(function (response) {
            dispatch({
              type: GET_PUMP_FORM_INFO,
              pump_form_info: response.data,
            });
            initPusher(response.data);
          })
          .catch(function () {
            dispatch({
              type: GET_PUMP_FORM_INFO,
              pump_form_info: [],
            });
          });
      } else {
        fetchAPI('get', 'get-company-form-info', null, true)
          .then(function (response) {
            dispatch({
              type: GET_COMPANY_FORM_INFO,
              company_form_info: response.data,
            });
            initPusher(response.data);
          })
          .catch(function () {
            dispatch({
              type: GET_COMPANY_FORM_INFO,
              company_form_info: [],
            });
          });
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn === null) {
    return <AuthScreen />;
  }

  return (
    <>
      <AuthContext.Provider value={{updateState: checkToken}}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {isLoggedIn ? (
              <Stack.Screen
                options={{cardStyleInterpolator: Slide}}
                name="MainRoutes"
                component={AppRoutes}
              />
            ) : (
              <Stack.Screen name="AuthRoutes" component={AuthRoute} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
};
export default Routes;
