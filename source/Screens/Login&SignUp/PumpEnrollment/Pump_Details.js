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
import { OtherTextInput } from "../../../ScreenComponent/TextInput";
import DropDownComponent from "../../../ScreenComponent/DropDownPicker_Component";
import { jobType, pumpType, state } from "../../../utils/RawData";
import Toast from "react-native-toast-message";
import SnackBar from "../../../ScreenComponent/common/SnackBar";
import { bold, light } from "../../../assets/fonts";
import { primary, secondary, white } from "../../../assets/colors";

var items = []
var  List_Services=[
    {
        id:1,
        title:"VTS"
    },
    {
        id:2,
        title:"ITS"
    },
    {
        id:3,
        title:"ILS"
    },
]
export default class Pump_Details extends Component{

    constructor(props){
        super(props);
        this.state={
            Line:0,
            volume:0
        }
    }

    componentDidMount(){
        this.SelectedItems()
    }

    SelectedItems = () =>{
       List_Services.map(e=> items.push({label: e.title,  value:e.title}))
    }

    onNextPress = ()=> {
        if(this.state.Line == 0 || this.state.volume == 0 ){
            // this.toast.show("Please fill all fields first", 1000);
            Toast.show({text1: "Please fill all fields first"})
        }
        else{
            this.props.navigation.navigate("Pump_Availablity")
        }
    }

    render(){
        return(
           <ScrollView style={{flex:1, backgroundColor: primary, padding:hp("2%") }} >
                <View style={styles.main}>
                    <Image source={require("../../../assets/images/logo.png")} style={{width:hp("25%"), height:hp("20%"), marginTop:hp("7%") }} />
                    <Text style={[styles.Txt, {letterSpacing:4, fontSize:hp("2.8%"), alignSelf:"center", lineHeight:hp("3%")}]} > REGISTRATION </Text>
                    <Text style={styles.Txt}>Pumping Details </Text>

                    <DropDownComponent
                        style={{marginTop:hp('2%')}}
                        label={"State"}
                        data={state}
                    />
                     <DropDownComponent
                        style={{marginTop:hp('2%')}}
                        label={"Job Type"}
                        data={jobType}
                    />
                    <DropDownComponent
                        style={{marginTop:hp('2%')}}
                        label={"Pump Type"}
                        data={pumpType}
                    />

                    <OtherTextInput
                            Field={"Line Length"}
                            value={parseInt(this.state.Line)}
                            style={{width:"60%", textAlign:'center'}}
                            mainstyle={{marginTop:hp("2%")}}
                            OnChangeText={(text)=> this.setState({Line: text})}
                            otherProps={{placeholder:"00", maxLength:6, keyboardType:"decimal-pad"}}
                        />

                        <OtherTextInput
                            Field={"Mᵌ"}
                            value={parseInt(this.state.volume)}
                            style={{width:"60%", textAlign:'center'}}
                            mainstyle={{marginTop:hp("2%")}}
                            OnChangeText={(text)=> this.setState({volume: text})}
                            otherProps={{placeholder:"00", maxLength:6, keyboardType:"decimal-pad"}}
                        />



                    <TouchableOpacity style={styles.btn} onPress={this.onNextPress} >
                        <Text style={[styles.Txt, {marginTop:0 , alignSelf:"center", fontSize:hp("2.6%"), lineHeight:hp("2.8%")}]} >
                            NEXT
                        </Text>
                    </TouchableOpacity>
                    <View style={{height:hp("3%")}} />
                    <Toast
                        ref={(toast) => this.toast = toast}
                        style={{backgroundColor:"white", width:"100%", zIndex:1}}
                        position="top"
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={1}
                        textStyle={{color:'red', fontFamily: bold, fontSize:hp("1.8%")}}
                    />
                </View>
                <SnackBar position="bottom"/>
           </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:primary,
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
        marginTop:hp("4%")
    },
    DropDownStyle:{
        width:"100%",
        paddingLeft:hp("5%"),
        height:hp("5%"),
        borderColor:white,
        backgroundColor:white,
        shadowColor:"#00000029",
        shadowOffset:{width:0, height:3},
        shadowRadius:6,
        elevation:6,
    },
});
