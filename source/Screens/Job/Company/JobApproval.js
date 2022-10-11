import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../../ScreenComponent/AppHeader';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import AwesomeAlert from "react-native-awesome-alerts";
import Cancel_Job from './Cancel_Job';
import { bold, regular } from '../../../assets/fonts';
import { white, secondary } from '../../../assets/colors';

var that;
class Company_JobApproval extends Component{

    constructor(props){
        super(props);
        this.state={
            Show_Modal:false,
            showAlert:false,
            ScreenType: this.props.route.params.type,
        }
    }

    Result = () => {
        this.setState({showAlert: false})
        this.props.navigation.navigate("JobCompleted")
    }


    renderSections=()=>{
        if(this.state.ScreenType == "completed"){
            return(
                <Job_Completed ViewProfile={()=> this.props.navigation.navigate("Profile",{name:"Kewin Pump Co."})} />
            )
        }
        else if(this.state.ScreenType == "cancelled"){
            return(
                <Job_Cancelled ViewProfile={()=> this.props.navigation.navigate("Profile",{name:"Kewin Pump Co."})} />
            )
        }
        else {
            return(
                <>
                    <View style={[styles.First, {flexDirection:"column", justifyContent:"center", height:hp("25%")}]} >
                        <Text style={[styles.Txt, {fontSize:hp("2.3%"), lineHeight:hp("2.4%"), width:"50%", textAlign:"center"}]} >
                            Job is in Process
                        </Text>

                        <TouchableOpacity style={[styles.btn,{marginTop:hp("1%"), flexDirection:"row", justifyContent:"space-evenly"}]} >
                            <FontAwesome name="phone" color={white} size={hp("3%")} />
                            <Text style={[styles.Txt, {color:white, marginTop:0}]} >+1 (456) 4567</Text>
                        </TouchableOpacity>

                        <View style={styles.Btn_Container} >
                            <TouchableOpacity onPress={()=> this.setState({showAlert: true})} style={[styles.btn,{marginTop:hp("1%"), height:hp("5%"), minWidth:"35%",maxWidth:"40%", backgroundColor:"#86AA0C"}]} >
                                <Text style={[styles.Txt, {color:white, marginTop:0}]} >Complete Job</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=> this.setState({Show_Modal: true})} style={[styles.btn,{marginTop:hp("1%"), height:hp("5%"), width:"35%", backgroundColor:"#979797"}]} >
                                <Text style={[styles.Txt, {color:white, marginTop:0}]} >Cancel Job</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={[styles.First, {flexDirection:"column",justifyContent:"center", padding:hp("1.25%"), height:hp("18%")}]} >
                        <Text style={[styles.DesTxt, {fontFamily:regular}]} > Jack &amd; Jack Company </Text>
                        <Text style={styles.DesTxt} adjustsFontSizeToFit={true} >
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                        </Text>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate("Profile",{name:"Kewin Pump Co."})} style={{ alignItems:"center", justifyContent:"center", flexDirection:"row", margin:hp("3%") }} >
                            <Text style={[styles.Txt, {fontSize:hp("1.5%"), color:"#FF4040", borderBottomColor:"#FF4040",marginTop:0}]} >
                                View Profile
                            </Text>
                            <AntDesign name="arrowright" color={"#FF4040"} size={hp("2%")} />
                        </TouchableOpacity>
                    </View>
                </>
            )
        }
    }

    render() {
        return (
            <>
                <AppHeader
                    Heading={"FIND JOB"}
                    BorRadius={true}
                    IsBack={true}
                />
                <ScrollView showsVerticalScrollIndicator={false} >

                    <View style={styles.Map}>
                        <Image source={require("../../../assets/images/map.png")} style={{width:"100%", height:"100%"}} resizeMode="cover" />
                    </View>
                    <View style={styles.Container} >

                    <View style={styles.First} >
                        <View style={styles.miniContainer} >
                            <Text style={styles.Txt} > Carrum Down, VIC</Text>
                            <Text style={[styles.Txt, {fontFamily:regular}]} >6 Eucalyptus Walk</Text>
                            <View style={styles.ImageCont} >
                                <Ionicons name="location-sharp" color={white} size={hp("3%")} />
                            </View>
                        </View>
                        <View style={styles.miniContainer} >
                            <Text style={styles.Txt} >Tue 21, June</Text>
                            <Text style={[styles.Txt, {fontFamily:regular}]} >On Site 9:00AM</Text>
                            <View style={styles.ImageCont} >
                                <AntDesign name="calendar" color={white} size={hp("3%")} />
                            </View>
                        </View>
                    </View>

                    { this.renderSections() }

                    <View style={styles.First} >
                        <View style={styles.miniContainer} >
                            <Text style={[styles.Txt, {fontFamily:regular}]} >Job Type</Text>
                            <Text style={styles.Txt} >Slab</Text>
                        </View>
                        <View style={styles.miniContainer} >
                            <Text style={[styles.Txt, {fontFamily:regular}]} >Pump Type</Text>
                            <Text style={styles.Txt} >Line</Text>
                        </View>
                    </View>

                    <View style={[styles.First, { borderBottomWidth:hp("0.2%"),}]} >
                        <View style={styles.miniContainer} >
                            <Text style={[styles.Txt, {fontFamily:regular}]} >Line Length</Text>
                            <Text style={styles.Txt} >45</Text>
                        </View>
                        <View style={styles.miniContainer} >
                            <Text style={[styles.Txt, {fontFamily:regular}]} >Mᵌ</Text>
                            <Text style={styles.Txt} >30</Text>
                        </View>
                    </View>

                </View>

                <Modal
                    isVisible={this.state.Show_Modal}
                    onBackButtonPress={()=> this.setState({Show_Modal: false})}
                    onBackdropPress={()=> this.setState({Show_Modal: false})}
                    animationInTiming={600}
                    animationOutTiming={200}
                    style={{flex:1}}
                >
                    <View style={styles.ModalContainer}>
                       <Cancel_Job Onpress={()=> this.setState({Show_Modal:false})} />
                    </View>

                </Modal>



                </ScrollView>
                <AwesomeAlert
                    show={this.state.showAlert}
                    message="Do you want to mark this Job to Completed ?"
                    messageStyle={{ fontSize:hp("1.7%")}}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    showCancelButton={true}
                    confirmText="Yes"
                    onCancelPressed={()=> this.setState({showAlert: false})}
                    onConfirmPressed={this.Result}

                    contentContainerStyle={{width:hp("50%") , height:hp("15%") , backgroundColor:"#FFFFFF"}}
                    confirmButtonColor="#FF3B30"
                    cancelButtonColor="#979797"
                    confirmButtonTextStyle={{fontFamily:regular,fontSize:hp("1.9%"),color:'#FFFFFF',letterSpacing:0,lineHeight:hp("1.9%") }}
                    cancelButtonTextStyle={{fontFamily:regular,fontSize:hp("1.9%"),color:'#FFFFFF',letterSpacing:0,lineHeight:hp("1.9%") }}
                />
                </>
        );
    }
}


