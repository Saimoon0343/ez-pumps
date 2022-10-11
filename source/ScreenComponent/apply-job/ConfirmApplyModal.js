import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { black, secondary, white } from '../../assets/colors';
import { bold, regular } from '../../assets/fonts';
import {Button} from '../common/Button';


const ConfirmApplyModal = ({visible, points, onPress, onBackPress}) => {
    return(
        <Modal
            style={styles.modal}
            isVisible={visible}
            onBackButtonPress={onBackPress}
            onBackdropPress={onBackPress}
            avoidKeyboard
            testID={'modal'}
            onSwipeComplete={onBackPress}
            swipeDirection={['down']}
            propagateSwipe={true}
            backdropTransitionOutTiming={0}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
        >
            <View style={styles.container}>
                <Icon style={{alignSelf:'flex-end'}} name="close" size={22} color="black" onPress={onBackPress} />
                <Text style={styles.heading}>CONFIRMATION</Text>
                <Text style={styles.text}>
                    Below points will be deducted on this job
                </Text>
                <Text style={styles.points}>{points}</Text>
                <Text style={styles.text}>
                Would you like to accept & continue ?
                </Text>
                <Button
                    color={secondary}
                    text={"ACCEPT"}
                    textColor={white}
                    onPress={onPress}
                    style={{width: hp('25%'), alignSelf: 'center', marginVertical: hp('2%'),}}
                />

            </View>
        </Modal>
    )
}
export default ConfirmApplyModal;

const styles = StyleSheet.create({
    modal: {
        margin:0,
        backgroundColor:'rgba(0,0,0,0.1)',
        justifyContent:'center',
        alignItems:'center',

    },
    container:{
        margin: hp('5%'),
        padding: hp('1%'),
        backgroundColor:white,
        borderRadius:hp('2%'),
    },
    heading:{
        fontSize: hp('2.5%'),
        fontFamily: bold,
        textAlign: 'center',
        color: black
    },
    text:{
        fontSize: hp('2%'),
        fontFamily: regular,
        textAlign: 'center',
        color: black,
        margin: hp('1%'),
    },
    points:{
        padding:hp('2%'),
        width: hp('10%'),
        textAlign:'center',
        alignSelf: 'center',
        borderWidth:1,
        borderRadius: hp('1%'),
        borderColor: black,
        fontSize:hp('3%'),
        fontFamily: bold,
        color: black,
        marginVertical: hp('1%')
    }
})
