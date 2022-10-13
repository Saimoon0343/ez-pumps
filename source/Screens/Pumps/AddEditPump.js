import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import { OtherTextInput } from '../../ScreenComponent/TextInput';
import { primary, secondary, white } from '../../assets/colors';
import { bold, regular, semiBold } from '../../assets/fonts';
import { connect } from 'react-redux';
import LabelInput from '../../ScreenComponent/common/LabelInput';
import { deletePump, createUpdatePump } from '../../Redux/Action/PumpAction';
import { Button } from '../../ScreenComponent/common/Button';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import AwesomeAlert from 'react-native-awesome-alerts';
import { SHOW_OR_HIDE_DELETE_PUMP_ALERT } from '../../Redux/Constants';
import { fetchAPI, getToken } from '../../services';
import ErrorMessage from '../../ScreenComponent/common/ErrorMessage';
import DropDownComponent from '../../ScreenComponent/DropDownPicker_Component';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-toast-message';

function Availability({ Day, OnChange, availability }) {
  const { is_enable, am_slot, pm_slot } = availability;
  return (
    <View style={styles.Container}>
      <View
        style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{
            color: primary,
            fontSize: hp('1.8%'),
            lineHeight: hp('1.9%'),
          }}>
          {' '}
          {Day}{' '}
        </Text>
      </View>
      <View
        style={{
          width: '70%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <CheckBox
          value={am_slot}
          onValueChange={value => OnChange(Day, is_enable, value, pm_slot)}
          disabled={!is_enable}
          onTintColor={'red'}
          onCheckColor={'red'}
          tintColors={{ true: 'red' }}
        // hideBox={!is_enable}
        />
        <Text style={{ fontFamily: regular, fontSize: hp('1.8%') }}>AM</Text>
        <CheckBox
          value={pm_slot}
          onValueChange={value => OnChange(Day, is_enable, am_slot, value)}
          tintColors={{ true: 'red' }}
          onTintColor={'red'}
          onCheckColor={'red'}
          disabled={!is_enable}
        // hideBox={!is_enable}
        />
        <Text style={{ fontFamily: regular, fontSize: hp('1.8%') }}>PM</Text>
        <Switch
          value={is_enable}
          onChange={value => OnChange(Day, !is_enable, am_slot, pm_slot)}
          thumbColor={is_enable ? secondary : 'gray'}
          trackColor={{ false: 'lightgray', true: 'lightgray' }}
        />
      </View>
    </View>
  );
}

class AddEditPump extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      selectedState: '',
      selectedJobType: '',
      selectedPumpType: '',
      line_length: '',
      volume: '',
      pump_name: '',
      description: '',
      availability: {
        Monday: { is_enable: false, am_slot: false, pm_slot: false },
        Tuesday: { is_enable: false, am_slot: false, pm_slot: false },
        Wednesday: { is_enable: false, am_slot: false, pm_slot: false },
        Thursday: { is_enable: false, am_slot: false, pm_slot: false },
        Friday: { is_enable: false, am_slot: false, pm_slot: false },
        Saturday: { is_enable: false, am_slot: false, pm_slot: false },
        Sunday: { is_enable: false, am_slot: false, pm_slot: false },
      },
    };
  }

  componentDidMount() {
    const { id } = this.state;
    const token = getToken();

    if (id) {
      // edit
      fetchAPI('get', 'get-pump-info/' + id, null, token)
        .then(response => {
          const availability = { ...this.state.availability };
          response.data.pump_details.get_availability.map(item => {
            availability[item['day_name']] = {
              is_enable: item['is_enable'] ? true : false,
              am_slot: item['am_slot'] ? true : false,
              pm_slot: item['pm_slot'] ? true : false,
            };
          });
          this.setState({
            selectedState: response.data.pump_details.state_id,
            selectedJobType: response.data.pump_details.job_type_id,
            selectedPumpType: response.data.pump_details.pump_type_id,
            line_length: response.data.pump_details.line_length,
            volume: response.data.pump_details.m3,
            pump_name: response.data.pump_details.name,
            description: response.data.pump_details.description,
            availability: availability,
          });
        })
        .catch(() => Toast.show({ text1: 'Something went wrong.' }));
    }
  }

  onAvailabilityChange = (day, is_enable, am_slot, pm_slot) => {
    const availability = { ...this.state.availability };

    if (is_enable === false) {
      availability[day] = { is_enable: false, am_slot: false, pm_slot: false };
    } else {
      availability[day] = { is_enable: true, am_slot: am_slot, pm_slot: pm_slot };
    }
    this.setState({ availability: availability });
  };

  onAddEditPump = () => {
    const {
      id,
      selectedState,
      selectedJobType,
      selectedPumpType,
      line_length,
      volume,
      pump_name,
      description,
      availability,
    } = this.state;

    if (
      selectedState &&
      selectedJobType &&
      selectedPumpType &&
      line_length &&
      volume &&
      pump_name &&
      description
    ) {
      let availabilityStatus = false;
      Object.keys(availability).map(item => {
        if (
          availability[item].am_slot === true ||
          availability[item].pm_slot === true
        ) {
          availabilityStatus = true;
        }
      });
      if (availabilityStatus) {
        this.props.createUpdatePump(
          id,
          selectedState,
          selectedJobType,
          selectedPumpType,
          line_length,
          volume,
          pump_name,
          description,
          availability,
        );
      } else {
        return Toast.show({ text1: 'Select Pump Availability' });
      }
    } else {
      return Toast.show({ text1: 'Enter All Fields' });
    }
  };

  render() {
    const {
      id,
      selectedState,
      selectedJobType,
      selectedPumpType,
      line_length,
      volume,
      pump_name,
      description,
      availability,
    } = this.state;

    const { loading, failed, pump_form_info, delete_alert, delete_loading } =
      this.props;

    return (
      <>
        <AppHeader
          Heading={id ? 'EDIT PUMP' : 'ADD PUMP'}
          IsBack={true}
          BorRadius={true}
        />
        {loading ? (
          <ActivityIndicator
            style={{ padding: hp('10%') }}
            size={'large'}
            color={secondary}
          />
        ) : failed ? (
          <ErrorMessage text={"Couldn't Load Pump Info"} />
        ) : (
          <View style={styles.main}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.Txt, { marginTop: hp('2%') }]}>
                Setup your pump details
              </Text>
              <DropDownComponent
                label={'State'}
                data={pump_form_info.states}
                selectedValue={selectedState}
                onChange={val => {
                  this.setState({ selectedState: val });
                }}
              />
              <DropDownComponent
                label={'Job Type'}
                data={pump_form_info.job_types}
                selectedValue={selectedJobType}
                onChange={val => this.setState({ selectedJobType: val })}
              />
              <DropDownComponent
                label={'Pump Type'}
                data={pump_form_info.pump_types}
                selectedValue={selectedPumpType}
                onChange={val => this.setState({ selectedPumpType: val })}
              />
              <OtherTextInput
                Field={'Line Length'}
                value={line_length}
                style={{ width: '60%', textAlign: 'center' }}
                mainstyle={{ marginTop: hp('2%') }}
                OnChangeText={text => this.setState({ line_length: text })}
                otherProps={{
                  placeholder: '30',
                  maxLength: 6,
                  keyboardType: 'decimal-pad',
                }}
              />
              <OtherTextInput
                Field={'Mᵌ'}
                value={volume}
                style={{ width: '60%', textAlign: 'center' }}
                mainstyle={{ marginTop: hp('2%') }}
                OnChangeText={text => this.setState({ volume: text })}
                otherProps={{
                  placeholder: '30',
                  maxLength: 6,
                  keyboardType: 'decimal-pad',
                }}
              />
              <LabelInput
                value={pump_name}
                onChange={text => this.setState({ pump_name: text })}
                placeholder={'Enter Pump Name'}
                style={{
                  marginBottom: 0,
                  marginTop: hp('1%'),
                  borderRadius: hp('1%'),
                  height: hp('6%'),
                }}
                inputStyle={{
                  backgroundColor: 'white',
                  borderWidth: 0,
                  fontSize: hp('2%'),
                }}
              />
              <LabelInput
                value={description}
                multiline
                onChange={text => this.setState({ description: text })}
                placeholder={'Enter Description'}
                style={{
                  marginBottom: 0,
                  marginTop: hp('2%'),
                  borderRadius: hp('1%'),
                  height: hp('17%'),
                }}
                inputStyle={{
                  backgroundColor: 'white',
                  borderWidth: 0,
                  fontSize: hp('2%'),
                  height: hp('15%'),
                  textAlignVertical: 'top',
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
                  Availability
                </Text>
              </View>
              {Object.keys(availability).map(item => (
                <Availability
                  Day={item}
                  availability={availability[item]}
                  OnChange={this.onAvailabilityChange}
                />
              ))}
              <Button
                color={primary}
                loading={loading}
                text={id ? 'EDIT PUMP' : 'ADD NEW PUMP'}
                textColor={white}
                onPress={this.onAddEditPump}
                style={{ alignSelf: 'center', marginTop: hp('3%') }}
              />
              {id ? (
                <Button
                  color={secondary}
                  text={'DELETE PUMP'}
                  textColor={white}
                  onPress={() => this.props.showOrHideDeleteAlert(true)}
                  style={{ alignSelf: 'center', marginTop: hp('3%') }}
                />
              ) : null}
              <View style={{ height: hp('5%') }} />
            </ScrollView>

            <AwesomeAlert
              show={delete_alert}
              showProgress={delete_loading}
              progressColor={'red'}
              progressSize={25}
              title="Confirm"
              message="Are you sure you want to delete this pump?"
              titleStyle={{ color: secondary }}
              messageStyle={{ fontSize: hp('2.25%') }}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showConfirmButton={true}
              showCancelButton={true}
              confirmText="Yes"
              onCancelPressed={() => this.props.showOrHideDeleteAlert(false)}
              onConfirmPressed={() => this.props.deletePump(id)}
              contentContainerStyle={{
                width: hp('100%'),
                backgroundColor: '#FFFFFF',
                height: delete_loading ? hp('27%') : hp('24%'),
              }}
              confirmButtonColor={secondary}
              cancelButtonColor="#979797"
              cancelButtonStyle={{ minWidth: hp('12%'), alignItems: 'center' }}
              confirmButtonStyle={{ minWidth: hp('12%'), alignItems: 'center' }}
              confirmButtonTextStyle={{
                fontFamily: regular,
                fontSize: hp('1.9%'),
                color: '#FFFFFF',
                letterSpacing: 0,
              }}
              cancelButtonTextStyle={{
                fontFamily: regular,
                fontSize: hp('1.9%'),
                color: '#FFFFFF',
                letterSpacing: 0,
              }}
            />
          </View>
        )}
        <SnackBar position={'top'} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.pumpReducer.loading,
    pump_form_info: state.pumpReducer.pump_form_info,
    failed: state.pumpReducer.failed,
    delete_alert: state.pumpReducer.delete_alert,
    delete_loading: state.pumpReducer.delete_loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUpdatePump: (
      pumpId,
      state,
      jobType,
      pumpType,
      lineLength,
      volume,
      pumpName,
      description,
      availability,
    ) =>
      dispatch(
        createUpdatePump(
          pumpId,
          state,
          jobType,
          pumpType,
          lineLength,
          volume,
          pumpName,
          description,
          availability,
        ),
      ),
    showOrHideDeleteAlert: delete_alert =>
      dispatch({
        type: SHOW_OR_HIDE_DELETE_PUMP_ALERT,
        delete_alert: delete_alert,
      }),
    deletePump: pumpId => dispatch(deletePump(pumpId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditPump);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding: hp('2%'),
    paddingBottom: 0,
    paddingTop: 0,
  },
  Txt: {
    fontSize: hp('1.5%'),
    fontFamily: regular,
    lineHeight: hp('1.8%'),
    color: '#979797',
    letterSpacing: 0.5,
  },
  DropDownStyle: {
    width: '100%',
    paddingLeft: hp('5%'),
    height: hp('5%'),
    borderColor: white,
    backgroundColor: white,
    shadowColor: '#00000029',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
  miniContainer: {
    height: hp('5%'),
    marginTop: hp('1%'),
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
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
  Mid_Heading: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#979797',
    height: hp('5%'),
    marginTop: hp('3%'),
    marginBottom: hp('1%'),
  },
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: white,
    width: '100%',
    height: hp('5%'),
    borderRadius: hp('1%'),
    marginTop: hp('2%'),
    shadowColor: '#00000029',
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
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
});
