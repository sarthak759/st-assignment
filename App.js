import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import { StyleSheet,TextInput, Button, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack= createNativeStackNavigator();

const MyStack = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="page1"
          component={Register1}
          options={{title: ''}}
        />
        <Stack.Screen name="page2" component={Register2} options={{title: ''}}/>
        <Stack.Screen name="page3" component={HomeScreen} options={{title: ''}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const PostRequest = (phone, name) => {
  const reqOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      mob: {phone},
      name: {name}
    })
  };

  const post = async () => {
    try {
      await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/smarttraveller-zapex/endpoint/signup',reqOptions)
      .then(response => {
        if(phone===response.data.mob.trim()){
          console.log("number already registered");
        }else{
          {
            mob: {numberLong}{phone}
            name: {name}
          }
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  return(
    {post}
  )
}

const Register1 = ({navigation}) => {

  const [phone, setPhone] = useState("");

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Register{"\n"}</Text>
      <TextInput 
        style={styles.input}
        placeholder="Enter mobile Number"
        onChangeText={(text)=> setPhone(text)}
      />
      <Text>Send OTP</Text>
      <TextInput 
        style={styles.input}
        secureTextEntry={true}
        keyboardType="numeric"/>
      <TouchableOpacity
        style={styles.but}
        onPress={()=>{
          if(phone.trim()===""){
            alert("Phone Number required");
          }else{
            navigation.navigate('page2');
          }
        }}
      ><Text style={{color:"#FFFFFF"}}>NEXT</Text></TouchableOpacity>
    </View>
  )
}

const Register2 = ({navigation}) => {

  const [name, setName] = useState("");

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Register{"\n"}</Text>
      <TextInput 
        style={styles.input}
        placeholder="enter name" 
        onChangeText={(text)=> setName(text)}
      />
      <TouchableOpacity 
        style={styles.but}
        onPress={()=>{
          if(name.trim()===""){
            alert("Name required");
          }else{
            PostRequest;
            navigation.navigate('page3');
          }
        }}
      ><Text style={{color: "#FFFFFF"}}>SIGN UP</Text></TouchableOpacity>
      <Text style={{marginTop: 40}}>By signing up you agree to Photo's {<u>Terms of Service</u>} and {<u>Privacy Policy</u>}.</Text>
    </View>
  )
}

const image= {uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"};

const HomeScreen = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>Experiences{"\n"} </Text>
      <ImageBackground imageStyle={{borderRadius: 23}} source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.imageText} >Header {"\n"}price {"\n"}tags </Text>
      </ImageBackground>
    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    marginHorizontal: 16,
  },
  input : {
    borderWidth: 2,
    color: "#000000",
    height: 52,
    marginVertical: 11,
    padding: 17
  },
  text: {
    fontWeight: '400',
    fontSize: 36,
    marginBottom: 12
  },
  but:{
    height:52,
    alignItems: "center",
    paddingVertical: 14,
    backgroundColor: "#000000"
  },
  image:{
    height: 172,
    transform: "matrix(1,0,0,-1,0,0)"
  },
  imageText:{
    fontWeight: '500',
    marginHorizontal: 15,
    marginVertical: 95,
    transform: "matrix(1,0,0,-1,0,0)"
  }
})

export default function App() {
  return (
    <MyStack/>
  );
}

// () => navigation.navigate('page2')