function  Job_Completed({Onpress, ViewProfile}) {
    return(
        <>
            <View style={[styles.First, {flexDirection:"column", justifyContent:"center",height:hp("16%")}]} >
                <Text style={[styles.Txt, {fontSize:hp("2.3%"), lineHeight:hp("2.4%"), width:"50%", textAlign:"center"}]} >
                        Job has been Completed
                </Text>
            </View>

            <View style={[styles.First, {flexDirection:"column",justifyContent:"center", padding:hp("1.25%"), height:hp("18%")}]} >
                <Text style={[styles.DesTxt, {fontFamily:regular}]} > Norway Concrete Pump </Text>
                <Text style={styles.DesTxt} adjustsFontSizeToFit={true} >
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                </Text>
                <TouchableOpacity onPress={()=>alert('asd')} style={{ alignItems:"center", justifyContent:"center", flexDirection:"row", margin:hp("3%") }} >
                    <Text style={[styles.Txt, {fontSize:hp("1.5%"), color:"#FF4040", borderBottomColor:"#FF4040",marginTop:0}]} >
                        View Profile
                    </Text>
                    <AntDesign name="arrowright" color={"#FF4040"} size={hp("2%")} />
                </TouchableOpacity>
            </View>
        </>
    )
}

function  Job_Cancelled({Onpress, ViewProfile}) {
    return(
        <>
            <View style={[styles.First, {flexDirection:"column", justifyContent:"center",height:hp("16%")}]} >
                <Text style={[styles.Txt, {fontSize:hp("2.3%"), lineHeight:hp("2.4%"), width:"50%", textAlign:"center", color:secondary}]} >
                    Job has been Cancelled
                </Text>
            </View>

            <View style={[styles.First, {flexDirection:"column",justifyContent:"center", padding:hp("1.25%"), height:hp("18%")}]} >
                <Text style={[styles.DesTxt, {fontFamily:regular}]} > Norway Concrete Pump </Text>
                <Text style={styles.DesTxt} adjustsFontSizeToFit={true} >
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                </Text>
                <TouchableOpacity onPress={ViewProfile} style={{ alignItems:"center", justifyContent:"center", flexDirection:"row", margin:hp("3%") }} >
                    <Text style={[styles.Txt, {fontSize:hp("1.5%"), color:"#FF4040", borderBottomColor:"#FF4040",marginTop:0}]} >
                        View Profile
                    </Text>
                    <AntDesign name="arrowright" color={"#FF4040"} size={hp("2%")} />
                </TouchableOpacity>
            </View>
        </>
    )
}


