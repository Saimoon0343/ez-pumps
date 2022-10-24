import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {bold, regular, semiBold} from '../../assets/fonts';
import {white} from '../../assets/colors';
import {fetchAPI} from '../../services';
import Toast from 'react-native-toast-message';
import {
  errorMessage,
  successMessage,
} from '../../ScreenComponent/NotificationMessage';
import {useDispatch} from 'react-redux';
import {UPDATE_USER_DATA} from '../../Redux/Constants';
import {updateUserData} from '../../Redux/Action/AuthAction';
import {AuthContext} from '../../context';
import {connect} from 'react-redux';
import {setItem} from '../../persist-storage';
var isloading = false;
class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // CardHolderName: '4242424242424242',
      Card_Number: '',
      Exp_Month: '',
      Exp_Year: '',
      CVV: '',
      saved: false,
      isloading: false,
      changeString: '',
    };
    this.hitStripeAPi = this.hitStripeAPi.bind(this);
  }
  componentDidMount() {
    // console.log('payment form',this.props.navigation.getState().routes[0].state.history[0].key.split('-')[0])
  }

  hitStripeAPi = () => {
    // this.setState({
    // });
    isloading = true;
    console.log('Check State =====>', isloading);

    const {Card_Number, Exp_Month, Exp_Year, CVV} = this.state;
    const {navigation, updateUserData} = this.props;
    var cardno =
      /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/;
    var today, someday;
    today = new Date();
    someday = new Date();
    someday.setFullYear(Exp_Year, Exp_Month, 1);
    if (
      Card_Number.length == 16 &&
      someday < today &&
      Card_Number != null &&
      Card_Number != '' &&
      Exp_Month != null &&
      Exp_Month != '' &&
      Exp_Year != null &&
      Exp_Year != '' &&
      CVV != null &&
      CVV != ''
    ) {
      var data = new FormData();
      data.append('price_id', this.props.route.params.id);
      data.append('card_no', Card_Number);
      data.append('cc_expiry_month', Exp_Month);
      data.append('cc_expiry_year', Exp_Year);
      data.append('cvv_number', CVV);
      // const {updateUserData} = this.props;
      fetchAPI('post', 'payment', data, true)
        .then(function (response) {
          updateUserData(response.data.data);
          setItem('user', JSON.stringify(response.data.data));
          navigation.goBack();
          console.log('Check State =====>', isloading);

          isloading = false;

          // this.context.updateState();
          successMessage('Your payment haa been completed');
        })
        .catch(function (error) {
          console.log(89, error);
          errorMessage(error.message);
          console.log('Check State =====>', isloading);

          isloading = false;
        });
    } else {
      Toast.show({text1: 'Please type correct information'});
      errorMessage('Please type correct information');
      isloading = false;
    }
  };

  render() {
    return (
      <>
        <AppHeader Heading={'PAYMENT METHOD'} IsBack={true} BorRadius={true} />
        <View style={styles.main}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.Txt, {marginTop: hp('4%')}]}>
              Add Credit/Debit Card
            </Text>

            {/* <Text style={[styles.Txt, {fontSize: hp('1.8%')}]}>
              {' '}
              Name on Card
            </Text>
            <TextInput
              value={this.state.CardHolderName}
              onChangeText={text => this.setState({CardHolderName: text})}
              placeholder={'Kevin Martin'}
              style={styles.InputStyle}
              onSubmitEditing={() => this.NextInput.focus()}
              blurOnSubmit={false}
            /> */}

            <Text style={[styles.Txt, {fontSize: hp('1.8%')}]}>
              {' '}
              Credit card number
            </Text>
            <TextInput
              ref={ref => {
                this.NextInput = ref;
              }}
              value={this.state.changeString}
              onChangeText={text => {
                this.setState({Card_Number: text});
                // this.setState({changeString: text});
                this.setState({
                  changeString: text
                    .replace(/\s?/g, '')
                    .replace(/(\d{4})/g, '$1 ')
                    .trim(),
                });
                // number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
                // if (this.state.changeString.length == 15) {
                //   var parts = text.match(/.{1,4}/g);
                //   var new_value = parts.join('-');
                //   this.setState({changeString: new_value});
                // }
              }}
              placeholder={'3489-7596-1234-4686'}
              style={styles.InputStyle}
              keyboardType="decimal-pad"
              onSubmitEditing={() => this.NextInput2.focus()}
              maxLength={19}
              blurOnSubmit={false}
            />

            <View style={styles.Bottom_Era}>
              <View style={{width: '22%'}}>
                <Text style={[styles.Txt, {fontSize: hp('1.8%')}]}>
                  {' '}
                  Expiry
                </Text>
                <TextInput
                  ref={ref => {
                    this.NextInput2 = ref;
                  }}
                  value={parseInt(this.state.Exp_Month)}
                  onChangeText={text => this.setState({Exp_Month: text})}
                  placeholder={'MM'}
                  style={[
                    styles.InputStyle,
                    {width: '75%', paddingLeft: hp('1%')},
                  ]}
                  keyboardType="decimal-pad"
                  onSubmitEditing={() => this.NextInput3.focus()}
                  maxLength={2}
                  blurOnSubmit={false}
                />
              </View>

              <View style={{width: '25%'}}>
                <Text style={[styles.Txt, {fontSize: hp('1.8%')}]}></Text>
                <TextInput
                  ref={ref => {
                    this.NextInput3 = ref;
                  }}
                  value={parseInt(this.state.Exp_Year)}
                  onChangeText={text => this.setState({Exp_Year: text})}
                  placeholder={'YY'}
                  style={[
                    styles.InputStyle,
                    {width: '70%', paddingLeft: hp('1%')},
                  ]}
                  keyboardType="decimal-pad"
                  onSubmitEditing={() => this.NextInput4.focus()}
                  maxLength={4}
                  blurOnSubmit={false}
                />
              </View>

              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <Text
                  style={[
                    styles.Txt,
                    {fontSize: hp('1.8%'), alignSelf: 'center'},
                  ]}>
                  {' '}
                  CVV number
                </Text>
                <TextInput
                  ref={ref => {
                    this.NextInput4 = ref;
                  }}
                  value={parseInt(this.state.CVV)}
                  onChangeText={text => this.setState({CVV: text})}
                  placeholder={'CVV'}
                  style={[
                    styles.InputStyle,
                    {width: '75%', paddingLeft: hp('1%')},
                  ]}
                  keyboardType="decimal-pad"
                  maxLength={3}
                  blurOnSubmit={false}
                />
              </View>
            </View>
            {isloading == true ? (
              <ActivityIndicator
                color={'red'}
                size={'large'}
                style={{marginTop: hp('2')}}
              />
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={this.hitStripeAPi}>
                <Text style={[styles.Txt, {color: '#FFFFFF', marginTop: 0}]}>
                  CONTINUE
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => this.setState({saved: !this.state.saved})}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: hp('3%'),
              }}>
              {this.state.saved && (
                <Ionicons
                  name="ios-checkmark-circle"
                  color={'green'}
                  size={hp('3%')}
                  style={{marginTop: hp('2%')}}
                />
              )}
              <Text
                style={[
                  styles.Txt,
                  {
                    fontFamily: bold,
                    fontSize: hp('1.5%'),
                    color: this.state.saved ? 'green' : '#1E202B',
                  },
                ]}>
                {this.state.saved
                  ? 'Your Card Saved'
                  : 'Do You Want to Save card for future payments'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateUserData: val => dispatch(updateUserData(val)),
  };
};

PaymentForm.contextType = AuthContext;

// export default PaymentForm;
export default connect(null, mapDispatchToProps)(PaymentForm);

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    backgroundColor: '#EEEEEE',
    padding: hp('3%'),
    paddingTop: 0,
    paddingBottom: 0,
  },
  Txt: {
    fontSize: hp('2.2%'),
    fontFamily: semiBold,
    lineHeight: hp('2.4%'),
    color: '#1E202B',
    letterSpacing: 0.5,
    marginTop: hp('2%'),
  },
  InputStyle: {
    width: '100%',
    height: hp('5%'),
    backgroundColor: white,
    borderRadius: hp('0.8%'),
    // paddingLeft: hp('2'),
    fontSize: hp('1.8%'),
    fontFamily: regular,
    lineHeight: hp('1.8%'),
    color: 'black',
    shadowColor: '#0000002E',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 4,
    shadowRadius: 3,
    elevation: 2,
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
  Bottom_Era: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: '75%',
    height: hp('5%'),
    borderRadius: hp('1.2%'),
    backgroundColor: '#FF4040',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('3%'),
  },
});
