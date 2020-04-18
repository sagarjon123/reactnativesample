import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import geolocation from '@react-native-community/geolocation'
import Axios from 'axios';

export default class App extends React.Component {
  mapMarkers() {
    const body={
      'lat':this.state.region.latitude,
      'lng':this.state.region.latitude
    }
    return (
      
      Axios.post('https://plenary-charge-270904.appspot.com/vehicles_info',body)
      .then(
        resposnse=>{
          console.log(resposnse.data)

          const myMarkers=resposnse.data
          this.setState({markers:myMarkers})
          //console.log(this.state.markers)
        }
      ),
      error=>{
        alert(error)
      }
      // fetch(' https://plenary-charge-270904.appspot.com/vehicles_info',{
      // method:'POST',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',},
      //   body: JSON.stringify({
      //     "lat":this.state.latitude,
      //     'lng':this.state.longitude
      //   })
      // })
      // .then(response => response.json())
      // .then(responseJson => {
      //   this.setState({
      //     markers: responseJson,
      //   });
      //   console.log(responseJson);
      //   return responseJson;
      // })
      // .catch(error => {
      //   console.error(error);
      // })
    )}
  componentDidMount() {
    this.mapMarkers();
    geolocation.getCurrentPosition(
      position => {
        console.log('getCurrentPosition Succes'); 
        this.setState({
          region: {
            ...this.state.region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
        this.watchPosition();
        console.log(this.state.region)
      },
      error => {
       // this.props.displayError('Error detecting your Location');
        alert(JSON.stringify(error));
      },
      { enableHightAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  watchPosition() {
    this.watchID =geolocation.watchPosition(
      position => {
        console.log('Watch Position Succes');
        if (this.props.followUser) {
          this.map.animateToRegion(
            this.newRegion(position.coords.latitude, position.coords.longitude)
          );
        }
      },
      error => {
        this.props.displayError('Error detecting your location');
      },
      { enableHightAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  componentWillUnmount() {
    geolocation.clearWatch(this.watchID);
  }
  onRegionChange(region) {
    this.setState({ region });
  }

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 47.3769,
        longitude: 8.5417,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      markers: []
    }; 
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  render() {
    console.log('marker', this.state.markers)
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={this.state.region}
        style={styles.map}
        showsUserLocation={true}
        followUserLocation={true}
        showsMyLocationButton={true}
        //annotations={markers}
      >
        {/* {this.state.markers.map((marker) => {
          <MapView.Marker 
          key={marker.id} 
          coordinate={{
            latitude: Number(marker.latitude),
            longitude: Number(marker.longitude),
           
        }}
            />
      })} */}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

