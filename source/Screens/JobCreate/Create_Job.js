import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {OtherTextInput} from '../../ScreenComponent/TextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import TermsModal from '../../ScreenComponent/create-job/TermsModal';
import {black, secondary, white} from '../../assets/colors';
import {bold, regular, semiBold} from '../../assets/fonts';
import {formatDate} from '../../utils';
import {connect} from 'react-redux';
import {fetchAPI} from '../../services';
import Toast from 'react-native-toast-message';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import {Button} from '../../ScreenComponent/common/Button';
import {Picker} from '@react-native-picker/picker';
import ErrorMessage from '../../ScreenComponent/common/ErrorMessage';
import DropDownComponent from '../../ScreenComponent/DropDownPicker_Component';
import DatePicker from 'react-native-date-picker';
import {createJob} from '../../Redux/Action/JobAction';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

var FormData = require('form-data');
var that;
var address_1 = {
  address_1: '',
  lat: '',
  lng: '',
};
class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address_1: '',
      lat: '',
      lng: '',
    };
  }

  render() {
    return (
      <GooglePlacesAutocomplete
        styles={{
          container: {
            flex: 0,
            width: widthPercentageToDP('93'),
            position: 'relative',
            // padding: widthPercentageToDP('6%'),
            // backgroundColor: 'green',
            alignSelf: 'center',
            shadowColor: '#00000029',
            shadowOffset: {width: 0, height: 3},
            shadowOpacity: 4,
            shadowRadius: 2,
            elevation: 3,
            borderRadius: hp('1.1%'),
            overflow: 'hidden',
            marginTop: hp('2'),
          },
          listView: {
            backgroundColor: '#fff',
            height: 'auto',
          },
        }}
        // style={[styles.InputStyle, {height: hp('5%'), marginTop: hp('2%')}]}
        placeholder={'Enter Your Address'}
        listViewDisplayed={true}
        fetchDetails={true}
        onPress={(data, details = null) => {
          this.setState({
            address_1: data.description,
            lat: details.geometry.location.lat,
            lng: details.geometry.location.lng,
          });
          console.log(88, details.geometry.location.lng);
          address_1 = {
            address_1: data.description,
            lat: details.geometry.location.lat,
            lng: details.geometry.location.lng,
            // region: {
            //   latitude: details.geometry.location.lat,
            //   longitude: details.geometry.location.lng,
            //   latitudeDelta: 0.0922,
            //   longitudeDelta: 0.0421,
            // },
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
          key: 'AIzaSyBWU9HrMQUigxX7_ry_HpHNvEdn_Vve4DI',
          //   key: 'AIzaSyA-BHlG4dOA1CxtzZoTal7e_feMEAe8Fqc',
          language: 'en',
          components: 'country:us',
          types: 'establishment',
          //   location: `${this.state.region.latitude},${this.state.region.longitude}`,
        }}
      />
    );
  }
}
class Create_Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: '',
      selectedJobType: '',
      selectedPumpType: '',
      line_length: '',
      volume: '',
      job_name: '',
      description: '',
      // address_1: address_1.address_1,
      address_2: '',
      date_picker: new Date(),
      date_picker_modal: '',
      price_from: 0,
      price_to: 0,
      terms_modal: false,
      // lat: address_1.lat,
      // lng: address_1.lng,

      state_id: '',
      job_type_id: '',
      pump_type_id: '',
      Line: 0,
      title: '',
      Description: '',
      Add_1: '',
      Add_2: '',
      map: {lat: 0, lng: 0},
      showDatePicker: false,

      priceFrom: 0,
      priceTo: 0,
      jobType: 0,
      pumpType: 0,
      stateValue: 'colorado',
      Show_Picker: false,
      //////////
      date: '',
      time: '',
      mode: 'date',
      termsModal: false,
      termsAccepted: false,
      loading: false,
    };
  }

  // componentDidMount() {
  //     if (this.props.route.params != undefined) {
  //         const {region, desp} = this.props.route.params;
  //         console.log(region.latitude, region.longitude, desp);
  //     }
  //     this.SelectedItems;
  //     that = this;
  // }
  //
  // componentDidUpdate() {
  //     if (this.props.route.params != undefined) {
  //         const {region, desp} = this.props.route.params;
  //         console.log(region.lat, region.lng, desp);
  //     }
  // }

  dateFormatter = date => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = '' + d.getFullYear(),
      hours = '' + d.getHours(),
      minutes = d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;

    return [year, month, day].join('-') + ' ' + [hours, minutes].join(':');
  };

  onPostJobPress = () => {
    const {
      selectedState,
      selectedJobType,
      selectedPumpType,
      line_length,
      volume,
      job_name,
      description,
      date_picker,
      price_from,
      price_to,
    } = this.state;

    if (
      (selectedState,
      selectedJobType,
      selectedPumpType,
      line_length,
      volume,
      job_name,
      description,
      address_1,
      date_picker,
      price_from,
      price_to)
    ) {
      this.setState({terms_modal: true});
    } else {
      Toast.show({text1: 'Fill all fields'});
    }
  };

  onAcceptPress = () => {
    this.setState({terms_modal: false});
    const {
      selectedState,
      selectedJobType,
      selectedPumpType,
      line_length,
      volume,
      job_name,
      description,
      address_2,
      date_picker,
      price_from,
      price_to,
    } = this.state;

    this.props.createJob(
      selectedState,
      selectedJobType,
      selectedPumpType,
      line_length,
      volume,
      job_name,
      description,
      address_1.address_1,
      address_2,
      address_1.lat,
      address_1.lng,
      this.dateFormatter(date_picker),
      price_from,
      price_to,
    );
    this.setState({
      line_length: '',
      volume: '',
      job_name: '',
      description: '',
      address_2: '',
      price_from: '',
      price_to: '',
    });
  };

  onStateChange = val => {
    this.setState({state_id: val});
  };

  onJobTypeChange = val => {
    this.setState({job_type_id: val});
  };

  onPumpTypeChange = val => {
    this.setState({pump_type_id: val});
  };

  SelectedItems = () => {
    List_Services.map(e => items.push({label: e.title, value: e.title}));
  };

  onMapPress = () => {
    this.props.navigation.navigate('Map_location');
  };

  onChanges = (event, selectedValue) => {
    this.setState({showDatePicker: Platform.OS === 'ios'});
    if (this.state.mode === 'date') {
      const currentDate = selectedValue || this.state.date;
      this.setState({date: currentDate});
      // this.setState({toggle: !this.state.toggle})
    } else {
      const selectedTime = selectedValue || this.state.time;
      this.setState({time: selectedTime});
      this.setState({showDatePicker: Platform.OS === 'ios'});
      // this.setState({toggle: !this.state.toggle})
    }
  };

  showTimePicker = () => {
    this.showMode('time');
  };

  render() {
    const {
      selectedState,
      selectedJobType,
      selectedPumpType,
      line_length,
      volume,
      job_name,
      description,
      address_1,
      address_2,
      date_picker,
      date_picker_modal,
      price_from,
      price_to,
      terms_modal,
    } = this.state;

    const {loading, failed, company_form_info} = this.props;

    return (
      <>
        <AppHeader Heading={'CREATE JOB'} borderRadius />
        {loading ? (
          <ActivityIndicator
            style={{padding: hp('10%')}}
            size={'large'}
            color={secondary}
          />
        ) : failed ? (
          <ErrorMessage text={"Couldn't Load Pump Info"} />
        ) : (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <View style={styles.main}>
                <Text
                  style={[
                    styles.Txt,
                    {
                      marginTop: hp('2%'),
                      fontSize: hp('1.8%'),
                      fontFamily: bold,
                    },
                  ]}>
                  {' '}
                  Create a job for Pumping Company{' '}
                </Text>
                <View style={styles.Mid_Heading}>
                  <Text
                    style={[
                      styles.Txt,
                      {
                        color: white,
                        fontSize: hp('1.6%'),
                        lineHeight: hp('1.7%'),
                        fontFamily: semiBold,
                      },
                    ]}>
                    Pump Details
                  </Text>
                </View>
                <DropDownComponent
                  label={'State'}
                  data={company_form_info.states}
                  selectedValue={selectedState}
                  onChange={val => this.setState({selectedState: val})}
                />
                <DropDownComponent
                  label={'Job Type'}
                  data={company_form_info.job_types}
                  selectedValue={selectedJobType}
                  onChange={val => this.setState({selectedJobType: val})}
                />
                <DropDownComponent
                  label={'Pump Type'}
                  data={company_form_info.pump_types}
                  selectedValue={selectedPumpType}
                  onChange={val => this.setState({selectedPumpType: val})}
                />
                <OtherTextInput
                  Field={'Line Length'}
                  value={line_length}
                  style={{width: '60%', textAlign: 'center'}}
                  mainstyle={{marginTop: hp('2%')}}
                  OnChangeText={text => this.setState({line_length: text})}
                  otherProps={{
                    placeholder: '45',
                    maxLength: 6,
                    keyboardType: 'decimal-pad',
                  }}
                />
                <OtherTextInput
                  Field={'Mᵌ'}
                  value={volume}
                  style={{width: '60%', textAlign: 'center'}}
                  mainstyle={{marginTop: hp('2%')}}
                  OnChangeText={text => this.setState({volume: text})}
                  otherProps={{
                    placeholder: '30',
                    maxLength: 6,
                    keyboardType: 'decimal-pad',
                  }}
                />
                <View style={styles.Mid_Heading}>
                  <Text
                    style={[
                      styles.Txt,
                      {
                        color: white,
                        fontSize: hp('1.6%'),
                        lineHeight: hp('1.7%'),
                        fontFamily: semiBold,
                      },
                    ]}>
                    Job Title
                  </Text>
                </View>
                <TextInput
                  value={job_name}
                  onChangeText={text => this.setState({job_name: text})}
                  placeholder={'Job title'}
                  style={[styles.InputStyle, {height: hp('6%')}]}
                  autoCapitalize
                  maxLength={50}
                />
                <View style={styles.Mid_Heading}>
                  <Text
                    style={[
                      styles.Txt,
                      {
                        color: white,
                        fontSize: hp('1.6%'),
                        lineHeight: hp('1.7%'),
                        fontFamily: semiBold,
                      },
                    ]}>
                    Job Description
                  </Text>
                </View>
                <TextInput
                  value={description}
                  onChangeText={text => this.setState({description: text})}
                  placeholder={'Job description'}
                  multiline={true}
                  style={styles.InputStyle}
                />
                <View style={styles.Mid_Heading}>
                  <Text
                    style={[
                      styles.Txt,
                      {
                        color: white,
                        fontSize: hp('1.6%'),
                        lineHeight: hp('1.7%'),
                        fontFamily: semiBold,
                      },
                    ]}>
                    Address
                  </Text>
                </View>
                <AutoComplete />
                {/* <TextInput
                  value={address_1}
                  onChangeText={text => this.setState({address_1: text})}
                  placeholder={'Address Line 1'}
                  style={[
                    styles.InputStyle,
                    {height: hp('5%'), marginTop: hp('2%')},
                  ]}
                /> */}
                <TextInput
                  value={address_2}
                  onChangeText={text => this.setState({address_2: text})}
                  placeholder={'Address Line 2'}
                  style={[
                    styles.InputStyle,
                    {height: hp('5%'), marginTop: hp('1%')},
                  ]}
                />
                <View style={styles.Mid_Heading}>
                  <Text
                    style={[
                      styles.Txt,
                      {
                        color: white,
                        fontSize: hp('1.6%'),
                        lineHeight: hp('1.7%'),
                        fontFamily: semiBold,
                      },
                    ]}>
                    Date &amp; Time{' '}
                  </Text>
                </View>
                <View
                  style={[
                    styles.miniContainer,
                    {
                      marginTop: hp('2%'),
                      paddingLeft: hp('1%'),
                      paddingRight: hp('1%'),
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => this.setState({date_picker_modal: true})}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    <Text
                      style={[
                        styles.Txt,
                        {
                          color: '#979797',
                          fontFamily: bold,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                        },
                      ]}>
                      {this.dateFormatter(date_picker)}
                    </Text>
                    <Ionicons name="calendar" color={'#000'} size={hp('2%')} />
                  </TouchableOpacity>
                </View>
                <DatePicker
                  modal
                  open={date_picker_modal}
                  date={date_picker}
                  onConfirm={date => {
                    this.setState({
                      date_picker: date,
                      date_picker_modal: false,
                    });
                  }}
                  onCancel={() => this.setState({date_picker_modal: false})}
                />
                <View style={styles.Mid_Heading}>
                  <Text
                    style={[
                      styles.Txt,
                      {
                        color: white,
                        fontSize: hp('1.6%'),
                        lineHeight: hp('1.7%'),
                        fontFamily: semiBold,
                      },
                    ]}>
                    Budget
                  </Text>
                </View>
                <View
                  style={[
                    styles.row,
                    {
                      backgroundColor: 'white',
                      marginHorizontal: hp('2%'),
                      marginVertical: hp('5%'),
                      borderRadius: hp('2%'),
                      height: hp('7.5%'),
                    },
                  ]}>
                  <Text
                    style={[
                      styles.label,
                      {flex: 1, marginHorizontal: hp('2%')},
                    ]}>
                    Price Range
                  </Text>
                  <View
                    style={[styles.row, {flex: 2, justifyContent: 'flex-end'}]}>
                    <View
                      style={[
                        styles.row,
                        {
                          borderRightWidth: 1,
                          borderColor: 'black',
                          marginRight: hp('1%'),
                        },
                      ]}>
                      <Text
                        style={[
                          styles.label,
                          {fontFamily: regular, fontSize: hp('1.75%')},
                        ]}>
                        From
                      </Text>
                      <View style={[styles.row, styles.input]}>
                        <Text style={[styles.label, {fontFamily: bold}]}>
                          $
                        </Text>
                        <TextInput
                          value={price_from}
                          onChangeText={text =>
                            this.setState({price_from: text})
                          }
                          placeholder={'00'}
                          style={[
                            styles.label,
                            {
                              fontFamily: bold,
                              maxWidth: hp('7%'),
                              height: hp('7.5%'),
                            },
                          ]}
                          keyboardType="number-pad"
                        />
                      </View>
                    </View>
                    <View style={[styles.row, {marginRight: hp('2%')}]}>
                      <Text
                        style={[
                          styles.label,
                          {fontFamily: regular, fontSize: hp('1.75%')},
                        ]}>
                        To
                      </Text>
                      <View style={[styles.row, styles.input]}>
                        <Text style={[styles.label, {fontFamily: bold}]}>
                          $
                        </Text>
                        <TextInput
                          value={price_to}
                          onChangeText={text => this.setState({price_to: text})}
                          placeholder={'00'}
                          style={[
                            styles.label,
                            {
                              fontFamily: bold,
                              maxWidth: hp('7%'),
                              height: hp('7.5%'),
                            },
                          ]}
                          keyboardType="number-pad"
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <Button
                  text={'POST JOB'}
                  loading={loading}
                  color={secondary}
                  textColor={white}
                  style={{width: '75%', alignSelf: 'center'}}
                  onPress={this.onPostJobPress}
                />
              </View>
              <View style={{height: hp('5%')}} />
            </ScrollView>
            <TermsModal
              visible={terms_modal}
              onBackPress={() => this.setState({terms_modal: false})}
              onPress={this.onAcceptPress}
            />
          </>
        )}
        <SnackBar position={'top'} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.jobReducer.loading,
    company_form_info: state.jobReducer.company_form_info,

    jobTypes: state.appReducer.jobTypes,
    pumpTypes: state.appReducer.pumpTypes,

    // loading: state.jobReducer.loading,
    // deleteLoading: state.pumpReducer.deleteLoading,
    // deleteAlert: state.pumpReducer.deleteAlert,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createJob: (
      state,
      jobType,
      pumpType,
      line,
      volume,
      desc,
      add1,
      add2,
      lat,
      lng,
      map,
      date,
      time,
      priceFrom,
      priceTo,
    ) =>
      dispatch(
        createJob(
          state,
          jobType,
          pumpType,
          line,
          volume,
          desc,
          add1,
          add2,
          lat,
          lng,
          map,
          date,
          time,
          priceFrom,
          priceTo,
        ),
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create_Job);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding: hp('1.5%'),
  },
  Txt: {
    fontSize: hp('1.5%'),
    fontFamily: regular,
    lineHeight: hp('1.8%'),
    color: '#979797',
    letterSpacing: 0.5,
    width: widthPercentageToDP('85%'),
  },
  Mid_Heading: {
    width: '110%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#979797',
    height: hp('5%'),
    marginTop: hp('3%'),
    marginLeft: hp('-1.5%'),
    marginRight: hp('-3%'),
  },
  DropDownStyle: {
    width: '100%',
    paddingLeft: hp('5%'),
    height: hp('5%'),
    borderColor: white,
    backgroundColor: white,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    elevation: 6,
  },
  miniContainer: {
    height: hp('5%'),
    marginTop: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: hp('5%'),
    paddingRight: hp('5%'),
    borderRadius: hp('1%'),
    borderColor: white,
    backgroundColor: white,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    elevation: 6,
  },
  InputStyle: {
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    width: '100%',
    height: hp('20%'),
    backgroundColor: white,
    borderRadius: hp('1.1%'),
    paddingLeft: hp('1%'),
    fontSize: hp('1.8%'),
    fontFamily: regular,
    lineHeight: hp('1.8%'),
    color: 'black',
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 4,
    shadowRadius: 2,
    elevation: 3,
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  Btn: {
    height: hp('5%'),
    marginTop: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    borderRadius: hp('1%'),
    backgroundColor: '#FF4040',
    alignSelf: 'center',
  },
  Btn_Txt: {
    fontSize: hp('2%'),
    fontFamily: bold,
    lineHeight: hp('2.2%'),
    color: 'white',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: hp('2%'),
    fontFamily: semiBold,
  },
  input: {
    height: hp('5.5%'),
    marginHorizontal: hp('1%'),
  },

  PickerViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: hp('2%'),
    height: hp('5.5%'),
    marginTop: hp('2%'),
    backgroundColor: 'white',
    borderRadius: hp('0.8%'),
  },
  pickerStyle: {
    width: hp('35%'),
    fontSize: hp('2%'),
    fontFamily: semiBold,
    color: 'black',
  },
});
