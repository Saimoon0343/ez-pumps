import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {gray, primaryGreen, white} from '../../assets/colors';
import {medium} from '../../assets/fonts';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const EmptyScreen = ({icon, text}) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons color={primaryGreen} size={75} name={icon}/>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};
export default EmptyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp('2%'),
        marginHorizontal: hp('1.5%'),
        padding: hp('2%'),
        backgroundColor: white,
    },
    text: {
        fontSize: hp('2.5%'),
        fontFamily: medium,
        color: gray,
        textAlign: 'center',
    },
});
