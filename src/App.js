import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StoryList from './StoryList';
import MyWebView from './MyWebView';
import StoryDetails from './StoryDetails';

/*
  createStackNavigator: to creating the stack for screens.
*/
const Stack = createStackNavigator();


export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="StoryList" component={StoryList} />
          <Stack.Screen name="MyWebView" component={MyWebView} />
          <Stack.Screen name="StoryDetails" component={StoryDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}


const styles = StyleSheet.create({

});

