import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {regular} from '../assets/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default ({FilterName, Type, onPress, OtherStyle}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(FilterName)}
      style={[styles.container, OtherStyle]}>
      <View style={[styles.row]}>
        <Text style={[styles.TopTxt]}> {FilterName} </Text>
        <AntDesign
          name="caretdown"
          color="white"
          size={hp('1.5%')}
          style={{marginBottom: 2}}
        />
      </View>
      <Text style={[styles.TopTxt, {alignSelf: 'center'}]}> {Type} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('0.5%'),
  },
  TopTxt: {
    fontSize: hp('1.6%'),
    fontFamily: regular,
    color: '#FFFFFF',
  },
});
