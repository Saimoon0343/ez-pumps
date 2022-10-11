import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Keyboard, ActivityIndicator,
} from 'react-native';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import SnackBar from "../../ScreenComponent/common/SnackBar";
import CodeInput from "../../ScreenComponent/auth/CodeInput";
import { bold, light } from "../../assets/fonts";
import { primary, secondary } from "../../assets/colors";
import { fetchAPI } from "../../services";
import {errorHandler} from '../../utils';
var that;
class OTP_Code extends Component{

    constructor(props){
        super(props);
        this.state={
            code:"",
            loading: false,
        }
    }
    componentDidMount(){
        that = this
    }
    verifyCode = () => {
        Keyboard.dismiss();
        this.setState({loading: true});
        const {code} = that.state;
        const {email} = that.props.route.params;
        var data = new FormData();
        data.append('email', email);
        data.append('otp', code);
        fetchAPI('post', 'verify-otp', data)
        .then( function(response) {
            that.setState({loading: false});
            Toast.show({text1: response.data.message})
            that.props.navigation.navigate(
                "New_Password",{email}
            )
        }).catch(function (error) {
            that.setState({loading: false});
            return Toast.show({text1: errorHandler(error)})
        });
    }

    render(){
        const { loading } = this.state;
        return(
            <View style={styles.main}>
                <ScrollView style={{flex:1, backgroundColor:primary }} contentContainerStyle={{alignItems:"center"}}  >
                    <Image source={require("../../assets/images/logo.png")} style={{width:hp("25%"), height:hp("20%"), marginTop:hp("3%") }} />
                    <Text style={[styles.Txt, {letterSpacing:4, fontSize:hp("2.8%"), marginBottom:hp('0%')}]} > CODE </Text>
                    <Text style={[styles.Txt,{marginVertical:hp('0%'), fontSize:hp('2.5%')}]}>Verification code has been sent to your email, Kindly enter 4-digit code to verify your email.</Text>
                    <CodeInput
                        value={this.state.code}
                        setValue={(code)=>this.setState({code})}
                    />

                    <TouchableOpacity style={styles.btn} onPress={this.verifyCode} >
                        {loading ?
                            <ActivityIndicator size="small" color="white" />
                            :
                            <Text style={[styles.Txt, {marginTop:0, fontSize:hp("2%")}]} >
                                NEXT
                            </Text>
                        }
                    </TouchableOpacity>
                </ScrollView>
                <SnackBar position="bottom" />
            </View>


        );
    }
}
export default OTP_Code;

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:primary,
        padding:hp("1.5%"),
    },
    Txt:{
        fontSize:hp("2.5%"),
        color:"white",
        fontFamily: light,
        marginTop:hp("5%"),
    },
    btn:{
        backgroundColor: secondary,
        width:"90%",
        height:hp("5%"),
        borderRadius:hp("0.8%"),
        alignItems:"center",
        justifyContent:"center",
        marginTop:hp("3%"),
    },
    OuterStyle:{
        width:"50%",
        backgroundColor:"transparent",
        borderBottomColor:"white",
        borderBottomWidth:hp("0.5%"),
        marginTop:"3%",

    },
    InputStyle:{
        fontSize:hp("2.5%"),
        fontFamily: bold,
        color:"white",
        letterSpacing:5,
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center"
    }
});
