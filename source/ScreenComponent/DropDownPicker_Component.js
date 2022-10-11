import React, {useEffect} from 'react';

import {View, StyleSheet, LogBox, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import {regular, semiBold} from '../assets/fonts';
import SelectList from 'react-native-dropdown-select-list';

function DropDownComponent({label, data, style, selectedValue, onChange}) {
  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
    ]);
  }, []);

  // const reformattedArray = data.map(({ item }) => ({ key: item.id, value: item.id }));

  return (
    <SelectList
      setSelected={selectedValue}
      data={data.map(item => ({
        key: item.id || item.value || item.name,
        value: item.type || item.name || item.label || item.id,
      }))}
      onSelect={item => {
        return onChange(item.id || item.value || item);
      }}
    />

    // {data.map((item)=><Picker.Item label={ item.type || item.name || item.label || item.id} value={ item.id || item.value || item.name} />)}
    //         <View style={[styles.PickerViewStyle, style]}>
    //             <SelectList setSelected={selectedValue}
    //             data={Object.keys(data)}
    //             onSelect={(item) => {
    //                         return onChange(item.id || item.value|| item)
    //                     }} />
    // {/*
    //             <Text
    //             style={{
    //                     flex:2,
    //                     color:'#979797',
    //                     fontSize:hp("1.75%"),
    //                     fontFamily: regular,
    //                 }}
    //             >
    //                 {label}
    //             </Text>
    //             <Picker
    //                 style={styles.pickerStyle}
    //                 selectedValue={selectedValue}
    //                 onValueChange={(item) => {
    //                         return onChange(item.id || item.value|| item)
    //                     }
    //                 }
    //             >
    //                 <Picker.Item label={'Select'} value={''} />
    //                 {data.map((item)=><Picker.Item label={ item.type || item.name || item.label || item.id} value={ item.id || item.value || item.name} />)}
    //             </Picker> */}
    //         </View>
  );
}

const styles = StyleSheet.create({
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

export default DropDownComponent;
