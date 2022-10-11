import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import AppHeader from '../../ScreenComponent/AppHeader';
import {ScreenTypeChange} from '../../Redux/Action/App_Action';
import {regular, semiBold} from '../../assets/fonts';

class PaymentMethod extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected1: false,
            isSelected2: false,
            isSelected3: false,
        };
    }

    componentDidMount() {
        // console.log(this.props)
        // console.log('payment method',this.props.navigation.getState().routes[0].state.history[0].key.split('-')[0])
        // console.log(this.props.navigation.getState().routes)

    }

    navigate = () => {
        // alert(this.state.type)
        // const previousRoute = this.props.navigation.getState().routes[0].state.history[0].key.split('-')[0]
        // if(this.state.type == "Pump"){
        //     this.props._ScreenType('approved')
        // }else{
        //     this.props._ScreenType('completed')
        // }
        // if(previousRoute == "Jobs"){
        //     this.props.navigation.navigate('Jobs',{screen: 'FindJob'});
        // }else{
        //     this.props.navigation.navigate('My Job',{screen: 'FindJob'});
        // }
        this.props.navigation.navigate('Setting');
    };


    render() {
        return (
            <>
                <AppHeader
                    Heading={'PAYMENT METHOD'}
                    IsBack={true}
                    BorRadius={true}
                />
                <View style={styles.main}>
                    <Pay_Compoent
                        Img={require('../../assets/images/masterCard.png')}
                        Card_Number={'**** **** **** 4564'}
                        Detail={'Expiry 01/26'}
                        Onpress={() => this.setState({isSelected1: !this.state.isSelected1})}
                        ifSelected={this.state.isSelected1}
                    />

                    <Pay_Compoent
                        Img={require('../../assets/images/visa.png')}
                        Card_Number={'**** **** **** 4564'}
                        Detail={'Expiry 01/26'}
                        Onpress={() => this.setState({isSelected2: !this.state.isSelected2})}
                        ifSelected={this.state.isSelected2}
                    />

                    <Pay_Compoent
                        Img={require('../../assets/images/express.png')}
                        Card_Number={'**** **** **** 4564'}
                        Detail={'Expiry 01/26'}
                        Onpress={() => this.setState({isSelected3: !this.state.isSelected3})}
                        ifSelected={this.state.isSelected3}
                    />
                    <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={this.navigate}>
                        <Text style={[styles.Txt, {color: '#FFFFFF', marginTop: 0}]}>
                            PAY INVOICE
                        </Text>
                    </TouchableOpacity>

                </View>
            </>
        );
    }
}

function Pay_Compoent({Card_Number, Detail, Img, ifSelected, Onpress}) {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={Onpress} style={[styles.Container, {
            borderColor: ifSelected ? 'green' : null,
            borderWidth: ifSelected ? hp('0.14%') : null,
        }]}>
            <Image source={Img} style={{width: hp('8%'), height: hp('3%'), marginRight: hp('2%')}}
                   resizeMode="contain"/>
            <View>
                <Text style={styles.Number}>{Card_Number}</Text>
                <Text style={styles.Detail}>{Detail}</Text>
            </View>
        </TouchableOpacity>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        _ScreenType: (text) => dispatch(ScreenTypeChange(text)),
    };
}

export default connect(null, mapDispatchToProps)(PaymentMethod);

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        padding: hp('3%'),
    },
    Container: {
        width: '100%',
        padding: hp('3%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: hp('2%'),
    },
    Number: {
        fontSize: hp('1.8%'),
        fontFamily: semiBold,
        lineHeight: hp('2%'),
        color: '#1E202B',
        letterSpacing: 0.5,
    },
    Detail: {
        fontSize: hp('1.5%'),
        fontFamily: regular,
        lineHeight: hp('1.8%'),
        color: '#979797',
        letterSpacing: 0.5,
    },
    btn: {
        width: '75%',
        height: hp('5%'),
        borderRadius: hp('1.2%'),
        backgroundColor: '#FF4040',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp('3%'),
    },
});
