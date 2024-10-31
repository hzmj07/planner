import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/home'; // kendi ekran dosyanızı buraya ekleyin
import Day from './screens/day'; // diğer sayfa
import Add from './screens/adddeta';
import LoginScreen from './screens/auth';
import onlineHome from './screens/online/homeOnline';
import Addonline from './screens/online/addOnline';
import EditOnline from './screens/online/editOnline';
import Registar from "./screens/registar"



function index() {

  const Stack = createStackNavigator();
  return (
    <NavigationContainer 
   
    independent={true} >

      
      <Stack.Navigator initialRouteName="index">

  <Stack.Screen
         options={{ headerShown: false }}
        name="auth" component={LoginScreen} />

        
        <Stack.Screen 
         options={{ headerShown: false }}
        name="Home" component={HomeScreen} />


        <Stack.Screen
         options={{ headerShown: false }}
        name="Day" component={Day} />



        <Stack.Screen
         options={{ headerShown: false }}
        name="Add" component={Add} />

<Stack.Screen
         options={{ headerShown: false }}
        name="Homeonline" component={onlineHome} />

<Stack.Screen
         options={{ headerShown: false }}
        name="Addonline" component={Addonline} />

<Stack.Screen
         options={{ headerShown: false }}
        name="EditOnline" component={EditOnline} />


<Stack.Screen
         options={{ headerShown: false }}
        name="registar" component={Registar} />



        
      </Stack.Navigator>
     


    </NavigationContainer>
  );
}

export default index
