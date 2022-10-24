import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {black, white} from '../../assets/colors';
import {regular} from '../../assets/fonts';
import AppHeader from '../../ScreenComponent/AppHeader';
import {fetchAPI} from '../../services';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Notifications = () => {
  const [notification, setNotification] = useState([]);
  const getNotification = () => {
    fetchAPI('GET', 'get-notifications', null, true)
      .then(res => {
        setNotification(res.data.data);
      })
      .catch(err => {
        console.log(41, err);
      });
  };
  const deleteNotification = data => {
    console.log(25, data);
    fetchAPI('DELETE', `delete-notification/${data.id}`, null, true)
      .then(res => {
        setNotification(res.data.data);
      })
      .catch(err => {
        console.log(41, err);
      });
  };
  useEffect(() => {
    getNotification();
  }, []);
  return (
    <>
      <AppHeader Heading={'NOTIFICATIONS'} IsBack={true} borderRadius={true} />
      <FlatList
        data={notification}
        renderItem={({item, index}) => {
          return (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.message}</Text>
              <Ionicons
                onPress={() => deleteNotification(item)}
                name="ios-trash-outline"
                color={'red'}
                size={hp('3')}
                style={{
                  marginLeft: 'auto',
                  marginRight: widthPercentageToDP('2'),
                }}
              />
            </View>
          );
        }}
      />
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  card: {
    padding: hp('2%'),
    backgroundColor: white,
    marginHorizontal: hp('3%'),
    marginVertical: hp('1%'),
    borderRadius: hp('1%'),
    flexDirection: 'row',
  },
  cardText: {
    color: black,
    fontFamily: regular,
    fontSize: hp('2%'),
  },
});
