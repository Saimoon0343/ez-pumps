import React from 'react';
import CustomToast, {BaseToast} from 'react-native-toast-message';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { black, primary, white } from '../../assets/colors';



const SnackBar = ({position}) => {


    const toastConfig = {
        success: ({ text1, text2, props, ...rest }) => (
          <BaseToast
            {...rest}
            style={[{
                height: text2 ? hp('6%') : hp('5%'),
                width:hp("45%"),
                borderLeftColor: primary,
                marginLeft:hp('1%'),
                marginRight:hp('1%'),
                marginBottom:hp('0%'),
                marginTop:hp('2%'),
                borderRadius:hp('1%'),
                backgroundColor:white,

            }, props.style]}
            contentContainerStyle={{ paddingHorizontal: hp('2%') }}
            text1Style={[{
                color:black,
                fontSize:hp('1.5%')
            },props.text1Style]}
            text2Style={[{
                color:black,
                fontSize:hp('1.8%')
            },props.text2Style]}
            text1={text1}
            text2={text2}
            onTrailingIconPress={()=>CustomToast.hide()}

          />
        )
    };

    return(
        <CustomToast
            config={toastConfig}
            position={position}
            visibilityTime={1500}
        />
    )
}
export default SnackBar;
