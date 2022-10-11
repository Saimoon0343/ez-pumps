import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { white } from '../../assets/colors';
import AppHeader from '../../ScreenComponent/AppHeader';
 import Job_Process_Component from "../../ScreenComponent/MyJobsComponent/Job_Process_Component";

 export default class Job_Process extends Component{
     render() {
         return (
                <>
                    <AppHeader
                        Heading={"FIND JOB"}
                        IsBack={true}
                        BorRadius={true}
                        Filter_press={true}
                        IsFilter={true}
                    />
                    <View style={styles.main}  >
                        <ScrollView>
                            <Job_Process_Component
                                heading={"Northan Concrete Pump"}
                                Duration={"Sat, 22, May"}
                                PostedBy={"Richard Davidson"}
                                Onpress={()=> alert("View Details In Progress")}
                            />

                            <Job_Process_Component
                                heading={"Northan Concrete Pump"}
                                Duration={"Sat, 22, May"}
                                PostedBy={"Richard Davidson"}
                                Onpress={()=> alert("View Details In Progress")}
                            />

                            <Job_Process_Component
                                heading={"Northan Concrete Pump"}
                                Duration={"Sat, 22, May"}
                                PostedBy={"Richard Davidson"}
                                Onpress={()=> alert("View Details In Progress")}
                            />

                            <Job_Process_Component
                                heading={"Northan Concrete Pump"}
                                Duration={"Sat, 22, May"}
                                PostedBy={"Richard Davidson"}
                                Onpress={()=> alert("View Details In Progress")}
                            />
                        </ScrollView>
                    </View>
                </>
         );
     }
 }

 const styles = StyleSheet.create({
     main:{
         flex:1,
         padding:hp("1.5%"),
         backgroundColor:white,
     }
 });
