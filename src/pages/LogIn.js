import React, { Component } from 'react';
import { View, Image,Text, TextInput,StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../component/SignUp';


export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:'',
      password:'',
      nameValidate:true,
      passwordValidate:true,
      passwordText:'',
      Loading:false
    };
  }
  Validate=()=>{
    const {userName,password}=this.state;
    if(userName==''){
      alert('please enter the username');
      return false
    }else if(password==''){
    alert('please enter the password');
    return false
  }
  return true
}
  
  doLogin=({navigation})=>{
    const data={
      'Mobile/Email':this.state.userName,
      'Password':this.state.password
    }
    // axios.post('https://plenary-charge-270904.appspot.com/login',data)
    // .then(
    //   res=>{
    //     alert('login sucessful')
    //     console.warn(data)
    //     console.warn(res)
    //   },
    //   err=>{
    //     alert('username and password worng')
    //   }
    //   )
    //   .catch(
    //     err=>{
    //     alert('username and password worng')
        
    //   }
    // )
    fetch('https://plenary-charge-270904.appspot.com/login',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',},
        body: JSON.stringify({
        'Mobile/Email':this.state.userName,
      'Password':this.state.password
        }),
       })
       .then((response)=>response.json())
       .then((responseJson)=>{
         //console.warn(responseJson)
         this.props.navigation.navigate('MapComponent')
         
         
       })
       .catch((error)=>{
         Console.error(error)
         alert('username pasword worng')
       })
    
  } 
    
  

render() {
    return (
      <View style={styles.Container}>
       {/*  <Image source = {require('/Users/admin/Desktop/Project/Kulomb/Assets/Kulomb_logo.png')} 
          style={styles.image}/> */}
        
        <TextInput style={[styles.InputBox,!this.state.nameValidate?styles.error:null]} 
        onChangeText={(userName)=>this.setState({userName}) }
        placeholder='Email or Phone Number'
        placeholderTextColor='black'/>
        <TextInput style={[styles.InputBox,!this.state.passwordValidate?styles.error:null]} 
        onChangeText={(password)=>this.setState({password})}
        placeholder='Password'
        placeholderTextColor='black'
        secureTextEntry={true}/>
        <TouchableOpacity style={styles.button}
         onPress={()=>this.doLogin()}>
          <Text style={styles.buttonText}>LogIn</Text>
        </TouchableOpacity>
        <View style={styles.SignupTextCont}>
        <Text style={styles.SignupText}>Don't have an account?</Text>
          <Text style={styles.SignupButton}>SignUp</Text>
          
        
        </View>
      </View>
    );
  }
}
const styles=StyleSheet.create({
    Container:{
        //top:50,
      //backgroundColor: '#123',
      //flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    InputBox:{
      width:300,
      height:40,
      backgroundColor:'white',
      borderRadius:12,
      paddingHorizontal:16,
      fontSize:16,
      marginVertical:10
    },
    buttonText:{
      fontSize:16,
      fontWeight:'500',
      color:'black'
    },
    button:{
      width:100,
      fontSize:16,
      fontWeight:'500',
      backgroundColor:'lightyellow',
      borderRadius:12,
      marginVertical:10,
      paddingVertical:15,
      alignItems:'center'
      },
      SignupText:{
        color:'rgba(0,0,0,0.4)',
        fontSize:16
  
      },
      SignupButton:{
        color:'blue',
        flexDirection:'row'
      
      },
      SignupTextCont:{
        //flexGrow:1,
        alignItems:'flex-end',
        justifyContent:'center',
        flexDirection:'row'
      },
      error:{
        borderWidth:3,
        borderColor:'red'
      },
      image:{
        height:200,
        width:200,
        paddingVertical:30,
      }
})
