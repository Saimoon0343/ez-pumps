import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Give_Review from '../Job/Pump/Pump_Review';
import Cancel_Job from '../Job/Company/Cancel_Job';
import AwesomeAlert from 'react-native-awesome-alerts';
import {connect} from 'react-redux';
import {ScreenTypeChange} from '../../Redux/Action/App_Action';
import {secondary, white} from '../../assets/colors';
import ConfirmApplyModal from '../../ScreenComponent/apply-job/ConfirmApplyModal';
import {bold, regular} from '../../assets/fonts';

class Find_Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Show_Modal: false,
      showAlert: false,
      Cancel_Modal: false,
      confirmModal: false,
      confirm: false,
    };
  }

  completeJobModalConfirm = () => {
    this.setState({showCompleteJobModal: false});
    this.props.navigation.navigate('JobCompleted');
  };
  ApplyForJob = () => {
    this.props._ScreenType('pending');
  };

  onPayPress = () => {
    this.props.navigation.navigate('PaymentForm', {type: 'Pump'});
  };

  renderSections = () => {
    const isCompany = this.props.userType == 'company';
    const {job} = this.props.route.params;
    console.log(52, job);
    if (this.props.ScreenType == 'applied') {
      return (
        <View
          style={[
            styles.First,
            {
              flexDirection: 'column',
              justifyContent: 'center',
              paddingVertical: hp('1.5%'),
              height: 'auto',
            },
          ]}>
          <Text style={styles.DesTxt}> Job Description </Text>
          <Text style={[styles.DesTxt, {marginBottom: hp('2%')}]}>
            {job?.job_detail?.description}
          </Text>
          <Job_Pending />
        </View>
      );
    } else if (this.props.ScreenType == 'approved') {
      return (
        <Job_Approved
          onPress={() => this.props.navigation.navigate('Profile')}
        />
      );
    } else if (this.props.ScreenType == 'completed') {
      const id = job?.pump_id;
      return (
        <Job_Completed
          onPress={() => this.setState({Show_Modal: true})}
          isCompany={isCompany}
          pump={job?.pump}
          ViewProfile={() => this.props.navigation.navigate('Profile', {id})}
        />
      );
    } else if (this.props.ScreenType == 'cancelled') {
      const id = job?.pump_id;
      return (
        <Job_Cancelled
          pump={job?.pump}
          isCompany={isCompany}
          ViewProfile={() => this.props.navigation.navigate('Profile', {id})}
        />
      );
    } else if (this.props.ScreenType == 'inprogress') {
      const id = job?.pump_id;
      return (
        <Jop_InProcess
          isCompany={isCompany}
          AlertPress={() => this.setState({showAlert: true})}
          ModalPress={() => this.setState({Cancel_Modal: true})}
          ViewProfile={() => this.props.navigation.navigate('Profile', {id})}
        />
      );
    } else if (this.props.ScreenType == 'rejected') {
      return (
        <Job_Declined onPress={() => this.props.navigation.navigate('Jobs')} />
      );
    }
  };

  confirmJobCompleted = () => {
    this.setState({showAlert: false});
    this.props.navigation.navigate('JobCompleted');
  };

  onConfirmApplyPress = () => {
    this.setState({confirm: true, confirmModal: false});
    this.props._ScreenType('approved');
  };

  render() {
    const job = this.props.route.params.job;
    console.log(146, job);
    const type = this.props.ScreenType;
    return (
      <>
        <AppHeader Heading={'JOB DETAILS'} borderRadius IsBack />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.Map}>
            <Image
              source={require('../../assets/images/map.png')}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </View>
          <View style={styles.Container}>
            <View style={styles.First}>
              <View style={styles.miniContainer}>
                <Text style={[styles.Txt, {marginTop: hp('2%')}]}>
                  {type == 'inprogress'
                    ? `${job?.job_detail?.address_1}`
                    : 'Private'}
                </Text>
                <Text style={[styles.Txt, {fontFamily: regular}]}>{}</Text>
                <View style={styles.ImageCont}>
                  <Ionicons
                    name="location-sharp"
                    color={white}
                    size={hp('3%')}
                  />
                </View>
              </View>
              <View style={styles.miniContainer}>
                {console.log(158, job?.job_detail)}
                <Text style={styles.Txt}>{job?.job_detail?.date_and_time}</Text>
                <View style={styles.ImageCont}>
                  <AntDesign name="calendar" color={white} size={hp('3%')} />
                </View>
              </View>
            </View>

            {this.renderSections()}

            <View style={styles.First}>
              <View style={styles.miniContainer}>
                <Text style={[styles.Txt, {fontFamily: regular}]}>
                  Job Type
                </Text>
                <Text style={styles.Txt}>
                  {job?.job_detail?.get_job_type?.type}
                </Text>
              </View>
              <View style={styles.miniContainer}>
                <Text style={[styles.Txt, {fontFamily: regular}]}>
                  Pump Type
                </Text>
                <Text style={styles.Txt}>
                  {job?.job_detail?.get_pump_type?.name}
                </Text>
              </View>
            </View>

            <View style={[styles.First, {borderBottomWidth: hp('0%')}]}>
              <View style={styles.miniContainer}>
                <Text style={[styles.Txt, {fontFamily: regular}]}>
                  Line Length
                </Text>
                <Text style={styles.Txt}>{job?.job_detail?.line_length}</Text>
              </View>
              <View style={styles.miniContainer}>
                <Text style={[styles.Txt, {fontFamily: regular}]}>Mᵌ</Text>
                <Text style={styles.Txt}>{job?.job_detail?.m3}</Text>
              </View>
            </View>
          </View>
          {/* job apply section was here */}

          <Modal
            isVisible={this.state.Show_Modal}
            onBackButtonPress={() => this.setState({Show_Modal: false})}
            onBackdropPress={() => this.setState({Show_Modal: false})}
            animationInTiming={600}
            animationOutTiming={200}
            style={{flex: 1}}>
            <View style={styles.ModalContainer}>
              <Give_Review onPress={() => this.setState({Show_Modal: false})} />
            </View>
          </Modal>

          <Modal
            isVisible={this.state.Cancel_Modal}
            onBackButtonPress={() => this.setState({Cancel_Modal: false})}
            onBackdropPress={() => this.setState({Cancel_Modal: false})}
            animationInTiming={600}
            animationOutTiming={200}
            style={{flex: 1}}>
            <View style={[styles.ModalContainer, {height: hp('45%')}]}>
              <Cancel_Job
                onPress={() => this.setState({Cancel_Modal: false})}
              />
            </View>
          </Modal>
          <ConfirmApplyModal
            visible={this.state.confirmModal}
            points={6}
            onBackPress={() => this.setState({confirmModal: false})}
            onPress={this.onConfirmApplyPress}
          />
          <AwesomeAlert
            show={this.state.showAlert}
            message="Do you want to mark this Job as Completed?"
            messageStyle={{fontSize: hp('1.7%')}}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            showCancelButton={true}
            confirmText="Yes"
            onCancelPressed={() => this.setState({showAlert: false})}
            onConfirmPressed={this.confirmJobCompleted}
            contentContainerStyle={{
              width: hp('50%'),
              height: hp('15%'),
              backgroundColor: '#FFFFFF',
            }}
            confirmButtonColor="#FF3B30"
            cancelButtonColor="#979797"
            confirmButtonTextStyle={{
              fontFamily: regular,
              fontSize: hp('1.9%'),
              color: '#FFFFFF',
              letterSpacing: 0,
              lineHeight: hp('1.9%'),
            }}
            cancelButtonTextStyle={{
              fontFamily: regular,
              fontSize: hp('1.9%'),
              color: '#FFFFFF',
              letterSpacing: 0,
              lineHeight: hp('1.9%'),
            }}
          />
        </ScrollView>
      </>
    );
  }
}

