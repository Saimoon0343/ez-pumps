import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text
 } from 'react-native';
 import { heightPercentageToDP as hp } from "react-native-responsive-screen";
 import Icon from "react-native-vector-icons/Ionicons";
import { white } from '../assets/colors';
import { regular, semiBold } from '../assets/fonts';

export function InputComponent({value,mainstyle , OnChangeText , placeholder , style, otherProps, name , color, size  }) {
     return(
        <View style={[styles.main, {...mainstyle}]} >
            <TextInput
                value={value}
                onChangeText={OnChangeText}
                style={[styles.InputStyle,{ ...style}]}
                placeholder={placeholder}
                {...otherProps}
            />
            <Icon name={name} color={color} size={size} />
        </View>
     );
 }

 export function ForgetInput({value, mainstyle, OnChangeText, style, otherProps, name , color, size, IfShow,  Onpress, name1}) {
    return(
       <View style={[styles.main, {...mainstyle}]} >
           <TextInput
               value={value}
               onChangeText={OnChangeText}
               style={[styles.InputStyle,{ ...style}]}
               {...otherProps}
           />
           {
               !IfShow?
               <Icon name={name} color={color} size={size} onPress={Onpress} />
               :
               <Icon name={name1} color={color} size={size} onPress={Onpress} />
           }
       </View>
    );
}


 export function OtherTextInput({value,mainstyle , OnChangeText , style, otherProps, Field  }) {
    return(
       <View style={[styles.main, {...mainstyle}]} >
           <Text style={styles.Txt} >{Field}</Text>
           <TextInput
               value={value}
               onChangeText={OnChangeText}
               style={[styles.InputStyle,{ ...style}]}
               {...otherProps}
           />
       </View>
    );
}

 const styles = StyleSheet.create({
     main:{
        width:"100%",
        height:hp("6%"),
        borderRadius:hp("0.8%"),
        backgroundColor: white,
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row",
        padding:hp("1.5%")
     },
    InputStyle:{
        width:"85%",
        height:hp("6%"),
        paddingLeft:hp("0.5%"),
        fontSize:hp("2%"),
        fontFamily: semiBold,
        lineHeight:hp("2%"),
        color:"black",
        letterSpacing:1.5,
    },
    Txt:{
        fontSize:hp("1.75%"),
        fontFamily: regular,
        color:"#979797",
    },
 });
