import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {secondary, lightGray} from '../../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {InputComponent} from '../../ScreenComponent/TextInput';
import Container from '../../ScreenComponent/common/Container';
import {black} from '../../assets/colors';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import Toast from 'react-native-toast-message';
import {regular} from '../../assets/fonts';
import {connect} from 'react-redux';
import {login} from '../../Redux/Action/AuthAction';
import {AuthContext} from '../../context';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'pump@test.com',
      password: '123',
      failed: false,
    };
  }

  onLoginPress = () => {
    const {email, password} = this.state;
    const {login} = this.props;
    if (!email || !password) {
      return Toast.show({text1: 'Enter Email and Password'});
    }
    return login(email, password, this.context);
  };

  render() {
    const {loading} = this.props;
    return (
      <Container style={{backgroundColor: black}}>
        <SnackBar position="bottom" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
          }}>
          <Image
            source={require('../../images/logo2.png')}
            style={{width: hp('25%'), height: hp('20%'), marginTop: hp('7%')}}
          />
          <Text style={[styles.text, {letterSpacing: 4, fontSize: hp('2.8%')}]}>
            {' '}
            SIGN IN{' '}
          </Text>
          <InputComponent
            value={this.state.email}
            OnChangeText={text => this.setState({email: text})}
            otherProps={{
              placeholder: 'Email',
              onSubmitEditing: () => this.NextInput.focus(),
              blurOnSubmit: false,
            }}
            mainstyle={{marginTop: hp('3%')}}
            name={'mail'}
            size={hp('3%')}
            color={lightGray}
          />
          <InputComponent
            value={this.state.password}
            OnChangeText={text => this.setState({password: text})}
            otherProps={{
              secureTextEntry: true,
              placeholder: 'Password',
              ref: ref => (this.NextInput = ref),
              onSubmitEditing: this.onLoginPress,
            }}
            mainstyle={{marginTop: hp('3%')}}
            name={'ios-lock-closed'}
            size={hp('3%')}
            color={lightGray}
          />
          <TouchableOpacity style={styles.btn} onPress={this.onLoginPress}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={[styles.text, {marginTop: 0}]}>SIGN IN</Text>
            )}
          </TouchableOpacity>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '90%',
            }}>
            <Text
              onPress={() => this.props.navigation.navigate('Forget_Password')}
              style={[styles.text, {fontSize: hp('2%'), color: secondary}]}>
              Forgot password ?
            </Text>
            <Text
              onPress={() => this.props.navigation.navigate('SignUp')}
              style={[styles.text, {fontSize: hp('2%'), color: secondary}]}>
              Don't have an account ?
            </Text>
          </View>
          <View style={{width: '100%', height: hp('20%')}} />
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password, context) =>
      dispatch(login(email, password, context)),
  };
};

Login.contextType = AuthContext;

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  text: {
    fontSize: hp('2.5%'),
    color: 'white',
    fontFamily: regular,
    marginTop: hp('5%'),
  },
  btn: {
    backgroundColor: secondary,
    width: '100%',
    height: hp('6%'),
    borderRadius: hp('0.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
  },
});
