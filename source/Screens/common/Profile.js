import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    StatusBar
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import ReactNativeParallaxHeader from "react-native-parallax-header";
import { bold, regular, semiBold } from '../../assets/fonts';
import { fetchAPI } from '../../services';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? hp("3%") : hp("2%")) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? hp("6.5%") : hp("5.5%")) : hp("5%");
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

var that;


export default class Profile extends Component{
    state={
        loading: true,
        profile: {}
    }
    componentDidMount(){
    }
    loadProfile(){

        const id = this.props.route.params.id
        fetchAPI('get', `user/user-profile-by-pump/${id}`, null, true)
        .then(function (response) {
            if(response.data.success){
                that.setState({
                    loading: false,
                    profile: response.data.data
                })
            }else{
                that.setState({
                    loading: false,
                    error: "Some Problem Occurred While Loading Profile"
                })
            }
        })
        .catch(function () {
            that.setState({
                loading: false,
                error: "Some Problem Occurred While Loading Profile"
            })
        });

    }

    renderContent = () => {
        return (
            <>
                <View style={styles.main} >
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Text style={styles.Heading} > Description </Text>
                        <Text style={styles.Para} >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum has been the industry's standard dummy text ever since
                        </Text>
                        <Text style={styles.Heading} > Phone </Text>
                        <Text style={styles.Para} >
                        +1 (234) 7984
                        </Text>
                        <Text style={styles.Heading} > Address </Text>
                        <Text style={styles.Para} >
                        14th Malobo Beach, NewYork, USA
                        </Text>
                        <Text style={styles.Heading} > Email </Text>
                        <Text style={styles.Para} >
                            pump@domain.com
                        </Text>
                        <Text style={styles.Heading} > Website </Text>
                        <Text style={styles.Para} >
                            www.domain.com
                        </Text>

                        <Text style={styles.Heading} > Join Date </Text>
                        <Text style={styles.Para} >
                            Aug, 2021
                        </Text>

                        <Text style={styles.Heading} > My Reviews </Text>

                        <Reviews
                            NameTxt={"Kevin Pump Co."}
                            Review={"2.7"}
                            Review_Description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"}
                        />

                        <Reviews
                            NameTxt={"Kevin Pump Co."}
                            Review={"2.7"}
                            Review_Description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"}
                        />

                        <Reviews
                            NameTxt={"Kevin Pump Co."}
                            Review={"2.7"}
                            Review_Description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"}
                        />

                        <Reviews
                            NameTxt={"Kevin Pump Co."}
                            Review={"2.7"}
                            Review_Description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"}
                        />

                        <Reviews
                            NameTxt={"Kevin Pump Co."}
                            Review={"2.7"}
                            Review_Description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"}
                        />

                        <View style={{height:hp("5%")}} />
                    </ScrollView>
                </View>
            </>
        );
    }

    title = () => {
        return (
            <>
                <Text style={styles.NameTxt} >{this.state.name}</Text>
                <View style={{flexDirection:"row", alignItems:"center",justifyContent:"center"}} >
                    <Text style={styles.RateTxt} >4.9/5</Text>
                    <FontAwesome name="star" color={"#BCD221"} size={hp("2.5%")} />
                </View>
            </>
        );
    }

     render(){
         return(
            <>
                <AppHeader
                    IsBack
                    Heading={"PROFILE"}
                    // BorRadius={true}
                    style={{zIndex:1}}
                />

                <StatusBar barStyle="light-content" />
                <ReactNativeParallaxHeader
                    headerMinHeight={HEADER_HEIGHT}
                    headerMaxHeight={hp("28%")}
                    extraScrollHeight={20}
                    navbarColor="#000000"
                    title={this.title()}
                    backgroundImage={require("../../assets/images/wall.jpg")}
                    backgroundImageScale={1.2}
                    renderContent={this.renderContent}
                    containerStyle={styles.container1}
                    contentContainerStyle={styles.contentContainer}
                    innerContainerStyle={styles.container1}
                />
            </>
         );
     }
 }


 function Reviews({NameTxt,Review_Description, Review }){
     return(
         <View style={styles.Container} >
             <View style={styles.Top} >
                 <Text style={[styles.Heading, {marginTop:0}]} > {NameTxt} </Text>
                 <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}  >
                    <Text style={[styles.RateTxt, {color:"#000000"}]} >{Review}</Text>
                    <FontAwesome name="star" color={"#BCD221"} size={hp("2.5%")} />
                 </View>
             </View>
             <Text style={styles.Para} >
                 {Review_Description}
             </Text>
         </View>
     )
 }

 const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#EEEEEE",
        padding:hp("2.5%"),
        paddingTop:0,
        paddingBottom:0
    },
    ImgStyle:{
        width:"100%",
        height:hp("25%"),
        marginTop:hp("-6%"),
        alignItems:"center",
        justifyContent:"space-evenly",
        paddingTop:hp("4%")
    },
    NameTxt:{
        fontSize:hp("2.2%"),
        fontFamily:bold,
        lineHeight:hp("2.8%"),
        color:"#FFFFFF",
        letterSpacing:0.5,
    },
    RateTxt:{
        fontSize:hp("1.7%"),
        fontFamily:regular,
        color:"#FFFFFF",
        letterSpacing:0.5,
    },
    Heading:{
        fontSize:hp("2.2%"),
        fontFamily:semiBold,
        color:"#000000",
        letterSpacing:0.5,
        marginTop:hp("2%"),
    },
    Para:{
        fontSize:hp("1.7%"),
        fontFamily:regular,
        color:"#979797",
        letterSpacing:0.5,
        marginTop:hp("1.5%"),
        textAlign:'justify',
    },
    Container:{
        marginTop:hp("2%"),
        width:"100%",
        minHeight:hp("10%"),
        borderRadius:hp("1.2%"),
        backgroundColor:"#FFFFFF",
        shadowColor:"#00000029",
        shadowRadius:3,
        shadowOpacity:4,
        shadowOffset:{width:0, height:2},
        elevation:2,
        padding:hp("1.4%")
    },
    Top:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    /////////////////////////////////////////////////////////////
    container1: {
        flex: 1,
      },
      contentContainer: {
        flexGrow: 1,
      },
 });
