import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { secondary, white } from '../../assets/colors';
import { regular, semiBold } from '../../assets/fonts';
import AppHeader from '../../ScreenComponent/AppHeader';

 export default class PaymentMethod extends Component{
    
    constructor(props){
        super(props);
        this.state={
            company:null,
            Select1:false,
            Select2:false,
            Select3:false
         }
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

     render() {
         return (
                <>
                    <AppHeader 
                        Heading={"PAY METHOD"}
                        BorRadius={true}
                        IsBack={true}
                        style={{zIndex:1}} 
                        IsDisable={true}
                    />
                    <View style={styles.Top} >
                        <Text style={styles.Txt} > {this.state.company ? "John's Construction" : "Kevin Pump Co."} </Text>
                    </View>
                    <View style={styles.main} >
                        <Pay_Component
                            Img={require("../../assets/images/masterCard.png")}
                            Card_Number={"**** **** **** 4564"}
                            Detail={"Expiry 01/26"}
                            Onpress={()=> this.setState({Select1: !this.state.Select1 })}
                            ifSelect={this.state.Select1}
                        />

                        <Pay_Component
                            Img={require("../../assets/images/visa.png")}
                            Card_Number={"**** **** **** 4564"}
                            Detail={"Expiry 01/26"}
                            Onpress={()=> this.setState({Select2: !this.state.Select2 })}
                            ifSelect={this.state.Select2}
                        />

                        <Pay_Component
                            Img={require("../../assets/images/express.png")}
                            Card_Number={"**** **** **** 4564"}
                            Detail={"Expiry 01/26"}
                            Onpress={()=> this.setState({Select3: !this.state.Select3 })}
                            ifSelect={this.state.Select3}
                        />
                        <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={()=> alert("InProgress")} >
                            <Text style={[styles.Txt, {color:"#FFFFFF", marginTop:0}]} >
                                PAY INVOICE
                            </Text>
                        </TouchableOpacity>

                   </View>
                </>
         );
     }
 }

 function Pay_Component({Card_Number, Detail, Img, Onpress, ifSelect}) {
     return(
         <TouchableOpacity style={[styles.Container, {borderWidth:ifSelect?hp("0.2%"):0, borderColor:ifSelect?"green":null}]} onPress={Onpress} >
            <Image source={Img} style={{width:hp("8%"), height:hp("3%"), marginRight:hp("2%")}} resizeMode="contain" />
            <View>
                <Text style={styles.Number} >{Card_Number}</Text>
                <Text style={styles.Detail} >{Detail}</Text>
            </View>
         </TouchableOpacity>
     )
 }

 const styles = StyleSheet.create({
     main:{
        flex:1,
        // width:"100%",
        backgroundColor:"#EEEEEE",
        padding:hp("3%")
     },
     Container:{
        width:"100%",
        // height:hp("7%"),
        padding:hp("3%"),
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#FFFFFF",
        marginTop:hp("2%")
     },
     Number:{
        fontSize:hp("1.8%"),
        fontFamily:semiBold,
        lineHeight:hp("2%"),
        color:"#1E202B",
        letterSpacing:0.5,
     },
     Detail:{
        fontSize:hp("1.5%"),
        fontFamily:regular,
        lineHeight:hp("1.8%"),
        color:"#979797",
        letterSpacing:0.5,
     },
     btn:{
        width:"75%",
        height:hp("5%"),
        borderRadius:hp("1.2%"),
        backgroundColor:"#FF4040",
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center",
        marginTop:hp("3%")
    },
    Top:{
        // position:"absolute",
        width:"100%",
        height:hp("10%"),
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:secondary,
        // top:"9%",
        marginTop:hp("-2%"),
        // zIndex:0
    },
    Txt:{
        fontSize:hp("2.5%"),
        fontFamily:semiBold,
        lineHeight:hp("2.8%"),
        color:white,
        letterSpacing:0.5,
        marginTop:hp("1%")
    },
 });