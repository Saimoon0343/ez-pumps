import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import { black, primary } from '../../assets/colors';
import { bold, regular } from '../../assets/fonts';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

// const stripeFunction=()=>{
//     const {initPaymentSheet, presentPaymentSheet, retrievePaymentIntent} =
//     useStripe();
//   const [stripeData, setStripeData] = useState({
//     clientSecret: '',
//     stripeValue: '',
//     packageEthValue: '0',
//     packageData: item,
//     accessToken: '',
//     paymentId: null,
//   });

//   const [bottomSheet, setBottomSheet] = useState(false);
//   const [loading, setloading] = useState({
//     isloading: false,
//   });

//   // const [packageEthValue, setPackageEthValue] = useState('0');
//   const {isloading, bottomSheetLoading} = loading;
//   const updateLoadingState = data => setloading(prev => ({...prev, ...data}));

//   const {
//     stripeValue,
//     clientSecret,
//     packageEthValue,
//     packageData,
//     accessToken,
//     approvalUrl,
//     paymentId,
//     isVisible,
//     PayPalBearerToken,
//   } = stripeData;
//   const updateState = data => setStripeData(prev => ({...prev, ...data}));
//     const fetchClientSecret = async () => {
//         let body = JSON.stringify({
//           userId: userData.data.id,
//           packageId: item.id,
//         });
//         ApiPost(StripePayIntentUrl, body, false, userData.access_token).then(
//           res => {
//             if (res.status == 200) {
//               updateState({clientSecret: res.json.pi.client_secret});
//               updateState({stripeValue: res.json});
//               initPaymentScreenStripe(res?.json.pi.client_secret);
//             } else {
//               updateLoadingState({isloading: false});
//               errorMessage('Unable to fatch data.');
//             }
//           },
//         );
//       };
//       const initPaymentScreenStripe = async data => {
//         const {error} = await initPaymentSheet({
//           paymentIntentClientSecret: data,
//           merchantDisplayName: 'Ivacy',
//           primaryButtonColor: 'red',
//           customerId: userData.access_token,
//           style: [{height: hp('100')}],
//         });
//         if (error) {
//           errorMessage('Unable to fatch data.');
//           updateLoadingState({isloading: false});
//         } else {
//           handlePayment(data);
//         }
//       };
//       const startPaymentProcess = async () => {
//         updateLoadingState({isloading: true});
//         await fetchClientSecret();
//       };

//       const handlePayment = async data => {
//         const {error} = await presentPaymentSheet({
//           clientSecret: data,
//         });
//         if (error) {
//           errorMessage('Unable to fatch data.');
//           updateLoadingState({isloading: false});
//         } else {
//           const {paymentIntent, error} = await retrievePaymentIntent(data);
//           if (paymentIntent) {
//             confirmYourOrder(paymentIntent);
//           }
//         }
//       };
// }

class BuyPoints extends React.Component {
  state = {
    company: null,
    showAlert: false
  }
  componentDidMount() {
    AsyncStorage.getItem('Type', (err, data) => {
      if (data == "Company") {
        this.setState({ company: true })
      } else {
        this.setState({ company: false })
      }
    })
  }
  Logout = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate("Login")
  }



  render() {
    return (
      <>
        <AppHeader
          Heading={"PACKAGES"}
          borderRadius={true}
          IsBack={true}
          style={{ zIndex: 1 }}
          IsDisable={true}
        />

        <View style={styles.container}>
          <Text>Select your package</Text>
          <PackageCard
            points={80}
            amount={120}
            onPress={() => this.props.navigation.navigate('PaymentForm', { type: "Pump" })}
          />
          <PackageCard
            points={120}
            amount={160}
            onPress={() => this.props.navigation.navigate('PaymentForm', { type: "Pump" })}
          />
          <PackageCard
            points={200}
            amount={240}
            onPress={() => this.props.navigation.navigate('PaymentForm', { type: "Pump" })}
          />
        </View>


      </>
    );
  }



}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    paddingVertical: hp('3%'),
    width: '75%',
    borderWidth: 1.5,
    borderColor: primary,
    alignItems: 'center',
    marginTop: hp('2%')
  },
  btnText: {
    fontSize: hp('3%'),
    color: black,
    fontFamily: bold,
  }
});

export default BuyPoints;

const PackageCard = ({ points, amount, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={[styles.btnText, { fontFamily: regular }]}>
        <Text style={styles.btnText}>{points} </Text>
        points for
        <Text style={styles.btnText}> ${amount}</Text>
      </Text>
    </TouchableOpacity>
  )
}