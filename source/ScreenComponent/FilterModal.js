import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {black, secondary, white} from '../assets/colors';
import {bold, regular} from '../assets/fonts';
import Modal from './common/Modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from './common/Button';
import {toTitleCase} from '../utils';

export default ({heading, onBackPress, isVisible, value, data, onSubmit}) => {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [isVisible]);
  const onClose = () => {
    if (!value.id) setSelected({id: '', type_name: ''});
    onBackPress();
  };
  const onSubmitPress = () => {
    onSubmit(selected);
    setSelected({id: '', type_name: ''});
  };

  return (
    <Modal isVisible={isVisible} onBackPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.heading}>SELECT {heading.toUpperCase()}</Text>
        <ScrollView>
          {data != undefined &&
            data != null &&
            data.length > 0 &&
            data.map(item => (
              <TouchableOpacity
                onPress={() => setSelected(item)}
                style={styles.row}>
                {/* <Text style={styles.text}>{toTitleCase(item.type_name)}</Text> */}
                <Text style={styles.text}>
                  {toTitleCase(item.name || item.type)}
                </Text>
                <Icon
                  name={
                    selected.id == item.id
                      ? 'radio-button-checked'
                      : 'radio-button-unchecked'
                  }
                  color={selected.id == item.id ? secondary : black}
                  size={20}
                />
              </TouchableOpacity>
            ))}
        </ScrollView>
        <Button
          color={secondary}
          text={'Submit'}
          textColor="white"
          onPress={onSubmitPress}
          style={{
            width: '35%',
            alignSelf: 'center',
            height: hp('5%'),
            marginTop: hp('1%'),
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: hp('2.25%'),
    width: wp('80%'),
    backgroundColor: white,
    borderRadius: hp('1%'),
  },
  heading: {
    fontSize: hp('2.25%'),
    color: secondary,
    fontFamily: bold,
    marginBottom: hp('2%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  text: {
    fontSize: hp('1.85%'),
    color: black,
    fontFamily: regular,
  },
});
