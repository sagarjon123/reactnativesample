import React, { Component } from 'react';
import { View, Image,Text,StyleSheet,TextInput, TouchableOpacity,Picker, Button } from 'react-native';
import axios from 'axios';
import {Actions} from 'react-native-router-flux'
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Langauge:'',
      text:'Slect Prefered Language',
      FirstName:'',
      LastName:'',
      MobileNumber:null,
      AlternateNumber:null,
      Email:'',
      Password:''
    };
  }
  updateUser = (Langauge) => {
    this.setState({ Langauge: Langauge })
    this.setState({text:'Selected'})
  }
  Validate=()=>{
    const {FirstName,LastName,Password,MobileNumber,Email,Langauge,AlternateNumber}=this.state;
     if(Langauge==''){
       //alert('enter form fileds')
       return false
     }else if(FirstName==''){
      //alert('enter form fileds')
      return false
     }else if(LastName==''){
      //alert('enter form fileds')
      return false
     }else if(Password==''){
      //alert('enter form fileds')
      return false
     }else if(MobileNumber==null){
      //alert('enter form fileds')
      return false
     }else if(Email==''){
      //alert('enter form fileds')
      return false
     }return true

  }


  DoSignUp=()=>{ 
    if(this.Validate()){
   const {FirstName,LastName,Password,MobileNumber,Email,Langauge,AlternateNumber}=this.state;
      const data={
        "First_Name":FirstName,
        "Last_Name":LastName,
        "Password":Password,
        "Mobile_No":MobileNumber,
        "Email":Email,
        "Pref_Language":Langauge,
        "Alterante_Mobile_No": AlternateNumber
      }
      const myData= JSON.stringify(data)
      console.log(FirstName,LastName,Password,MobileNumber,Email,Langauge,AlternateNumber)
      // axios.post('https://plenary-charge-270904.appspot.com/user_registration',
      // data)
      // .then(
      //   res=>{console.warn(res)
      //     alert('signup sucessful')
      //   },
      //   err=>{ 
      //     alert('Username Password is worng')
      //   }

      // )
      fetch('https://plenary-charge-270904.appspot.com/user_registration',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',},
        body: JSON.stringify({
          "First_Name":FirstName,
          "Last_Name":LastName,
          "Password":Password,
          "Mobile_No":MobileNumber,
          "Email":Email,
          "Pref_Language":Langauge,
          "Alterante_Mobile_No": AlternateNumber
        }),
       })
       .then((response)=>response.json())
       .then((responseJson)=>{
         console.warn(responseJson)
         //console.log(responseJson)
         this.props.navigation.navigate('LogIn')
         
       })
       .catch((error)=>{
         Console.error(error)
         alert('username pasword worng')
       })
      }else{
        alert('enter form fileds')
      }
    }

  render() {
    return (
      <View style={styles.Container}>
        {/* <Image source = {require('/Users/admin/Desktop/Project/Kulomb/Assets/Kulomb_logo.png')} 
          style={styles.image}/> */}
        <Text style = {styles.text}>{this.state.Langauge}</Text>
        <View>
        <Text>{this.state.text }</Text>
        <Picker style={styles.pikcer}selectedValue = {this.state.Langauge} onValueChange = {this.updateUser}>
               <Picker.Item label = "English" value = "English" />
               <Picker.Item label = "Spanish" value = "Spanish" />
               <Picker.Item label = "French" value = "French" />
               <Picker.Item label = "Arabic" value = "Arabic" />
               <Picker.Item label = "Hindi" value = "Hindi" />
               <Picker.Item label = "Kannada" value = "Kannada" />
            </Picker>
            </View>
        <TextInput style={styles.InputBox} 
        placeholder='First Name'
        onChangeText={(FirstName)=>this.setState({FirstName})}
        
        placeholderTextColor='black'/>
        <TextInput style={styles.InputBox} 
        placeholder='Last Name'
        onChangeText={(LastName)=>this.setState({LastName})}
        placeholderTextColor='black'/>
        <TextInput style={styles.InputBox} 
        placeholder='Mobile Number'
        onChangeText={(MobileNumber)=>this.setState({MobileNumber})}
        placeholderTextColor='black'/>
        <TextInput style={styles.InputBox} 
        placeholder='Alternate Number'
        onChangeText={(AlternateNumber)=>this.setState({AlternateNumber})}
        placeholderTextColor='black'/>
        <TextInput style={styles.InputBox} 
        placeholder='Email'
        onChangeText={(Email)=>this.setState({Email})}
        placeholderTextColor='black'/>
        
        <TextInput style={styles.InputBox} 
        placeholder='Password'
        onChangeText={(Password)=>this.setState({Password})}
        placeholderTextColor='black'
        secureTextEntry={true}/>
        <TouchableOpacity style={styles.button}
        onPress={()=>this.DoSignUp()}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
        
        <View style={styles.SignupTextCont}>
          <Text style={styles.SignupText}>Alredy have an account?</Text>
         {/*  <Text style={styles.SignupButton}><Button onPress={()=>this.props.navigation.navigate('LogIn')}>LogIn</Button></Text> */}
         <Text style={styles.SignupButton} onPress={()=>this.props.navigation.navigate('LogIn')}>LogIn</Text>
        </View>
      </View>
    );
  }
}

export default SignUp;
const styles=StyleSheet.create({
    Container:{
      //backgroundColor: 'red',
      //flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      display:'flex',
      flexDirection:'column'
    },
    SignupTextCont:{
      //flexGrow:1,
      alignItems:'flex-end',
      justifyContent:'center',
      flexDirection:'row'
    },
    SignupText:{
      color:'rgba(0,0,0,0.4)',
      fontSize:16

    },
    SignupButton:{
      color:'blue',
      flexDirection:'row'
    
    },InputBox:{
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
    },button:{
      width:100,
      fontSize:16,
      fontWeight:'500',
      backgroundColor:'lightyellow',
      borderRadius:12,
      marginVertical:10,
      paddingVertical:15,
      alignItems:'center'
    },
    text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'blue'
   },
   pikcer:{
     height:160
   },
   image:{
     height:100,
     width:100
   }
  
  })

