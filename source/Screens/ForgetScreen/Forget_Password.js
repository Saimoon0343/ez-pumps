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
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {InputComponent} from '../../ScreenComponent/TextInput';
import Toast from 'react-native-toast-message';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import {lightGray, primary, secondary} from '../../assets/colors';
import {light} from '../../assets/fonts';
import {errorHandler, validateEmail} from '../../utils';
import {fetchAPI} from '../../services';

var FormData = require('form-data');
var that;
export default class Forget_Password extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            loading: false,
        };
    }

    componentDidMount() {
        that = this;
    }

    onNextPress = () => {
        const {email} = this.state;
        if (!email) {
            return Toast.show({text1: 'Kindly Enter Email Address'});
        }
        if (!validateEmail(email)) {
            return Toast.show({text1: 'Enter Valid Email Address'});
        }
        this.setState({loading: true});
        var data = new FormData();
        data.append('email', email);
        fetchAPI('post', 'forget-password', data)
            .then(function (response) {
                that.setState({loading: false});
                return that.props.navigation.navigate(
                    'OTP_Code', {email: email},
                );
            }).catch(function (error) {
            that.setState({loading: false});
            return Toast.show({text1: errorHandler(error)});
        });
    };

    render() {
        const {loading} = this.state;
        return (
            <ScrollView style={{flex: 1, backgroundColor: primary, padding: hp('2%')}}>
                <View style={styles.main}>
                    <Image source={require('../../assets/images/logo.png')}
                           style={{width: hp('25%'), height: hp('20%'), marginTop: hp('7%')}}/>
                    <Text style={[styles.Txt, {letterSpacing: 4, fontSize: hp('2.8%')}]}>FORGET PASSWORD </Text>
                    <Text style={[styles.Txt, {marginVertical: hp('0%'), fontSize: hp('2.5%')}]}>Enter your email
                        address to reset your password</Text>
                    <InputComponent
                        value={this.state.email}
                        OnChangeText={(text) => this.setState({email: text})}
                        otherProps={{placeholder: 'Email'}}
                        mainstyle={{marginTop: hp('3%')}}
                        name={'mail'}
                        size={hp('3%')}
                        color={lightGray}
                    />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}>
                        <TouchableOpacity disabled={loading} style={styles.btn}
                                          onPress={() => this.props.navigation.goBack()}>
                            <Text style={[styles.Txt, {marginTop: 0, fontSize: hp('2%')}]}>
                                BACK
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={loading} style={styles.btn} onPress={this.onNextPress}>
                            {loading ?
                                <ActivityIndicator size="small" color="white" />
                                :
                                <Text style={[styles.Txt, {marginTop: 0, fontSize: hp('2%')}]}>
                                    NEXT
                                </Text>
                            }
                        </TouchableOpacity>
                    </View>
                    <SnackBar position="bottom"/>
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        height: hp('100%'),
        backgroundColor: primary,
        padding: hp('1.5%'),
        alignItems: 'center',
    },
    Txt: {
        fontSize: hp('2.5%'),
        color: 'white',
        fontFamily: light,
        marginTop: hp('5%'),
    },
    btn: {
        backgroundColor: secondary,
        width: '45%',
        height: hp('5%'),
        borderRadius: hp('0.8%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('3%'),
    },
});
