import React from 'react';
import {
    Text,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { black } from '../../assets/colors';
import { regular } from '../../assets/fonts';

export default ({text}) => (
    <Text
        style={{
            fontFamily: regular,
            fontSize: hp('2.25%'),
            color: black,
            textAlign: 'center',
            paddingVertical: hp('10%')
        }}
    >
        {text}
    </Text>
)
