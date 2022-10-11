import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {bold, regular} from '../../assets/fonts';
import {primary, white} from '../../assets/colors';
import {toTitleCase} from '../../utils';

function JobList_Component({
  Urgent,
  heading,
  Date,
  PumpType,
  JobType,
  Distance,
  Onpress,
  isDisabled,
}) {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={0.8}
      onPress={Onpress}
      style={[styles.main, {backgroundColor: Urgent ? '#FF4040' : '#F2F2F2'}]}>
      {/* style={[styles.main, {backgroundColor: Urgent ? '#FF4040' : '#F2F2F2'}]}> */}
      <View style={styles.Top}>
        <Text
          numberOfLines={2}
          style={[styles.heading, {color: Urgent ? white : primary}]}>
          {heading.toUpperCase()}
        </Text>
        <Text style={[styles.heading, {color: Urgent ? white : primary}]}>
          {Date}
        </Text>
      </View>

      <View style={styles.TxtAlign}>
        <FontAwesome
          name="bus"
          color={Urgent ? primary : '#979797'}
          size={hp('2%')}
        />
        <Text style={[styles.Txt, {color: Urgent ? white : '#979797'}]}>
          {toTitleCase(PumpType)}
        </Text>
      </View>
      <View style={styles.TxtAlign}>
        <MaterialIcon
          name="briefcase"
          color={Urgent ? primary : '#979797'}
          size={hp('2%')}
        />
        <Text style={[styles.Txt, {color: Urgent ? white : '#979797'}]}>
          {toTitleCase(JobType)}
        </Text>
      </View>
      <View style={styles.TxtAlign}>
        <MaterialIcon
          name="map-marker-distance"
          color={Urgent ? primary : '#979797'}
          size={hp('2%')}
        />
        <Text style={[styles.Txt, {color: Urgent ? white : '#979797'}]}>
          {Distance}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    padding: hp('1.25%'),
    borderRadius: hp('1%'),
    shadowColor: '#00000029',
    shadowRadius: 3,
    elevation: 4,
    shadowOffset: {width: 0, height: 3},
    borderWidth: hp('0.15%'),
    borderColor: '#E5E5E5',
    marginTop: hp('1.5%'),
  },
  Top: {
    width: wp('85%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('1.5%'),
  },
  heading: {
    fontSize: hp('1.6'),
    fontFamily: bold,
    lineHeight: hp('2.2%'),
    letterSpacing: 1,
  },
  TxtAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp('1%'),
  },
  Txt: {
    fontSize: hp('1.6%'),
    fontFamily: regular,
    lineHeight: hp('1.5%'),
    marginLeft: hp('2.2%'),
  },
});

export default JobList_Component;
