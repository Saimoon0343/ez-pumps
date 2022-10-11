import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    TextInput,
    Keyboard,
    ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {ForgetInput} from '../../ScreenComponent/TextInput';
import {bold, semiBold} from '../../assets/fonts';
import {primary, secondary, white} from '../../assets/colors';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import {state} from '../../utils/RawData';
// import { toTitleCase } from '../../utils';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import {fetchAPI, getToken} from '../../services';
import {errorHandler} from '../../utils';

var FormData = require('form-data');


var that;

class PasswordChange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Current_Password: '',
            New_Password: '',
            CNew_Password: '',
            show_Current_Password: true,
            show_New_Password: true,
            show_CNew_Password: true,
            loading: false,
        };
    }

    componentDidMount() {
        that = this;
    }

    OnSavedPress = () => {
        const token = getToken();
        const {Current_Password, New_Password, CNew_Password} = this.state;
        if (Current_Password && New_Password && CNew_Password) {
            if (New_Password == CNew_Password) {
                that.setState({loading: true});
                var data = new FormData();
                data.append('current_password', Current_Password);
                data.append('new_password', New_Password);
                fetchAPI('post', 'update-password', data, token)
                    .then(function (response) {
                        that.setState({loading: false});
                        Toast.show({text1: response.data.message});
                        if (response.data.message == 'Password successfully updated.') {
                            Toast.show({text1: 'Password successfully updated.'});
                        } else {
                            Toast.show({text1: 'Some Error Occurred Try Again'});
                        }
                    }).catch(function (error) {
                    that.setState({loading: false});
                    Toast.show({text1: errorHandler(error)});
                });
            } else {
                Toast.show({text1: 'Password Doesn\'t Matched'});
            }
        } else {
            Toast.show({text1: 'Enter all fields'});
        }
    };

    render() {
        const {name} = this.props.user;
        const {loading} = this.state;
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <AppHeader
                    Heading={'CHANGE PASSWORD'}
                    BorRadius={true}
                    IsBack={true}
                    style={{zIndex: 1}}
                    IsDisable={true}
                />
                <View style={styles.Top}>
                    <Text style={styles.Txt}>{name}</Text>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom: hp('10%')}} style={styles.Container}>
                    <Text style={[styles.Txt, {color: primary, fontSize: hp('2%')}]}>
                        Current Password
                    </Text>
                    <ForgetInput
                        value={this.state.Current_Password}
                        OnChangeText={(text) => this.setState({Current_Password: text})}
                        mainstyle={styles.InputStyle}
                        otherProps={{
                            placeholder: 'Enter Current Password',
                            secureTextEntry: this.state.show_Current_Password ? true : false,
                        }}
                        IfShow={this.state.show_Current_Password}
                        Onpress={() => this.setState({show_Current_Password: !this.state.show_Current_Password})}
                        color={secondary}
                        name={'eye'}
                        name1={'eye-off'}
                        size={hp('3%')}
                    />

                    <Text style={[styles.Txt, {color: primary, fontSize: hp('2%'), marginTop: hp('5%')}]}>
                        New Password
                    </Text>
                    <ForgetInput
                        value={this.state.New_Password}
                        OnChangeText={(text) => this.setState({New_Password: text})}
                        mainstyle={styles.InputStyle}
                        otherProps={{
                            placeholder: 'Enter New Password',
                            secureTextEntry: this.state.show_New_Password ? true : false,
                        }}
                        IfShow={this.state.show_New_Password}
                        Onpress={() => this.setState({show_New_Password: !this.state.show_New_Password})}
                        color={secondary}
                        name={'eye'}
                        name1={'eye-off'}
                        size={hp('3%')}
                    />
                    <Text style={[styles.Txt, {color: primary, fontSize: hp('2%'), marginTop: hp('5%')}]}>
                        Confirm New Password
                    </Text>
                    <ForgetInput
                        value={this.state.CNew_Password}
                        OnChangeText={(text) => this.setState({CNew_Password: text})}
                        mainstyle={styles.InputStyle}
                        otherProps={{
                            placeholder: 'Confirm New Password',
                            secureTextEntry: this.state.show_CNew_Password ? true : false,
                        }}
                        IfShow={this.state.show_CNew_Password}
                        Onpress={() => this.setState({show_CNew_Password: !this.state.show_CNew_Password})}
                        color={secondary}
                        name={'eye'}
                        name1={'eye-off'}
                        size={hp('3%')}
                    />
                    {loading
                        ?
                        <ActivityIndicator style={{marginTop: hp('2%')}} size={'large'} color={secondary}/>
                        :
                        <View style={styles.Btn_Container}>
                            <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.goBack()}>
                                <Text style={[styles.Txt, {marginTop: 0, fontSize: hp('2%')}]}> Back </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn} onPress={this.OnSavedPress}>
                                <Text style={[styles.Txt, {marginTop: 0, fontSize: hp('2%')}]}> Change </Text>
                            </TouchableOpacity>
                        </View>
                    }
                </ScrollView>
                <SnackBar position={'bottom'}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
    };
};

export default connect(mapStateToProps, null)(PasswordChange);

const styles = StyleSheet.create({
    Top: {
        width: '100%',
        paddingVertical: hp('1%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: secondary,
    },
    Txt: {
        fontSize: hp('2.5%'),
        fontFamily: semiBold,
        lineHeight: hp('2.8%'),
        color: white,
        letterSpacing: 0.5,
        marginTop: hp('1%'),
    },

    Container: {
        padding: hp('3%'),
    },
    InputStyle: {
        width: '100%',
        height: hp('6%'),
        paddingLeft: hp('0.5%'),
        fontSize: hp('1.8%'),
        fontFamily: semiBold,
        color: 'black',
        letterSpacing: 1.5,
        borderRadius: hp('0.8%'),
        borderColor: 'black',
        borderWidth: hp('0.2%'),
        marginTop: hp('1%'),
    },
    Btn_Container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp('5%'),
    },
    btn: {
        height: hp('5%'),
        width: '46%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp('0.8%'),
        backgroundColor: secondary,
    },
});
