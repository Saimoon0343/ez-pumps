import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import {bold} from '../../assets/fonts';
import { secondary, white} from '../../assets/colors';
import {connect} from 'react-redux';
import ErrorMessage from '../../ScreenComponent/common/ErrorMessage';
import { loadPumps } from '../../Redux/Action/PumpAction';
import PumpCard from '../../ScreenComponent/Pump_Component/PumpCard';

class Pumps extends React.PureComponent {

    state = {
        refreshing: false,
    };

    componentDidMount() {
        this.props.loadPumps();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    onAddPumpPress = () => {
        this.props.navigation.navigate('AddEditPump', {id: 0}); // true for adding pump
    };

    onPumpPress = (id) => () => {
        this.props.navigation.navigate('AddEditPump', {id: id}); // false for editing pump
    };

    renderItem(item) {
        return (
            <PumpCard
                name={item?.name}
                state={item?.get_state.name}
                job={item?.get_job_type.type}
                pump={item?.get_pump_type.name}
                onPress={this.onPumpPress(item?.id)}
            />
        );
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.props.loadPumps();
        this.setState({refreshing: false});
    };

    render() {
        const {loading, failed, pumps} = this?.props;
        const {refreshing} = this.state;
        return (
            <>
                <AppHeader
                    Heading={'PUMPS'}
                    borderRadius={true}
                />
                <View style={styles.main}>
                    <View style={{borderBottomWidth: 0.5, borderColor: 'gray', paddingBottom: hp('2%')}}>
                        <Text style={styles.Txt}>Add new pump</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.Add} onPress={this.onAddPumpPress}>
                            <Entypo name="plus" color={secondary} size={hp('5%')}/>
                        </TouchableOpacity>
                    </View>
                    {loading
                        ?
                        <ActivityIndicator style={{padding: hp('10%')}} size={'large'} color={secondary}/>
                        :
                        failed || typeof pumps === 'undefined'
                            ?
                            <ErrorMessage text={'Couldn\'t Load Pumps'}/>
                            :
                            pumps.length === 0
                                ?
                                <ErrorMessage text={'Currently you don\'t have any pump'}/>
                                :
                                <FlatList
                                    data={pumps}
                                    showsVerticalScrollIndicator={false}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={this.onRefresh}
                                        />
                                    }
                                    renderItem={({item}) =>
                                        this.renderItem(item)
                                    }
                                />
                    }
                </View>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.pumpReducer.loading,
        pumps: state.pumpReducer.pumps,
        failed: state.pumpReducer.failed,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadPumps: () => dispatch(loadPumps()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pumps);

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        paddingBottom: 0,
        padding: hp('1.5%'),
        paddingVertical: 0,
    },
    Txt: {
        fontSize: hp('1.5%'),
        fontFamily: bold,
        lineHeight: hp('1.8%'),
        color: '#979797',
        letterSpacing: 0.5,
        alignSelf: 'center',
        margin: hp('2%'),
    },
    Add: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: white,
        shadowColor: '#00000029',
        shadowRadius: 6,
        elevation: 6,
        alignSelf: 'center',
    },
});
