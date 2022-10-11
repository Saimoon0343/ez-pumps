import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';

export default ({onBackPress, style, isVisible, children}) => {
    return(
        <Modal
            onBackdropPress={onBackPress}
            avoidKeyboard
            onBackButtonPress={onBackPress}
            testID={'modal'}
            isVisible={isVisible}
            onSwipeComplete={onBackPress}
            swipeDirection={['down']}
            propagateSwipe={true}
            style={[styles.modal,style]}
            backdropTransitionOutTiming={0}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
        >
            {children}
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
})
