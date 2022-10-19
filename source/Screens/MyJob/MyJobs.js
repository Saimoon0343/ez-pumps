import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import {connect} from 'react-redux';
import {ScreenTypeChange} from '../../Redux/Action/App_Action';
import MyJobsSection from '../../ScreenComponent/MyJobsComponent/MyJobsSection';
import {background, secondary} from '../../assets/colors';
import {bold} from '../../assets/fonts';
import {loadMyJobs} from '../../Redux/Action/JobsAction';
import ErrorMessage from '../../ScreenComponent/common/ErrorMessage';

class My_Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: this.props.userType === 'PUMP' ? 'Applied' : 'In Process',
      FilterToggle: false,
      refreshing: false,
    };
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.props.loadMyJobs();
    this.setState({refreshing: false});
  };
  renderMyJobs = () => {
    const {refreshing} = this.state;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.setState({FilterToggle: false})}
        disabled={!this.state.FilterToggle}
        style={styles.main}>
        <Text style={styles.Heading}>{this.state.filter + ' Jobs'}</Text>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp('10%')}}
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              refreshing={refreshing}
            />
          }>
          {this.props.loading ? (
            <ActivityIndicator
              size={'large'}
              color={secondary}
              style={{padding: hp('10%')}}
            />
          ) : this.props.failed ? (
            <ErrorMessage text="Couldn't Load Jobs" />
          ) : (
            <MyJobsSection
              filter={this.state.filter}
              navigation={this.props.navigation}
            />
          )}
        </ScrollView>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <AppHeader
          Heading={'MY JOBS'}
          userType={this.props.userType}
          borderRadius
          notification
          IsFilter={true}
          style={{zIndex: 100}}
          Check_Filter={this.state.FilterToggle}
          onFilterPress={text =>
            this.setState({filter: text, FilterToggle: false})
          }
          Close={() => this.setState({FilterToggle: !this.state.FilterToggle})}
        />
        {this.renderMyJobs()}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _ScreenType: text => dispatch(ScreenTypeChange(text)),
    loadMyJobs: () => dispatch(loadMyJobs()),
  };
}

function mapStateToProps(state) {
  return {
    userType: state.authReducer.user.user_type,
    failed: state.jobReducer.failed,
    loading: state.jobReducer.loading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(My_Jobs);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: background,
    padding: hp('1.5%'),
    paddingBottom: 0,
    zIndex: 0,
  },
  ModalContainer: {
    width: '100%',
    height: hp('20%'),
    bottom: hp('30%'),
    backgroundColor: '#505050',
    padding: hp('2%'),
  },
  Heading: {
    fontSize: hp('2.5%'),
    fontFamily: bold,
    color: 'black',
    marginLeft: hp('2%'),
    marginVertical: hp('1%'),
  },
});
