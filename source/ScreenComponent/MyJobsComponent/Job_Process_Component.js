import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { primary, white } from '../../assets/colors';
import { bold, regular } from '../../assets/fonts';

 function Job_Process_Component({Urgent, heading, Date, Duration, PostedBy, Onpress}){


     return(
        <TouchableOpacity onPress={Onpress} activeOpacity={0.8} style={[styles.main, {backgroundColor:Urgent?"#FF4040":"#F2F2F2",}]} >
            <View style={styles.Top} >
                <Text style={[styles.heading, {color:primary}]} >{heading}</Text>
                <Text style={[styles.heading, {color:primary}]} >{Date}</Text>
            </View>

            <View style={styles.TxtAlign} >
                <FontAwesome name="dollar" color={"#979797"} size={hp("2%")} />
                <Text style={[styles.Txt,{ color:"#979797"}]} > {Duration}</Text>
            </View>

            <View style={{flexDirection:"row", alignItems:"center", justifyContent:'space-between'}} >
                <View style={styles.TxtAlign} >
                    <FontAwesome name="newspaper-o" color={Urgent?primary:"#979797"} size={hp("2%")} />
                    <Text style={[styles.Txt,{ color:Urgent?white:"#979797"}]}>{PostedBy}</Text>
                </View>
                <View style={styles.btn} >
                    <Text style={[styles.Txt, {marginLeft:0, color:white}]} > View Details </Text>
                </View>
            </View>

        </TouchableOpacity>
     );
 }

 const styles = StyleSheet.create({
    main:{
        width:"100%",
        padding:hp("1.25%"),
        borderRadius:hp("1%"),
        shadowColor:"#00000029",
        shadowRadius:3,
        elevation:4,
        shadowOffset:{width:0, height:3},
        borderWidth:hp("0.15%"),
        borderColor:"#E5E5E5",
        marginTop:hp("2%")
    },
    Top:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:hp("1.5%")
    },
    heading:{
        fontSize:hp("2%"),
        fontFamily: bold,
        lineHeight:hp("2.2%"),
        letterSpacing:1
    },
    TxtAlign:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        marginTop:hp("1%")
    },
    Txt:{
        fontSize:hp("1.6%"),
        fontFamily: regular,
        lineHeight:hp("1.5%"),
        marginLeft:hp("2.2%")
    },
    btn:{
        minWidth:"25%",
        maxWidth:"35%",
        height:hp("4%"),
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#979797",
        borderRadius:hp("0.8%"),
        paddingHorizontal:hp("1%")
    }
 })

 export default Job_Process_Component;
