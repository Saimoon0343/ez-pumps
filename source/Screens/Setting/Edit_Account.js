import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import {launchImageLibrary} from 'react-native-image-picker';
import {semiBold, regular} from '../../assets/fonts';
import {black, lightGray, primary, secondary, white} from '../../assets/colors';
import TitleRow from '../../ScreenComponent/settings/TitleRow';
import {connect} from 'react-redux';
import LabelInput from '../../ScreenComponent/common/LabelInput';
import {Button} from '../../ScreenComponent/common/Button';
import ImageLoader from '../../ScreenComponent/common/ImageLoader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BASE_URL, fetchAPI, getToken} from '../../services';
import Toast from 'react-native-toast-message';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import {setItem} from '../../persist-storage';
import {AuthContext} from '../../context';
import {errorHandler} from '../../utils';
var FormData = require('form-data');
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

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
      <View style={[styles.inputBox]}>
        <Text style={[styles.label]}>Enter Address</Text>
        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
              width: widthPercentageToDP('90'),
              position: 'relative',
              //   padding: widthPercentageToDP('6%'),
              borderWidth: 1,
              borderRadius: 10,
            },
            listView: {
              backgroundColor: '#fff',
            },
          }}
          //   style={{
          //     ...styles.input,
          //     listView: {
          //       backgroundColor: '#fff',
          //     },
          //   }}
          placeholder={'Enter Your Address'}
          listViewDisplayed={true}
          fetchDetails={true}
          onPress={(data, details = null) => {
            this.setState({
              desp: data.description,
              region: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
            });
            this.props.setAddressData(
              data.description,
              details.geometry.location.lat,
              details.geometry.location.lng,
            );
          }}
          query={{
            key: 'AIzaSyA-BHlG4dOA1CxtzZoTal7e_feMEAe8Fqc',
            language: 'en',
            components: 'country:us',
            types: 'establishment',
            location: `${this.state.region.latitude},${this.state.region.longitude}`,
          }}
        />
      </View>
    );
  }
}
var that;
class Edit_Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company_name: '',
      description: '',
      coverImage: null,
      website: '',
      address: '',
      user_name: '',
      phone_number: '',
      email: '',
      loading: false,
    };
  }

  setAddressData = async (address, lat, lng) => {
    this.setState({
      address: address,
      lat: lat,
      lng: lng,
    });
  };
  componentDidMount() {
    that = this;
    const {
      description,
      website,
      address,
      cover_image,
      user_name,
      phone_number,
      company_name,
      email,
    } = this.props.user;
    this.setState({
      company_name,
      description,
      website,
      user_name,
      address,
      phone_number,
      email,
      coverImage: `${BASE_URL}${cover_image}`,
    });
  }

  onEditPress = () => {
    const token = getToken();
    Keyboard.dismiss();
    this.setState({loading: true});
    const {
      description,
      website,
      address,
      email,
      phone_number,
      company_name,
      user_name,
    } = this.state;
    var data = new FormData();
    data.append('email', email);
    data.append('phone_number', phone_number);
    data.append('company_name', company_name);
    data.append('user_name', user_name);
    data.append('address', address);
    data.append('website', website);
    data.append('description', description);
    fetchAPI('post', 'update-profile', data, token)
      .then(function (response) {
        Toast.show({text1: response.data.message});
        that.setState({loading: false});
        if (response.data.message == 'User successfully updated.') {
          setItem('user', JSON.stringify(response.data.user));
          that.context.updateState();
        }
      })
      .catch(function (error) {
        that.setState({loading: false});
        Toast.show({text1: errorHandler(error)});
      });
  };
  selectImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.8}, response => {
      // console.log('Response = ', response);

      const coverImage = response.assets[0].uri;
      this.setState({coverImage});
    });
  };
  renderImage() {
    const {coverImage} = this.state;
    if (!coverImage) {
      return (
        <View
          style={[
            styles.image,
            {backgroundColor: lightGray, justifyContent: 'center'},
          ]}>
          <TouchableOpacity
            onPress={this.selectImage}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="image" size={44} color={secondary} />
            <Text
              style={{
                color: secondary,
                fontFamily: regular,
                fontSize: hp('1.95%'),
                marginTop: hp('1%'),
              }}>
              Add Image
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Text
            onPress={this.selectImage}
            style={{
              position: 'absolute',
              color: secondary,
              right: 10,
              top: 10,
              fontSize: hp('2%'),
              fontFamily: regular,
              zIndex: 999,
            }}>
            Edit
          </Text>
          <ImageLoader source={{uri: coverImage}} style={styles.image} />
        </View>
      );
    }
  }

  render() {
    const {user} = this.props;
    const {
      email,
      phone_number,
      address,
      user_name,
      company_name,
      description,
      website,
      loading,
    } = this.state;
    return (
      <>
        <AppHeader
          Heading={'EDIT ACCOUNT'}
          BorRadius={true}
          IsBack={true}
          style={{zIndex: 1}}
          IsDisable={true}
        />
        <TitleRow title={user.company_name} />
        <View style={styles.main}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.renderImage()}
            <LabelInput
              label={'Enter Email'}
              value={email}
              blur={false}
              editable={true}
              placeholder={'Enter Email Here'}
              onChange={text => this.setState({email: text})}
              onSubmitPress={() => this.username.focus()}
              inputStyle={{color: 'gray'}}
              style={{marginTop: hp('2%')}}
            />
            <LabelInput
              label={'Enter Username'}
              value={user_name}
              blur={false}
              placeholder={'Enter Username Here'}
              onChange={text => this.setState({user_name: text})}
              inputRef={ref => (this.username = ref)}
              onSubmitPress={() => this.phone.focus()}
              inputStyle={{color: 'gray'}}
            />
            <LabelInput
              label={'Enter Phone Number'}
              value={phone_number}
              blur={false}
              placeholder={'Enter Phone Number Here'}
              onChange={text => this.setState({phone_number: text})}
              inputRef={ref => (this.phone = ref)}
              onSubmitPress={() => this.address.focus()}
              inputStyle={{color: 'gray'}}
            />
            <LabelInput
              label={'Enter Name'}
              value={company_name}
              blur={false}
              placeholder={'Enter Name Here'}
              onChange={text => this.setState({company_name: text})}
              onSubmitPress={() => this.address.focus()}
            />

            {/* <Text>Address</Text>
                        <LabelInput
                            label={"Enter Address"}
                            value={address}
                            blur={false}
                            placeholder={"Enter Address Here"}
                            onChange={(text)=>this.setState({address: text})}
                            inputRef={ref => this.address = ref}
                            onSubmitPress={()=>this.website.focus()}
                        /> */}

            <AutoComplete setAddressData={this.setAddressData} />

            <LabelInput
              label={'Enter Website Address'}
              value={website}
              blur={false}
              placeholder={'Enter Website Address Here'}
              onChange={text => this.setState({website: text})}
              inputRef={ref => (this.website = ref)}
              onSubmitPress={() => this.description.focus()}
            />
            <LabelInput
              label={'Enter Description'}
              value={description}
              blur={false}
              placeholder={'Enter Description Here'}
              onChange={text => this.setState({description: text})}
              inputRef={ref => (this.description = ref)}
              // onSubmitPress={()=>this.description.focus()}
              multiline={true}
              inputStyle={{minHeight: hp('15%'), textAlignVertical: 'top'}}
              style={{minHeight: hp('17.5%')}}
            />
            <Button
              color={'black'}
              text={'Edit'}
              loading={loading}
              textColor={'white'}
              style={{width: '100%', marginTop: '2%'}}
              onPress={this.onEditPress}
            />
          </ScrollView>
        </View>
        <SnackBar position={'bottom'} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
  };
};

