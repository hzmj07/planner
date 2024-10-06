import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/home'; // kendi ekran dosyanızı buraya ekleyin
import Day from './screens/day'; // diğer sayfa
import Add from './screens/adddeta';
const Stack = createStackNavigator();

function index() {
  return (
    <NavigationContainer 
   
    independent={true} >
      <Stack.Navigator initialRouteName="index">
        <Stack.Screen 
         options={{ headerShown: false }}
        name="Home" component={HomeScreen} />
        <Stack.Screen
         options={{ headerShown: false }}
        name="Day" component={Day} />

        <Stack.Screen
         options={{ headerShown: false }}
        name="Add" component={Add} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default index
