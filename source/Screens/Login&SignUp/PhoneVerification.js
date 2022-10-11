import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {black, secondary, white} from '../../assets/colors';
import {light, regular} from '../../assets/fonts';
import CodeInput from '../../ScreenComponent/auth/CodeInput';
import PhoneInput from '../../ScreenComponent/auth/PhoneInput';
import {Button} from '../../ScreenComponent/common/Button';
import Container from '../../ScreenComponent/common/Container';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import {verifyOtp, setEmail, resendOtp} from '../../Redux/Action/AuthAction';

class PhoneVerification extends Component {
    state = {
        code: '',
        confirm: null,
    };

    onSendCodePress = async () => {
        await this.props.resendOtp();
    };


    onRegisterPress = async () => {
        const {code} = this.state;
        await this.props.verifyOtp(code);
    };

    render() {
        const {code} = this.state;
        const {loading, email} = this.props;
        return (
            <Container style={{backgroundColor: black}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image style={styles.image} source={require('../../assets/images/logo.png')}/>
                    <Text style={styles.heading}>REGISTRATION</Text>
                    <Text style={styles.text}>Verification code will be sent on your email</Text>
                    <View style={styles.row}>
                        <PhoneInput
                            phone={email}
                            editable={false}
                        />
                        <Button
                            color="transparent"
                            text={'Re-send'}
                            textColor={white}
                            style={styles.button}
                            onPress={this.onSendCodePress}
                        />
                    </View>
                    <Text style={[styles.text, {marginTop: hp('10%')}]}>Enter code you received</Text>
                    <CodeInput
                        value={code}
                        setValue={(code) => this.setState({code})}
                        style={{marginTop: hp('2%'), width: hp('35%')}}
                    />
                    <Button
                        color={secondary}
                        text={'VERIFY'}
                        textColor={white}
                        loading={loading}
                        style={{marginTop: hp('5%'), alignSelf: 'center'}}
                        onPress={this.onRegisterPress}
                    />
                </ScrollView>
                <SnackBar position={'top'}/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.loading,
        email: state.globalReducer.email,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setEmail: (email) => dispatch(setEmail(email)),
        resendOtp: (email) => dispatch(resendOtp(email)),
        verifyOtp: (otp) => dispatch(verifyOtp(otp)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerification);

const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        height: hp('27.5%'),
        width: hp('27.5%'),

    },
    heading: {
        fontSize: hp('2.5%'),
        color: 'white',
        fontFamily: regular,
        textAlign: 'center',
        letterSpacing: 5,
    },
    text: {
        fontSize: hp('2%'),
        color: 'white',
        fontFamily: light,
        marginTop: hp('3%'),
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: hp('3%'),
    },
    button: {
        borderWidth: 1,
        borderColor: white,
        width: '25%',
    },
});
