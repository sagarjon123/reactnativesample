import React, { Component } from 'react';
import { View, Text ,StyleSheet} from 'react-native';
//import MapComponent from './MapComponet';
import LogIn from '../pages/LogIn';
import SignUp from './SignUp';
import MapComponent from '../pages/MapComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Router,Scene} from 'react-native-router-flux'

const Stack=createStackNavigator()
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
     <View style={styles.container}>
      
       {/* <SignUp />  */}
      {/* <LogIn /> */}
       <MapComponent /> 

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  
  }
  });

