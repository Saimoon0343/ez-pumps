import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../ScreenComponent/AppHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {bold} from '../../assets/fonts';
import {black} from '../../assets/colors';
import {ReceivedJobs} from '../../ScreenComponent/MyJobsComponent/MyJob_Component';
import MyJobsSection from '../../ScreenComponent/MyJobsComponent/MyJobsSection';

const JobType1 = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const OnRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  const requests = [
    {
      id: 1,
      job_detail: {title: 'title', date: 'date', time: 'time'},
      pump: {name: 'name', user: {name: 'name'}},
      date: '12/12/2019',
      status: 'fdfggg',
    },
  ];
  const renderJobRequests = () => {
    return (
      <FlatList
        data={requests}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <ReceivedJobs
            fromJob={item.status}
            Heading={item.job_detail.title}
            Date={item.job_detail.date + ' ' + item.job_detail.time}
            Person={item.pump.user.name}
            Decline={() => alert('Declined')}
            Offer={() => alert('Offered')}
            onPress={() => navigation.navigate('JobRequest')}
          />
        )}
      />
    );
  };
  return (
    <View>
      <AppHeader Heading={'REQUESTS TYPE'} notification borderRadius />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: hp('2%')}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
        }>
        <Text style={styles.Heading}>Job Requests Type</Text>
        <MyJobsSection filter={'Applied'} navigation={navigation} />
        {/* {renderJobRequests()} */}
        <View style={{height: hp('5%')}} />
      </ScrollView>
    </View>
  );
};

export default JobType1;

const styles = StyleSheet.create({
  Heading: {
    fontSize: hp('2.5%'),
    fontFamily: bold,
    color: black,
    marginLeft: hp('2%'),
    marginVertical: hp('1%'),
  },
});
