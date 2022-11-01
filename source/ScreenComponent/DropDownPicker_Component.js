import React, {useEffect, useLayoutEffect, useState} from 'react';

import {View, StyleSheet, LogBox, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import {regular, semiBold} from '../assets/fonts';
import SelectList from 'react-native-dropdown-select-list';

function DropDownComponent({label, data, style, selectedValue, onChange}) {
  const abc = {
    key: selectedValue?.id,
    value: selectedValue?.name,
  };

  // const value = selectedValue == datas.key && datas.value;
  // const object = {...checkData};
  return (
    <View
      style={{
        marginBottom: hp('2'),
        marginTop: hp('1'),
      }}>
      {/* <Text style={{backgroundColor: 'red'}}>
        {checkData[0]?.value.toString()}
      </Text> */}
      <SelectList
        // defaultOption={{
        //   key: selectedValue?.id || selectedValue?.value,
        //   value:
        //     selectedValue?.type || selectedValue?.name || selectedValue?.label,
        // }}

        setSelected={item => onChange(item)}
        boxStyles={{backgroundColor: 'white'}}
        dropdownStyles={{backgroundColor: 'white'}}
        placeholder={
          selectedValue.value || selectedValue.name || selectedValue.type
        }
        data={data.map(item => ({
          key: item.id || item.value || item.name,
          value: item.type || item.name || item.label || item.id,
        }))}
        // defaultOption={abc}
        // onSelect={item => {
        //   console.log(26, item);
        //   // onChange(item);
        // }}
      />
    </View>

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
