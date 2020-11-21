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
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import store from './store';
import Register from './components/Register';
import Login from './components/Login';
import Settings from './components/Settings';
import CardList from './components/CardList';
import Details from './components/Details';
import NavigationService from './NavigationService';

enableScreens();
const Stack = createStackNavigator();
const CardStack = createSharedElementStackNavigator();
const Tab = createBottomTabNavigator();

const CardStackScreen = () => {
  return (
    <CardStack.Navigator
      initialRouteName="CardList"
      screenOptions={{headerShown: false}}
      navigationOptions={{header: () => null}}>
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
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
