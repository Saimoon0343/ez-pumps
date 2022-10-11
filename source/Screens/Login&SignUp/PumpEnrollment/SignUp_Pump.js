import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {InputComponent} from '../../../ScreenComponent/TextInput';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Toast from 'react-native-toast-message';
import SnackBar from '../../../ScreenComponent/common/SnackBar';
import {light} from '../../../assets/fonts';
import {lightGray, primary, secondary} from '../../../assets/colors';

class SingUp_Pump extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            PhoneNumber: '',
            password: '',
            Confirm_password: '',
            isChecked: false,
        };
    }

    onContinuePress = () => {
        if (this.state.email == '' ||
            this.state.PhoneNumber == '' ||
            this.state.password == '' ||
            this.state.Confirm_password == ''
        ) {
            Toast.show({text1: 'Please Fill All Fields'});
        } else if (this.state.password !== this.state.Confirm_password) {
            Toast.show({text1: 'Password Doesn\'t Matched'});
        } else if (this.state.isChecked !== true) {
            Toast.show({text1: 'Please Check Terms & Conditions'});
        } else {
            this.props.navigation.navigate('PumpEnrollment');
        }
    };

    Accept = () => {
        this.setState({isChecked: !this.state.isChecked});
    };

    render() {
        return (
            <View style={styles.main}>
                <InputComponent
                    value={this.state.email}
                    OnChangeText={(text) => this.setState({email: text})}
                    otherProps={{
                        placeholder: 'email address',
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
                    value={this.state.PhoneNumber}
                    OnChangeText={(text) => this.setState({PhoneNumber: text})}
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
                    value={this.state.password}
                    OnChangeText={(text) => this.setState({password: text})}
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
                    value={this.state.Confirm_password}
                    OnChangeText={(text) => this.setState({Confirm_password: text})}
                    otherProps={{
                        secureTextEntry: true,
                        placeholder: 'confirm password',
                        ref: ref => {
                            this.NextInput2 = ref;
                        },
                        onSubmitEditing: this.Register_Now,
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
                        size={15}
                        fillColor={secondary}
                        unfillColor={primary}
                        iconStyle={{borderColor: secondary}}
                        disableText={true}
                        onPress={this.Accept}
                    />
                    <Text style={[styles.Txt, {
                        fontSize: hp('1.6%'),
                        color: secondary,
                        marginTop: 0,
                        marginLeft: hp('2%'),
                    }]}> Agree to terms and conditions </Text>

                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.onContinuePress}>
                    <Text style={[styles.Txt, {marginTop: 0}]}>
                        CONTINUE AS PUMP
                    </Text>
                </TouchableOpacity>

                <View style={{height: hp('5%')}}/>
                <SnackBar position={'bottom'}/>
            </View>
        );
    }
}

export default SingUp_Pump;

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
