import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    ActivityIndicator,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { white } from '../../assets/colors';
import { regular } from '../../assets/fonts';

export const Button = ({onPress, color, text, textColor, image, style, loading, disabled}) => {
    return(
        <TouchableOpacity disabled={loading || disabled} onPress={onPress} style={[styles.container,{backgroundColor:color},style]}>
            {loading
            ?
                <ActivityIndicator color={white} size="small" />
            :
            <>
                {image && <Image style={styles.image} source={image}/>}
                <Text style={[styles.text,{color: textColor}]}>{text}</Text>
            </>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        width:'80%',
        height:hp('6%'),
        borderRadius:hp('1%'),
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontFamily: regular,
        fontSize:hp('1.9%')
    },
    image:{
        height:hp('3%'),
        width:'7%',
        marginRight:hp('2%')
    }
})
