// import React from 'react';
// import { useState } from 'react';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

// const GooglePlacesInput = ({region,setRegion,desp,setdesp,placeholder}) => {

//   return (
//     <GooglePlacesAutocomplete
//     styles={{container:{
//         flex:0,
//             width:widthPercentageToDP("100%"),
//             zIndex:2,
//             position:'relative',
//             padding:widthPercentageToDP("6%"),
//         },
//         listView:{
//             backgroundColor:'#fff',
//         }}}
//       placeholder={desp ? desp : "" }
//       fetchDetails={true}
//       onPress={(data, details = null) => {
//         // 'details' is provided when fetchDetails = true
//         console.log(data, details);
//          setdesp(data.description)
//          console.log("Description",data.description);
//         setRegion({
//             latitude:details.geometry.location.lat,
//             longitude:details.geometry.location.lng,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//         })
        
//       }}
//       listViewDisplayed={'auto'}
//       renderDescription={row => row.description} // custom description render
//       query={{
//         key: 'AIzaSyA-BHlG4dOA1CxtzZoTal7e_feMEAe8Fqc',
//         language: 'en',
//         components:"country:us",
//         types:"establishment",
//         location: `${region.latitude},${region.longitude}`
//       }}
//     />
//   );
// };

// export default GooglePlacesInput;