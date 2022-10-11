import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useRef} from 'react';
import MapView, { Marker } from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Button} from '../../ScreenComponent/common/Button';
import {primary, secondary} from '../../assets/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Map_location = ({navigation}) => {
    const mapRef = useRef(null);
    const [region, setRegion] = useState({
        latitude: 37.80000,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [desp, setdesp] = useState('');
    const gotoCreateJob = () => {
        navigation.navigate('Create_Job', {region, desp});
    };
    return (
        <View style={{flex: 1}}>
            <GooglePlacesAutocomplete
                styles={{
                    container: {
                        flex: 0,
                        width: wp('100%'),
                        zIndex: 2,
                        position: 'absolute',
                    },
                    listView: {
                        backgroundColor: '#fff',
                    },
                }}
                placeholder='Search'
                onPress={async (data, details = null) => {
                    const description = data.description;
                    setdesp(description);
                    setRegion({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }}
                renderDescription={row => row.description}
                fetchDetails={true}
                listViewDisplayed={'auto'}
                query={{
                    key: 'AIzaSyA-BHlG4dOA1CxtzZoTal7e_feMEAe8Fqc',
                    language: 'en',
                    components: 'country:us',
                    types: 'establishment',
                    location: `${region.latitude},${region.longitude}`,
                }}
            />
            <View style={{height: hp('5%'), width: wp('5%'), backgroundColor: secondary}}>
                <TouchableOpacity>
                    <Text>Go Back</Text>
                </TouchableOpacity>
            </View>
            <MapView
                style={{flex: 1, height: hp('100%'), width: wp('100%')}}
                initialRegion={{
                    latitude: 37.80000,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                region={region}
                onTouchMove={(e) => {
                    console.log('Touch Move', e.nativeEvent.touches[0].locationX, e.nativeEvent.touches[0].locationY);
                }}
            >
                <Marker
                    ref={mapRef}
                    coordinate={region}
                    draggable
                    onSelect={(e) => {
                        // console.log(' this is Event inside OnSelect', e.nativeEvent);
                    }}
                    zoomControlEnabled={true}
                    onDragStart={(e) => {
                        // console.log(e.nativeEvent.coordinate);
                        setRegion({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude,
                        });
                    }}

                    onDragEnd={(e) => {
                        // console.log(e.nativeEvent.coordinate);
                        setRegion({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude,
                        });
                    }}
                >
                </Marker>
            </MapView>
            <Button
                color={primary}
                onPress={gotoCreateJob}
                text="Select Location"
                textColor={'#fff'}
                style={{
                    position: 'absolute',
                    bottom: 10,
                    width: '90%',
                    height: hp('6%'),
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            />
        </View>
    );
};

export default Map_location;

const styles = StyleSheet.create({
    input: {
        borderRadius: 10,
        margin: 10,
        color: '#000',
        borderColor: '#666',
        backgroundColor: '#FFF',
        borderWidth: 1,
        height: 45,
        paddingHorizontal: 10,
        fontSize: 18,
    },
});
