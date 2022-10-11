import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { secondary, white } from '../../assets/colors';
import { semiBold } from '../../assets/fonts';

export default ({title}) => (
    <View style={{
        width:"100%",
        height:hp("6%"),
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:secondary,
    }} >
        <Text style={{
            fontSize:hp("2.5%"),
            fontFamily:semiBold,
            lineHeight:hp("2.8%"),
            color:white,
            letterSpacing:0.5,
            }}
        >{title}</Text>
    </View>
)
