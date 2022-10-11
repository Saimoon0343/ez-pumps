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
import {InputComponent} from '../../../ScreenComponent/TextInput';
import Toast from 'react-native-toast-message';
import SnackBar from '../../../ScreenComponent/common/SnackBar';
import {light} from '../../../assets/fonts';
import {primary, secondary} from '../../../assets/colors';

export default class Company_Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            CompanyName: '',
            Description: '',

        };
    }

    Register_Now = () => {
        const {
            username,
            CompanyName,
            Description,
        } = this.state;
        if (
            username == '' ||
            CompanyName == '' ||
            Description == ''
        ) {
            Toast.show({text1: 'Please fill all fields'});
        } else {
            this.props.navigation.navigate('PhoneVerification');
        }
    };


    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: primary, padding: hp('2%')}}>
                <View style={styles.main}>
                    <Image source={require('../../../assets/images/logo.png')}
                           style={{width: hp('25%'), height: hp('20%'), marginTop: hp('7%')}}/>
                    <Text style={[styles.Txt, {
                        letterSpacing: 4,
                        fontSize: hp('2.8%'),
                        alignSelf: 'center',
                        lineHeight: hp('3%'),
                    }]}> REGISTRATION </Text>
                    <Text style={styles.Txt}> User name </Text>
                    <InputComponent
                        value={this.state.username}
                        OnChangeText={(text) => this.setState({username: text})}
                        otherProps={{
                            placeholder: 'User name',
                            onSubmitEditing: () => this.NextInput.focus(),
                            blurOnSubmit: false,
                        }}
                        mainstyle={{marginTop: hp('1%')}}
                    />
                    <Text style={styles.Txt}> Company Name </Text>
                    <InputComponent
                        value={this.state.CompanyName}
                        OnChangeText={(text) => this.setState({CompanyName: text})}
                        otherProps={{
                            placeholder: 'Company Name',
                            ref: ref => {
                                this.NextInput = ref;
                            },
                            onSubmitEditing: () => this.NextInput1.focus(),
                            blurOnSubmit: false,
                        }}
                        mainstyle={{marginTop: hp('1%')}}
                    />
                    <Text style={styles.Txt}> Description </Text>
                    <InputComponent
                        value={this.state.Description}
                        OnChangeText={(text) => this.setState({Description: text})}
                        otherProps={{
                            secureTextEntry: true,
                            placeholder: 'Description',
                            multiline: true,
                            ref: ref => {
                                this.NextInput1 = ref;
                            },
                        }}
                        mainstyle={{marginTop: hp('1%'), height: hp('25%')}}
                        style={{height: hp('25%')}}
                    />
                    <TouchableOpacity style={styles.btn} onPress={this.Register_Now}>
                        <Text style={[styles.Txt, {
                            marginTop: 0,
                            alignSelf: 'center',
                            fontSize: hp('2.6%'),
                            lineHeight: hp('2.8%'),
                        }]}>
                            FINIS
                        </Text>
                    </TouchableOpacity>
                    <View style={{height: hp('3%')}}/>
                    <SnackBar position="bottom"/>
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: primary,
        padding: hp('1.5%'),
        alignItems: 'center',
    },
    Txt: {
        fontSize: hp('1.5%'),
        color: 'white',
        lineHeight: hp('1.6%'),
        fontFamily: light,
        marginTop: hp('2%'),
        alignSelf: 'flex-start',
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
