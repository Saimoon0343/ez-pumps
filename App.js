// import React, {Component} from 'react';
// import {StatusBar} from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
// import {store} from './source/Redux/store';
// import {Provider} from 'react-redux';
// import {primary} from './source/assets/colors';
// import Routes from './source/Routes';

// export default class App extends Component {
//   componentDidMount() {
//     SplashScreen.show();
//   }

//   render() {
//     setTimeout(() => {
//       SplashScreen.hide();
//     }, 5000);
//     return (
//       <>
//         <StatusBar backgroundColor={primary} />
//         <Provider store={store}>
//           <Routes />
//         </Provider>
//       </>
//     );
//   }
// }

import React, {useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  ImageBackground,
  StatusBar,
  LogBox,
} from 'react-native';
import {store} from './source/Redux/store';
import {Provider} from 'react-redux';
import {primary} from './source/assets/colors';
import Routes from './source/Routes';

function App({navigation}) {
  const [isVisible, setIsVisible] = useState(true);
  const Hide_Splash_Screen = () => {
    setIsVisible(false);
  };
  const time = () => {
    return 2000;
  };

  useEffect(async () => {
    (async () => {
      LogBox.ignoreLogs([
        'VirtualizedLists should never be nested',
        'ViewPropTypes will be removed from React Native',
      ]);
      LogBox.ignoreAllLogs(true);
    })();
    setTimeout(function () {
      Hide_Splash_Screen();
    }, time());
  }, []);

  let Splash_Screen = (
    <ImageBackground
      source={require('./source/images/SplashScreen.png')}
      style={styles.SplashScreen_RootView}></ImageBackground>
  );
  return (
    <>
      <StatusBar backgroundColor={primary} />
      {isVisible === true ? (
        Splash_Screen
      ) : (
        <>
          <Provider store={store}>
            <Routes />
          </Provider>
        </>
      )}
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
