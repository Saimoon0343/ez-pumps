import React from 'react';
import {FlatList} from 'react-native';
import {My_Job_Component} from './MyJob_Component';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenTypeChange} from '../../Redux/Action/App_Action';
import {secondary} from '../../assets/colors';
import ErrorMessage from '../../ScreenComponent/common/ErrorMessage';

const MyJobsSection = ({filter, navigation}) => {
  const dispatch = useDispatch();

  const completedJobs = useSelector(state => state.jobReducer.completed);
  const pendingJobs = useSelector(state => state.jobReducer.pending);
  const cancelledJobs = useSelector(state => state.jobReducer.cancelled);
  const appliedJobs = useSelector(state => state.jobReducer.applied);
  const inprocessJobs = useSelector(state => state.jobReducer.inprocess);
  const requestsJobs = useSelector(state => state.jobReducer.requests);
  const rejectedJobs = useSelector(state => state.jobReducer.rejected);
  console.log(
    19,
    completedJobs,
    pendingJobs,
    cancelledJobs,
    appliedJobs,
    rejectedJobs,
    requestsJobs,
  );
  const navigate =
    (name, type = '', job) =>
    () => {
      dispatch(ScreenTypeChange(type));
      navigation.navigate('JobDetails', {job});
    };

  if (filter === 'Completed') {
    if (
      completedJobs != undefined &&
      completedJobs.length > 0 &&
      completedJobs != null
    ) {
      return (
        <FlatList
          data={completedJobs}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <My_Job_Component
              heading={item?.job_detail?.name}
              date={item?.job_detail?.date_and_time}
              service={item?.job_detail?.get_job_type?.type}
              pumpType={item?.job_detail?.get_pump_type?.name}
              price={`$${item?.job_detail?.price_from}-$${item?.job_detail?.price_to}`}
              onPress={navigate('JobDetails', 'completed', item)}
              statusColor={'#818585'}
              status={'View Details'}
            />
          )}
        />
      );
    } else {
      return <ErrorMessage text={'No Completed Jobs Yet'} />;
    }
  } else if (filter === 'Pending') {
    if (
      pendingJobs != undefined &&
      pendingJobs.length > 0 &&
      pendingJobs != null
    ) {
      return (
        <FlatList
          data={pendingJobs}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <>
              {console.log(68, item?.job_detail?.date_and_time)}
              <My_Job_Component
                heading={item?.job_detail?.name}
                date={item?.job_detail?.date_and_time}
                service={item?.job_detail?.get_job_type?.type}
                pumpType={item?.job_detail?.get_pump_type?.name}
                price={`$${item?.job_detail?.price_from}-$${item?.job_detail?.price_to}`}
                onPress={navigate('JobDetails', 'pending', item)}
                statusColor={'#86AA0C'}
                status={'Pending'}
              />
            </>
          )}
        />
      );
    } else {
      return <ErrorMessage text={'No Pending Jobs Yet'} />;
    }
  } else if (filter === 'In Process') {
    if (
      inprocessJobs != undefined &&
      inprocessJobs.length > 0 &&
      inprocessJobs != null
    ) {
      return (
        <FlatList
          data={inprocessJobs}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <My_Job_Component
              heading={item?.job_detail?.name}
              date={item?.job_detail?.date_and_time}
              service={item?.job_detail?.get_job_type?.type}
              pumpType={item?.job_detail?.get_pump_type?.name}
              price={`$${item?.job_detail?.price_from}-$${item?.job_detail?.price_to}`}
              onPress={navigate('JobDetails', 'inprogress', item)}
              statusColor={'#818585'}
              status={'In Process'}
            />
          )}
        />
      );
    } else {
      return <ErrorMessage text={'No Jobs in Process'} />;
    }
  } else if (filter === 'Applied') {
    if (
      appliedJobs != undefined &&
      appliedJobs.length > 0 &&
      appliedJobs != null
    ) {
      return (
        <FlatList
          data={appliedJobs}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <My_Job_Component
              heading={item?.job_detail?.name}
              date={item?.job_detail?.date_and_time}
              service={item?.job_detail?.get_job_type?.type}
              pumpType={item?.job_detail?.get_pump_type?.name}
              price={`$${item?.job_detail?.price_from}-$${item?.job_detail?.price_to}`}
              onPress={navigate('JobDetails', 'applied', item)}
              statusColor={'#818585'}
              status={'Applied'}
            />
          )}
        />
      );
    } else {
      return <ErrorMessage text={'You have not applied to any job yet'} />;
    }
  } else if (filter === 'Cancelled') {
    if (
      cancelledJobs != undefined &&
      cancelledJobs.length > 0 &&
      cancelledJobs != null
    ) {
      return (
        <FlatList
          data={cancelledJobs}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <My_Job_Component
              heading={item?.name}
              date={item?.date_and_time}
              service={item?.get_job_type?.type}
              pumpType={item?.get_pump_type?.name}
              price={`$${item?.price_from}-$${item?.price_to}`}
              onPress={navigate('JobDetails', 'cancelled', item)}
              statusColor={secondary}
              status={'Cancelled'}
            />
          )}
        />
      );
    } else {
      return <ErrorMessage text={'No Cancelled Jobs Yet'} />;
    }
  } else if (filter === 'Rejected') {
    if (
      rejectedJobs != undefined &&
      rejectedJobs.length > 0 &&
      rejectedJobs != null
    ) {
      return (
        <FlatList
          data={rejectedJobs}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <My_Job_Component
              heading={item?.job_detail?.name}
              date={item?.job_detail?.date_and_time}
              service={item?.job_detail?.get_job_type?.type}
              pumpType={item?.job_detail?.get_pump_type?.name}
              price={`$${item?.job_detail?.price_from}-$${item?.job_detail?.price_to}`}
              onPress={navigate('JobDetails', 'rejected', item)}
              statusColor={secondary}
              status={'Rejected'}
            />
          )}
        />
      );
    } else {
      return <ErrorMessage text={'No Rejected Jobs Yet'} />;
    }
  } else if (filter === 'requests') {
    if (
      requestsJobs != undefined &&
      requestsJobs.length > 0 &&
      requestsJobs != null
    ) {
      return (
        <FlatList
          data={requestsJobs}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <My_Job_Component
              heading={item?.job_detail?.name}
              date={item?.job_detail?.date_and_time}
              service={item?.job_detail?.get_job_type?.type}
              pumpType={item?.job_detail?.get_pump_type?.name}
              price={`$${item?.job_detail?.price_from}-$${item?.job_detail?.price_to}`}
              onPress={navigate('JobDetails', 'request', item)}
              statusColor={secondary}
              status={'Rejected'}
            />
          )}
        />
      );
    } else {
      return <ErrorMessage text={'No Rejected Jobs Yet'} />;
    }
  } else {
    return <ErrorMessage text={'No Jobs Found'} />;
  }
};

export default MyJobsSection;
