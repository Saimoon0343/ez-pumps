import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { black, white } from '../../assets/colors';
import { regular } from '../../assets/fonts';
import AppHeader from '../../ScreenComponent/AppHeader';

const notifications = [
    {
        id:1,
        text:'Your proposal has been accepted on Jack & Jack Company'
    },
    {
        id:2,
        text:'Your proposal has been accepted on Jack & Jack Company'
    },
    {
        id:3,
        text:'Your proposal has been accepted on Jack & Jack Company'
    },
    {
        id:4,
        text:'Your proposal has been accepted on Jack & Jack Company'
    },
    {
        id:5,
        text:'Your proposal has been accepted on Jack & Jack Company'
    },
    {
        id:6,
        text:'Your proposal has been accepted on Jack & Jack Company'
    },
    
]

class Notifications extends React.Component{
    render(){
        return(
            <>
                <AppHeader
                    Heading={"NOTIFICATIONS"}
                    IsBack={true}
                    borderRadius={true}
                />
                <FlatList
                    data={notifications}
                    renderItem={({item,index})=>
                        <View style={styles.card}>
                            <Text style={styles.cardText}>{item.text}</Text>
                        </View>
                    }
                />
            </>
        )
    }
}

export default Notifications;

const styles = StyleSheet.create({
    card:{
        padding: hp('2%'),
        backgroundColor: white,
        marginHorizontal:hp('3%'),
        marginVertical:hp('1%'),
        borderRadius:hp('1%')
    },
    cardText:{
        color: black,
        fontFamily: regular,
        fontSize: hp('2%')
    }
})