/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Register from './components/Register';
import Login from './components/Login';
import Settings from './components/Settings';
import CardList from './components/CardList';
import Details from './components/Details';
import NavigationService from './NavigationService';

const Stack = createStackNavigator();
const CardStack = createSharedElementStackNavigator();
const Tab = createBottomTabNavigator();

const CardStackScreen = () => {
  return (
    <CardStack.Navigator>
      <CardStack.Screen name="CardList" component={CardList} />
      <CardStack.Screen name="Details" component={Details} />
    </CardStack.Navigator>
  );
};

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Card" component={CardStackScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}
        navigationOptions={{header: () => null}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
