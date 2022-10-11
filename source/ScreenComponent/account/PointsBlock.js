import React from 'react';
import { 
    View,
    Text,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { primary, white } from '../../assets/colors';
import { semiBold } from '../../assets/fonts';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';

const headingStyle = {
    fontSize:hp("2.2%"),
    fontFamily:semiBold,
    letterSpacing:0.5,
    color: primary,
    marginTop:0
}

export default ({points}) => {
    
    const navigation = useNavigation();

    const onIconPress = () => {
        navigation.navigate('BuyPoints')
    }

    return(
        <View 
            style={{
                borderRadius:hp('1%'),
                backgroundColor: white,
                marginTop: hp('3%'),
                padding: hp('2%'),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <Text style={headingStyle}>
                Points Available
            </Text>
            <View 
                style={{
                    flexDirection:'row',
                    alignItems: 'center'
                }}
            >
                <Text 
                    style={[headingStyle,{ marginRight: hp('1%')}]}
                >
                    {points}
                </Text>
                <Entypo color={primary} size={26} name="circle-with-plus" onPress={onIconPress}/>
            </View>
        </View> 
    )
}

