import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  LogBox,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {InputComponent} from '../../ScreenComponent/TextInput';
import Toast from 'react-native-toast-message';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import {light} from '../../assets/fonts';
import {primary, secondary} from '../../assets/colors';
import {connect} from 'react-redux';
import {
  setDescription,
  setName,
  setUsername,
  registerStepTwo,
  setPhone,
  setEmail,
  setPassword,
  setWebsite,
  toggleUserType,
  setIsCheck,
} from '../../Redux/Action/AuthAction';
import {launchImageLibrary} from 'react-native-image-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

var address = {
  desp: '',
  region: {
    latitude: null,
    longitude: null,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
};

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.8,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      desp: '',
    };
  }

  render() {
    return (
      <GooglePlacesAutocomplete
        styles={{
          container: {
            flex: 0,
            width: widthPercentageToDP('100%'),
            position: 'relative',
            padding: widthPercentageToDP('6%'),
          },
          listView: {
            backgroundColor: '#fff',
          },
        }}
        placeholder={'Enter Your Address'}
        listViewDisplayed={true}
        fetchDetails={true}
        onPress={(data, details = null) => {
          address = {
            desp: data.description,
            region: {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
          };
          // this.setState({
          //   desp: data.description,
          //   region: {
          //     latitude: details.geometry.location.lat,
          //     longitude: details.geometry.location.lng,
          //     latitudeDelta: 0.0922,
          //     longitudeDelta: 0.0421,
          //   },
          // });
          // this.props.setAddressData(
          //   data.description,
          //   details.geometry.location.lat,
          //   details.geometry.location.lng,
          // );
        }}
        query={{
          key: 'AIzaSyA-BHlG4dOA1CxtzZoTal7e_feMEAe8Fqc',
          language: 'en',
          components: 'country:us',
          types: 'establishment',
          location: `${this.state.region.latitude},${this.state.region.longitude}`,
        }}
      />
    );
  }
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ImageSource: '',
      website_name: '',
      error: false,
      region: {
        latitude: 37.8,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      desp: '',
      address: '',
      lat: null,
      lng: null,
    };
  }

  setAddressData = async (address, lat, lng) => {
    this.setState({
      address: address,
      lat: lat,
      lng: lng,
    });
  };

  Register_Now = async () => {
    const {username, name, description} = this.props;
    const {ImageSource, lat, lng} = this.state;
    if (
      username == '' ||
      name == '' ||
      description == '' ||
      ImageSource == ''
    ) {
      this.setState({error: true});
      Toast.show({text1: 'Please fill all fields'});
    } else {
      try {
        await this.props.registerStepTwo(ImageSource, address);
      } catch (error) {
        this.setState({error: true});

        console.log(161, error);
      }
    }
  };

  Select_Img = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, async response => {
      if (response.errorCode) {
        // console.log('LaunchImageLibrary Error: ', response.errorMessage);
      } else if (response.didCancel) {
        // console.log('User Cancelled');
      } else {
        // console.log(response);
        let source1 = response.assets[0].base64;
        let source2 = `data:image/png;base64,${source1}`;
        this.setState({ImageSource: source2});
      }
    });
  };

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  render() {
    const {loading, username, name, description, website} = this.props;
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled={true}
        style={{
          flex: 1,
          backgroundColor: primary,
          padding: hp('2%'),
          width: '100%',
          paddingBottom: hp('10'),
        }}>
        <View style={styles.main}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{width: hp('25%'), height: hp('20%'), marginTop: hp('7%')}}
          />
          <Text
            style={[
              styles.Txt,
              {
                letterSpacing: 4,
                fontSize: hp('2.8%'),
                alignSelf: 'center',
                lineHeight: hp('3%'),
              },
            ]}>
            {' '}
            REGISTRATION{' '}
          </Text>
          <Text style={styles.Txt}> User name </Text>
          <InputComponent
            value={username}
            OnChangeText={text => this.props.setUsername(text)}
            otherProps={{
              placeholder: 'Enter Username',
              onSubmitEditing: () => this.NextInput.focus(),
              blurOnSubmit: false,
            }}
            mainstyle={{marginTop: hp('1%')}}
          />
          {this.state.error ? (
            !username ? (
              <Text style={{color: 'red', alignSelf: 'flex-start'}}>
                Enter Username
              </Text>
            ) : null
          ) : null}
          <Text style={styles.Txt}> Company Name </Text>
          <InputComponent
            value={name}
            OnChangeText={text => this.props.setName(text)}
            otherProps={{
              placeholder: 'Enter Company Name',
              ref: ref => {
                this.NextInput = ref;
              },
              onSubmitEditing: () => this.NextInput1.focus(),
              blurOnSubmit: false,
            }}
            mainstyle={{marginTop: hp('1%')}}
          />
          {this.state.error ? (
            !name ? (
              <Text style={{color: 'red', alignSelf: 'flex-start'}}>
                Enter Company name
              </Text>
            ) : null
          ) : null}
          <Text style={styles.Txt}>WebSite Name</Text>
          <InputComponent
            value={website}
            OnChangeText={text => this.props.setWebsite(text)}
            otherProps={{
              placeholder: 'Website Name',
              ref: ref => {
                this.NextInput = ref;
              },
              onSubmitEditing: () => this.NextInput1.focus(),
              blurOnSubmit: false,
            }}
            mainstyle={{marginTop: hp('1%')}}
          />
          <Text style={styles.Txt}> Select Cover Image </Text>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: '#fff'}]}
            onPress={this.Select_Img}>
            <Text
              style={[
                styles.Txt,
                {
                  marginTop: 0,
                  alignSelf: 'flex-start',
                  fontSize: hp('2.6%'),
                  lineHeight: hp('2.8%'),
                  color: '#000',
                  paddingLeft: 12,
                },
              ]}>
              {this.state.ImageSource == '' ? 'Select Image' : `Change Image`}
            </Text>
          </TouchableOpacity>
          <Text style={styles.Txt}>Address</Text>
          <AutoComplete setAddressData={this.setAddressData} />
          <View style={{alignSelf: 'flex-start', marginTop: 10}}>
            {this.state.ImageSource != '' ? (
              <Image
                source={{uri: this.state.ImageSource}}
                style={{height: 50, width: 50}}
              />
            ) : null}
          </View>
          {this.state.error ? (
            !this.state.ImageSource ? (
              <Text style={{color: 'red', alignSelf: 'flex-start'}}>
                Add Image
              </Text>
            ) : null
          ) : null}
          <Text style={styles.Txt}> Description </Text>
          <InputComponent
            value={description}
            OnChangeText={text => this.props.setDescription(text)}
            otherProps={{
              secureTextEntry: true,
              placeholder: 'Enter Description',
              multiline: true,
              ref: ref => {
                this.NextInput1 = ref;
              },
            }}
            mainstyle={{marginTop: hp('1%'), height: hp('25%')}}
            style={{height: hp('25%')}}
          />
          {this.state.error ? (
            !description ? (
              <Text style={{color: 'red', alignSelf: 'flex-start'}}>
                Enter Description
              </Text>
            ) : null
          ) : null}
          <TouchableOpacity style={styles.btn} onPress={this.Register_Now}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                style={[
                  styles.Txt,
                  {
                    marginTop: 0,
                    alignSelf: 'center',
                    fontSize: hp('2.6%'),
                    lineHeight: hp('2.8%'),
                  },
                ]}>
                FINISH
              </Text>
            )}
          </TouchableOpacity>
          <View style={{height: hp('3%')}} />
          <SnackBar position="bottom" />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
    name: state.globalReducer.name,
    username: state.globalReducer.username,
    description: state.globalReducer.description,
    website: state.globalReducer.website,
    phone: state.globalReducer.phone,
    email: state.globalReducer.email,
    password: state.globalReducer.password,
    userType: state.globalReducer.userType,
    isCheck: state.globalReducer.isCheck,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setName: text => dispatch(setName(text)),
    setUsername: text => dispatch(setUsername(text)),
    setDescription: text => dispatch(setDescription(text)),
    setPhone: text => dispatch(setPhone(text)),
    setEmail: text => dispatch(setEmail(text)),
    setPassword: text => dispatch(setPassword(text)),
    setWebsite: text => dispatch(setWebsite(text)),
    toggleUserType: text => dispatch(toggleUserType(text)),
    setIsCheck: text => dispatch(setIsCheck(text)),
    registerStepTwo: (ImageSource, address, lat, lng) =>
      dispatch(registerStepTwo(ImageSource, address, lat, lng)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: primary,
    padding: hp('1.5%'),
    alignItems: 'center',
  },
  Txt: {
    fontSize: hp('1.5%'),
    color: 'white',
    lineHeight: hp('1.6%'),
    fontFamily: light,
    marginTop: hp('2%'),
    alignSelf: 'flex-start',
  },
  btn: {
    backgroundColor: secondary,
    width: '100%',
    height: hp('6%'),
    borderRadius: hp('0.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
  },
});
