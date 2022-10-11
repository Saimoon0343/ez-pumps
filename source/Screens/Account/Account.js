import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import {bold, regular, semiBold} from '../../assets/fonts';
import {connect} from 'react-redux';
import PointsBlock from '../../ScreenComponent/account/PointsBlock';
import AccountDetailText from '../../ScreenComponent/account/AccountDetailText';
import {BASE_URL, fetchAPI, getToken} from '../../services/index';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' ? (IS_IPHONE_X ? hp('3%') : hp('2%')) : 0;
const HEADER_HEIGHT =
  Platform.OS === 'ios' ? (IS_IPHONE_X ? hp('10.5%') : hp('9.5%')) : hp('5.5%');
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
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
    );
  }
}
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      ReviewObj: [],
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
    this.callData();
  }
  callData = async () => {
    const token = await getToken();
    try {
      fetchAPI('GET', 'get-profile-info', null, token)
        .then(res => {
          this.setState({user: res?.data?.profile});
          this.setState({ReviewObj: res?.data?.profile?.get_reviews});
        })
        .catch(() => {});
    } catch (error) {}
  };

  renderContent = () => {
    const {
      user_type,
      description,
      phone_number,
      email,
      website,
      address,
      created_at,
      user_name,
      points,
    } = this.state?.user;
    return (
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {user_type == 'PUMP' && <PointsBlock points={points} />}
          <AccountDetailText heading={'Username'} text={user_name} />
          <AccountDetailText heading={'Description'} text={description} />
          <AccountDetailText heading={'Phone'} text={phone_number} />
          {/* <AutoComplete setAddressData={this.setAddressData} /> */}

          <AccountDetailText heading={'Address'} text={address} />
          <AccountDetailText heading={'Email'} text={email} />
          <AccountDetailText heading={'Website'} text={website} />
          <AccountDetailText heading={'Join Date'} text={created_at} />
          <Text style={styles.Heading}> My Reviews </Text>
          {this.state.ReviewObj.length > 0 &&
            this.state.ReviewObj.map((item, index) => {
              return (
                <Reviews
                  key={item.id}
                  NameTxt={item?.review}
                  Review={item?.rating}
                  Review_Description={item?.get_reviewer?.user_name}
                />
              );
            })}
          <View style={{height: hp('5%')}} />
        </ScrollView>
      </View>
    );
  };

  renderTitle = () => {
    const {company_name} = this.state.user;
    return (
      <>
        <Text style={styles.NameTxt}>{company_name}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.RateTxt}>4.9/5</Text>
          <FontAwesome name="star" color={'#BCD221'} size={hp('2.5%')} />
        </View>
      </>
    );
  };

  renderImage() {
    const {cover_image} = this.state?.user;

    if (cover_image) {
      return {uri: `${BASE_URL}${cover_image}`};
    } else {
      return require('../../assets/images/coverimage2.png');
    }
  }

  render() {
    const {cover_image} = this.state?.user;
    return (
      <>
        <StatusBar barStyle="light-content" />
        <AppHeader Heading={'ACCOUNT'} style={{zIndex: 1}} />
        <ReactNativeParallaxHeader
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={hp('29')}
          extraScrollHeight={20}
          navbarColor="#000000"
          title={this.renderTitle()}
          backgroundImage={this.renderImage()}
          backgroundImageScale={1.2}
          renderContent={this.renderContent}
          containerStyle={styles.container1}
          contentContainerStyle={styles.contentContainer}
          innerContainerStyle={styles.container1}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
  };
};

export default connect(mapStateToProps, null)(Account);

function Reviews({NameTxt, Review_Description, Review}) {
  return (
    <View style={styles.Container}>
      <View style={styles.Top}>
        <Text style={[styles.Heading, {marginTop: 0}]}> {NameTxt} </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={[styles.RateTxt, {color: '#000000'}]}>{Review}</Text>
          <FontAwesome name="star" color={'#BCD221'} size={hp('2.5%')} />
        </View>
      </View>
      <Text style={styles.Para}>{Review_Description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding: hp('2.5%'),
    paddingTop: 0,
    paddingBottom: 0,
  },
  NameTxt: {
    fontSize: hp('2.2%'),
    fontFamily: bold,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  RateTxt: {
    fontSize: hp('1.7%'),
    fontFamily: regular,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  Heading: {
    fontSize: hp('2.2%'),
    fontFamily: semiBold,
    color: '#000000',
    letterSpacing: 0.5,
    marginTop: hp('2%'),
  },
  Para: {
    fontSize: hp('1.8%'),
    fontFamily: regular,
    color: '#979797',
    letterSpacing: 0.5,
    marginTop: hp('1.5%'),
    textAlign: 'justify',
  },
  Container: {
    marginTop: hp('2%'),
    width: '100%',
    minHeight: hp('10%'),
    borderRadius: hp('1.2%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#00000029',
    shadowRadius: 3,
    shadowOpacity: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 4,
    padding: hp('1.4%'),
  },
  Top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  /////////////////////////////////////////////////////////////
  container1: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
