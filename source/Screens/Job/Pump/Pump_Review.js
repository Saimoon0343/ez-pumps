import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Star from "react-native-stars";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { white } from '../../../assets/colors';
import { bold, regular, semiBold } from '../../../assets/fonts';

 export default class Give_Review extends Component{

    constructor(props){
        super(props);
        this.state={
            Raview:3,
            Review_Txt:""
        }
    }

     render() {
         return (
                <View style={styles.main} >
                    <Text style={styles.Txt} >
                        Congratulations This Job has been Completed
                    </Text>

                    <Text style={[styles.Txt, {fontFamily:regular, fontSize:hp("1.8%")}]} >
                        Please give a review &amp; rating
                    </Text>

                    <View style={styles.Review_Container} >
                        <Star
                            half={false}
                            default={parseInt(this.state.Raview)}
                            update={(val)=> this.setState({Raview: val})}
                            spacing={4}
                            starSize={hp("3%")}
                            count={5}
                            fullStar={<FontAwesome name="star" size={hp("3%")} color="#FDCC0D" />}
                            emptyStar={<FontAwesome name="star" size={hp("3%")} color="lightgray" />}
                        />
                        <Text style={[styles.Txt, {fontFamily:regular, fontSize:hp("1.8%")}]} >
                            {this.state.Raview} / 5
                        </Text>
                    </View>

                    <TextInput
                        value={this.state.Review_Txt}
                        onChangeText={(text)=> this.setState({Review_Txt: text})}
                        placeholder={"Your Review here!"}
                        style={styles.InputStyle}
                        multiline={true}
                        maxLength={120}
                    />
                     <Text style={[styles.Txt, {fontFamily:regular, fontSize:hp("1.8%"), alignSelf:"flex-end", marginTop:0}]} >
                        {this.state.Review_Txt.length} / 120
                    </Text>

                    <TouchableOpacity style={styles.Btn} onPress={this.props.Onpress} >
                        <Text style={styles.Btn_Txt} > Submit Review </Text>
                    </TouchableOpacity>

                </View>
         );
     }
 }

 const styles = StyleSheet.create({
     main:{
         flex:1,
         backgroundColor:"#FFFFFF"
     },
     Txt:{
        fontSize:hp("2.2%"),
        fontFamily:bold,
        lineHeight:hp("2.5%"),
        color:"#1E202B",
        letterSpacing:0.5,
        marginTop:hp("1%")
    },
    Review_Container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingLeft:hp("1.5%"),
        paddingRight:hp("1.5%"),
        marginTop:hp("3%")
    },
    InputStyle:{
        alignItems:"flex-start",
        justifyContent:"flex-start",
        width:"100%",
        height:hp("20%"),
        backgroundColor:white,
        borderWidth:hp("0.1%"),
        borderColor:"#707070",
        borderRadius:hp("1.1%"),
        paddingLeft:hp("1%"),
        fontSize:hp("1.8%"),
        fontFamily:regular,
        lineHeight:hp("1.9%"),
        color:"black",
        marginTop:hp("2%"),
        marginBottom:hp("2%"),
    },
    Btn:{
        height:hp("4%"),
        marginTop:hp("2%"),
        justifyContent:"center",
        alignItems:"center",
        width:"50%",
        borderRadius:hp("0.8%"),
        backgroundColor:"#FF4040",
        alignSelf:"center",
    },
    Btn_Txt:{
        fontSize:hp("1.8%"),
        fontFamily:semiBold,
        lineHeight:hp("1.8%"),
        color:"white",
        letterSpacing:0.5,
    }
 });