export default Company_JobApproval;

const styles = StyleSheet.create({
    Map:{
        width:"100%",
        height:hp("20%"),
        backgroundColor:white,
    },
    Container:{
        width:"100%",
        height:hp("80%"),
        backgroundColor:white
    },
    First:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderWidth:hp("0.15%"),
        borderColor:"#DBDBDB",
        borderBottomWidth:0,
        height:hp("12%")
    },
    miniContainer:{
        justifyContent:"center",
        alignItems:"center",
        width:"50%",
        borderRightColor:"#DBDBDB",
        borderRightWidth:hp("0.1%"),
        height:"100%"
    },
    Txt:{
        fontSize:hp("1.8%"),
        fontFamily:bold,
        lineHeight:hp("1.8%"),
        color:"#1E202B",
        letterSpacing:0.5,
        marginTop:hp("1%")
    },
    ImageCont:{
        justifyContent:"center",
        alignItems:"center",
        width:hp("5%"),
        height:hp("5%"),
        backgroundColor:"#FF3B30",
        borderRadius:100,
        position:"absolute",
        top:hp("-2.5%")
    },
    btn:{
        height:hp("6%"),
        width:"50%",
        alignItems:'center',
        justifyContent:"center",
        borderRadius:hp("1.2%"),
        backgroundColor:"#FF4040",
    },
    DesTxt:{
        fontSize:hp("1.6%"),
        fontFamily:bold,
        lineHeight:hp("1.8%"),
        color:"#1E202B",
        letterSpacing:0.5,
        marginTop:hp("1%"),
        textAlign:"center"
    },
    btn1:{
        height:hp("6%"),
        width:"50%",
        alignItems:'center',
        justifyContent:"space-evenly",
        borderRadius:hp("1.2%"),
        backgroundColor:white,
        flexDirection:"row",
        borderColor:"#707070",
        borderWidth:hp("0.1%"),
        marginTop:hp("1%")
    },
    Voucher:{
        width:hp("100%"),
        height:hp("7%"),
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#F3E183",
        marginTop:hp("2%"),
        marginBottom:hp("1%"),
    },
    ModalContainer:{
        width:"100%",
        height:hp("40%"),
        backgroundColor:"#FFFFFF",
        padding:hp("2%"),
        borderRadius:hp("1.5%")
    },
    Btn_Container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        width:"90%",
        marginTop:hp("2%")
    }
});