function Job_Pending({onPress}) {
  return (
    <>
      <View
        style={[
          styles.First,
          {
            flexDirection: 'column',
            justifyContent: 'center',
            height: hp('15%'),
          },
        ]}>
        <Text
          style={[
            styles.Txt,
            {
              fontSize: hp('2.3%'),
              lineHeight: hp('2.4%'),
              width: '50%',
              textAlign: 'center',
            },
          ]}>
          Job Request is Pending
        </Text>
      </View>
    </>
  );
}

function Job_Approved({onPress}) {
  return (
    <>
      <View
        style={[
          styles.First,
          {
            flexDirection: 'column',
            justifyContent: 'center',
            height: hp('16%'),
          },
        ]}>
        <Text
          style={[
            styles.Txt,
            {
              fontSize: hp('2.3%'),
              lineHeight: hp('2.4%'),
              width: '50%',
              textAlign: 'center',
            },
          ]}>
          Congratulations You got this job!
        </Text>

        <TouchableOpacity
          onPress={() => alert('calling')}
          style={[
            styles.btn,
            {
              marginTop: hp('1%'),
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            },
          ]}>
          <FontAwesome name="phone" color={white} size={hp('3%')} />
          <Text style={[styles.Txt, {color: white, marginTop: 0}]}>
            +1 (456) 4567
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.First,
          {
            flexDirection: 'column',
            justifyContent: 'center',
            padding: hp('1.25%'),
            height: hp('18%'),
          },
        ]}>
        <Text style={[styles.DesTxt, {fontFamily: regular}]}>
          {' '}
          Jack &amd; Jack Company{' '}
        </Text>
        <Text style={styles.DesTxt} adjustsFontSizeToFit={true}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            margin: hp('3%'),
          }}>
          <Text
            style={[
              styles.Txt,
              {
                fontSize: hp('1.5%'),
                color: '#FF4040',
                borderBottomColor: '#FF4040',
                marginTop: 0,
              },
            ]}>
            View Profile
          </Text>
          <AntDesign name="arrowright" color={'#FF4040'} size={hp('2%')} />
        </TouchableOpacity>
      </View>
    </>
  );
}
function Job_Completed({pump, isCompany, onPress, ViewProfile}) {
  return (
    <>
      <View
        style={[
          styles.First,
          {
            flexDirection: 'column',
            justifyContent: 'center',
            height: hp('16%'),
          },
        ]}>
        <Text
          style={[
            styles.Txt,
            {
              fontSize: hp('2.3%'),
              lineHeight: hp('2.4%'),
              width: '50%',
              textAlign: 'center',
            },
          ]}>
          Job has been Completed
        </Text>

        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.btn,
            {
              marginTop: hp('1%'),
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            },
          ]}>
          <Text style={[styles.Txt, {color: white, marginTop: 0}]}>
            Submit Review
          </Text>
        </TouchableOpacity>
      </View>
      {isCompany && (
        <View
          style={[
            styles.First,
            {
              flexDirection: 'column',
              justifyContent: 'center',
              padding: hp('1.25%'),
              height: hp('18%'),
            },
          ]}>
          <Text style={[styles.DesTxt, {fontFamily: regular}]}>
            {' '}
            {pump.name}{' '}
          </Text>
          <Text style={styles.DesTxt} adjustsFontSizeToFit={true}>
            {pump.description}
          </Text>
          <TouchableOpacity
            onPress={ViewProfile}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              margin: hp('3%'),
            }}>
            <Text
              style={[
                styles.Txt,
                {
                  fontSize: hp('1.5%'),
                  color: '#FF4040',
                  borderBottomColor: '#FF4040',
                  marginTop: 0,
                },
              ]}>
              View Profile
            </Text>
            <AntDesign name="arrowright" color={'#FF4040'} size={hp('2%')} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

