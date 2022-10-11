import React,{useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    TouchableOpacity,
} from 'react-native';
import ImageLoader from '../common/ImageLoader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ImageViewer from 'react-native-image-zoom-viewer'

var urlImages = [];
const ImageSection = ({images}) => {
    useEffect(()=>{
        urlImages=[]
        Object.values(images).map(image=>urlImages.push({url:image}))
    })
    const renderImage = () => {
        const [imageDisplay,setImageDisplay] = useState({uri:images[1],priority:FastImage.priority.high});
        const [visible,setVisible] = useState(false);
        
            return(
                
                <View>
                    <Modal 
                        onRequestClose={()=>setVisible(false)}
                        visible={visible}
                    >
                        <ImageViewer 
                            enablePreload
                            enableImageZoom
                            onLongPress={()=>setVisible(false)}
                            renderHeader={()=>
                                <TouchableOpacity style={{top: 0, position: "absolute", zIndex: 9999,alignSelf:'flex-end'}} onPress={()=>setVisible(false)}>
                                    <Icon name={"close"} size={35} style={{margin:20}} color="white"/>
                                </TouchableOpacity>
                            }
                            onSwipeDown={()=>setVisible(false)}
                            enableSwipeDown
                            imageUrls={urlImages}
                        />
                    </Modal>
                    {Object.keys(images).length>1
                        ?
                        <>
                            <TouchableOpacity onPress={()=>setVisible(true)}>
                                <ImageLoader 
                                    style={styles.imageDisplay} 
                                    source={imageDisplay}
                                    stretch="1"
                                />
                            </TouchableOpacity>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                            {
                                Object.values(images).map((image)=>(
                                    <TouchableWithoutFeedback key = {image} onPress={()=>setImageDisplay({uri: image,priority:FastImage.priority.high})}>
                                        <View style={styles.container}>
                                            <ImageLoader
                                                style={styles.imageStyle} 
                                                source={{uri:image,priority:FastImage.priority.high}}
                                                stretch="1"
                                            />
                                            
                                        </View>
                                    </TouchableWithoutFeedback>
                                ))
                            }
                            </ScrollView>
                        </>
                        :
                        <TouchableOpacity onPress={()=>setVisible(true)}>
                            <ImageLoader
                                style={styles.imageDisplay} 
                                source={imageDisplay}
                                stretch="1"
                            />
                        </TouchableOpacity>
                    }
                    
                </View>
                
            )
        
    }
    return(
        renderImage()
    )
}
const styles = StyleSheet.create({
    imageDisplay:{
        height:hp('37%'),
        width:wp('90%'),
        borderRadius:hp('2.5%'),
        marginBottom:hp('3%'),
    },
    container:{
        justifyContent:'center',
        alignItems:'center',
        marginRight:hp('1.5%'),
    },
    imageStyle:{
        height:hp('10%'),
        width:wp('20%'),
        borderRadius:hp('2%'),
    },
    lottieStyle1:{
        position:'relative',
        height:hp('37%'),
        alignSelf:'center',
        width:wp('90%'),
    },
    lottieStyle2:{
        position:'relative',
        height:hp('10%'),
        width:wp('20%'),
        alignSelf:'center'
    }
});
export default ImageSection;