import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { black, gray } from '../../assets/colors';
import {Ionicons} from '@expo/vector-icons';
import { bold, medium } from '../../assets/fonts';
import { Entypo } from '@expo/vector-icons';


const Header = ({name, heading, backIcon, icon1, icon1Press, icon2, icon2Press}) => {
    const navigation = useNavigation();
    const len = heading && heading.length;
    const namelen = name && name.length;
    return(
        <View style={styles.container}>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                {backIcon
                    &&
                    <Ionicons
                        name={'arrow-back'}
                        size={22}
                        color={black}
                        onPress={()=>navigation.goBack()}
                        style={{marginRight:hp('1%')}}
                    />
                }
                {name
                    ?
                    <View>
                        <Text style={[styles.heading]}>
                            Hi {namelen > 22 ? name.slice(0,22)+"..." : name}!
                        </Text>
                    </View>
                    :
                    <Text style={[styles.heading]}>
                        {len > 22 ? heading.slice(0,22)+"..." : heading}
                    </Text>
                }

            </View>

                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    {icon1 &&
                        <Entypo
                            name={icon1}
                            size={22}
                            color={black}
                            onPress={icon1Press}
                            style={{marginLeft:hp('1%')}}
                        />
                    }

                    {icon2 &&
                        <Entypo
                            name={icon2}
                            size={24}
                            color={'red'}
                            onPress={icon2Press}
                            style={{marginLeft:hp('1.5%')}}
                        />
                    }
                </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:hp('2.5%'),
        marginBottom:hp('1.5%')
    },
    heading:{
        fontSize:hp('2.5%'),
        fontFamily:bold,
        color:black
    },
    text:{
        fontSize:hp('1.75%'),
        fontFamily:medium,
        color:gray
    }
})