function Job_Cancelled({ViewProfile, pump, isCompany}) {
  return (
    <>
      <View
        style={[
          styles.First,
          {
            flexDirection: 'column',
            justifyContent: 'center',
            height: hp('16%'),
          },
        ]}>
        <Text
          style={[
            styles.Txt,
            {
              fontSize: hp('2.3%'),
              lineHeight: hp('2.4%'),
              width: '50%',
              textAlign: 'center',
              color: secondary,
            },
          ]}>
          Job has been Cancelled
        </Text>
      </View>
      {isCompany && (
        <View
          style={[
            styles.First,
            {
              flexDirection: 'column',
              justifyContent: 'center',
              padding: hp('1.25%'),
              height: hp('18%'),
            },
          ]}>
          <Text style={[styles.DesTxt, {fontFamily: regular}]}>
            {' '}
            {pump.name}{' '}
          </Text>
          <Text style={styles.DesTxt} adjustsFontSizeToFit={true}>
            {pump.description}
          </Text>
          <TouchableOpacity
            onPress={ViewProfile}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              margin: hp('3%'),
            }}>
            <Text
              style={[
                styles.Txt,
                {
                  fontSize: hp('1.5%'),
                  color: '#FF4040',
                  borderBottomColor: '#FF4040',
                  marginTop: 0,
                },
              ]}>
              View Profile
            </Text>
            <AntDesign name="arrowright" color={'#FF4040'} size={hp('2%')} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

function Job_Declined({onPress}) {
  return (
    <>
      <View
        style={[
          styles.First,
          {
            flexDirection: 'column',
            justifyContent: 'center',
            height: hp('20%'),
          },
        ]}>
        <Text
          style={[
            styles.Txt,
            {
              fontSize: hp('1.9%'),
              lineHeight: hp('2%'),
              width: '50%',
              textAlign: 'center',
              color: secondary,
            },
          ]}>
          This Job has been Declined
        </Text>

        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.btn,
            {alignSelf: 'center', marginTop: hp('3%'), height: hp('5%')},
          ]}>
          <Text style={[styles.Txt, {color: white, marginTop: 0}]}>
            FIND JOBS
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function Jop_InProcess({
  isCompany,
  ViewProfile,
  onCompletePress,
  onCancelPress,
}) {
  return (
    <>
      <View
        style={[
          styles.First,
          {
            flexDirection: 'column',
            justifyContent: 'center',
            height: hp('25%'),
          },
        ]}>
        <Text
          style={[
            styles.Txt,
            {
              fontSize: hp('2.3%'),
              lineHeight: hp('2.4%'),
              width: '50%',
              textAlign: 'center',
            },
          ]}>
          Job is in Process
        </Text>

        {isCompany && (
          <>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  marginTop: hp('1%'),
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                },
              ]}>
              <FontAwesome name="phone" color={white} size={hp('3%')} />
              <Text style={[styles.Txt, {color: white, marginTop: 0}]}>
                +1 (456) 4567
              </Text>
            </TouchableOpacity>
            <View style={styles.Btn_Container}>
              <TouchableOpacity
                onPress={onCompletePress}
                style={[
                  styles.btn,
                  {
                    marginTop: hp('1%'),
                    height: hp('5%'),
                    minWidth: '35%',
                    maxWidth: '40%',
                    backgroundColor: '#86AA0C',
                  },
                ]}>
                <Text style={[styles.Txt, {color: white, marginTop: 0}]}>
                  Complete Job
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onCancelPress}
                style={[
                  styles.btn,
                  {
                    marginTop: hp('1%'),
                    height: hp('5%'),
                    width: '35%',
                    backgroundColor: '#979797',
                  },
                ]}>
                <Text style={[styles.Txt, {color: white, marginTop: 0}]}>
                  Cancel Job
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      {isCompany && (
        <View
          style={[
            styles.First,
            {
              flexDirection: 'column',
              justifyContent: 'center',
              padding: hp('1.25%'),
              height: hp('18%'),
            },
          ]}>
          <Text style={[styles.DesTxt, {fontFamily: regular}]}>
            {' '}
            Jack &amd; Jack Company{' '}
          </Text>
          <Text style={styles.DesTxt} adjustsFontSizeToFit={true}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </Text>
          <TouchableOpacity
            onPress={ViewProfile}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              margin: hp('3%'),
            }}>
            <Text
              style={[
                styles.Txt,
                {
                  fontSize: hp('1.5%'),
                  color: '#FF4040',
                  borderBottomColor: '#FF4040',
                  marginTop: 0,
                },
              ]}>
              View Profile
            </Text>
            <AntDesign name="arrowright" color={'#FF4040'} size={hp('2%')} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

////////////////////////// JOB IN PROCESS ////////////////////////

function mapStateToProps(state) {
  return {
    ScreenType: state.appReducer.ScreenType,
    userType: state.authReducer.user.type,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    _ScreenType: text => dispatch(ScreenTypeChange(text)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Find_Job);

const styles = StyleSheet.create({
  Map: {
    width: '100%',
    height: hp('20%'),
    backgroundColor: white,
  },
  Container: {
    width: '100%',
    flex: 1,
    backgroundColor: white,
  },
  First: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: hp('0.2%'),
    borderColor: '#DBDBDB',
    borderBottomWidth: 0,
    height: hp('12%'),
  },
  miniContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRightColor: '#DBDBDB',
    borderRightWidth: hp('0.1%'),
    height: '100%',
  },
  Txt: {
    fontSize: hp('1.8%'),
    fontFamily: bold,
    color: '#1E202B',
    letterSpacing: 0.5,
    marginTop: hp('1%'),
  },
  ImageCont: {
    justifyContent: 'center',
    alignItems: 'center',
    width: hp('5%'),
    height: hp('5%'),
    backgroundColor: '#FF3B30',
    borderRadius: 100,
    position: 'absolute',
    top: hp('-2.5%'),
  },
  btn: {
    height: hp('6%'),
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('1.2%'),
    backgroundColor: '#FF4040',
  },
  DesTxt: {
    fontSize: hp('1.6%'),
    fontFamily: bold,
    lineHeight: hp('1.8%'),
    color: '#1E202B',
    letterSpacing: 0.5,
    marginTop: hp('1%'),
    textAlign: 'center',
  },
  btn1: {
    height: hp('6%'),
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: hp('1.2%'),
    backgroundColor: white,
    flexDirection: 'row',
    borderColor: '#707070',
    borderWidth: hp('0.1%'),
    marginTop: hp('1%'),
  },
  Voucher: {
    width: hp('100%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E183',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  ModalContainer: {
    width: '100%',
    height: hp('70%'),
    backgroundColor: '#FFFFFF',
    padding: hp('2%'),
  },
  Btn_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: hp('2%'),
  },
});
