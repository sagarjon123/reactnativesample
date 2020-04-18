import React, { Component } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from './LogIn';
import SignUp from '../component/SignUp';
import MapComponent from './MapComponent';

const Stack=createStackNavigator();
const Routes=()=>{
    <Stack.Navigator>
      <Stack.Screen name='LogIn'Component={LogIn}></Stack.Screen>
      <Stack.Screen name='SignUp'Component={SignUp}></Stack.Screen>
      <Stack.Screen name='MapComponent'Component={MapComponent}></Stack.Screen>
    </Stack.Navigator>
}
export default Routes;
