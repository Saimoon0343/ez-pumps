import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, ActivityIndicator,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {InputComponent} from '../../ScreenComponent/TextInput';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import Toast from 'react-native-toast-message';
import {lightGray, primary, secondary} from '../../assets/colors';
import {light} from '../../assets/fonts';
import {
    registerStepOne,
    setEmail,
    setPassword,
    setPhone,
    setIsCheck,
    toggleUserType,
} from '../../Redux/Action/AuthAction';
import {connect} from 'react-redux';
import {phoneValidation, validateEmail} from '../../utils';

class RegistrationDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cPassword: '',
        };

    }


    onRegisterPress = async () => {
        const {email, phone, password, isCheck} = this.props;
        const {cPassword} = this.state;
        if (email == '' ||
            phone == '' ||
            password == '' ||
            cPassword == ''
        ) {
            return Toast.show({text1: 'Please Fill All Fields'});
        } else if (password.length < 6) {
            return Toast.show({text1: 'Password must be greater than 6 digits'});
        } else if (password !== cPassword) {
            return Toast.show({text1: 'Password Doesn\'t Matched'});
        } else if (isCheck !== true) {
            return Toast.show({text1: 'Please Check Terms & Conditions'});
        } else if (!validateEmail(email)) {
            return Toast.show({text1: 'Enter Valid Email Address'});
        } else if (!phoneValidation(phone)) {
            return Toast.show({text1: 'Enter Valid Phone Number'});
        } else {
            await this.props.registerStepOne();
        }
    };

    toggleCheck = async () => {
        await this.props.setIsCheck(!this.props.isCheck);
    };

    render() {
        const {loading, email, phone, password, isCheck, userType} = this.props;
        return (
            <View style={styles.main}>
                <InputComponent
                    value={email}
                    OnChangeText={(text) => this.props.setEmail(text)}
                    otherProps={{
                        placeholder: 'Enter Email Address',
                        onSubmitEditing: () => this.NextInput.focus(),
                        blurOnSubmit: false,
                        keyboardType: 'email-address',
                    }}
                    mainstyle={{marginTop: hp('3%')}}
                    name={'mail'}
                    size={hp('3%')}
                    color={lightGray}
                />
                <InputComponent
                    value={phone}
                    OnChangeText={(text) => this.props.setPhone(text)}
                    otherProps={{
                        placeholder: 'phone number',
                        keyboardType: 'number-pad',
                        ref: ref => {
                            this.NextInput = ref;
                        },
                        onSubmitEditing: () => this.NextInput1.focus(),
                        blurOnSubmit: false,
                    }}
                    mainstyle={{marginTop: hp('3%')}}
                    name={'call'}
                    size={hp('3%')}
                    color={lightGray}
                />
                <InputComponent
                    value={password}
                    OnChangeText={(text) => this.props.setPassword(text)}
                    otherProps={{
                        secureTextEntry: true,
                        placeholder: 'password',
                        ref: ref => {
                            this.NextInput1 = ref;
                        },
                        onSubmitEditing: () => this.NextInput2.focus(),
                        blurOnSubmit: false,
                    }}
                    mainstyle={{marginTop: hp('3%')}}
                    name={'ios-lock-closed'}
                    size={hp('3%')}
                    color={lightGray}
                />
                <InputComponent
                    value={this.state.cPassword}
                    OnChangeText={(text) => this.setState({cPassword: text})}
                    otherProps={{
                        secureTextEntry: true,
                        placeholder: 'Confirm Password',
                        ref: ref => {
                            this.NextInput2 = ref;
                        },
                    }}
                    mainstyle={{marginTop: hp('3%')}}
                    name={'ios-lock-closed'}
                    size={hp('3%')}
                    color={lightGray}
                />

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    marginTop: hp('3%'),
                }}>
                    <BouncyCheckbox
                        size={25}
                        fillColor={secondary}
                        unfillColor={primary}
                        iconStyle={{borderColor: secondary}}
                        disableText={true}
                        onPress={this.toggleCheck}
                        isChecked={isCheck}
                    />
                    <Text style={[styles.Txt, {
                        fontSize: hp('1.6%'),
                        color: secondary,
                        marginTop: 0,
                        marginLeft: hp('2%'),
                    }]}>
                        Agree to terms and conditions
                    </Text>

                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.onRegisterPress}>
                    {
                        loading ?
                            <ActivityIndicator size="small" color="white" style={[styles.Txt, {marginTop: 0}]}/>
                            :
                            <Text style={[styles.Txt, {marginTop: 0}]}>
                                {userType ? 'CONTINUE AS COMPANY' : 'CONTINUE AS PUMP'}
                            </Text>
                    }
                </TouchableOpacity>

                <View style={{height: hp('5%')}}/>
                <SnackBar position={'bottom'}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.authReducer.loading,
        email: state.globalReducer.email,
        phone: state.globalReducer.phone,
        password: state.globalReducer.password,
        isCheck: state.globalReducer.isCheck,
        userType: state.globalReducer.userType,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setEmail: (text) => dispatch(setEmail(text)),
        setPhone: (text) => dispatch(setPhone(text)),
        setPassword: (text) => dispatch(setPassword(text)),
        setIsCheck: (isCheck) => dispatch(setIsCheck(isCheck)),
        toggleUserType: (userType) => dispatch(toggleUserType(userType)),
        registerStepOne: () => dispatch(registerStepOne()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationDetails);

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
        backgroundColor: primary,
    },
    Txt: {
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
});
