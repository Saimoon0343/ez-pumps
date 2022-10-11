import React from 'react';
import {
    View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { background } from '../../assets/colors';

const Container = (props) => {
    return(
        <View style={[{flex:1, padding:hp('2%'), backgroundColor:background , paddingBottom:0},props.style]}>
            {props.children}
        </View>
    )
}
export default Container
