import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import JobList_Component from '../../../ScreenComponent/Job_Component/JobList_Component';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { ScreenTypeChange } from '../../../Redux/Action/App_Action';
import { fetchAPI } from '../../../services';
import { primary, secondary } from '../../../assets/colors';
import { regular } from '../../../assets/fonts';

var FormData = require('form-data');

var that;

class JobList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      page: 1,
      jobs: [],
      isListEnd: false,
      success: false,
      error: false,
      refreshing: false,
    };
    this.props.jobsListRef.current = this.onRefresh;
  }

  componentDidMount() {
    that = this;
    this.loadJobs();
  }

  loadJobs = () => {
    const { loading, page, jobs, isListEnd } = this.state;
    const { jobsFilter } = this.props;
    // var data = new FormData();
    // data.append('jobType', jobsFilter.jobType.id);
    // data.append('pumpType', jobsFilter.pumpType.id);
    console.log(49, jobsFilter)
    console.log(49, jobsFilter.pumpType.id)
    console.log(50, jobsFilter.jobType.id)
    if (!loading && !isListEnd) {
      that.setState({ loading: true });

      fetchAPI('GET', `get-all-company-jobs?state_id=1&job_type_id=${jobsFilter?.pumpType?.id}&pump_type_id=${jobsFilter?.JobType?.id}`)
        .then(function (response) {
          console.log(54, response)
          if (response.data.jobs.length > 0) {
            that.setState({
              success: true,
              page: page + 1,
              jobs: [...jobs, ...response.data.jobs],
              loading: false,
              error: false,
              refreshing: false,
            });
          } else {
            that.setState({
              success: true,
              jobs: [],
              isListEnd: true,
              loading: false,
              error: false,
              refreshing: true,
            });
          }
        })
        .catch(function (error) {
          that.setState({
            loading: false,
            isListEnd: true,
            error: true,
            refreshing: false,
          });
        });
    }
  };

  renderFooter() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          style={{ padding: 20 }}
          size="large"
          color={secondary}
        />
      );
    } else {
      return <View style={{ height: hp('5%') }} />;
    }
  }

  navigate =
    (name, type = '', job) =>
      () => {
        this.props.navigation.navigate('ApplyJob', { job });
      };
  onRefresh = () => {
    this.setState(
      {
        refreshing: true,
        loading: false,
        page: 1,
        jobs: [],
        isListEnd: false,
        success: false,
        error: false,
      },
      () => this.loadJobs(),
    );
  };

  renderJobs() {
    const { jobs, success, loading, refreshing } = this.state;
    if (success && jobs.length === 0) {
      if (!loading) {
        return (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: hp('2%'),
                fontFamily: regular,
                textAlign: 'center',
                color: primary,
              }}>
              No Jobs Available
            </Text>
          </View>
        );
      }
    } else {
      return (
        <FlatList
          data={jobs}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          style={{
            margin: hp('-2%'),
            marginTop: hp('0%'),
          }}
          contentContainerStyle={{ padding: hp('2%'), paddingTop: hp('0%') }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <JobList_Component
              heading={item.name}
              Date={item.date_and_time}
              PumpType={item.get_pump_type.name}
              JobType={item.get_job_type.type}
              Distance={'40 Miles'}
              Urgent={false}
              Onpress={this.navigate('JobDetails', 'apply', item)}
            />
          )}
          ListFooterComponent={this.renderFooter()}
          onEndReachedThreshold={0.5}
        />
      );
    }
  }

  render() {
    const { success, error } = this.state;
    return (
      <View style={{ paddingHorizontal: hp('2%'), flex: 1 }}>
        {!success && !error ? (
          <ActivityIndicator style={{ flex: 1 }} color={secondary} size="large" />
        ) : (
          this.renderJobs()
        )}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _ScreenType: text => dispatch(ScreenTypeChange(text)),
  };
}

function mapStateToProps(state) {
  return {
    jobsFilter: state.jobReducer.jobsFilter,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobList);

const styles = StyleSheet.create({
  main: {
    width: '50%',
    backgroundColor: 'red',
    padding: hp('5%'),
    paddingBottom: 0,
    paddingTop: 0,
  },
});
