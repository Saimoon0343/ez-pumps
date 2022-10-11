import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Entypo from "react-native-vector-icons/Entypo";
import { white } from '../../../assets/colors';
import { bold, regular, semiBold } from '../../../assets/fonts';

 function Cancel_Job({onPress}) {

    const [Reason, SetReason] = useState("");
     return(
        <>
            <View style={styles.main} >
                <Text style={styles.Txt} > Why Cancelling this job ? </Text>
                <TextInput
                    value={Reason}
                    onChangeText={(text)=> SetReason(text)}
                    placeholder={"Enter Reason here"}
                    style={styles.InputStyle}
                    multiline={true}
                    maxLength={60}
                />
                <Text style={[styles.Txt, {fontFamily:regular, fontSize:hp("1.6%"), alignSelf:"flex-end", marginTop:0}]} > {Reason.length}/60 </Text>
                    <TouchableOpacity style={styles.Btn} onPress={onPress} >
                        <Text style={styles.Btn_Txt}> Submit </Text>
                    </TouchableOpacity>
            </View>
            <Entypo name="cross" onPress={onPress} color="#000000" size={hp("4%")} style={{position:"absolute", top:1, right:1}} />
        </>
     );
 }


 const styles = StyleSheet.create({
     main:{
        flex:1,
        padding:hp("2%"),
        backgroundColor:"#FFFFFF"
    },
    InputStyle:{
        alignItems:"flex-start",
        justifyContent:"flex-start",
        width:"100%",
        height:hp("20%"),
        backgroundColor:white,
        borderWidth:hp("0.1%"),
        borderColor:"#707070",
        borderRadius:hp("1.1%"),
        paddingLeft:hp("1%"),
        fontSize:hp("1.8%"),
        fontFamily:regular,
        lineHeight:hp("1.9%"),
        color:"black",
        marginTop:hp("2%"),
        marginBottom:hp("2%"),
    },
    Btn:{
        height:hp("4%"),
        marginTop:hp("2%"),
        justifyContent:"center",
        alignItems:"center",
        width:"50%",
        borderRadius:hp("0.8%"),
        backgroundColor:"#FF4040",
        alignSelf:"center"
    },
    Btn_Txt:{
        fontSize:hp("1.8%"),
        fontFamily: semiBold,
        lineHeight:hp("1.8%"),
        color:"white",
        letterSpacing:0.5,
    },
    Txt:{
        fontSize:hp("2.2%"),
        fontFamily: bold,
        lineHeight:hp("2.5%"),
        color:"#1E202B",
        letterSpacing:0.5,
        marginTop:hp("1%")
    },
 });

 export default Cancel_Job;
