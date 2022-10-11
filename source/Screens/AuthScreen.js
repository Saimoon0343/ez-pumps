
import React from 'react';
import { 
    View,
    Image,
} from 'react-native';

const AuthScreen = () => (
    <View style={{flex:1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
        <Image
            source={require('../assets/images/logo.png')}
        />
    </View>
)


export default AuthScreen