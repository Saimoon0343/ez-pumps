import React, {useRef, useState} from 'react';
import {
    View,
    TextInput,
    StyleSheet
} from 'react-native';
import {Ionicons as Icon} from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { black, darkGray } from '../../assets/colors';

const IconInput = ({style, inputStyle, onChange, value, iconColor, icon, placeholder, inputRef, onSubmitPress, blur,pass, keyboard, phone, error}) => {

    const input = useRef(null);
    const [visible, setVisible]  = useState(true);
     return(
        <>
        <View style={[styles.inputRow,style, error && {borderWidth:1, borderColor:'red'}]}>
            {phone &&
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <TextInput
                        style={[styles.input,{flex:0}]}
                        editable={false}
                        placeholder={" +92"}
                        placeholderTextColor={black}
                    />
                </View>
            }
            <TextInput
                blurOnSubmit={blur}
                onChangeText={onChange}
                value={value}
                style={[styles.input,inputStyle]}
                placeholder={placeholder}
                placeholderTextColor={darkGray}
                ref={inputRef}
                onSubmitEditing={onSubmitPress}
                secureTextEntry={pass ? visible : !visible}
                keyboardType={keyboard ? keyboard : "default"}
            />
            {pass
                ?
                value == ""
                    ?<Icon name={icon} size={22} color={iconColor} />
                    :<Icon onPress={()=>setVisible(!visible)} name={visible ? 'eye' : 'eye-off'} size={22} color={iconColor} />
                :
                icon &&
                <Icon name={icon} size={22} color={iconColor} />
            }
        </View>
        </>
    )
}

export default IconInput

const styles = StyleSheet.create({
    inputRow:{
        flexDirection:"row",
        alignItems:'center',
        paddingLeft:hp('1.5%'),
        paddingRight:hp('1.5%'),
        width:'80%',
        height:hp('6%'),
        backgroundColor:'white',
        borderRadius:hp('1%'),
        marginTop:hp('2.5%'),
    },
    input:{
        flex:1,
        fontSize:hp('2%'),
        color:black,
    },
    imageStyle:{
        height:hp('3.5%'),
        width:hp('5%'),
    }
})