Edit_Account.contextType = AuthContext;

export default connect(mapStateToProps, null)(Edit_Account);

const styles = StyleSheet.create({
  image: {
    height: hp('20%'),
    width: '100%',
  },
  Top: {},
  Txt: {
    fontSize: hp('2.5%'),
    fontFamily: semiBold,
    lineHeight: hp('2.8%'),
    color: white,
    letterSpacing: 0.5,
    marginTop: hp('1%'),
  },
  main: {
    flex: 1,
    padding: hp('2%'),
    backgroundColor: 'white',
  },
  Heading: {
    fontSize: hp('2.5%'),
    fontFamily: semiBold,
    color: 'gray',
    letterSpacing: 0.5,
    // marginTop:hp("1%")
  },
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp('3%'),
  },
  Add: {
    height: hp('5%'),
    width: hp('5%'),
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp('1.5%'),
  },
  InputStyle: {
    width: '100%',
    height: hp('5%'),
    borderBottomColor: 'black',
    borderBottomWidth: hp('0.1%'),
    paddingLeft: hp('1%'),
    fontSize: hp('2.2%'),
    color: 'black',
    fontFamily: semiBold,
    marginTop: hp('2%'),
  },
  btn: {
    height: hp('5%'),
    width: '50%',
    backgroundColor: secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
    alignSelf: 'center',
  },
  inputBox: {
    marginBottom: hp('2%'),
  },
  label: {
    flex: 1,
    fontSize: hp('2.2%'),
    color: black,
    fontFamily: regular,
  },
  input: {
    height: hp('6%'),
    fontSize: hp('2.2%'),
    color: black,
    fontFamily: regular,
    borderWidth: 1,
    borderBottomColor: primary,
    paddingHorizontal: hp('1%'),
    borderRadius: hp('1%'),
    marginTop: hp('1%'),
  },
});
