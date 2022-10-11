import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView from 'react-native-maps';

export default class JobOn_Map extends Component {

    render() {
        return (
            <View style={styles.main}>
                <MapView
                    style={{flex: 1}}
                    provider='google'
                    region={{
                        latitude: 40.76727216,
                        longitude: -73.99392888,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginLeft: hp('-1.5%'),
        marginRight: hp('-1.5%'),
    },
});
