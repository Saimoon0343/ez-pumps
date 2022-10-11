import React, { Component } from 'react';
import { ReceivedJobs, My_Job_Component} from '../../ScreenComponent/MyJobsComponent/MyJob_Component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { ScreenTypeChange } from '../../Redux/Action/App_Action';
import { secondary } from '../../assets/colors';

class Recieved_Section extends Component{

    constructor(props){
        super(props);
        this.state={
            userType:true,
            filter:"",
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('Type',(err,data)=>{
            if(data == "Company"){
                this.setState({userType:true, filter:"Received"})
            }else{
                this.setState({userType:false, filter:"Applied"})
            }
        })
    }

    navigate = (name, type="") => () => {
        this.props._ScreenType(type)
        this.props.navigation.navigate(name);
    }

    renderSection_Recieved = () => {
        if(this.props.filter == "Received"){
            return(
                <>
                    <ReceivedJobs
                        Heading="Northan Concrete Pump"
                        Date="Sat, 22, May"
                        Person="Richard Davidson"
                        Decline={()=> alert("Declined")}
                        Offer={()=> alert("Offered")}
                        onPress={()=>this.props.navigation.navigate('Profile',{name: "Kevin Pump Co."})}
                    />
                </>
            )
        }else if(this.props.filter == "In Process"){
            return(
                <>
                    <My_Job_Component
                        Heading="Box Hill North, VIC"
                        Date="Sat, 22, May"
                        Service="Boom service"
                        Person="Richard Davidson"
                        Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
                        onPress={this.navigate("JobDetails", "inprogress")}
                        IsService={true}
                        statusColor={"#818585"}
                        status={"Pending"}
                    />
                </>
            )
        }else if(this.props.filter == "Completed") {
            return(
                <>
                    <My_Job_Component
                        Heading="Northan Concrete Pump"
                        Date="Sat, 22, May"
                        Service="Boom service"
                        Person="Richard Davidson"
                        Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
                        onPress={this.navigate("JobDetails", "completed")}
                        IsService={false}
                        statusColor={"#818585"}
                        status={"View Details"}
                    />
            </>
            )
        }else if(this.props.filter == "Pending") {
            return(
                <>
                    <My_Job_Component
                        Heading="Box Hill North, VIC"
                        Date="Sat, 22, May"
                        Service="Boom service"
                        Person="Richard Davidson"
                        Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
                        onPress={this.navigate("JobDetails", "approved")}
                        IsService={true}
                        statusColor={"#86AA0C"}
                        status={"Pending"}
                    />
            </>
            )
        }
        else{
            return(
                <>
                   <My_Job_Component
                        Heading="Box Hill North, VIC"
                        Date="Sat, 22, May"
                        Service="Boom service"
                        Person="Richard Davidson"
                        Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
                        onPress={this.navigate("JobDetails", "cancelled")}
                        IsService={true}
                        statusColor={secondary}
                        status={"Cancelled"}
                    />
                </>
            )
        }
    }

    render() {
        return (
             this.renderSection_Recieved()
        );
    }
}

function mapDispatchToProps(dispatch) {
    return{
        _ScreenType: (text)=> dispatch(ScreenTypeChange(text))
    }
}
export default connect(null, mapDispatchToProps)(Recieved_Section);
