import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppHeader from '../../../ScreenComponent/AppHeader';
import JobsFilter from '../../../ScreenComponent/JobsFilter';
import JobList from './JobList';
import {primary, white} from '../../../assets/colors';
import FilterModal from '../../../ScreenComponent/FilterModal';
// import { distanceFilterData } from '../../../utils/RawData';
import {connect} from 'react-redux';
import {changeJobsFilter} from '../../../Redux/Action/JobAction';
import {loadPumps} from '../../../Redux/Action/PumpAction';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterType: '',
      filterVisible: false,
      filterValue: {id: 1, name: ''},
    };
    this.jobsListRef = React.createRef();
  }

  onFilterPress = filterText => {
    const {jobsFilter} = this.props;
    var filterValue;
    if (filterText == 'State') {
      filterValue = jobsFilter.states;
      filterValue = filterValue.id == '' ? {id: 1, name: ''} : filterValue;
    } else if (filterText == 'Pump Type') {
      filterValue = jobsFilter.pumpType;
      filterValue = filterValue.id == '' ? {id: 1, name: ''} : filterValue;
    } else {
      filterValue = jobsFilter.jobType;
      filterValue = filterValue.id == '' ? {id: 1, name: ''} : filterValue;
    }
    (filterValue = filterValue.id == '' ? {id: 1, name: ''} : filterValue),
      this.setState({filterValue, filterType: filterText, filterVisible: true});
  };
  componentDidMount() {
    this.props.loadPumps();
  }

  onFilterSubmitPress = val => {
    this.setState({filterVisible: false});
    if (!val.id) {
      return;
    }
    const {filterType} = this.state;
    const {jobsFilter} = this.props;
    if (filterType == 'State') {
      if (val.id == jobsFilter.states.id) {
        return;
      }
      jobsFilter.states = val;
    } else if (filterType == 'Pump Type') {
      if (val.id == jobsFilter.pumpType.id) {
        return;
      }
      jobsFilter.pumpType = val;
    } else {
      if (val.id == jobsFilter.jobType.id) {
        return;
      }
      jobsFilter.jobType = val;
    }

    this.props.changeFilter(jobsFilter);
    this.jobsListRef.current();
  };
  renderFilterData = () => {
    const {filterType} = this.state;
    const {jobTypes, pumpTypes, pump_form_info} = this.props;
    const distanceFilterData = pump_form_info;
    // const pumpTypes = pump_form_info?.pump_types;
    // const distanceFilterData = distanceFilterData1.map(item => item?.name);
    if (filterType == 'State') {
      return pump_form_info?.states;
    } else if (filterType == 'Pump Type') {
      return pump_form_info?.pump_types;
    } else {
      return pump_form_info?.job_types;
    }
  };

  render() {
    const {filterType, filterVisible} = this.state;
    const {jobsFilter, pump_form_info} = this.props;
    return (
      <>
        <StatusBar barStyle="light-content" />
        <AppHeader Heading={'JOBS'} borderRadius notification />
        <View style={styles.main}>
          <JobList
            navigation={this.props.navigation}
            jobsListRef={this.jobsListRef}
          />

          <View style={styles.FilterContainer}>
            {/* <JobsFilter
              FilterName="Distance"
              Type={jobsFilter.distance.type_name || 'Any'}
              onPress={this.onFilterPress}
            /> */}
            <JobsFilter
              FilterName="State"
              Type={pump_form_info?.states?.name || 'Any'}
              onPress={this.onFilterPress}
            />
            <JobsFilter
              FilterName="Pump Type"
              Type={pump_form_info?.pump_types?.name || 'Any'}
              OtherStyle={{
                borderLeftColor: 'white',
                borderLeftWidth: 1,
                borderRightColor: 'white',
                borderRightWidth: 1,
              }}
              onPress={this.onFilterPress}
            />
            <JobsFilter
              FilterName="Job Type"
              Type={pump_form_info?.job_types?.type || 'Any'}
              onPress={this.onFilterPress}
            />
          </View>

          <FilterModal
            heading={filterType}
            isVisible={filterVisible}
            onBackPress={() => this.setState({filterVisible: false})}
            // value={this.renderFilterValue()}
            value={this.state.filterValue}
            data={this.renderFilterData()}
            onSubmit={this.onFilterSubmitPress}
          />
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    pump_form_info: state.pumpReducer.pump_form_info,

    jobTypes: state.appReducer.jobTypes,
    pumpTypes: state.appReducer.pumpTypes,

    jobsFilter: state.jobReducer.jobsFilter,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeFilter: filter => dispatch(changeJobsFilter(filter)),
    loadPumps: () => dispatch(loadPumps()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'space-between',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  Top: {
    width: '100%',
    height: hp('5%'),
    backgroundColor: primary,
    borderBottomRightRadius: hp('2%'),
    borderBottomLeftRadius: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  FilterContainer: {
    width: '100%',
    height: hp('7%'),
    backgroundColor: '#505050',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
