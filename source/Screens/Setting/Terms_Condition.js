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
import { secondary, white } from '../../assets/colors';
import { semiBold } from '../../assets/fonts';

 class Terms_Conditions extends React.Component {
    state={
        company:null,
     }
     componentDidMount(){
        AsyncStorage.getItem('Type',(err, data)=>{
            if(data == "Company"){
                this.setState({company:true})
            }else{
                this.setState({company:false})
            }
        })
     }
     Logout = async()=> {
        await AsyncStorage.clear()
        this.props.navigation.navigate("Login")
        
    }
     render(){
        return(
            <>
               <AppHeader 
                   Heading={"TERMS & CONDITIONS"}
                   BorRadius={true}
                   IsBack={true}
                   style={{zIndex:1}} 
                   IsDisable={true}
               />
               <View style={styles.Top} >
                   <Text style={styles.Txt} > {this.state.company ? "John's Construction" : "Kevin Pump Co."} </Text>
               </View>
               <View style={styles.Container} >
                  <Text> Terms Conditions </Text>
               </View>
            </>
        ); 
     }
}

const styles = StyleSheet.create({
    Top:{
        width:"100%",
        height:hp("10%"),
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:secondary,
        marginTop:hp("-2%"),
    },
    Txt:{
        fontSize:hp("2.5%"),
        fontFamily:semiBold,
        lineHeight:hp("2.8%"),
        color:white,
        letterSpacing:0.5,
        marginTop:hp("1%")
    },
    Container:{
        flex:1,
        backgroundColor:white,
        padding:hp("4%"),
        paddingTop:hp("3%")
    },
    
});
 
 export default Terms_Conditions;