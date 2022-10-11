import React from 'react';
import {
    View,
    StyleSheet,
    TextInput
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { black, white } from '../../assets/colors';

const PhoneInput = ({phone, onChange, ...rest}) => {
    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={phone}
                onChange={onChange}
                {...rest}
            />
        </View>
    )
}
export default PhoneInput;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: white,
        borderRadius: hp('1%'),
        width: '70%',
        alignSelf:'center',
    },
    code:{
        fontSize: hp('2.25%'),
        color: black,
        flex:1,
        alignSelf:'center',
        textAlign:'center',
        borderRightWidth:1,
        borderColor: black
    },
    input:{
        height:hp('6%'),
        flex:6,
        paddingHorizontal: hp('1%'),
        color: 'black'
    }
})
