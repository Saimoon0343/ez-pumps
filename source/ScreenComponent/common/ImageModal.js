import React from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {AntDesign as Icon} from '@expo/vector-icons';


const ImageModal = ({visible,close, images}) => {
    return(
        <Modal
            onRequestClose={close}
            visible={visible}
        >
            <ImageViewer
                enablePreload
                enableImageZoom
                onLongPress={close}
                renderHeader={()=>
                    <TouchableOpacity style={{top: 0, position: "absolute", zIndex: 9999,alignSelf:'flex-end'}} onPress={close}>
                        <Icon name={"close"} size={20} style={{margin:30}} color="white"/>
                    </TouchableOpacity>
                }
                onSwipeDown={close}
                enableSwipeDown
                imageUrls={images}
            />
        </Modal>
    )
}
export default ImageModal;
