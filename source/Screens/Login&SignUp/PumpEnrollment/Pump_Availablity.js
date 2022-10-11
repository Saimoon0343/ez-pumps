import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Switch,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {primary, secondary, white} from '../../../assets/colors';
import {semiBold} from '../../../assets/fonts';

function Availablity({IsValue, OnChange, Day}) {
    return (
        <View style={styles.Container}>
            <View style={{width: '30%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: primary, fontSize: hp('1.8%'), lineHeight: hp('1.9%')}}> {Day} </Text>
            </View>
            <View style={{width: '70%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <BouncyCheckbox
                    size={12}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    text="AM"
                    iconStyle={{borderColor: 'red'}}
                    textStyle={{fontFamily: Regular, fontSize: hp('1.8%')}}
                />
                <BouncyCheckbox
                    size={12}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    text="PM"
                    iconStyle={{borderColor: 'red'}}
                    textStyle={{fontFamily: Regular, fontSize: hp('1.8%')}}
                />
                <Switch
                    value={IsValue}
                    onChange={OnChange}
                    thumbColor={IsValue ? secondary : 'gray'}
                    trackColor={{false: 'lightgray', true: 'lightgray'}}
                />
            </View>
        </View>
    );
}

export default class Pump_Availability extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Monday_Checked: false,
            Tuesday_Checked: true,
            Wednesday_Checked: false,
            Thursday_Checked: true,
            Friday_Checked: false,
            Saturday_Checked: false,
            Sunday_Checked: false,
        };
    }

    onFinishPress = () => {
        this.props.navigation.navigate('PhoneVerification');
    };

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: primary, padding: hp('2%')}}>
                <View style={styles.main}>
                    <Image source={require('../../../assets//images/logo.png')}
                           style={{width: hp('20%'), height: hp('17.5%'), marginTop: hp('3%')}}/>
                    <Text style={[styles.Txt, {
                        letterSpacing: 4,
                        fontSize: hp('2.8%'),
                        alignSelf: 'center',
                        lineHeight: hp('3%'),
                    }]}> REGISTRATION </Text>
                    <Text style={styles.Txt}>Pumping Available </Text>

                    <Availablity Day={'Monday'} IsValue={this.state.Monday_Checked}
                                 OnChange={() => this.setState({Monday_Checked: !this.state.Monday_Checked})}/>
                    <Availablity Day={'Tuesday'} IsValue={this.state.Tuesday_Checked}
                                 OnChange={() => this.setState({Tuesday_Checked: !this.state.Tuesday_Checked})}/>
                    <Availablity Day={'Wednesday'} IsValue={this.state.Wednesday_Checked}
                                 OnChange={() => this.setState({Wednesday_Checked: !this.state.Wednesday_Checked})}/>
                    <Availablity Day={'Thursday'} IsValue={this.state.Thursday_Checked}
                                 OnChange={() => this.setState({Thursday_Checked: !this.state.Thursday_Checked})}/>
                    <Availablity Day={'Friday'} IsValue={this.state.Friday_Checked}
                                 OnChange={() => this.setState({Friday_Checked: !this.state.Friday_Checked})}/>
                    <Availablity Day={'Saturday'} IsValue={this.state.Saturday_Checked}
                                 OnChange={() => this.setState({Saturday_Checked: !this.state.Saturday_Checked})}/>
                    <Availablity Day={'Sunday'} IsValue={this.state.Sunday_Checked}
                                 OnChange={() => this.setState({Sunday_Checked: !this.state.Sunday_Checked})}/>

                    <TouchableOpacity style={styles.btn} onPress={this.onFinishPress}>
                        <Text style={[styles.Txt, {
                            marginTop: 0,
                            alignSelf: 'center',
                            fontSize: hp('2.6%'),
                            lineHeight: hp('2.8%'),
                        }]}>
                            FINISH
                        </Text>
                    </TouchableOpacity>
                    <View style={{height: hp('3%')}}/>
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: primary,
        alignItems: 'center',
    },
    Txt: {
        fontSize: hp('1.75%'),
        color: 'white',
        fontFamily: semiBold,
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
        marginTop: hp('4%'),
    },
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: white,
        width: '100%',
        height: hp('6%'),
        borderRadius: hp('0.8%'),
        marginTop: hp('3%'),

    },
});
