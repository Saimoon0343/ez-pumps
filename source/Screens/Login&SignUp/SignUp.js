import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {primary, secondary, white} from '../../assets/colors';
import {light} from '../../assets/fonts';
import RegistrationDetails from './RegisterationDetails';
import {connect} from 'react-redux';
import {toggleUserType} from '../../Redux/Action/AuthAction';

class SignUp extends Component {
  render() {
    const {navigation, userType} = this.props;
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: primary,
          padding: hp('2%'),
        }}>
        <View style={styles.main}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{width: hp('20%'), height: hp('15%'), marginTop: hp('7%')}}
          />
          <Text style={[styles.text, {letterSpacing: 4, fontSize: hp('2.5%')}]}>
            REGISTRATION{' '}
          </Text>

          <View style={styles.Type}>
            <View
              style={{
                width: hp('0.25%'),
                height: hp('0.25%'),
                borderRadius: 100,
                marginRight: hp('0.5%'),
                backgroundColor: white,
              }}
            />
            <Text
              style={[
                styles.text,
                {
                  fontSize: hp('1.75%'),
                  fontFamily: light,
                  marginTop: 0,
                  letterSpacing: 1.25,
                },
              ]}>
              Select the register type
            </Text>
          </View>

          <View style={styles.SelectType}>
            <TouchableOpacity
              onPress={() => this.props.toggleUserType(true)}
              style={[
                styles.btn,
                {
                  backgroundColor: userType ? secondary : 'transparent',
                  width: '50%',
                  marginTop: 0,
                },
              ]}>
              <Text style={[styles.text, {marginTop: 0, fontSize: hp('1.8%')}]}>
                Company
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.toggleUserType(false)}
              style={[
                styles.btn,
                {
                  backgroundColor: !userType ? secondary : 'transparent',
                  width: '50%',
                  marginTop: 0,
                },
              ]}>
              <Text style={[styles.text, {marginTop: 0, fontSize: hp('1.8%')}]}>
                Pump Enrollment
              </Text>
            </TouchableOpacity>
          </View>
          <RegistrationDetails navigation={navigation} userType={userType} />
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleUserType: userType => dispatch(toggleUserType(userType)),
  };
};

const mapStateToProps = state => {
  return {
    userType: state.globalReducer.userType,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: primary,
    alignItems: 'center',
    paddingBottom: hp('32'),
  },
  text: {
    fontSize: hp('2.5%'),
    color: 'white',
    fontFamily: light,
    marginTop: hp('3%'),
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
  Type: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp('2%'),
  },
  SelectType: {
    width: '100%',
    height: hp('6%'),
    borderColor: secondary,
    borderWidth: hp('0.3%'),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
});
