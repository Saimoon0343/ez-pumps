import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { useNavigation } from '@react-navigation/native';
import { primary, secondary, white } from '../assets/colors';
import { regular, semiBold } from '../assets/fonts';

function AppHeader({
  onFilterPress,
  userType,
  Check_Filter,
  Close,
  Heading,
  IsFilter,
  notification,
  borderRadius,
  IsBack,
  style,
  IsDisable,
  OnApplied,
  OnRecieved,
  OnProcess,
  OnCompleted,
  OnCancelled,
  Filter_press,
  otherComponent,
}) {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={[
          styles.main,
          {
            ...style,
            borderBottomLeftRadius: borderRadius && hp('2%'),
            borderBottomRightRadius: borderRadius ? hp('2%') : 0,
          },
        ]}>
        {/* <View
          style={{
            marginLeft: hp('2%'),
            flexDirection: 'row',
          }}>
 
          {/* <View style={styles.Header}>
          </View> */}
        {/* </View> */}
        <View style={{ width: wp('20'), }}>
          {IsBack && (
            <Ionicons
              name="chevron-back"
              color={'white'}
              size={hp('3%')}
              onPress={() => navigation.goBack()}
            />
          )}
        </View>
        <Text style={styles.Header}> {Heading} </Text>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            justifyContent: 'flex-end',
            width: wp('20'),
          }}>
          {IsFilter && (
            <Foundation
              name="filter"
              color={'white'}
              size={hp('3%')}
              onPress={Close}
            />
          )}
          {notification && (
            <Ionicons
              name="notifications"
              color={'white'}
              size={hp('3%')}
              onPress={() => navigation.navigate('Notifications')}
            />
          )}
          {!IsDisable && (
            <Entypo
              name="dots-three-vertical"
              color={IsDisable ? secondary : 'white'}
              size={hp('3%')}
              onPress={IsDisable ? null : () => navigation.navigate('Setting')}
            />
          )}
        </View>
      </View>
      {Check_Filter && (
        <View style={styles.FilterContainer}>
          {userType === 'PUMP' ? ( // pump
            <>
              <Setting_Component
                SettingName={'Applied'}
                Onpress={() => onFilterPress('Applied')}
              />
              <Setting_Component
                SettingName={'Rejected'}
                Onpress={() => onFilterPress('Rejected')}
              />
            </>
          ) : (
            <Setting_Component
              SettingName={'Pending'}
              Onpress={() => onFilterPress('Pending')}
            />
          )}
          <Setting_Component
            SettingName={'In Process'}
            Onpress={() => onFilterPress('In Process')}
          />
          <Setting_Component
            SettingName={'Completed'}
            Onpress={() => onFilterPress('Completed')}
          />
          <Setting_Component
            SettingName={'Cancelled'}
            Onpress={() => onFilterPress('Cancelled')}
          />
        </View>
      )}
    </>
  );
}

function Setting_Component({ SettingName, Onpress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={Onpress} style={styles.Comp}>
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 100,
          backgroundColor: secondary,
        }}
      />
      <Text style={styles.Btn_Txt}> {SettingName} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: hp('12%'),
    backgroundColor: primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('2'),
    paddingTop: hp('3'),
  },
  Header: {
    fontSize: hp('2.5%'),
    fontFamily: semiBold,
    lineHeight: hp('2.9%'),
    color: white,
    letterSpacing: 1,
    width: wp('48'),
    textAlign: 'center',
  },
  FilterContainer: {
    position: 'absolute',
    top: hp('6%'),
    backgroundColor: '#505050',
    width: '100%',
    zIndex: 1,
    padding: hp('5%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('2%'),
  },
  Btn_Txt: {
    fontSize: hp('1.9%'),
    fontFamily: regular,
    lineHeight: hp('2%'),
    color: white,
    letterSpacing: 0.5,
    marginLeft: hp('2%'),
  },
  Comp: {
    width: '100%',
    height: hp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp('2%'),
  },
});

export default AppHeader;
