import React from 'react';
import {
    Text,

} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { regular, semiBold } from '../../assets/fonts';

export default ({heading, text}) => (
    <>
        <Text
            style={{
                fontSize:hp("2.2%"),
                fontFamily:semiBold,
                color:"#000000",
                letterSpacing:0.5,
                marginTop:hp("2%"),
            }}
        > {heading} </Text>
        <Text
            style={{
                fontSize:hp("1.8%"),
                fontFamily:regular,
                color:"#979797",
                letterSpacing:0.5,
                marginTop:hp("1.5%"),
                textAlign:'justify',
            }}
        >
            {text ? text : "No "+heading}
        </Text>
    </>
)
