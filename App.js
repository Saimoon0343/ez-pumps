import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {store} from './source/Redux/store';
import {Provider} from 'react-redux';
import {primary} from './source/assets/colors';
import Routes from './source/Routes';

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={primary} />
        <Provider store={store}>
          <Routes />
        </Provider>
      </>
    );
  }
}
