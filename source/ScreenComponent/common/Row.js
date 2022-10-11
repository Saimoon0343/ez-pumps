import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { primary } from '../../assets/colors';
import {Ionicons , Feather} from '@expo/vector-icons';
import {useTheme} from '../../theme/ThemeContext';
import { regular } from '../../assets/fonts';

const Row = ({data, icon, onPress}) => {
    const {colors} = useTheme()
    const {text, iconLeft } = data;
    return(
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    {iconLeft && <Ionicons name={iconLeft} size={20} color={primary} style={{marginRight:10}} /> }
                    <Text style={[styles.text,{color:colors.heading}]}>{text}</Text>
                </View>
                {icon
                    ? <Feather name="arrow-right" size={18} color={primary} />
                    : <View style={{height:18}}/>
                }
            </View>
        </TouchableWithoutFeedback>
    )
}
export default Row;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        minHeight:hp('6.5%'),
        padding:hp('1.5%'),
    },
    text:{
        fontFamily:regular,
        fontSize:hp('2.25%'),
    }
})
