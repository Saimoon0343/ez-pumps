import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {InputComponent} from "../../../ScreenComponent/TextInput";
import SnackBar from "../../../ScreenComponent/common/SnackBar";
import Toast from "react-native-toast-message";
import { primary, secondary } from "../../../assets/colors";
import { light } from "../../../assets/fonts";

export default class Pump_Registraion extends Component{

    constructor(props){
        super(props);
        this.state={
            username:"",
            PumpName:"",
            Description:""
        }
    }

    onNextPress = () => {
        if(
            this.state.username == "" ||
            this.state.PumpName == "" ||
            this.state.Description == ""
        ){
            Toast.show({text1: "Please fill all fields"})
        }
        else{
            // this.props.navigation.navigate("Pump_Details")
        }
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:primary, padding:hp("2%") }} >
            <ScrollView >
                <View style={styles.main}>
                    <Image source={require("../../../assets/images/logo.png")} style={{width:hp("25%"), height:hp("20%"), marginTop:hp("7%") }} />
                    <Text style={[styles.Txt, {letterSpacing:4, fontSize:hp("2.8%"), alignSelf:"center", lineHeight:hp("3%")}]} > REGISTRATION </Text>
                    <Text style={styles.Txt}> User name </Text>
                    <InputComponent
                        value={this.state.username}
                        OnChangeText={(text)=> this.setState({username:text})}
                        otherProps= {{
                            placeholder:"User name",
                            onSubmitEditing: () => this.NextInput.focus(),
                            blurOnSubmit:false
                        }}
                        mainstyle={{marginTop:hp("1%")}}
                    />
                     <Text style={styles.Txt}> Pump Name </Text>
                    <InputComponent
                        value={this.state.PumpName}
                        OnChangeText={(text)=> this.setState({PumpName:text})}
                        otherProps= {{
                            placeholder:"Pump Name",
                            ref:ref=> {this.NextInput = ref;},
                            onSubmitEditing: ()=> this.NextInput1.focus(),
                            blurOnSubmit:false
                        }}
                        mainstyle={{marginTop:hp("1%")}}
                    />
                     <Text style={styles.Txt}> Description </Text>
                     <InputComponent
                        value={this.state.Description}
                        OnChangeText={(text)=> this.setState({Description:text})}
                        otherProps= {{
                            secureTextEntry:true,
                            placeholder:"Description",
                            multiline:true,
                            ref:ref=> {this.NextInput1 = ref;},
                        }}
                        mainstyle={{marginTop:hp("1%"),height:hp("25%")}}
                        style={{height:hp("25%")}}
                    />
                    <TouchableOpacity style={styles.btn} onPress={this.onNextPress} >
                        <Text style={[styles.Txt, {marginTop:0 , alignSelf:"center", fontSize:hp("2.6%"), lineHeight:hp("2.8%")}]} >
                            NEXT
                        </Text>
                    </TouchableOpacity>
                    <View style={{height:hp("3%")}} />
            </View>
            </ScrollView>
            <SnackBar position="bottom"/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        padding:hp("1.5%"),
        alignItems:"center"
    },
    Txt:{
        fontSize:hp("1.5%"),
        color:"white",
        lineHeight:hp("1.6%"),
        fontFamily:light,
        marginTop:hp("2%"),
        alignSelf:"flex-start"
    },
    btn:{
        backgroundColor:secondary,
        width:"100%",
        height:hp("6%"),
        borderRadius:hp("0.8%"),
        alignItems:"center",
        justifyContent:"center",
        marginTop:hp("3%")
    }
});
