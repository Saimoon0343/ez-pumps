import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { black, primary, white } from '../../assets/colors';
import { bold, regular } from '../../assets/fonts';
import {Button} from '../common/Button';

const TermsModal = ({visible, onPress, onBackPress}) => {
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
                <Text style={styles.heading}>TERMS & CONDITIONS</Text>
                <Text style={styles.text}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
                <Button
                    color={primary}
                    text={"ACCEPT"}
                    textColor={white}
                    onPress={onPress}
                    style={{width: hp('25%'), alignSelf: 'center', marginVertical: hp('2%'),}}
                />
            </View>
        </Modal>
    )
}
export default TermsModal;

const styles = StyleSheet.create({
    modal: {
        margin:0,
        // flex:1,
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
        marginTop: hp('2%'),
        marginBottom: hp('1%'),
    }
})