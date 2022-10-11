import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { black } from '../../assets/colors';
import { regular } from '../../assets/fonts';

const ButtonRow = ({style, button1Press,button1Color, button1Text, button2Press, button2Text, button2Color}) => {
    return(
        <View style= {[styles.buttonRow,style]}>
            <TouchableOpacity activeOpacity={0.5} onPress={button1Press}>
            <View style={[styles.buttonStyle,{backgroundColor:button1Color}]}>
                <Text style={styles.txtStyle}>{button1Text}</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={button2Press}>
                <View style={[styles.buttonStyle,{backgroundColor:button2Color}]}>
                    <Text style={[styles.txtStyle]}>{button2Text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        marginBottom:hp('7%'),
        alignSelf:'center'
    },
    buttonStyle:{
        height:hp('5%'),
        width:wp('42%'),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:hp('1.5%'),
    },
    txtStyle:{
        fontFamily:regular,
        fontSize:hp('2%'),
        color:black,
    },
})
export default ButtonRow;
